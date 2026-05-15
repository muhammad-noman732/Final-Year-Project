
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type FeeAssignmentModel = runtime.Types.Result.DefaultSelection<Prisma.$FeeAssignmentPayload>

export type AggregateFeeAssignment = {
  _count: FeeAssignmentCountAggregateOutputType | null
  _avg: FeeAssignmentAvgAggregateOutputType | null
  _sum: FeeAssignmentSumAggregateOutputType | null
  _min: FeeAssignmentMinAggregateOutputType | null
  _max: FeeAssignmentMaxAggregateOutputType | null
}

export type FeeAssignmentAvgAggregateOutputType = {
  amountDue: number | null
  amountPaid: number | null
  lateFeeApplied: number | null
  discountApplied: number | null
}

export type FeeAssignmentSumAggregateOutputType = {
  amountDue: number | null
  amountPaid: number | null
  lateFeeApplied: number | null
  discountApplied: number | null
}

export type FeeAssignmentMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  studentId: string | null
  feeStructureId: string | null
  amountDue: number | null
  amountPaid: number | null
  lateFeeApplied: number | null
  discountApplied: number | null
  status: $Enums.FeeStatus | null
  dueDate: Date | null
  challanNumber: string | null
  challanUrl: string | null
  paidAt: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type FeeAssignmentMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  studentId: string | null
  feeStructureId: string | null
  amountDue: number | null
  amountPaid: number | null
  lateFeeApplied: number | null
  discountApplied: number | null
  status: $Enums.FeeStatus | null
  dueDate: Date | null
  challanNumber: string | null
  challanUrl: string | null
  paidAt: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type FeeAssignmentCountAggregateOutputType = {
  id: number
  tenantId: number
  studentId: number
  feeStructureId: number
  amountDue: number
  amountPaid: number
  lateFeeApplied: number
  discountApplied: number
  status: number
  dueDate: number
  challanNumber: number
  challanUrl: number
  paidAt: number
  createdAt: number
  updatedAt: number
  _all: number
}

export type FeeAssignmentAvgAggregateInputType = {
  amountDue?: true
  amountPaid?: true
  lateFeeApplied?: true
  discountApplied?: true
}

export type FeeAssignmentSumAggregateInputType = {
  amountDue?: true
  amountPaid?: true
  lateFeeApplied?: true
  discountApplied?: true
}

export type FeeAssignmentMinAggregateInputType = {
  id?: true
  tenantId?: true
  studentId?: true
  feeStructureId?: true
  amountDue?: true
  amountPaid?: true
  lateFeeApplied?: true
  discountApplied?: true
  status?: true
  dueDate?: true
  challanNumber?: true
  challanUrl?: true
  paidAt?: true
  createdAt?: true
  updatedAt?: true
}

export type FeeAssignmentMaxAggregateInputType = {
  id?: true
  tenantId?: true
  studentId?: true
  feeStructureId?: true
  amountDue?: true
  amountPaid?: true
  lateFeeApplied?: true
  discountApplied?: true
  status?: true
  dueDate?: true
  challanNumber?: true
  challanUrl?: true
  paidAt?: true
  createdAt?: true
  updatedAt?: true
}

export type FeeAssignmentCountAggregateInputType = {
  id?: true
  tenantId?: true
  studentId?: true
  feeStructureId?: true
  amountDue?: true
  amountPaid?: true
  lateFeeApplied?: true
  discountApplied?: true
  status?: true
  dueDate?: true
  challanNumber?: true
  challanUrl?: true
  paidAt?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type FeeAssignmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeeAssignmentWhereInput
    orderBy?: Prisma.FeeAssignmentOrderByWithRelationInput | Prisma.FeeAssignmentOrderByWithRelationInput[]
    cursor?: Prisma.FeeAssignmentWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | FeeAssignmentCountAggregateInputType
    _avg?: FeeAssignmentAvgAggregateInputType
    _sum?: FeeAssignmentSumAggregateInputType
    _min?: FeeAssignmentMinAggregateInputType
    _max?: FeeAssignmentMaxAggregateInputType
}

export type GetFeeAssignmentAggregateType<T extends FeeAssignmentAggregateArgs> = {
      [P in keyof T & keyof AggregateFeeAssignment]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateFeeAssignment[P]>
    : Prisma.GetScalarType<T[P], AggregateFeeAssignment[P]>
}

export type FeeAssignmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.FeeAssignmentWhereInput
  orderBy?: Prisma.FeeAssignmentOrderByWithAggregationInput | Prisma.FeeAssignmentOrderByWithAggregationInput[]
  by: Prisma.FeeAssignmentScalarFieldEnum[] | Prisma.FeeAssignmentScalarFieldEnum
  having?: Prisma.FeeAssignmentScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: FeeAssignmentCountAggregateInputType | true
  _avg?: FeeAssignmentAvgAggregateInputType
  _sum?: FeeAssignmentSumAggregateInputType
  _min?: FeeAssignmentMinAggregateInputType
  _max?: FeeAssignmentMaxAggregateInputType
}

