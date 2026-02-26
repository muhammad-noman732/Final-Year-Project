"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
    paid: { label: "Paid", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15" },
    unpaid: { label: "Unpaid", className: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/15" },
    pending: { label: "Pending", className: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/15" },
    overdue: { label: "Overdue", className: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/15" },
    failed: { label: "Failed", className: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/15" },
    refunded: { label: "Refunded", className: "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/15" },
    active: { label: "Active", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15" },
    inactive: { label: "Inactive", className: "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/15" },
    graduated: { label: "Graduated", className: "bg-sky-500/10 text-sky-400 border-sky-500/20 hover:bg-sky-500/15" },
    suspended: { label: "Suspended", className: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/15" },
    success: { label: "Success", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15" },
    verified: { label: "Verified", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15" },
    low: { label: "Low", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15" },
    medium: { label: "Medium", className: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/15" },
    high: { label: "High", className: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/15" },
    critical: { label: "Critical", className: "bg-rose-500/10 text-rose-300 border-rose-400/30 hover:bg-rose-500/20 font-semibold" },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status] || {
        label: status,
        className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    };

    return (
        <Badge
            variant="outline"
            className={cn(
                "text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize",
                config.className,
                className
            )}
        >
            {config.label}
        </Badge>
    );
}
