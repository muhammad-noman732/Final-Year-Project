export const siteConfig = {
    name: "GCUF Fee Management System",
    shortName: "GCUF FMS",
    description: "Intelligent Real-Time University Registration & Fee Management System",
    university: "Government College University Faisalabad",
    universityShort: "GCUF",
    tagline: "Excellence in Education, Innovation in Management",
    url: "https://fees.gcuf.edu.pk",
};

export const navItems = {
    student: [
        { label: "Dashboard", href: "/student", icon: "LayoutDashboard" },
        { label: "Pay Fee", href: "/student/payfee", icon: "CreditCard" },
        { label: "Profile", href: "/student/profile", icon: "User" },
    ],
    admin: [
        { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
        { label: "Students", href: "/admin/students", icon: "Users" },
        { label: "Fee Management", href: "/admin/fees", icon: "Banknote" },
        { label: "Payments", href: "/admin/payments", icon: "Receipt" },
        { label: "Reports", href: "/admin/reports", icon: "FileBarChart" },
    ],
    vc: [
        { label: "Dashboard", href: "/vc", icon: "LayoutDashboard" },
        { label: "Analytics", href: "/vc/analytics", icon: "TrendingUp" },
        { label: "Monitoring", href: "/vc/monitoring", icon: "Activity" },
    ],
    hod: [
        { label: "Dashboard", href: "/hod", icon: "LayoutDashboard" },
    ],
} as const;