export type FeeAssignmentGroupByOutputType = {
  id: string
  tenantId: string
  studentId: string
  feeStructureId: string
  amountDue: number
  amountPaid: number
  lateFeeApplied: number
  discountApplied: number
  status: $Enums.FeeStatus
  dueDate: Date
  challanNumber: string | null
  challanUrl: string | null
  paidAt: Date | null
  createdAt: Date
  updatedAt: Date
  _count: FeeAssignmentCountAggregateOutputType | null
  _avg: FeeAssignmentAvgAggregateOutputType | null
  _sum: FeeAssignmentSumAggregateOutputType | null
  _min: FeeAssignmentMinAggregateOutputType | null
  _max: FeeAssignmentMaxAggregateOutputType | null
}

export type GetFeeAssignmentGroupByPayload<T extends FeeAssignmentGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<FeeAssignmentGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof FeeAssignmentGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], FeeAssignmentGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], FeeAssignmentGroupByOutputType[P]>
      }
    >
  >

export type FeeAssignmentWhereInput = {
  AND?: Prisma.FeeAssignmentWhereInput | Prisma.FeeAssignmentWhereInput[]
  OR?: Prisma.FeeAssignmentWhereInput[]
  NOT?: Prisma.FeeAssignmentWhereInput | Prisma.FeeAssignmentWhereInput[]
  id?: Prisma.StringFilter<"FeeAssignment"> | string
  tenantId?: Prisma.StringFilter<"FeeAssignment"> | string
  studentId?: Prisma.StringFilter<"FeeAssignment"> | string
  feeStructureId?: Prisma.StringFilter<"FeeAssignment"> | string
  amountDue?: Prisma.IntFilter<"FeeAssignment"> | number
  amountPaid?: Prisma.IntFilter<"FeeAssignment"> | number
  lateFeeApplied?: Prisma.IntFilter<"FeeAssignment"> | number
  discountApplied?: Prisma.IntFilter<"FeeAssignment"> | number
  status?: Prisma.EnumFeeStatusFilter<"FeeAssignment"> | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  challanNumber?: Prisma.StringNullableFilter<"FeeAssignment"> | string | null
  challanUrl?: Prisma.StringNullableFilter<"FeeAssignment"> | string | null
  paidAt?: Prisma.DateTimeNullableFilter<"FeeAssignment"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  student?: Prisma.XOR<Prisma.StudentScalarRelationFilter, Prisma.StudentWhereInput>
  feeStructure?: Prisma.XOR<Prisma.FeeStructureScalarRelationFilter, Prisma.FeeStructureWhereInput>
  payments?: Prisma.PaymentListRelationFilter
}

export type FeeAssignmentOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeStructureId?: Prisma.SortOrder
  amountDue?: Prisma.SortOrder
  amountPaid?: Prisma.SortOrder
  lateFeeApplied?: Prisma.SortOrder
  discountApplied?: Prisma.SortOrder
  status?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrderInput | Prisma.SortOrder
  challanUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  paidAt?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  student?: Prisma.StudentOrderByWithRelationInput
  feeStructure?: Prisma.FeeStructureOrderByWithRelationInput
  payments?: Prisma.PaymentOrderByRelationAggregateInput
}

export type FeeAssignmentWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  challanNumber?: string
  studentId_feeStructureId?: Prisma.FeeAssignmentStudentIdFeeStructureIdCompoundUniqueInput
  AND?: Prisma.FeeAssignmentWhereInput | Prisma.FeeAssignmentWhereInput[]
  OR?: Prisma.FeeAssignmentWhereInput[]
  NOT?: Prisma.FeeAssignmentWhereInput | Prisma.FeeAssignmentWhereInput[]
  tenantId?: Prisma.StringFilter<"FeeAssignment"> | string
  studentId?: Prisma.StringFilter<"FeeAssignment"> | string
  feeStructureId?: Prisma.StringFilter<"FeeAssignment"> | string
  amountDue?: Prisma.IntFilter<"FeeAssignment"> | number
  amountPaid?: Prisma.IntFilter<"FeeAssignment"> | number
  lateFeeApplied?: Prisma.IntFilter<"FeeAssignment"> | number
  discountApplied?: Prisma.IntFilter<"FeeAssignment"> | number
  status?: Prisma.EnumFeeStatusFilter<"FeeAssignment"> | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  challanUrl?: Prisma.StringNullableFilter<"FeeAssignment"> | string | null
  paidAt?: Prisma.DateTimeNullableFilter<"FeeAssignment"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  student?: Prisma.XOR<Prisma.StudentScalarRelationFilter, Prisma.StudentWhereInput>
  feeStructure?: Prisma.XOR<Prisma.FeeStructureScalarRelationFilter, Prisma.FeeStructureWhereInput>
  payments?: Prisma.PaymentListRelationFilter
}, "id" | "challanNumber" | "studentId_feeStructureId">

