export const DEPARTMENTS = [
    "Computer Science",
    "Biology",
    "Physics",
    "Mathematics",
] as const;

export const DEPARTMENT_SHORT: Record<string, string> = {
    "Computer Science": "CS",
    "Biology": "BIO",
    "Physics": "PHY",
    "Mathematics": "MATH",
};

export const PROGRAMS: Record<string, string[]> = {
    "Computer Science": ["BS Computer Science", "BS Information Technology", "BS Software Engineering", "MCS", "MS Computer Science"],
    "Biology": ["BS Biology", "BS Zoology", "BS Botany", "MS Biology"],
    "Physics": ["BS Physics", "BS Applied Physics", "MS Physics"],
    "Mathematics": ["BS Mathematics", "BS Applied Mathematics", "MS Mathematics"],
};

export const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"] as const;

export const SESSIONS = ["2022-2026", "2023-2027", "2024-2028"] as const;

export const PAYMENT_METHODS = ["stripe", "jazzcash", "easypaisa", "bank"] as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
    stripe: "Stripe",
    jazzcash: "JazzCash",
    easypaisa: "EasyPaisa",
    bank: "Bank Transfer",
};

export const FEE_STATUS_COLORS: Record<string, string> = {
    paid: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    unpaid: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    overdue: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    partial: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    failed: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    refunded: "text-slate-400 bg-slate-400/10 border-slate-400/20",
};

export const STUDENT_STATUS_COLORS: Record<string, string> = {
    active: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    inactive: "text-slate-400 bg-slate-400/10 border-slate-400/20",
    graduated: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    suspended: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

export const CURRENCY = "PKR";
export const CURRENCY_SYMBOL = "₨";

export const formatCurrency = (amount: number): string => {
    if (amount >= 1_000_000) {
        return `PKR ${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (amount >= 1_000) {
        return `PKR ${(amount / 1_000).toFixed(0)}K`;
    }
    return `PKR ${amount.toLocaleString("en-US")}`;
};

export const formatFullCurrency = (amount: number): string => {
    return `PKR ${amount.toLocaleString("en-US")}`;
};
