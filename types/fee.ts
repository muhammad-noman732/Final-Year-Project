export interface FeeStructure {
    id: string;
    semester: string;
    session: string;
    department: string;
    totalAmount: number;
    deadline: string;
    studentsAssigned: number;
    breakdown: FeeBreakdown;
    status: 'active' | 'draft' | 'expired';
}

export interface FeeBreakdown {
    tuitionFee: number;
    labFee: number;
    libraryFee: number;
    sportsFee: number;
    registrationFee: number;
}

export interface AssignedFee {
    id: string;
    studentId: string;
    studentName: string;
    department: string;
    semester: string;
    totalAmount: number;
    paidAmount: number;
    deadline: string;
    status: 'paid' | 'unpaid' | 'partial' | 'overdue';
}

export interface Defaulter {
    id: string;
    studentId: string;
    studentName: string;
    department: string;
    program: string;
    semester: string;
    amountDue: number;
    deadline: string;
    daysOverdue: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
}