export type FeeAssignmentOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeStructureId?: Prisma.SortOrder
  amountDue?: Prisma.SortOrder
  amountPaid?: Prisma.SortOrder
  lateFeeApplied?: Prisma.SortOrder
  discountApplied?: Prisma.SortOrder
  status?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrderInput | Prisma.SortOrder
  challanUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  paidAt?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.FeeAssignmentCountOrderByAggregateInput
  _avg?: Prisma.FeeAssignmentAvgOrderByAggregateInput
  _max?: Prisma.FeeAssignmentMaxOrderByAggregateInput
  _min?: Prisma.FeeAssignmentMinOrderByAggregateInput
  _sum?: Prisma.FeeAssignmentSumOrderByAggregateInput
}

export type FeeAssignmentScalarWhereWithAggregatesInput = {
  AND?: Prisma.FeeAssignmentScalarWhereWithAggregatesInput | Prisma.FeeAssignmentScalarWhereWithAggregatesInput[]
  OR?: Prisma.FeeAssignmentScalarWhereWithAggregatesInput[]
  NOT?: Prisma.FeeAssignmentScalarWhereWithAggregatesInput | Prisma.FeeAssignmentScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"FeeAssignment"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"FeeAssignment"> | string
  studentId?: Prisma.StringWithAggregatesFilter<"FeeAssignment"> | string
  feeStructureId?: Prisma.StringWithAggregatesFilter<"FeeAssignment"> | string
  amountDue?: Prisma.IntWithAggregatesFilter<"FeeAssignment"> | number
  amountPaid?: Prisma.IntWithAggregatesFilter<"FeeAssignment"> | number
  lateFeeApplied?: Prisma.IntWithAggregatesFilter<"FeeAssignment"> | number
  discountApplied?: Prisma.IntWithAggregatesFilter<"FeeAssignment"> | number
  status?: Prisma.EnumFeeStatusWithAggregatesFilter<"FeeAssignment"> | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeWithAggregatesFilter<"FeeAssignment"> | Date | string
  challanNumber?: Prisma.StringNullableWithAggregatesFilter<"FeeAssignment"> | string | null
  challanUrl?: Prisma.StringNullableWithAggregatesFilter<"FeeAssignment"> | string | null
  paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FeeAssignment"> | Date | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"FeeAssignment"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FeeAssignment"> | Date | string
}

export type FeeAssignmentCreateInput = {
  id?: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutFeeAssignmentsInput
  student: Prisma.StudentCreateNestedOneWithoutFeeAssignmentsInput
  feeStructure: Prisma.FeeStructureCreateNestedOneWithoutAssignmentsInput
  payments?: Prisma.PaymentCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentUncheckedCreateInput = {
  id?: string
  tenantId: string
  studentId: string
  feeStructureId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  student?: Prisma.StudentUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  feeStructure?: Prisma.FeeStructureUpdateOneRequiredWithoutAssignmentsNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeStructureId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentCreateManyInput = {
  id?: string
  tenantId: string
  studentId: string
  feeStructureId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeAssignmentUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeAssignmentUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeStructureId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeAssignmentListRelationFilter = {
  every?: Prisma.FeeAssignmentWhereInput
  some?: Prisma.FeeAssignmentWhereInput
  none?: Prisma.FeeAssignmentWhereInput
}

export type FeeAssignmentOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type FeeAssignmentStudentIdFeeStructureIdCompoundUniqueInput = {
  studentId: string
  feeStructureId: string
}

export type FeeAssignmentCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeStructureId?: Prisma.SortOrder
  amountDue?: Prisma.SortOrder
  amountPaid?: Prisma.SortOrder
  lateFeeApplied?: Prisma.SortOrder
  discountApplied?: Prisma.SortOrder
  status?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrder
  challanUrl?: Prisma.SortOrder
  paidAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type FeeAssignmentAvgOrderByAggregateInput = {
  amountDue?: Prisma.SortOrder
  amountPaid?: Prisma.SortOrder
  lateFeeApplied?: Prisma.SortOrder
  discountApplied?: Prisma.SortOrder
}

export type FeeAssignmentMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeStructureId?: Prisma.SortOrder
  amountDue?: Prisma.SortOrder
  amountPaid?: Prisma.SortOrder
  lateFeeApplied?: Prisma.SortOrder
  discountApplied?: Prisma.SortOrder
  status?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrder
  challanUrl?: Prisma.SortOrder
  paidAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type FeeAssignmentMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeStructureId?: Prisma.SortOrder
  amountDue?: Prisma.SortOrder
  amountPaid?: Prisma.SortOrder
  lateFeeApplied?: Prisma.SortOrder
  discountApplied?: Prisma.SortOrder
  status?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrder
  challanUrl?: Prisma.SortOrder
  paidAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type FeeAssignmentSumOrderByAggregateInput = {
  amountDue?: Prisma.SortOrder
  amountPaid?: Prisma.SortOrder
  lateFeeApplied?: Prisma.SortOrder
  discountApplied?: Prisma.SortOrder
}

export type FeeAssignmentScalarRelationFilter = {
  is?: Prisma.FeeAssignmentWhereInput
  isNot?: Prisma.FeeAssignmentWhereInput
}

export type FeeAssignmentCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutTenantInput, Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput> | Prisma.FeeAssignmentCreateWithoutTenantInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput | Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.FeeAssignmentCreateManyTenantInputEnvelope
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
}

export type FeeAssignmentUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutTenantInput, Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput> | Prisma.FeeAssignmentCreateWithoutTenantInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput | Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.FeeAssignmentCreateManyTenantInputEnvelope
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
}

export type FeeAssignmentUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutTenantInput, Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput> | Prisma.FeeAssignmentCreateWithoutTenantInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput | Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutTenantInput | Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.FeeAssignmentCreateManyTenantInputEnvelope
  set?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  disconnect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  delete?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  update?: Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutTenantInput | Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.FeeAssignmentUpdateManyWithWhereWithoutTenantInput | Prisma.FeeAssignmentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
}

