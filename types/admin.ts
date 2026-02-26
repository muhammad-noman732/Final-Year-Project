export interface AdminDashboardStats {
    totalStudents: number;
    totalFeeCollected: number;
    pendingPayments: number;
    defaultersCount: number;
    todayCollection: number;
    weeklyGrowth: number;
}

export interface ReportConfig {
    type: 'collection' | 'defaulters' | 'department' | 'payment-method';
    dateRange: { from: string; to: string };
    department: string;
    semester: string;
    format: 'pdf' | 'csv' | 'excel';
}

export interface GeneratedReport {
    id: string;
    name: string;
    generatedOn: string;
    format: 'pdf' | 'csv' | 'excel';
    size: string;
}
