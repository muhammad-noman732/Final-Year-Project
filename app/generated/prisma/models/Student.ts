
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type StudentModel = runtime.Types.Result.DefaultSelection<Prisma.$StudentPayload>

export type AggregateStudent = {
  _count: StudentCountAggregateOutputType | null
  _avg: StudentAvgAggregateOutputType | null
  _sum: StudentSumAggregateOutputType | null
  _min: StudentMinAggregateOutputType | null
  _max: StudentMaxAggregateOutputType | null
}

export type StudentAvgAggregateOutputType = {
  currentSemester: number | null
  totalFeeDue: number | null
  totalFeePaid: number | null
  latePaymentCount: number | null
}

export type StudentSumAggregateOutputType = {
  currentSemester: number | null
  totalFeeDue: number | null
  totalFeePaid: number | null
  latePaymentCount: number | null
}

export type StudentMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  userId: string | null
  studentId: string | null
  cnic: string | null
  sessionId: string | null
  departmentId: string | null
  programId: string | null
  currentSemester: number | null
  enrollmentStatus: $Enums.EnrollmentStatus | null
  feeStatus: $Enums.FeeStatus | null
  totalFeeDue: number | null
  totalFeePaid: number | null
  riskLevel: string | null
  latePaymentCount: number | null
  lastPaymentDate: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type StudentMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  userId: string | null
  studentId: string | null
  cnic: string | null
  sessionId: string | null
  departmentId: string | null
  programId: string | null
  currentSemester: number | null
  enrollmentStatus: $Enums.EnrollmentStatus | null
  feeStatus: $Enums.FeeStatus | null
  totalFeeDue: number | null
  totalFeePaid: number | null
  riskLevel: string | null
  latePaymentCount: number | null
  lastPaymentDate: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type StudentCountAggregateOutputType = {
  id: number
  tenantId: number
  userId: number
  studentId: number
  cnic: number
  sessionId: number
  departmentId: number
  programId: number
  currentSemester: number
  enrollmentStatus: number
  feeStatus: number
  totalFeeDue: number
  totalFeePaid: number
  riskLevel: number
  latePaymentCount: number
  lastPaymentDate: number
  metadata: number
  createdAt: number
  updatedAt: number
  _all: number
}

export type StudentAvgAggregateInputType = {
  currentSemester?: true
  totalFeeDue?: true
  totalFeePaid?: true
  latePaymentCount?: true
}

export type StudentSumAggregateInputType = {
  currentSemester?: true
  totalFeeDue?: true
  totalFeePaid?: true
  latePaymentCount?: true
}

export type StudentMinAggregateInputType = {
  id?: true
  tenantId?: true
  userId?: true
  studentId?: true
  cnic?: true
  sessionId?: true
  departmentId?: true
  programId?: true
  currentSemester?: true
  enrollmentStatus?: true
  feeStatus?: true
  totalFeeDue?: true
  totalFeePaid?: true
  riskLevel?: true
  latePaymentCount?: true
  lastPaymentDate?: true
  createdAt?: true
  updatedAt?: true
}

export type StudentMaxAggregateInputType = {
  id?: true
  tenantId?: true
  userId?: true
  studentId?: true
  cnic?: true
  sessionId?: true
  departmentId?: true
  programId?: true
  currentSemester?: true
  enrollmentStatus?: true
  feeStatus?: true
  totalFeeDue?: true
  totalFeePaid?: true
  riskLevel?: true
  latePaymentCount?: true
  lastPaymentDate?: true
  createdAt?: true
  updatedAt?: true
}

export type StudentCountAggregateInputType = {
  id?: true
  tenantId?: true
  userId?: true
  studentId?: true
  cnic?: true
  sessionId?: true
  departmentId?: true
  programId?: true
  currentSemester?: true
  enrollmentStatus?: true
  feeStatus?: true
  totalFeeDue?: true
  totalFeePaid?: true
  riskLevel?: true
  latePaymentCount?: true
  lastPaymentDate?: true
  metadata?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type StudentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentWhereInput
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[]
    cursor?: Prisma.StudentWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | StudentCountAggregateInputType
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
}

export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
      [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateStudent[P]>
    : Prisma.GetScalarType<T[P], AggregateStudent[P]>
}

export type StudentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.StudentWhereInput
  orderBy?: Prisma.StudentOrderByWithAggregationInput | Prisma.StudentOrderByWithAggregationInput[]
  by: Prisma.StudentScalarFieldEnum[] | Prisma.StudentScalarFieldEnum
  having?: Prisma.StudentScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: StudentCountAggregateInputType | true
  _avg?: StudentAvgAggregateInputType
  _sum?: StudentSumAggregateInputType
  _min?: StudentMinAggregateInputType
  _max?: StudentMaxAggregateInputType
}

export type StudentGroupByOutputType = {
  id: string
  tenantId: string
  userId: string
  studentId: string
  cnic: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester: number
  enrollmentStatus: $Enums.EnrollmentStatus
  feeStatus: $Enums.FeeStatus
  totalFeeDue: number
  totalFeePaid: number
  riskLevel: string
  latePaymentCount: number
  lastPaymentDate: Date | null
  metadata: runtime.JsonValue | null
  createdAt: Date
  updatedAt: Date
  _count: StudentCountAggregateOutputType | null
  _avg: StudentAvgAggregateOutputType | null
  _sum: StudentSumAggregateOutputType | null
  _min: StudentMinAggregateOutputType | null
  _max: StudentMaxAggregateOutputType | null
}

export type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<StudentGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], StudentGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], StudentGroupByOutputType[P]>
      }
    >
  >

