"use client";

import { useState, useMemo } from "react";
import { useStudentDashboard } from "@/hooks/student/useStudentDashboard";

export function useStudentLedger() {
    const dashboard = useStudentDashboard();
    
    // UI state
    const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
    const [navigatingId, setNavigatingId] = useState<string | null>(null);

    // Derived states logic
    const unpaidAssignments = useMemo(() => 
        dashboard.assignments.filter(a => a.status === 'UNPAID' || a.status === 'OVERDUE' || a.status === 'PARTIAL'),
    [dashboard.assignments]);

    const filteredPayments = useMemo(() => {
        if (filter === "completed") return dashboard.allPayments.filter(p => p.status === "COMPLETED");
        if (filter === "pending") return dashboard.allPayments.filter(p => p.status !== "COMPLETED");
        return dashboard.allPayments;
    }, [dashboard.allPayments, filter]);

    return {
        ...dashboard,
        filter,
        setFilter,
        navigatingId,
        setNavigatingId,
        unpaidAssignments,
        filteredPayments,
    };
}