export type FeeAssignmentUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutTenantInput, Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput> | Prisma.FeeAssignmentCreateWithoutTenantInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput | Prisma.FeeAssignmentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutTenantInput | Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.FeeAssignmentCreateManyTenantInputEnvelope
  set?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  disconnect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  delete?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  update?: Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutTenantInput | Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.FeeAssignmentUpdateManyWithWhereWithoutTenantInput | Prisma.FeeAssignmentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
}

export type FeeAssignmentCreateNestedManyWithoutStudentInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutStudentInput, Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput> | Prisma.FeeAssignmentCreateWithoutStudentInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput | Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput[]
  createMany?: Prisma.FeeAssignmentCreateManyStudentInputEnvelope
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
}

export type FeeAssignmentUncheckedCreateNestedManyWithoutStudentInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutStudentInput, Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput> | Prisma.FeeAssignmentCreateWithoutStudentInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput | Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput[]
  createMany?: Prisma.FeeAssignmentCreateManyStudentInputEnvelope
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
}

export type FeeAssignmentUpdateManyWithoutStudentNestedInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutStudentInput, Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput> | Prisma.FeeAssignmentCreateWithoutStudentInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput | Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput[]
  upsert?: Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutStudentInput | Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutStudentInput[]
  createMany?: Prisma.FeeAssignmentCreateManyStudentInputEnvelope
  set?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  disconnect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  delete?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  update?: Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutStudentInput | Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutStudentInput[]
  updateMany?: Prisma.FeeAssignmentUpdateManyWithWhereWithoutStudentInput | Prisma.FeeAssignmentUpdateManyWithWhereWithoutStudentInput[]
  deleteMany?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
}

export type FeeAssignmentUncheckedUpdateManyWithoutStudentNestedInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutStudentInput, Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput> | Prisma.FeeAssignmentCreateWithoutStudentInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput | Prisma.FeeAssignmentCreateOrConnectWithoutStudentInput[]
  upsert?: Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutStudentInput | Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutStudentInput[]
  createMany?: Prisma.FeeAssignmentCreateManyStudentInputEnvelope
  set?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  disconnect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  delete?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  update?: Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutStudentInput | Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutStudentInput[]
  updateMany?: Prisma.FeeAssignmentUpdateManyWithWhereWithoutStudentInput | Prisma.FeeAssignmentUpdateManyWithWhereWithoutStudentInput[]
  deleteMany?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
}

export type FeeAssignmentCreateNestedManyWithoutFeeStructureInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput> | Prisma.FeeAssignmentCreateWithoutFeeStructureInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput | Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput[]
  createMany?: Prisma.FeeAssignmentCreateManyFeeStructureInputEnvelope
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
}

export type FeeAssignmentUncheckedCreateNestedManyWithoutFeeStructureInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput> | Prisma.FeeAssignmentCreateWithoutFeeStructureInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput | Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput[]
  createMany?: Prisma.FeeAssignmentCreateManyFeeStructureInputEnvelope
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
}

export type FeeAssignmentUpdateManyWithoutFeeStructureNestedInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput> | Prisma.FeeAssignmentCreateWithoutFeeStructureInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput | Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput[]
  upsert?: Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutFeeStructureInput | Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutFeeStructureInput[]
  createMany?: Prisma.FeeAssignmentCreateManyFeeStructureInputEnvelope
  set?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  disconnect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  delete?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  update?: Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutFeeStructureInput | Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutFeeStructureInput[]
  updateMany?: Prisma.FeeAssignmentUpdateManyWithWhereWithoutFeeStructureInput | Prisma.FeeAssignmentUpdateManyWithWhereWithoutFeeStructureInput[]
  deleteMany?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
}

export type FeeAssignmentUncheckedUpdateManyWithoutFeeStructureNestedInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput> | Prisma.FeeAssignmentCreateWithoutFeeStructureInput[] | Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput[]
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput | Prisma.FeeAssignmentCreateOrConnectWithoutFeeStructureInput[]
  upsert?: Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutFeeStructureInput | Prisma.FeeAssignmentUpsertWithWhereUniqueWithoutFeeStructureInput[]
  createMany?: Prisma.FeeAssignmentCreateManyFeeStructureInputEnvelope
  set?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  disconnect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  delete?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  connect?: Prisma.FeeAssignmentWhereUniqueInput | Prisma.FeeAssignmentWhereUniqueInput[]
  update?: Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutFeeStructureInput | Prisma.FeeAssignmentUpdateWithWhereUniqueWithoutFeeStructureInput[]
  updateMany?: Prisma.FeeAssignmentUpdateManyWithWhereWithoutFeeStructureInput | Prisma.FeeAssignmentUpdateManyWithWhereWithoutFeeStructureInput[]
  deleteMany?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
}