export type StudentWhereInput = {
  AND?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[]
  OR?: Prisma.StudentWhereInput[]
  NOT?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[]
  id?: Prisma.StringFilter<"Student"> | string
  tenantId?: Prisma.StringFilter<"Student"> | string
  userId?: Prisma.StringFilter<"Student"> | string
  studentId?: Prisma.StringFilter<"Student"> | string
  cnic?: Prisma.StringNullableFilter<"Student"> | string | null
  sessionId?: Prisma.StringFilter<"Student"> | string
  departmentId?: Prisma.StringFilter<"Student"> | string
  programId?: Prisma.StringFilter<"Student"> | string
  currentSemester?: Prisma.IntFilter<"Student"> | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFilter<"Student"> | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFilter<"Student"> | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFilter<"Student"> | number
  totalFeePaid?: Prisma.IntFilter<"Student"> | number
  riskLevel?: Prisma.StringFilter<"Student"> | string
  latePaymentCount?: Prisma.IntFilter<"Student"> | number
  lastPaymentDate?: Prisma.DateTimeNullableFilter<"Student"> | Date | string | null
  metadata?: Prisma.JsonNullableFilter<"Student">
  createdAt?: Prisma.DateTimeFilter<"Student"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Student"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>
  session?: Prisma.XOR<Prisma.AcademicSessionScalarRelationFilter, Prisma.AcademicSessionWhereInput>
  department?: Prisma.XOR<Prisma.DepartmentScalarRelationFilter, Prisma.DepartmentWhereInput>
  program?: Prisma.XOR<Prisma.ProgramScalarRelationFilter, Prisma.ProgramWhereInput>
  feeAssignments?: Prisma.FeeAssignmentListRelationFilter
  payments?: Prisma.PaymentListRelationFilter
}

export type StudentOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  cnic?: Prisma.SortOrderInput | Prisma.SortOrder
  sessionId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  currentSemester?: Prisma.SortOrder
  enrollmentStatus?: Prisma.SortOrder
  feeStatus?: Prisma.SortOrder
  totalFeeDue?: Prisma.SortOrder
  totalFeePaid?: Prisma.SortOrder
  riskLevel?: Prisma.SortOrder
  latePaymentCount?: Prisma.SortOrder
  lastPaymentDate?: Prisma.SortOrderInput | Prisma.SortOrder
  metadata?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  user?: Prisma.UserOrderByWithRelationInput
  session?: Prisma.AcademicSessionOrderByWithRelationInput
  department?: Prisma.DepartmentOrderByWithRelationInput
  program?: Prisma.ProgramOrderByWithRelationInput
  feeAssignments?: Prisma.FeeAssignmentOrderByRelationAggregateInput
  payments?: Prisma.PaymentOrderByRelationAggregateInput
}

export type StudentWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  userId?: string
  tenantId_studentId?: Prisma.StudentTenantIdStudentIdCompoundUniqueInput
  AND?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[]
  OR?: Prisma.StudentWhereInput[]
  NOT?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[]
  tenantId?: Prisma.StringFilter<"Student"> | string
  studentId?: Prisma.StringFilter<"Student"> | string
  cnic?: Prisma.StringNullableFilter<"Student"> | string | null
  sessionId?: Prisma.StringFilter<"Student"> | string
  departmentId?: Prisma.StringFilter<"Student"> | string
  programId?: Prisma.StringFilter<"Student"> | string
  currentSemester?: Prisma.IntFilter<"Student"> | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFilter<"Student"> | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFilter<"Student"> | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFilter<"Student"> | number
  totalFeePaid?: Prisma.IntFilter<"Student"> | number
  riskLevel?: Prisma.StringFilter<"Student"> | string
  latePaymentCount?: Prisma.IntFilter<"Student"> | number
  lastPaymentDate?: Prisma.DateTimeNullableFilter<"Student"> | Date | string | null
  metadata?: Prisma.JsonNullableFilter<"Student">
  createdAt?: Prisma.DateTimeFilter<"Student"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Student"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>
  session?: Prisma.XOR<Prisma.AcademicSessionScalarRelationFilter, Prisma.AcademicSessionWhereInput>
  department?: Prisma.XOR<Prisma.DepartmentScalarRelationFilter, Prisma.DepartmentWhereInput>
  program?: Prisma.XOR<Prisma.ProgramScalarRelationFilter, Prisma.ProgramWhereInput>
  feeAssignments?: Prisma.FeeAssignmentListRelationFilter
  payments?: Prisma.PaymentListRelationFilter
}, "id" | "userId" | "tenantId_studentId">

export type StudentOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  cnic?: Prisma.SortOrderInput | Prisma.SortOrder
  sessionId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  currentSemester?: Prisma.SortOrder
  enrollmentStatus?: Prisma.SortOrder
  feeStatus?: Prisma.SortOrder
  totalFeeDue?: Prisma.SortOrder
  totalFeePaid?: Prisma.SortOrder
  riskLevel?: Prisma.SortOrder
  latePaymentCount?: Prisma.SortOrder
  lastPaymentDate?: Prisma.SortOrderInput | Prisma.SortOrder
  metadata?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.StudentCountOrderByAggregateInput
  _avg?: Prisma.StudentAvgOrderByAggregateInput
  _max?: Prisma.StudentMaxOrderByAggregateInput
  _min?: Prisma.StudentMinOrderByAggregateInput
  _sum?: Prisma.StudentSumOrderByAggregateInput
}

export type StudentScalarWhereWithAggregatesInput = {
  AND?: Prisma.StudentScalarWhereWithAggregatesInput | Prisma.StudentScalarWhereWithAggregatesInput[]
  OR?: Prisma.StudentScalarWhereWithAggregatesInput[]
  NOT?: Prisma.StudentScalarWhereWithAggregatesInput | Prisma.StudentScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Student"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"Student"> | string
  userId?: Prisma.StringWithAggregatesFilter<"Student"> | string
  studentId?: Prisma.StringWithAggregatesFilter<"Student"> | string
  cnic?: Prisma.StringNullableWithAggregatesFilter<"Student"> | string | null
  sessionId?: Prisma.StringWithAggregatesFilter<"Student"> | string
  departmentId?: Prisma.StringWithAggregatesFilter<"Student"> | string
  programId?: Prisma.StringWithAggregatesFilter<"Student"> | string
  currentSemester?: Prisma.IntWithAggregatesFilter<"Student"> | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusWithAggregatesFilter<"Student"> | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusWithAggregatesFilter<"Student"> | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntWithAggregatesFilter<"Student"> | number
  totalFeePaid?: Prisma.IntWithAggregatesFilter<"Student"> | number
  riskLevel?: Prisma.StringWithAggregatesFilter<"Student"> | string
  latePaymentCount?: Prisma.IntWithAggregatesFilter<"Student"> | number
  lastPaymentDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Student"> | Date | string | null
  metadata?: Prisma.JsonNullableWithAggregatesFilter<"Student">
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Student"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Student"> | Date | string
}

