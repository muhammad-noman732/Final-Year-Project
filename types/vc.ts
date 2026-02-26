export interface DepartmentStats {
    name: string;
    shortName: string;
    totalStudents: number;
    feeCollectible: number;
    feeCollected: number;
    paid: number;
    unpaid: number;
    defaulters: number;
    todayPayments: number;
    todayAmount: number;
    collectionRate: number;
}

export interface VCDashboardStats {
    totalCollected: number;
    todayCollection: number;
    collectionRate: number;
    targetRate: number;
    studentsPaid: number;
    totalStudents: number;
    defaulters: number;
    overdueCount: number;
}

export interface ChartDataPoint {
    date: string;
    amount: number;
    label?: string;
}

export interface DepartmentChartData {
    department: string;
    rate: number;
    amount: number;
}

export interface PaymentMethodData {
    method: string;
    percentage: number;
    amount: number;
    color: string;
}

export interface SemesterCollectionData {
    semester: string;
    paid: number;
    unpaid: number;
}

export interface HourlyPattern {
    hour: number;
    day: string;
    volume: number;
}

export interface FilterState {
    department: string;
    semester: string;
    timePeriod: string;
    status: string;
    dateRange: { from: string; to: string } | null;
}