export type FeeAssignmentCreateNestedOneWithoutPaymentsInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutPaymentsInput, Prisma.FeeAssignmentUncheckedCreateWithoutPaymentsInput>
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutPaymentsInput
  connect?: Prisma.FeeAssignmentWhereUniqueInput
}

export type FeeAssignmentUpdateOneRequiredWithoutPaymentsNestedInput = {
  create?: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutPaymentsInput, Prisma.FeeAssignmentUncheckedCreateWithoutPaymentsInput>
  connectOrCreate?: Prisma.FeeAssignmentCreateOrConnectWithoutPaymentsInput
  upsert?: Prisma.FeeAssignmentUpsertWithoutPaymentsInput
  connect?: Prisma.FeeAssignmentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.FeeAssignmentUpdateToOneWithWhereWithoutPaymentsInput, Prisma.FeeAssignmentUpdateWithoutPaymentsInput>, Prisma.FeeAssignmentUncheckedUpdateWithoutPaymentsInput>
}

export type FeeAssignmentCreateWithoutTenantInput = {
  id?: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  student: Prisma.StudentCreateNestedOneWithoutFeeAssignmentsInput
  feeStructure: Prisma.FeeStructureCreateNestedOneWithoutAssignmentsInput
  payments?: Prisma.PaymentCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentUncheckedCreateWithoutTenantInput = {
  id?: string
  studentId: string
  feeStructureId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentCreateOrConnectWithoutTenantInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutTenantInput, Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput>
}

export type FeeAssignmentCreateManyTenantInputEnvelope = {
  data: Prisma.FeeAssignmentCreateManyTenantInput | Prisma.FeeAssignmentCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type FeeAssignmentUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  update: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutTenantInput, Prisma.FeeAssignmentUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutTenantInput, Prisma.FeeAssignmentUncheckedCreateWithoutTenantInput>
}

export type FeeAssignmentUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  data: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutTenantInput, Prisma.FeeAssignmentUncheckedUpdateWithoutTenantInput>
}

export type FeeAssignmentUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.FeeAssignmentScalarWhereInput
  data: Prisma.XOR<Prisma.FeeAssignmentUpdateManyMutationInput, Prisma.FeeAssignmentUncheckedUpdateManyWithoutTenantInput>
}

export type FeeAssignmentScalarWhereInput = {
  AND?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
  OR?: Prisma.FeeAssignmentScalarWhereInput[]
  NOT?: Prisma.FeeAssignmentScalarWhereInput | Prisma.FeeAssignmentScalarWhereInput[]
  id?: Prisma.StringFilter<"FeeAssignment"> | string
  tenantId?: Prisma.StringFilter<"FeeAssignment"> | string
  studentId?: Prisma.StringFilter<"FeeAssignment"> | string
  feeStructureId?: Prisma.StringFilter<"FeeAssignment"> | string
  amountDue?: Prisma.IntFilter<"FeeAssignment"> | number
  amountPaid?: Prisma.IntFilter<"FeeAssignment"> | number
  lateFeeApplied?: Prisma.IntFilter<"FeeAssignment"> | number
  discountApplied?: Prisma.IntFilter<"FeeAssignment"> | number
  status?: Prisma.EnumFeeStatusFilter<"FeeAssignment"> | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  challanNumber?: Prisma.StringNullableFilter<"FeeAssignment"> | string | null
  challanUrl?: Prisma.StringNullableFilter<"FeeAssignment"> | string | null
  paidAt?: Prisma.DateTimeNullableFilter<"FeeAssignment"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"FeeAssignment"> | Date | string
}

export type FeeAssignmentCreateWithoutStudentInput = {
  id?: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutFeeAssignmentsInput
  feeStructure: Prisma.FeeStructureCreateNestedOneWithoutAssignmentsInput
  payments?: Prisma.PaymentCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentUncheckedCreateWithoutStudentInput = {
  id?: string
  tenantId: string
  feeStructureId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentCreateOrConnectWithoutStudentInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutStudentInput, Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput>
}

export type FeeAssignmentCreateManyStudentInputEnvelope = {
  data: Prisma.FeeAssignmentCreateManyStudentInput | Prisma.FeeAssignmentCreateManyStudentInput[]
  skipDuplicates?: boolean
}

export type FeeAssignmentUpsertWithWhereUniqueWithoutStudentInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  update: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutStudentInput, Prisma.FeeAssignmentUncheckedUpdateWithoutStudentInput>
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutStudentInput, Prisma.FeeAssignmentUncheckedCreateWithoutStudentInput>
}