export type StudentCreateInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutStudentsInput
  user: Prisma.UserCreateNestedOneWithoutStudentInput
  session: Prisma.AcademicSessionCreateNestedOneWithoutStudentsInput
  department: Prisma.DepartmentCreateNestedOneWithoutStudentsInput
  program: Prisma.ProgramCreateNestedOneWithoutStudentsInput
  feeAssignments?: Prisma.FeeAssignmentCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutStudentsNestedInput
  user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput
  session?: Prisma.AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutStudentsNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutStudentsNestedInput
  feeAssignments?: Prisma.FeeAssignmentUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentCreateManyInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type StudentUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type StudentUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type StudentListRelationFilter = {
  every?: Prisma.StudentWhereInput
  some?: Prisma.StudentWhereInput
  none?: Prisma.StudentWhereInput
}

export type StudentOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type StudentNullableScalarRelationFilter = {
  is?: Prisma.StudentWhereInput | null
  isNot?: Prisma.StudentWhereInput | null
}

export type StudentTenantIdStudentIdCompoundUniqueInput = {
  tenantId: string
  studentId: string
}

export type StudentCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  cnic?: Prisma.SortOrder
  sessionId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  currentSemester?: Prisma.SortOrder
  enrollmentStatus?: Prisma.SortOrder
  feeStatus?: Prisma.SortOrder
  totalFeeDue?: Prisma.SortOrder
  totalFeePaid?: Prisma.SortOrder
  riskLevel?: Prisma.SortOrder
  latePaymentCount?: Prisma.SortOrder
  lastPaymentDate?: Prisma.SortOrder
  metadata?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type StudentAvgOrderByAggregateInput = {
  currentSemester?: Prisma.SortOrder
  totalFeeDue?: Prisma.SortOrder
  totalFeePaid?: Prisma.SortOrder
  latePaymentCount?: Prisma.SortOrder
}

export type StudentMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  cnic?: Prisma.SortOrder
  sessionId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  currentSemester?: Prisma.SortOrder
  enrollmentStatus?: Prisma.SortOrder
  feeStatus?: Prisma.SortOrder
  totalFeeDue?: Prisma.SortOrder
  totalFeePaid?: Prisma.SortOrder
  riskLevel?: Prisma.SortOrder
  latePaymentCount?: Prisma.SortOrder
  lastPaymentDate?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type StudentMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  cnic?: Prisma.SortOrder
  sessionId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  currentSemester?: Prisma.SortOrder
  enrollmentStatus?: Prisma.SortOrder
  feeStatus?: Prisma.SortOrder
  totalFeeDue?: Prisma.SortOrder
  totalFeePaid?: Prisma.SortOrder
  riskLevel?: Prisma.SortOrder
  latePaymentCount?: Prisma.SortOrder
  lastPaymentDate?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type StudentSumOrderByAggregateInput = {
  currentSemester?: Prisma.SortOrder
  totalFeeDue?: Prisma.SortOrder
  totalFeePaid?: Prisma.SortOrder
  latePaymentCount?: Prisma.SortOrder
}

export type StudentScalarRelationFilter = {
  is?: Prisma.StudentWhereInput
  isNot?: Prisma.StudentWhereInput
}

export type StudentCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutTenantInput, Prisma.StudentUncheckedCreateWithoutTenantInput> | Prisma.StudentCreateWithoutTenantInput[] | Prisma.StudentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutTenantInput | Prisma.StudentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.StudentCreateManyTenantInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutTenantInput, Prisma.StudentUncheckedCreateWithoutTenantInput> | Prisma.StudentCreateWithoutTenantInput[] | Prisma.StudentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutTenantInput | Prisma.StudentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.StudentCreateManyTenantInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutTenantInput, Prisma.StudentUncheckedCreateWithoutTenantInput> | Prisma.StudentCreateWithoutTenantInput[] | Prisma.StudentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutTenantInput | Prisma.StudentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutTenantInput | Prisma.StudentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.StudentCreateManyTenantInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutTenantInput | Prisma.StudentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutTenantInput | Prisma.StudentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type StudentUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutTenantInput, Prisma.StudentUncheckedCreateWithoutTenantInput> | Prisma.StudentCreateWithoutTenantInput[] | Prisma.StudentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutTenantInput | Prisma.StudentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutTenantInput | Prisma.StudentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.StudentCreateManyTenantInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutTenantInput | Prisma.StudentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutTenantInput | Prisma.StudentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type StudentCreateNestedOneWithoutUserInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput
  connect?: Prisma.StudentWhereUniqueInput
}

export type StudentUncheckedCreateNestedOneWithoutUserInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput
  connect?: Prisma.StudentWhereUniqueInput
}

export type StudentUpdateOneWithoutUserNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput
  upsert?: Prisma.StudentUpsertWithoutUserInput
  disconnect?: Prisma.StudentWhereInput | boolean
  delete?: Prisma.StudentWhereInput | boolean
  connect?: Prisma.StudentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutUserInput, Prisma.StudentUpdateWithoutUserInput>, Prisma.StudentUncheckedUpdateWithoutUserInput>
}

export type StudentUncheckedUpdateOneWithoutUserNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput
  upsert?: Prisma.StudentUpsertWithoutUserInput
  disconnect?: Prisma.StudentWhereInput | boolean
  delete?: Prisma.StudentWhereInput | boolean
  connect?: Prisma.StudentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutUserInput, Prisma.StudentUpdateWithoutUserInput>, Prisma.StudentUncheckedUpdateWithoutUserInput>
}

export type StudentCreateNestedManyWithoutSessionInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutSessionInput, Prisma.StudentUncheckedCreateWithoutSessionInput> | Prisma.StudentCreateWithoutSessionInput[] | Prisma.StudentUncheckedCreateWithoutSessionInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSessionInput | Prisma.StudentCreateOrConnectWithoutSessionInput[]
  createMany?: Prisma.StudentCreateManySessionInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUncheckedCreateNestedManyWithoutSessionInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutSessionInput, Prisma.StudentUncheckedCreateWithoutSessionInput> | Prisma.StudentCreateWithoutSessionInput[] | Prisma.StudentUncheckedCreateWithoutSessionInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSessionInput | Prisma.StudentCreateOrConnectWithoutSessionInput[]
  createMany?: Prisma.StudentCreateManySessionInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUpdateManyWithoutSessionNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutSessionInput, Prisma.StudentUncheckedCreateWithoutSessionInput> | Prisma.StudentCreateWithoutSessionInput[] | Prisma.StudentUncheckedCreateWithoutSessionInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSessionInput | Prisma.StudentCreateOrConnectWithoutSessionInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutSessionInput | Prisma.StudentUpsertWithWhereUniqueWithoutSessionInput[]
  createMany?: Prisma.StudentCreateManySessionInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutSessionInput | Prisma.StudentUpdateWithWhereUniqueWithoutSessionInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutSessionInput | Prisma.StudentUpdateManyWithWhereWithoutSessionInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type StudentUncheckedUpdateManyWithoutSessionNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutSessionInput, Prisma.StudentUncheckedCreateWithoutSessionInput> | Prisma.StudentCreateWithoutSessionInput[] | Prisma.StudentUncheckedCreateWithoutSessionInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSessionInput | Prisma.StudentCreateOrConnectWithoutSessionInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutSessionInput | Prisma.StudentUpsertWithWhereUniqueWithoutSessionInput[]
  createMany?: Prisma.StudentCreateManySessionInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutSessionInput | Prisma.StudentUpdateWithWhereUniqueWithoutSessionInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutSessionInput | Prisma.StudentUpdateManyWithWhereWithoutSessionInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type StudentCreateNestedManyWithoutDepartmentInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutDepartmentInput, Prisma.StudentUncheckedCreateWithoutDepartmentInput> | Prisma.StudentCreateWithoutDepartmentInput[] | Prisma.StudentUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutDepartmentInput | Prisma.StudentCreateOrConnectWithoutDepartmentInput[]
  createMany?: Prisma.StudentCreateManyDepartmentInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUncheckedCreateNestedManyWithoutDepartmentInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutDepartmentInput, Prisma.StudentUncheckedCreateWithoutDepartmentInput> | Prisma.StudentCreateWithoutDepartmentInput[] | Prisma.StudentUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutDepartmentInput | Prisma.StudentCreateOrConnectWithoutDepartmentInput[]
  createMany?: Prisma.StudentCreateManyDepartmentInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUpdateManyWithoutDepartmentNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutDepartmentInput, Prisma.StudentUncheckedCreateWithoutDepartmentInput> | Prisma.StudentCreateWithoutDepartmentInput[] | Prisma.StudentUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutDepartmentInput | Prisma.StudentCreateOrConnectWithoutDepartmentInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.StudentUpsertWithWhereUniqueWithoutDepartmentInput[]
  createMany?: Prisma.StudentCreateManyDepartmentInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.StudentUpdateWithWhereUniqueWithoutDepartmentInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutDepartmentInput | Prisma.StudentUpdateManyWithWhereWithoutDepartmentInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type StudentUncheckedUpdateManyWithoutDepartmentNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutDepartmentInput, Prisma.StudentUncheckedCreateWithoutDepartmentInput> | Prisma.StudentCreateWithoutDepartmentInput[] | Prisma.StudentUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutDepartmentInput | Prisma.StudentCreateOrConnectWithoutDepartmentInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.StudentUpsertWithWhereUniqueWithoutDepartmentInput[]
  createMany?: Prisma.StudentCreateManyDepartmentInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.StudentUpdateWithWhereUniqueWithoutDepartmentInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutDepartmentInput | Prisma.StudentUpdateManyWithWhereWithoutDepartmentInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type StudentCreateNestedManyWithoutProgramInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutProgramInput, Prisma.StudentUncheckedCreateWithoutProgramInput> | Prisma.StudentCreateWithoutProgramInput[] | Prisma.StudentUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutProgramInput | Prisma.StudentCreateOrConnectWithoutProgramInput[]
  createMany?: Prisma.StudentCreateManyProgramInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUncheckedCreateNestedManyWithoutProgramInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutProgramInput, Prisma.StudentUncheckedCreateWithoutProgramInput> | Prisma.StudentCreateWithoutProgramInput[] | Prisma.StudentUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutProgramInput | Prisma.StudentCreateOrConnectWithoutProgramInput[]
  createMany?: Prisma.StudentCreateManyProgramInputEnvelope
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
}

export type StudentUpdateManyWithoutProgramNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutProgramInput, Prisma.StudentUncheckedCreateWithoutProgramInput> | Prisma.StudentCreateWithoutProgramInput[] | Prisma.StudentUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutProgramInput | Prisma.StudentCreateOrConnectWithoutProgramInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutProgramInput | Prisma.StudentUpsertWithWhereUniqueWithoutProgramInput[]
  createMany?: Prisma.StudentCreateManyProgramInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutProgramInput | Prisma.StudentUpdateWithWhereUniqueWithoutProgramInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutProgramInput | Prisma.StudentUpdateManyWithWhereWithoutProgramInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type StudentUncheckedUpdateManyWithoutProgramNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutProgramInput, Prisma.StudentUncheckedCreateWithoutProgramInput> | Prisma.StudentCreateWithoutProgramInput[] | Prisma.StudentUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutProgramInput | Prisma.StudentCreateOrConnectWithoutProgramInput[]
  upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutProgramInput | Prisma.StudentUpsertWithWhereUniqueWithoutProgramInput[]
  createMany?: Prisma.StudentCreateManyProgramInputEnvelope
  set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[]
  update?: Prisma.StudentUpdateWithWhereUniqueWithoutProgramInput | Prisma.StudentUpdateWithWhereUniqueWithoutProgramInput[]
  updateMany?: Prisma.StudentUpdateManyWithWhereWithoutProgramInput | Prisma.StudentUpdateManyWithWhereWithoutProgramInput[]
  deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
}

export type EnumEnrollmentStatusFieldUpdateOperationsInput = {
  set?: $Enums.EnrollmentStatus
}

export type EnumFeeStatusFieldUpdateOperationsInput = {
  set?: $Enums.FeeStatus
}

export type StudentCreateNestedOneWithoutFeeAssignmentsInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutFeeAssignmentsInput, Prisma.StudentUncheckedCreateWithoutFeeAssignmentsInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutFeeAssignmentsInput
  connect?: Prisma.StudentWhereUniqueInput
}

export type StudentUpdateOneRequiredWithoutFeeAssignmentsNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutFeeAssignmentsInput, Prisma.StudentUncheckedCreateWithoutFeeAssignmentsInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutFeeAssignmentsInput
  upsert?: Prisma.StudentUpsertWithoutFeeAssignmentsInput
  connect?: Prisma.StudentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutFeeAssignmentsInput, Prisma.StudentUpdateWithoutFeeAssignmentsInput>, Prisma.StudentUncheckedUpdateWithoutFeeAssignmentsInput>
}

