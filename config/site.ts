export const siteConfig = {
    name: "UniSync Management System",
    shortName: "UniSync",
    description: "Intelligent Real-Time University Registration & Fee Management System",
    university: "UniSync Global Academy",
    universityShort: "UniSync",
    tagline: "Excellence in Education, Innovation in Management",
    url: "https://unisync.com",
};

export const navItems = {
    superadmin: [
        { label: "Dashboard", href: "/superadmin", icon: "LayoutDashboard" },
        { label: "Universities", href: "/superadmin/universities", icon: "Building2" },
    ],
    student: [
        { label: "Dashboard", href: "/student", icon: "LayoutDashboard" },
        { label: "History", href: "/student/history", icon: "Receipt" },
        { label: "Profile", href: "/student/profile", icon: "User" },
    ],
    admin: [
        { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
        { label: "Users", href: "/admin/users", icon: "UserCog" },
        { label: "Students", href: "/admin/students", icon: "Users" },
        { label: "Departments", href: "/admin/departments", icon: "Building" },
        { label: "Programs", href: "/admin/programs", icon: "GraduationCap" },
        { label: "Sessions", href: "/admin/sessions", icon: "Calendar" },
        { label: "Fee Management", href: "/admin/fees", icon: "Banknote" },
        { label: "Registration", href: "/admin/registration", icon: "GraduationCap" },
    ],
    vc: [
        { label: "Dashboard", href: "/vc", icon: "LayoutDashboard" },
        { label: "Tracking", href: "/vc/tracking", icon: "Activity" },
        { label: "Departments", href: "/vc/departments", icon: "Building2" },
    ],
    hod: [
        { label: "Dashboard", href: "/hod", icon: "LayoutDashboard" },
        { label: "Defaulters", href: "/hod/defaulters", icon: "AlertTriangle" },
        { label: "Students", href: "/hod/students", icon: "Users" },
    ],
} as const;
