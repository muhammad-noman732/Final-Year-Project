import { TimeoutError } from './AppError';

export function withTimeout<T>(
    promise: Promise<T>,
    ms: number,
    operationName: string
): Promise<T> {
    let timeoutHandle: NodeJS.Timeout;

    const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutHandle = setTimeout(() => {
            reject(new TimeoutError(operationName, ms));
        }, ms);
    });

    return Promise.race([promise, timeoutPromise]).finally(() => {
        clearTimeout(timeoutHandle);
    });
}