export type StudentCreateNestedOneWithoutPaymentsInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutPaymentsInput, Prisma.StudentUncheckedCreateWithoutPaymentsInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutPaymentsInput
  connect?: Prisma.StudentWhereUniqueInput
}

export type StudentUpdateOneRequiredWithoutPaymentsNestedInput = {
  create?: Prisma.XOR<Prisma.StudentCreateWithoutPaymentsInput, Prisma.StudentUncheckedCreateWithoutPaymentsInput>
  connectOrCreate?: Prisma.StudentCreateOrConnectWithoutPaymentsInput
  upsert?: Prisma.StudentUpsertWithoutPaymentsInput
  connect?: Prisma.StudentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutPaymentsInput, Prisma.StudentUpdateWithoutPaymentsInput>, Prisma.StudentUncheckedUpdateWithoutPaymentsInput>
}

export type StudentCreateWithoutTenantInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  user: Prisma.UserCreateNestedOneWithoutStudentInput
  session: Prisma.AcademicSessionCreateNestedOneWithoutStudentsInput
  department: Prisma.DepartmentCreateNestedOneWithoutStudentsInput
  program: Prisma.ProgramCreateNestedOneWithoutStudentsInput
  feeAssignments?: Prisma.FeeAssignmentCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateWithoutTenantInput = {
  id?: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentCreateOrConnectWithoutTenantInput = {
  where: Prisma.StudentWhereUniqueInput
  create: Prisma.XOR<Prisma.StudentCreateWithoutTenantInput, Prisma.StudentUncheckedCreateWithoutTenantInput>
}

export type StudentCreateManyTenantInputEnvelope = {
  data: Prisma.StudentCreateManyTenantInput | Prisma.StudentCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type StudentUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.StudentWhereUniqueInput
  update: Prisma.XOR<Prisma.StudentUpdateWithoutTenantInput, Prisma.StudentUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.StudentCreateWithoutTenantInput, Prisma.StudentUncheckedCreateWithoutTenantInput>
}

export type StudentUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.StudentWhereUniqueInput
  data: Prisma.XOR<Prisma.StudentUpdateWithoutTenantInput, Prisma.StudentUncheckedUpdateWithoutTenantInput>
}

export type StudentUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.StudentScalarWhereInput
  data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutTenantInput>
}

export type StudentScalarWhereInput = {
  AND?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
  OR?: Prisma.StudentScalarWhereInput[]
  NOT?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[]
  id?: Prisma.StringFilter<"Student"> | string
  tenantId?: Prisma.StringFilter<"Student"> | string
  userId?: Prisma.StringFilter<"Student"> | string
  studentId?: Prisma.StringFilter<"Student"> | string
  cnic?: Prisma.StringNullableFilter<"Student"> | string | null
  sessionId?: Prisma.StringFilter<"Student"> | string
  departmentId?: Prisma.StringFilter<"Student"> | string
  programId?: Prisma.StringFilter<"Student"> | string
  currentSemester?: Prisma.IntFilter<"Student"> | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFilter<"Student"> | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFilter<"Student"> | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFilter<"Student"> | number
  totalFeePaid?: Prisma.IntFilter<"Student"> | number
  riskLevel?: Prisma.StringFilter<"Student"> | string
  latePaymentCount?: Prisma.IntFilter<"Student"> | number
  lastPaymentDate?: Prisma.DateTimeNullableFilter<"Student"> | Date | string | null
  metadata?: Prisma.JsonNullableFilter<"Student">
  createdAt?: Prisma.DateTimeFilter<"Student"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Student"> | Date | string
}

export type StudentCreateWithoutUserInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutStudentsInput
  session: Prisma.AcademicSessionCreateNestedOneWithoutStudentsInput
  department: Prisma.DepartmentCreateNestedOneWithoutStudentsInput
  program: Prisma.ProgramCreateNestedOneWithoutStudentsInput
  feeAssignments?: Prisma.FeeAssignmentCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateWithoutUserInput = {
  id?: string
  tenantId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentCreateOrConnectWithoutUserInput = {
  where: Prisma.StudentWhereUniqueInput
  create: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>
}

export type StudentUpsertWithoutUserInput = {
  update: Prisma.XOR<Prisma.StudentUpdateWithoutUserInput, Prisma.StudentUncheckedUpdateWithoutUserInput>
  create: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>
  where?: Prisma.StudentWhereInput
}

export type StudentUpdateToOneWithWhereWithoutUserInput = {
  where?: Prisma.StudentWhereInput
  data: Prisma.XOR<Prisma.StudentUpdateWithoutUserInput, Prisma.StudentUncheckedUpdateWithoutUserInput>
}

export type StudentUpdateWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutStudentsNestedInput
  session?: Prisma.AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutStudentsNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutStudentsNestedInput
  feeAssignments?: Prisma.FeeAssignmentUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateWithoutUserInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentCreateWithoutSessionInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutStudentsInput
  user: Prisma.UserCreateNestedOneWithoutStudentInput
  department: Prisma.DepartmentCreateNestedOneWithoutStudentsInput
  program: Prisma.ProgramCreateNestedOneWithoutStudentsInput
  feeAssignments?: Prisma.FeeAssignmentCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateWithoutSessionInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentCreateOrConnectWithoutSessionInput = {
  where: Prisma.StudentWhereUniqueInput
  create: Prisma.XOR<Prisma.StudentCreateWithoutSessionInput, Prisma.StudentUncheckedCreateWithoutSessionInput>
}

export type StudentCreateManySessionInputEnvelope = {
  data: Prisma.StudentCreateManySessionInput | Prisma.StudentCreateManySessionInput[]
  skipDuplicates?: boolean
}

export type StudentUpsertWithWhereUniqueWithoutSessionInput = {
  where: Prisma.StudentWhereUniqueInput
  update: Prisma.XOR<Prisma.StudentUpdateWithoutSessionInput, Prisma.StudentUncheckedUpdateWithoutSessionInput>
  create: Prisma.XOR<Prisma.StudentCreateWithoutSessionInput, Prisma.StudentUncheckedCreateWithoutSessionInput>
}

export type StudentUpdateWithWhereUniqueWithoutSessionInput = {
  where: Prisma.StudentWhereUniqueInput
  data: Prisma.XOR<Prisma.StudentUpdateWithoutSessionInput, Prisma.StudentUncheckedUpdateWithoutSessionInput>
}

export type StudentUpdateManyWithWhereWithoutSessionInput = {
  where: Prisma.StudentScalarWhereInput
  data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutSessionInput>
}

export type StudentCreateWithoutDepartmentInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutStudentsInput
  user: Prisma.UserCreateNestedOneWithoutStudentInput
  session: Prisma.AcademicSessionCreateNestedOneWithoutStudentsInput
  program: Prisma.ProgramCreateNestedOneWithoutStudentsInput
  feeAssignments?: Prisma.FeeAssignmentCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateWithoutDepartmentInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentCreateOrConnectWithoutDepartmentInput = {
  where: Prisma.StudentWhereUniqueInput
  create: Prisma.XOR<Prisma.StudentCreateWithoutDepartmentInput, Prisma.StudentUncheckedCreateWithoutDepartmentInput>
}

export type StudentCreateManyDepartmentInputEnvelope = {
  data: Prisma.StudentCreateManyDepartmentInput | Prisma.StudentCreateManyDepartmentInput[]
  skipDuplicates?: boolean
}

export type StudentUpsertWithWhereUniqueWithoutDepartmentInput = {
  where: Prisma.StudentWhereUniqueInput
  update: Prisma.XOR<Prisma.StudentUpdateWithoutDepartmentInput, Prisma.StudentUncheckedUpdateWithoutDepartmentInput>
  create: Prisma.XOR<Prisma.StudentCreateWithoutDepartmentInput, Prisma.StudentUncheckedCreateWithoutDepartmentInput>
}

export type StudentUpdateWithWhereUniqueWithoutDepartmentInput = {
  where: Prisma.StudentWhereUniqueInput
  data: Prisma.XOR<Prisma.StudentUpdateWithoutDepartmentInput, Prisma.StudentUncheckedUpdateWithoutDepartmentInput>
}

export type StudentUpdateManyWithWhereWithoutDepartmentInput = {
  where: Prisma.StudentScalarWhereInput
  data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutDepartmentInput>
}

export type StudentCreateWithoutProgramInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutStudentsInput
  user: Prisma.UserCreateNestedOneWithoutStudentInput
  session: Prisma.AcademicSessionCreateNestedOneWithoutStudentsInput
  department: Prisma.DepartmentCreateNestedOneWithoutStudentsInput
  feeAssignments?: Prisma.FeeAssignmentCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateWithoutProgramInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentCreateOrConnectWithoutProgramInput = {
  where: Prisma.StudentWhereUniqueInput
  create: Prisma.XOR<Prisma.StudentCreateWithoutProgramInput, Prisma.StudentUncheckedCreateWithoutProgramInput>
}

export type StudentCreateManyProgramInputEnvelope = {
  data: Prisma.StudentCreateManyProgramInput | Prisma.StudentCreateManyProgramInput[]
  skipDuplicates?: boolean
}

export type StudentUpsertWithWhereUniqueWithoutProgramInput = {
  where: Prisma.StudentWhereUniqueInput
  update: Prisma.XOR<Prisma.StudentUpdateWithoutProgramInput, Prisma.StudentUncheckedUpdateWithoutProgramInput>
  create: Prisma.XOR<Prisma.StudentCreateWithoutProgramInput, Prisma.StudentUncheckedCreateWithoutProgramInput>
}

export type StudentUpdateWithWhereUniqueWithoutProgramInput = {
  where: Prisma.StudentWhereUniqueInput
  data: Prisma.XOR<Prisma.StudentUpdateWithoutProgramInput, Prisma.StudentUncheckedUpdateWithoutProgramInput>
}

export type StudentUpdateManyWithWhereWithoutProgramInput = {
  where: Prisma.StudentScalarWhereInput
  data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutProgramInput>
}

export type StudentCreateWithoutFeeAssignmentsInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutStudentsInput
  user: Prisma.UserCreateNestedOneWithoutStudentInput
  session: Prisma.AcademicSessionCreateNestedOneWithoutStudentsInput
  department: Prisma.DepartmentCreateNestedOneWithoutStudentsInput
  program: Prisma.ProgramCreateNestedOneWithoutStudentsInput
  payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateWithoutFeeAssignmentsInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentCreateOrConnectWithoutFeeAssignmentsInput = {
  where: Prisma.StudentWhereUniqueInput
  create: Prisma.XOR<Prisma.StudentCreateWithoutFeeAssignmentsInput, Prisma.StudentUncheckedCreateWithoutFeeAssignmentsInput>
}

export type StudentUpsertWithoutFeeAssignmentsInput = {
  update: Prisma.XOR<Prisma.StudentUpdateWithoutFeeAssignmentsInput, Prisma.StudentUncheckedUpdateWithoutFeeAssignmentsInput>
  create: Prisma.XOR<Prisma.StudentCreateWithoutFeeAssignmentsInput, Prisma.StudentUncheckedCreateWithoutFeeAssignmentsInput>
  where?: Prisma.StudentWhereInput
}

export type StudentUpdateToOneWithWhereWithoutFeeAssignmentsInput = {
  where?: Prisma.StudentWhereInput
  data: Prisma.XOR<Prisma.StudentUpdateWithoutFeeAssignmentsInput, Prisma.StudentUncheckedUpdateWithoutFeeAssignmentsInput>
}

export type StudentUpdateWithoutFeeAssignmentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutStudentsNestedInput
  user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput
  session?: Prisma.AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutStudentsNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutStudentsNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateWithoutFeeAssignmentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentCreateWithoutPaymentsInput = {
  id?: string
  studentId: string
  cnic?: string | null
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutStudentsInput
  user: Prisma.UserCreateNestedOneWithoutStudentInput
  session: Prisma.AcademicSessionCreateNestedOneWithoutStudentsInput
  department: Prisma.DepartmentCreateNestedOneWithoutStudentsInput
  program: Prisma.ProgramCreateNestedOneWithoutStudentsInput
  feeAssignments?: Prisma.FeeAssignmentCreateNestedManyWithoutStudentInput
}

export type StudentUncheckedCreateWithoutPaymentsInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput
}

export type StudentCreateOrConnectWithoutPaymentsInput = {
  where: Prisma.StudentWhereUniqueInput
  create: Prisma.XOR<Prisma.StudentCreateWithoutPaymentsInput, Prisma.StudentUncheckedCreateWithoutPaymentsInput>
}

