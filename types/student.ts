export interface Student {
    id: string;
    name: string;
    email: string;
    cnic: string;
    department: string;
    program: string;
    semester: string;
    session: string;
    status: 'active' | 'inactive' | 'graduated' | 'suspended';
    avatar?: string;
    phone?: string;
    address?: string;
    guardianName?: string;
    guardianPhone?: string;
    enrollmentDate: string;
}

export interface StudentProfile extends Student {
    totalPaid: number;
    dueAmount: number;
    currentSemesterFee: number;
    paymentHistory: PaymentRecord[];
}

export interface PaymentRecord {
    id: string;
    semester: string;
    amount: number;
    paidOn: string;
    method: string;
    transactionId: string;
    status: 'paid' | 'pending' | 'failed' | 'refunded';
}
