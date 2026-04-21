import { AppError, ConflictError, NotFoundError } from './AppError';

export class FeeAlreadyPaidError extends ConflictError {
    constructor(feeAssignmentId: string) {
        super(`Fee assignment ${feeAssignmentId} has already been paid.`);
        this.name = 'FeeAlreadyPaidError';
    }
}

export class FeeAssignmentNotFoundError extends NotFoundError {
    constructor(id: string) {
        super(`FeeAssignment with ID ${id} not found.`);
        this.name = 'FeeAssignmentNotFoundError';
    }
}

export class StudentSuspendedError extends AppError {
    constructor(studentId: string) {
        super(
            `Student ${studentId} is suspended and cannot make payments.`,
            403,
            'STUDENT_SUSPENDED',
        );
        this.name = 'StudentSuspendedError';
    }
}

export class InvalidWebhookSignatureError extends AppError {
    constructor() {
        super('Webhook signature verification failed.', 400, 'INVALID_WEBHOOK_SIGNATURE');
        this.name = 'InvalidWebhookSignatureError';
    }
}

export class PaymentAmountMismatchError extends AppError {
    constructor(expected: number, received: number) {
        super(
            `Payment amount mismatch: expected ${expected}, received ${received}. Possible tampering.`,
            422,
            'AMOUNT_MISMATCH',
        );
        this.name = 'PaymentAmountMismatchError';
    }
}