export type StudentUpsertWithoutPaymentsInput = {
  update: Prisma.XOR<Prisma.StudentUpdateWithoutPaymentsInput, Prisma.StudentUncheckedUpdateWithoutPaymentsInput>
  create: Prisma.XOR<Prisma.StudentCreateWithoutPaymentsInput, Prisma.StudentUncheckedCreateWithoutPaymentsInput>
  where?: Prisma.StudentWhereInput
}

export type StudentUpdateToOneWithWhereWithoutPaymentsInput = {
  where?: Prisma.StudentWhereInput
  data: Prisma.XOR<Prisma.StudentUpdateWithoutPaymentsInput, Prisma.StudentUncheckedUpdateWithoutPaymentsInput>
}

export type StudentUpdateWithoutPaymentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutStudentsNestedInput
  user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput
  session?: Prisma.AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutStudentsNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutStudentsNestedInput
  feeAssignments?: Prisma.FeeAssignmentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateWithoutPaymentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentCreateManyTenantInput = {
  id?: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type StudentUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput
  session?: Prisma.AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutStudentsNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutStudentsNestedInput
  feeAssignments?: Prisma.FeeAssignmentUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type StudentCreateManySessionInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  departmentId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type StudentUpdateWithoutSessionInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutStudentsNestedInput
  user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutStudentsNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutStudentsNestedInput
  feeAssignments?: Prisma.FeeAssignmentUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateWithoutSessionInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateManyWithoutSessionInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type StudentCreateManyDepartmentInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  programId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type StudentUpdateWithoutDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutStudentsNestedInput
  user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput
  session?: Prisma.AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutStudentsNestedInput
  feeAssignments?: Prisma.FeeAssignmentUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateWithoutDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateManyWithoutDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type StudentCreateManyProgramInput = {
  id?: string
  tenantId: string
  userId: string
  studentId: string
  cnic?: string | null
  sessionId: string
  departmentId: string
  currentSemester?: number
  enrollmentStatus?: $Enums.EnrollmentStatus
  feeStatus?: $Enums.FeeStatus
  totalFeeDue?: number
  totalFeePaid?: number
  riskLevel?: string
  latePaymentCount?: number
  lastPaymentDate?: Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type StudentUpdateWithoutProgramInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutStudentsNestedInput
  user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput
  session?: Prisma.AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutStudentsNestedInput
  feeAssignments?: Prisma.FeeAssignmentUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateWithoutProgramInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeAssignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput
}

export type StudentUncheckedUpdateManyWithoutProgramInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  cnic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  sessionId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  currentSemester?: Prisma.IntFieldUpdateOperationsInput | number
  enrollmentStatus?: Prisma.EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
  feeStatus?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  totalFeeDue?: Prisma.IntFieldUpdateOperationsInput | number
  totalFeePaid?: Prisma.IntFieldUpdateOperationsInput | number
  riskLevel?: Prisma.StringFieldUpdateOperationsInput | string
  latePaymentCount?: Prisma.IntFieldUpdateOperationsInput | number
  lastPaymentDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type StudentCountOutputType = {
  feeAssignments: number
  payments: number
}

export type StudentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  feeAssignments?: boolean | StudentCountOutputTypeCountFeeAssignmentsArgs
  payments?: boolean | StudentCountOutputTypeCountPaymentsArgs
}

export type StudentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentCountOutputTypeSelect<ExtArgs> | null
}

export type StudentCountOutputTypeCountFeeAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.FeeAssignmentWhereInput
}

export type StudentCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.PaymentWhereInput
}

export type StudentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  studentId?: boolean
  cnic?: boolean
  sessionId?: boolean
  departmentId?: boolean
  programId?: boolean
  currentSemester?: boolean
  enrollmentStatus?: boolean
  feeStatus?: boolean
  totalFeeDue?: boolean
  totalFeePaid?: boolean
  riskLevel?: boolean
  latePaymentCount?: boolean
  lastPaymentDate?: boolean
  metadata?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  session?: boolean | Prisma.AcademicSessionDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
  feeAssignments?: boolean | Prisma.Student$feeAssignmentsArgs<ExtArgs>
  payments?: boolean | Prisma.Student$paymentsArgs<ExtArgs>
  _count?: boolean | Prisma.StudentCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["student"]>

export type StudentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  studentId?: boolean
  cnic?: boolean
  sessionId?: boolean
  departmentId?: boolean
  programId?: boolean
  currentSemester?: boolean
  enrollmentStatus?: boolean
  feeStatus?: boolean
  totalFeeDue?: boolean
  totalFeePaid?: boolean
  riskLevel?: boolean
  latePaymentCount?: boolean
  lastPaymentDate?: boolean
  metadata?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  session?: boolean | Prisma.AcademicSessionDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}, ExtArgs["result"]["student"]>

export type StudentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  studentId?: boolean
  cnic?: boolean
  sessionId?: boolean
  departmentId?: boolean
  programId?: boolean
  currentSemester?: boolean
  enrollmentStatus?: boolean
  feeStatus?: boolean
  totalFeeDue?: boolean
  totalFeePaid?: boolean
  riskLevel?: boolean
  latePaymentCount?: boolean
  lastPaymentDate?: boolean
  metadata?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  session?: boolean | Prisma.AcademicSessionDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}, ExtArgs["result"]["student"]>

export type StudentSelectScalar = {
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  studentId?: boolean
  cnic?: boolean
  sessionId?: boolean
  departmentId?: boolean
  programId?: boolean
  currentSemester?: boolean
  enrollmentStatus?: boolean
  feeStatus?: boolean
  totalFeeDue?: boolean
  totalFeePaid?: boolean
  riskLevel?: boolean
  latePaymentCount?: boolean
  lastPaymentDate?: boolean
  metadata?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type StudentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "userId" | "studentId" | "cnic" | "sessionId" | "departmentId" | "programId" | "currentSemester" | "enrollmentStatus" | "feeStatus" | "totalFeeDue" | "totalFeePaid" | "riskLevel" | "latePaymentCount" | "lastPaymentDate" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["student"]>
export type StudentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  session?: boolean | Prisma.AcademicSessionDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
  feeAssignments?: boolean | Prisma.Student$feeAssignmentsArgs<ExtArgs>
  payments?: boolean | Prisma.Student$paymentsArgs<ExtArgs>
  _count?: boolean | Prisma.StudentCountOutputTypeDefaultArgs<ExtArgs>
}
export type StudentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  session?: boolean | Prisma.AcademicSessionDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}
export type StudentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  user?: boolean | Prisma.UserDefaultArgs<ExtArgs>
  session?: boolean | Prisma.AcademicSessionDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}