export type FeeAssignmentUpdateWithWhereUniqueWithoutStudentInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  data: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutStudentInput, Prisma.FeeAssignmentUncheckedUpdateWithoutStudentInput>
}

export type FeeAssignmentUpdateManyWithWhereWithoutStudentInput = {
  where: Prisma.FeeAssignmentScalarWhereInput
  data: Prisma.XOR<Prisma.FeeAssignmentUpdateManyMutationInput, Prisma.FeeAssignmentUncheckedUpdateManyWithoutStudentInput>
}

export type FeeAssignmentCreateWithoutFeeStructureInput = {
  id?: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutFeeAssignmentsInput
  student: Prisma.StudentCreateNestedOneWithoutFeeAssignmentsInput
  payments?: Prisma.PaymentCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentUncheckedCreateWithoutFeeStructureInput = {
  id?: string
  tenantId: string
  studentId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutFeeAssignmentInput
}

export type FeeAssignmentCreateOrConnectWithoutFeeStructureInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput>
}

export type FeeAssignmentCreateManyFeeStructureInputEnvelope = {
  data: Prisma.FeeAssignmentCreateManyFeeStructureInput | Prisma.FeeAssignmentCreateManyFeeStructureInput[]
  skipDuplicates?: boolean
}

export type FeeAssignmentUpsertWithWhereUniqueWithoutFeeStructureInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  update: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedUpdateWithoutFeeStructureInput>
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedCreateWithoutFeeStructureInput>
}

export type FeeAssignmentUpdateWithWhereUniqueWithoutFeeStructureInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  data: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutFeeStructureInput, Prisma.FeeAssignmentUncheckedUpdateWithoutFeeStructureInput>
}

export type FeeAssignmentUpdateManyWithWhereWithoutFeeStructureInput = {
  where: Prisma.FeeAssignmentScalarWhereInput
  data: Prisma.XOR<Prisma.FeeAssignmentUpdateManyMutationInput, Prisma.FeeAssignmentUncheckedUpdateManyWithoutFeeStructureInput>
}

export type FeeAssignmentCreateWithoutPaymentsInput = {
  id?: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutFeeAssignmentsInput
  student: Prisma.StudentCreateNestedOneWithoutFeeAssignmentsInput
  feeStructure: Prisma.FeeStructureCreateNestedOneWithoutAssignmentsInput
}

export type FeeAssignmentUncheckedCreateWithoutPaymentsInput = {
  id?: string
  tenantId: string
  studentId: string
  feeStructureId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeAssignmentCreateOrConnectWithoutPaymentsInput = {
  where: Prisma.FeeAssignmentWhereUniqueInput
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutPaymentsInput, Prisma.FeeAssignmentUncheckedCreateWithoutPaymentsInput>
}

export type FeeAssignmentUpsertWithoutPaymentsInput = {
  update: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutPaymentsInput, Prisma.FeeAssignmentUncheckedUpdateWithoutPaymentsInput>
  create: Prisma.XOR<Prisma.FeeAssignmentCreateWithoutPaymentsInput, Prisma.FeeAssignmentUncheckedCreateWithoutPaymentsInput>
  where?: Prisma.FeeAssignmentWhereInput
}

export type FeeAssignmentUpdateToOneWithWhereWithoutPaymentsInput = {
  where?: Prisma.FeeAssignmentWhereInput
  data: Prisma.XOR<Prisma.FeeAssignmentUpdateWithoutPaymentsInput, Prisma.FeeAssignmentUncheckedUpdateWithoutPaymentsInput>
}

export type FeeAssignmentUpdateWithoutPaymentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  student?: Prisma.StudentUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  feeStructure?: Prisma.FeeStructureUpdateOneRequiredWithoutAssignmentsNestedInput
}

export type FeeAssignmentUncheckedUpdateWithoutPaymentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeStructureId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeAssignmentCreateManyTenantInput = {
  id?: string
  studentId: string
  feeStructureId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeAssignmentUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  student?: Prisma.StudentUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  feeStructure?: Prisma.FeeStructureUpdateOneRequiredWithoutAssignmentsNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeStructureId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeStructureId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeAssignmentCreateManyStudentInput = {
  id?: string
  tenantId: string
  feeStructureId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeAssignmentUpdateWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  feeStructure?: Prisma.FeeStructureUpdateOneRequiredWithoutAssignmentsNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentUncheckedUpdateWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  feeStructureId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentUncheckedUpdateManyWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  feeStructureId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeAssignmentCreateManyFeeStructureInput = {
  id?: string
  tenantId: string
  studentId: string
  amountDue: number
  amountPaid?: number
  lateFeeApplied?: number
  discountApplied?: number
  status?: $Enums.FeeStatus
  dueDate: Date | string
  challanNumber?: string | null
  challanUrl?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeAssignmentUpdateWithoutFeeStructureInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  student?: Prisma.StudentUpdateOneRequiredWithoutFeeAssignmentsNestedInput
  payments?: Prisma.PaymentUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentUncheckedUpdateWithoutFeeStructureInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  payments?: Prisma.PaymentUncheckedUpdateManyWithoutFeeAssignmentNestedInput
}

export type FeeAssignmentUncheckedUpdateManyWithoutFeeStructureInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  amountDue?: Prisma.IntFieldUpdateOperationsInput | number
  amountPaid?: Prisma.IntFieldUpdateOperationsInput | number
  lateFeeApplied?: Prisma.IntFieldUpdateOperationsInput | number
  discountApplied?: Prisma.IntFieldUpdateOperationsInput | number
  status?: Prisma.EnumFeeStatusFieldUpdateOperationsInput | $Enums.FeeStatus
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeAssignmentCountOutputType = {
  payments: number
}

export type FeeAssignmentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  payments?: boolean | FeeAssignmentCountOutputTypeCountPaymentsArgs
}

export type FeeAssignmentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentCountOutputTypeSelect<ExtArgs> | null
}

