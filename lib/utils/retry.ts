import { AppError } from "./AppError";
import { logger } from '@/lib/logger';

interface RetryOptions {
    maxAttempts?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    shouldRetry?: (error: Error, attempt: number) => boolean;
    onRetry?: (error: Error, attempt: number, delayMs: number) => void;
}

function calculateDelay(
    attempt: number,
    baseDelayMs: number,
    maxDelayMs: number
): number {
    const exponentialDelay = baseDelayMs * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 1000;
    return Math.min(exponentialDelay + jitter, maxDelayMs);
}

function defaultShouldRetry(error: Error): boolean {
    if (error instanceof AppError) {
        // Retry on rate limits (429) and server-side transient errors (503, 504)
        const retryableStatusCodes = [429, 503, 504];
        return retryableStatusCodes.includes(error.statusCode);
    }

    // Common network errors that are usually transient
    const transientErrorMessages = [
        'ECONNRESET',
        'ECONNREFUSED',
        'ETIMEDOUT',
        'socket hang up'
    ];

    return transientErrorMessages.some(msg => error.message.includes(msg));
}

export async function withRetry<T>(
    operation: () => Promise<T>,
    operationName: string,
    options: RetryOptions = {}
): Promise<T> {
    const {
        maxAttempts = 3,
        baseDelayMs = 1000,
        maxDelayMs = 15000,
        shouldRetry = defaultShouldRetry,
        onRetry,
    } = options;

    let lastError!: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await operation();

            if (attempt > 1) {
                logger.info(
                    { event: "retry.succeeded", operationName, attempt, maxAttempts },
                    `Retry succeeded on attempt ${attempt}`
                );
            }

            return result;
        } catch (error) {
            lastError = error as Error;

            if (attempt === maxAttempts) {
                logger.error(
                    {
                        event: "retry.exhausted",
                        operationName,
                        attempt,
                        maxAttempts,
                        err: lastError.message,
                    },
                    `All retry attempts failed for ${operationName}`
                );
                break;
            }

            if (!shouldRetry(lastError, attempt)) {
                logger.info(
                    {
                        event: "retry.aborted_not_retryable",
                        operationName,
                        attempt,
                        err: lastError.message,
                    },
                    "Retry aborted because error is not retryable"
                );
                throw lastError;
            }

            const delayMs = calculateDelay(attempt, baseDelayMs, maxDelayMs);

            onRetry?.(lastError, attempt, delayMs);

            logger.warn(
                {
                    event: "retry.scheduled",
                    operationName,
                    attempt,
                    err: lastError.message,
                    nextRetryInMs: Math.round(delayMs)
                },
                "Retry attempt failed; scheduling next retry"
            );

            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }

    throw lastError;
}
