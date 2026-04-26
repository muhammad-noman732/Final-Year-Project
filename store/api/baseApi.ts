import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuery"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,

  tagTypes: [
    "Tenant",
    "User",
    "Student",
    "StudentFeeProfile",
    "Department",
    "Program",
    "Session",
    "FeeStructure",
    "Payment",
    "VCDashboard",
    "VCStudents",
    "Notification",
    "Registration",
  ],

  endpoints: () => ({}),
})