export type FeeAssignmentCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.PaymentWhereInput
}

export type FeeAssignmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeStructureId?: boolean
  amountDue?: boolean
  amountPaid?: boolean
  lateFeeApplied?: boolean
  discountApplied?: boolean
  status?: boolean
  dueDate?: boolean
  challanNumber?: boolean
  challanUrl?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeStructure?: boolean | Prisma.FeeStructureDefaultArgs<ExtArgs>
  payments?: boolean | Prisma.FeeAssignment$paymentsArgs<ExtArgs>
  _count?: boolean | Prisma.FeeAssignmentCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["feeAssignment"]>

export type FeeAssignmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeStructureId?: boolean
  amountDue?: boolean
  amountPaid?: boolean
  lateFeeApplied?: boolean
  discountApplied?: boolean
  status?: boolean
  dueDate?: boolean
  challanNumber?: boolean
  challanUrl?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeStructure?: boolean | Prisma.FeeStructureDefaultArgs<ExtArgs>
}, ExtArgs["result"]["feeAssignment"]>

export type FeeAssignmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeStructureId?: boolean
  amountDue?: boolean
  amountPaid?: boolean
  lateFeeApplied?: boolean
  discountApplied?: boolean
  status?: boolean
  dueDate?: boolean
  challanNumber?: boolean
  challanUrl?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeStructure?: boolean | Prisma.FeeStructureDefaultArgs<ExtArgs>
}, ExtArgs["result"]["feeAssignment"]>

export type FeeAssignmentSelectScalar = {
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeStructureId?: boolean
  amountDue?: boolean
  amountPaid?: boolean
  lateFeeApplied?: boolean
  discountApplied?: boolean
  status?: boolean
  dueDate?: boolean
  challanNumber?: boolean
  challanUrl?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type FeeAssignmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "studentId" | "feeStructureId" | "amountDue" | "amountPaid" | "lateFeeApplied" | "discountApplied" | "status" | "dueDate" | "challanNumber" | "challanUrl" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["feeAssignment"]>
export type FeeAssignmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeStructure?: boolean | Prisma.FeeStructureDefaultArgs<ExtArgs>
  payments?: boolean | Prisma.FeeAssignment$paymentsArgs<ExtArgs>
  _count?: boolean | Prisma.FeeAssignmentCountOutputTypeDefaultArgs<ExtArgs>
}
export type FeeAssignmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeStructure?: boolean | Prisma.FeeStructureDefaultArgs<ExtArgs>
}
export type FeeAssignmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeStructure?: boolean | Prisma.FeeStructureDefaultArgs<ExtArgs>
}

export type $FeeAssignmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "FeeAssignment"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    student: Prisma.$StudentPayload<ExtArgs>
    feeStructure: Prisma.$FeeStructurePayload<ExtArgs>
    payments: Prisma.$PaymentPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    studentId: string
    feeStructureId: string
    amountDue: number
    amountPaid: number
    lateFeeApplied: number
    discountApplied: number
    status: $Enums.FeeStatus
    dueDate: Date
    challanNumber: string | null
    challanUrl: string | null
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["feeAssignment"]>
  composites: {}
}

export type FeeAssignmentGetPayload<S extends boolean | null | undefined | FeeAssignmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload, S>

export type FeeAssignmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<FeeAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FeeAssignmentCountAggregateInputType | true
  }