export type $StudentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Student"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    user: Prisma.$UserPayload<ExtArgs>
    session: Prisma.$AcademicSessionPayload<ExtArgs>
    department: Prisma.$DepartmentPayload<ExtArgs>
    program: Prisma.$ProgramPayload<ExtArgs>
    feeAssignments: Prisma.$FeeAssignmentPayload<ExtArgs>[]
    payments: Prisma.$PaymentPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    userId: string
    studentId: string
    cnic: string | null
    sessionId: string
    departmentId: string
    programId: string
    currentSemester: number
    enrollmentStatus: $Enums.EnrollmentStatus
    feeStatus: $Enums.FeeStatus
    totalFeeDue: number
    totalFeePaid: number
    riskLevel: string
    latePaymentCount: number
    lastPaymentDate: Date | null
    metadata: runtime.JsonValue | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["student"]>
  composites: {}
}

export type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudentPayload, S>

export type StudentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudentCountAggregateInputType | true
  }

export interface StudentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    findUnique<T extends StudentFindUniqueArgs>(args: Prisma.SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends StudentFindFirstArgs>(args?: Prisma.SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends StudentFindManyArgs>(args?: Prisma.SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends StudentCreateArgs>(args: Prisma.SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends StudentCreateManyArgs>(args?: Prisma.SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends StudentDeleteArgs>(args: Prisma.SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends StudentUpdateArgs>(args: Prisma.SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends StudentDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends StudentUpdateManyArgs>(args: Prisma.SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends StudentUpsertArgs>(args: Prisma.SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends StudentCountArgs>(
    args?: Prisma.Subset<T, StudentCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], StudentCountAggregateOutputType>
      : number
  >

    aggregate<T extends StudentAggregateArgs>(args: Prisma.Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    groupBy<
    T extends StudentGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: StudentGroupByArgs['orderBy'] }
      : { orderBy?: StudentGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
          ? never
          : P extends string
          ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
          : [
              Error,
              'Field ',
              P,
              ` in "having" needs to be provided in "by"`,
            ]
      }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
      ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
          }[OrderFields]
      : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
          ? never
          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
      }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: StudentFieldRefs;
}

export interface Prisma__StudentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  session<T extends Prisma.AcademicSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  department<T extends Prisma.DepartmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DepartmentDefaultArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  program<T extends Prisma.ProgramDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProgramDefaultArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  feeAssignments<T extends Prisma.Student$feeAssignmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$feeAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  payments<T extends Prisma.Student$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface StudentFieldRefs {
  readonly id: Prisma.FieldRef<"Student", 'String'>
  readonly tenantId: Prisma.FieldRef<"Student", 'String'>
  readonly userId: Prisma.FieldRef<"Student", 'String'>
  readonly studentId: Prisma.FieldRef<"Student", 'String'>
  readonly cnic: Prisma.FieldRef<"Student", 'String'>
  readonly sessionId: Prisma.FieldRef<"Student", 'String'>
  readonly departmentId: Prisma.FieldRef<"Student", 'String'>
  readonly programId: Prisma.FieldRef<"Student", 'String'>
  readonly currentSemester: Prisma.FieldRef<"Student", 'Int'>
  readonly enrollmentStatus: Prisma.FieldRef<"Student", 'EnrollmentStatus'>
  readonly feeStatus: Prisma.FieldRef<"Student", 'FeeStatus'>
  readonly totalFeeDue: Prisma.FieldRef<"Student", 'Int'>
  readonly totalFeePaid: Prisma.FieldRef<"Student", 'Int'>
  readonly riskLevel: Prisma.FieldRef<"Student", 'String'>
  readonly latePaymentCount: Prisma.FieldRef<"Student", 'Int'>
  readonly lastPaymentDate: Prisma.FieldRef<"Student", 'DateTime'>
  readonly metadata: Prisma.FieldRef<"Student", 'Json'>
  readonly createdAt: Prisma.FieldRef<"Student", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Student", 'DateTime'>
}

export type StudentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    where: Prisma.StudentWhereUniqueInput
}

export type StudentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    where: Prisma.StudentWhereUniqueInput
}

export type StudentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    where?: Prisma.StudentWhereInput
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[]
    cursor?: Prisma.StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[]
}

export type StudentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    where?: Prisma.StudentWhereInput
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[]
    cursor?: Prisma.StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[]
}

export type StudentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    where?: Prisma.StudentWhereInput
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[]
    cursor?: Prisma.StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[]
}

export type StudentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.StudentCreateInput, Prisma.StudentUncheckedCreateInput>
}

export type StudentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StudentCreateManyInput | Prisma.StudentCreateManyInput[]
  skipDuplicates?: boolean
}

export type StudentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    data: Prisma.StudentCreateManyInput | Prisma.StudentCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.StudentIncludeCreateManyAndReturn<ExtArgs> | null
}

export type StudentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.StudentUpdateInput, Prisma.StudentUncheckedUpdateInput>
    where: Prisma.StudentWhereUniqueInput
}

export type StudentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyInput>
    where?: Prisma.StudentWhereInput
    limit?: number
}

export type StudentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyInput>
    where?: Prisma.StudentWhereInput
    limit?: number
    include?: Prisma.StudentIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type StudentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    where: Prisma.StudentWhereUniqueInput
    create: Prisma.XOR<Prisma.StudentCreateInput, Prisma.StudentUncheckedCreateInput>
    update: Prisma.XOR<Prisma.StudentUpdateInput, Prisma.StudentUncheckedUpdateInput>
}

export type StudentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
    where: Prisma.StudentWhereUniqueInput
}

export type StudentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentWhereInput
    limit?: number
}

export type Student$feeAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
  where?: Prisma.FeeAssignmentWhereInput
  orderBy?: Prisma.FeeAssignmentOrderByWithRelationInput | Prisma.FeeAssignmentOrderByWithRelationInput[]
  cursor?: Prisma.FeeAssignmentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.FeeAssignmentScalarFieldEnum | Prisma.FeeAssignmentScalarFieldEnum[]
}

export type Student$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
  where?: Prisma.PaymentWhereInput
  orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[]
  cursor?: Prisma.PaymentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[]
}

export type StudentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
}
