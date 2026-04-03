
export type Role = "SUPER_ADMIN" | "ADMIN" | "VC" | "HOD" | "STUDENT"

/** Role → dashboard URL prefix */
export const ROLE_ROUTES: Record<Role, string> = {
  SUPER_ADMIN: "/superadmin",
  ADMIN: "/admin",
  VC: "/vc",
  HOD: "/hod",
  STUDENT: "/student",
}

/** Role → human-readable label */
export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrator",
  VC: "Vice Chancellor",
  HOD: "Head of Department",
  STUDENT: "Student",
}