export interface FeeAssignmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeeAssignment'], meta: { name: 'FeeAssignment' } }
    findUnique<T extends FeeAssignmentFindUniqueArgs>(args: Prisma.SelectSubset<T, FeeAssignmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends FeeAssignmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FeeAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends FeeAssignmentFindFirstArgs>(args?: Prisma.SelectSubset<T, FeeAssignmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends FeeAssignmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FeeAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends FeeAssignmentFindManyArgs>(args?: Prisma.SelectSubset<T, FeeAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends FeeAssignmentCreateArgs>(args: Prisma.SelectSubset<T, FeeAssignmentCreateArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends FeeAssignmentCreateManyArgs>(args?: Prisma.SelectSubset<T, FeeAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends FeeAssignmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FeeAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends FeeAssignmentDeleteArgs>(args: Prisma.SelectSubset<T, FeeAssignmentDeleteArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends FeeAssignmentUpdateArgs>(args: Prisma.SelectSubset<T, FeeAssignmentUpdateArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends FeeAssignmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, FeeAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends FeeAssignmentUpdateManyArgs>(args: Prisma.SelectSubset<T, FeeAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends FeeAssignmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FeeAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends FeeAssignmentUpsertArgs>(args: Prisma.SelectSubset<T, FeeAssignmentUpsertArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends FeeAssignmentCountArgs>(
    args?: Prisma.Subset<T, FeeAssignmentCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], FeeAssignmentCountAggregateOutputType>
      : number
  >

    aggregate<T extends FeeAssignmentAggregateArgs>(args: Prisma.Subset<T, FeeAssignmentAggregateArgs>): Prisma.PrismaPromise<GetFeeAssignmentAggregateType<T>>

    groupBy<
    T extends FeeAssignmentGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: FeeAssignmentGroupByArgs['orderBy'] }
      : { orderBy?: FeeAssignmentGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, FeeAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeeAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: FeeAssignmentFieldRefs;
}

export interface Prisma__FeeAssignmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  student<T extends Prisma.StudentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudentDefaultArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  feeStructure<T extends Prisma.FeeStructureDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeeStructureDefaultArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  payments<T extends Prisma.FeeAssignment$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeeAssignment$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface FeeAssignmentFieldRefs {
  readonly id: Prisma.FieldRef<"FeeAssignment", 'String'>
  readonly tenantId: Prisma.FieldRef<"FeeAssignment", 'String'>
  readonly studentId: Prisma.FieldRef<"FeeAssignment", 'String'>
  readonly feeStructureId: Prisma.FieldRef<"FeeAssignment", 'String'>
  readonly amountDue: Prisma.FieldRef<"FeeAssignment", 'Int'>
  readonly amountPaid: Prisma.FieldRef<"FeeAssignment", 'Int'>
  readonly lateFeeApplied: Prisma.FieldRef<"FeeAssignment", 'Int'>
  readonly discountApplied: Prisma.FieldRef<"FeeAssignment", 'Int'>
  readonly status: Prisma.FieldRef<"FeeAssignment", 'FeeStatus'>
  readonly dueDate: Prisma.FieldRef<"FeeAssignment", 'DateTime'>
  readonly challanNumber: Prisma.FieldRef<"FeeAssignment", 'String'>
  readonly challanUrl: Prisma.FieldRef<"FeeAssignment", 'String'>
  readonly paidAt: Prisma.FieldRef<"FeeAssignment", 'DateTime'>
  readonly createdAt: Prisma.FieldRef<"FeeAssignment", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"FeeAssignment", 'DateTime'>
}

export type FeeAssignmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
    where: Prisma.FeeAssignmentWhereUniqueInput
}

export type FeeAssignmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
    where: Prisma.FeeAssignmentWhereUniqueInput
}

export type FeeAssignmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeAssignmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeAssignmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeAssignmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.FeeAssignmentCreateInput, Prisma.FeeAssignmentUncheckedCreateInput>
}

export type FeeAssignmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FeeAssignmentCreateManyInput | Prisma.FeeAssignmentCreateManyInput[]
  skipDuplicates?: boolean
}

export type FeeAssignmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    data: Prisma.FeeAssignmentCreateManyInput | Prisma.FeeAssignmentCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.FeeAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
}

export type FeeAssignmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.FeeAssignmentUpdateInput, Prisma.FeeAssignmentUncheckedUpdateInput>
    where: Prisma.FeeAssignmentWhereUniqueInput
}

export type FeeAssignmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FeeAssignmentUpdateManyMutationInput, Prisma.FeeAssignmentUncheckedUpdateManyInput>
    where?: Prisma.FeeAssignmentWhereInput
    limit?: number
}

export type FeeAssignmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.FeeAssignmentUpdateManyMutationInput, Prisma.FeeAssignmentUncheckedUpdateManyInput>
    where?: Prisma.FeeAssignmentWhereInput
    limit?: number
    include?: Prisma.FeeAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type FeeAssignmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
    where: Prisma.FeeAssignmentWhereUniqueInput
    create: Prisma.XOR<Prisma.FeeAssignmentCreateInput, Prisma.FeeAssignmentUncheckedCreateInput>
    update: Prisma.XOR<Prisma.FeeAssignmentUpdateInput, Prisma.FeeAssignmentUncheckedUpdateInput>
}

export type FeeAssignmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
    where: Prisma.FeeAssignmentWhereUniqueInput
}

export type FeeAssignmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeeAssignmentWhereInput
    limit?: number
}

export type FeeAssignment$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeAssignmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeAssignmentSelect<ExtArgs> | null
    omit?: Prisma.FeeAssignmentOmit<ExtArgs> | null
    include?: Prisma.FeeAssignmentInclude<ExtArgs> | null
}
