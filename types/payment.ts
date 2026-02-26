export interface Payment {
    id: string;
    transactionId: string;
    studentId: string;
    studentName: string;
    department: string;
    semester: string;
    amount: number;
    method: 'stripe' | 'jazzcash' | 'easypaisa' | 'bank';
    dateTime: string;
    status: 'paid' | 'pending' | 'failed' | 'refunded';
    cardLast4?: string;
}

export interface PaymentStats {
    totalCollected: number;
    todayCollection: number;
    pendingVerification: number;
    failedPayments: number;
}

export interface LivePaymentEvent {
    id: string;
    studentName: string;
    department: string;
    semester: string;
    amount: number;
    method: string;
    timestamp: string;
    status: 'success' | 'failed';
}
