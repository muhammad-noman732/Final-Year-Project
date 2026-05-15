
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type PaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentPayload>

export type AggregatePayment = {
  _count: PaymentCountAggregateOutputType | null
  _avg: PaymentAvgAggregateOutputType | null
  _sum: PaymentSumAggregateOutputType | null
  _min: PaymentMinAggregateOutputType | null
  _max: PaymentMaxAggregateOutputType | null
}

export type PaymentAvgAggregateOutputType = {
  amount: number | null
}

export type PaymentSumAggregateOutputType = {
  amount: number | null
}

export type PaymentMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  studentId: string | null
  feeAssignmentId: string | null
  amount: number | null
  method: $Enums.PaymentMethod | null
  status: $Enums.PaymentStatus | null
  stripePaymentIntentId: string | null
  challanNumber: string | null
  challanDueDate: Date | null
  verifiedById: string | null
  verifiedAt: Date | null
  receiptNumber: string | null
  receiptUrl: string | null
  ipAddress: string | null
  userAgent: string | null
  paidAt: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type PaymentMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  studentId: string | null
  feeAssignmentId: string | null
  amount: number | null
  method: $Enums.PaymentMethod | null
  status: $Enums.PaymentStatus | null
  stripePaymentIntentId: string | null
  challanNumber: string | null
  challanDueDate: Date | null
  verifiedById: string | null
  verifiedAt: Date | null
  receiptNumber: string | null
  receiptUrl: string | null
  ipAddress: string | null
  userAgent: string | null
  paidAt: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type PaymentCountAggregateOutputType = {
  id: number
  tenantId: number
  studentId: number
  feeAssignmentId: number
  amount: number
  method: number
  status: number
  stripePaymentIntentId: number
  stripeResponse: number
  challanNumber: number
  challanDueDate: number
  verifiedById: number
  verifiedAt: number
  receiptNumber: number
  receiptUrl: number
  ipAddress: number
  userAgent: number
  paidAt: number
  createdAt: number
  updatedAt: number
  _all: number
}

export type PaymentAvgAggregateInputType = {
  amount?: true
}

export type PaymentSumAggregateInputType = {
  amount?: true
}

export type PaymentMinAggregateInputType = {
  id?: true
  tenantId?: true
  studentId?: true
  feeAssignmentId?: true
  amount?: true
  method?: true
  status?: true
  stripePaymentIntentId?: true
  challanNumber?: true
  challanDueDate?: true
  verifiedById?: true
  verifiedAt?: true
  receiptNumber?: true
  receiptUrl?: true
  ipAddress?: true
  userAgent?: true
  paidAt?: true
  createdAt?: true
  updatedAt?: true
}

export type PaymentMaxAggregateInputType = {
  id?: true
  tenantId?: true
  studentId?: true
  feeAssignmentId?: true
  amount?: true
  method?: true
  status?: true
  stripePaymentIntentId?: true
  challanNumber?: true
  challanDueDate?: true
  verifiedById?: true
  verifiedAt?: true
  receiptNumber?: true
  receiptUrl?: true
  ipAddress?: true
  userAgent?: true
  paidAt?: true
  createdAt?: true
  updatedAt?: true
}

export type PaymentCountAggregateInputType = {
  id?: true
  tenantId?: true
  studentId?: true
  feeAssignmentId?: true
  amount?: true
  method?: true
  status?: true
  stripePaymentIntentId?: true
  stripeResponse?: true
  challanNumber?: true
  challanDueDate?: true
  verifiedById?: true
  verifiedAt?: true
  receiptNumber?: true
  receiptUrl?: true
  ipAddress?: true
  userAgent?: true
  paidAt?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type PaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[]
    cursor?: Prisma.PaymentWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | PaymentCountAggregateInputType
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
}

export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
      [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregatePayment[P]>
    : Prisma.GetScalarType<T[P], AggregatePayment[P]>
}

export type PaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.PaymentWhereInput
  orderBy?: Prisma.PaymentOrderByWithAggregationInput | Prisma.PaymentOrderByWithAggregationInput[]
  by: Prisma.PaymentScalarFieldEnum[] | Prisma.PaymentScalarFieldEnum
  having?: Prisma.PaymentScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: PaymentCountAggregateInputType | true
  _avg?: PaymentAvgAggregateInputType
  _sum?: PaymentSumAggregateInputType
  _min?: PaymentMinAggregateInputType
  _max?: PaymentMaxAggregateInputType
}

export type PaymentGroupByOutputType = {
  id: string
  tenantId: string
  studentId: string
  feeAssignmentId: string
  amount: number
  method: $Enums.PaymentMethod
  status: $Enums.PaymentStatus
  stripePaymentIntentId: string | null
  stripeResponse: runtime.JsonValue | null
  challanNumber: string | null
  challanDueDate: Date | null
  verifiedById: string | null
  verifiedAt: Date | null
  receiptNumber: string
  receiptUrl: string | null
  ipAddress: string | null
  userAgent: string | null
  paidAt: Date | null
  createdAt: Date
  updatedAt: Date
  _count: PaymentCountAggregateOutputType | null
  _avg: PaymentAvgAggregateOutputType | null
  _sum: PaymentSumAggregateOutputType | null
  _min: PaymentMinAggregateOutputType | null
  _max: PaymentMaxAggregateOutputType | null
}

export type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<PaymentGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]>
      }
    >
  >

export type PaymentWhereInput = {
  AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[]
  OR?: Prisma.PaymentWhereInput[]
  NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[]
  id?: Prisma.StringFilter<"Payment"> | string
  tenantId?: Prisma.StringFilter<"Payment"> | string
  studentId?: Prisma.StringFilter<"Payment"> | string
  feeAssignmentId?: Prisma.StringFilter<"Payment"> | string
  amount?: Prisma.IntFilter<"Payment"> | number
  method?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.StringNullableFilter<"Payment"> | string | null
  stripeResponse?: Prisma.JsonNullableFilter<"Payment">
  challanNumber?: Prisma.StringNullableFilter<"Payment"> | string | null
  challanDueDate?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  verifiedById?: Prisma.StringNullableFilter<"Payment"> | string | null
  verifiedAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  receiptNumber?: Prisma.StringFilter<"Payment"> | string
  receiptUrl?: Prisma.StringNullableFilter<"Payment"> | string | null
  ipAddress?: Prisma.StringNullableFilter<"Payment"> | string | null
  userAgent?: Prisma.StringNullableFilter<"Payment"> | string | null
  paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Payment"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  student?: Prisma.XOR<Prisma.StudentScalarRelationFilter, Prisma.StudentWhereInput>
  feeAssignment?: Prisma.XOR<Prisma.FeeAssignmentScalarRelationFilter, Prisma.FeeAssignmentWhereInput>
}

export type PaymentOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeAssignmentId?: Prisma.SortOrder
  amount?: Prisma.SortOrder
  method?: Prisma.SortOrder
  status?: Prisma.SortOrder
  stripePaymentIntentId?: Prisma.SortOrderInput | Prisma.SortOrder
  stripeResponse?: Prisma.SortOrderInput | Prisma.SortOrder
  challanNumber?: Prisma.SortOrderInput | Prisma.SortOrder
  challanDueDate?: Prisma.SortOrderInput | Prisma.SortOrder
  verifiedById?: Prisma.SortOrderInput | Prisma.SortOrder
  verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  receiptNumber?: Prisma.SortOrder
  receiptUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder
  userAgent?: Prisma.SortOrderInput | Prisma.SortOrder
  paidAt?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  student?: Prisma.StudentOrderByWithRelationInput
  feeAssignment?: Prisma.FeeAssignmentOrderByWithRelationInput
}

export type PaymentWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  stripePaymentIntentId?: string
  receiptNumber?: string
  AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[]
  OR?: Prisma.PaymentWhereInput[]
  NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[]
  tenantId?: Prisma.StringFilter<"Payment"> | string
  studentId?: Prisma.StringFilter<"Payment"> | string
  feeAssignmentId?: Prisma.StringFilter<"Payment"> | string
  amount?: Prisma.IntFilter<"Payment"> | number
  method?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
  stripeResponse?: Prisma.JsonNullableFilter<"Payment">
  challanNumber?: Prisma.StringNullableFilter<"Payment"> | string | null
  challanDueDate?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  verifiedById?: Prisma.StringNullableFilter<"Payment"> | string | null
  verifiedAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  receiptUrl?: Prisma.StringNullableFilter<"Payment"> | string | null
  ipAddress?: Prisma.StringNullableFilter<"Payment"> | string | null
  userAgent?: Prisma.StringNullableFilter<"Payment"> | string | null
  paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Payment"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  student?: Prisma.XOR<Prisma.StudentScalarRelationFilter, Prisma.StudentWhereInput>
  feeAssignment?: Prisma.XOR<Prisma.FeeAssignmentScalarRelationFilter, Prisma.FeeAssignmentWhereInput>
}, "id" | "stripePaymentIntentId" | "receiptNumber">

export type PaymentOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeAssignmentId?: Prisma.SortOrder
  amount?: Prisma.SortOrder
  method?: Prisma.SortOrder
  status?: Prisma.SortOrder
  stripePaymentIntentId?: Prisma.SortOrderInput | Prisma.SortOrder
  stripeResponse?: Prisma.SortOrderInput | Prisma.SortOrder
  challanNumber?: Prisma.SortOrderInput | Prisma.SortOrder
  challanDueDate?: Prisma.SortOrderInput | Prisma.SortOrder
  verifiedById?: Prisma.SortOrderInput | Prisma.SortOrder
  verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  receiptNumber?: Prisma.SortOrder
  receiptUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder
  userAgent?: Prisma.SortOrderInput | Prisma.SortOrder
  paidAt?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.PaymentCountOrderByAggregateInput
  _avg?: Prisma.PaymentAvgOrderByAggregateInput
  _max?: Prisma.PaymentMaxOrderByAggregateInput
  _min?: Prisma.PaymentMinOrderByAggregateInput
  _sum?: Prisma.PaymentSumOrderByAggregateInput
}

export type PaymentScalarWhereWithAggregatesInput = {
  AND?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[]
  OR?: Prisma.PaymentScalarWhereWithAggregatesInput[]
  NOT?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Payment"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"Payment"> | string
  studentId?: Prisma.StringWithAggregatesFilter<"Payment"> | string
  feeAssignmentId?: Prisma.StringWithAggregatesFilter<"Payment"> | string
  amount?: Prisma.IntWithAggregatesFilter<"Payment"> | number
  method?: Prisma.EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null
  stripeResponse?: Prisma.JsonNullableWithAggregatesFilter<"Payment">
  challanNumber?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null
  challanDueDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
  verifiedById?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null
  verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
  receiptNumber?: Prisma.StringWithAggregatesFilter<"Payment"> | string
  receiptUrl?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null
  ipAddress?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null
  userAgent?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null
  paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Payment"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Payment"> | Date | string
}

export type PaymentCreateInput = {
  id?: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutPaymentsInput
  student: Prisma.StudentCreateNestedOneWithoutPaymentsInput
  feeAssignment: Prisma.FeeAssignmentCreateNestedOneWithoutPaymentsInput
}

export type PaymentUncheckedCreateInput = {
  id?: string
  tenantId: string
  studentId: string
  feeAssignmentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutPaymentsNestedInput
  student?: Prisma.StudentUpdateOneRequiredWithoutPaymentsNestedInput
  feeAssignment?: Prisma.FeeAssignmentUpdateOneRequiredWithoutPaymentsNestedInput
}

export type PaymentUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeAssignmentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentCreateManyInput = {
  id?: string
  tenantId: string
  studentId: string
  feeAssignmentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeAssignmentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentListRelationFilter = {
  every?: Prisma.PaymentWhereInput
  some?: Prisma.PaymentWhereInput
  none?: Prisma.PaymentWhereInput
}

export type PaymentOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type PaymentCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeAssignmentId?: Prisma.SortOrder
  amount?: Prisma.SortOrder
  method?: Prisma.SortOrder
  status?: Prisma.SortOrder
  stripePaymentIntentId?: Prisma.SortOrder
  stripeResponse?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrder
  challanDueDate?: Prisma.SortOrder
  verifiedById?: Prisma.SortOrder
  verifiedAt?: Prisma.SortOrder
  receiptNumber?: Prisma.SortOrder
  receiptUrl?: Prisma.SortOrder
  ipAddress?: Prisma.SortOrder
  userAgent?: Prisma.SortOrder
  paidAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type PaymentAvgOrderByAggregateInput = {
  amount?: Prisma.SortOrder
}

export type PaymentMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeAssignmentId?: Prisma.SortOrder
  amount?: Prisma.SortOrder
  method?: Prisma.SortOrder
  status?: Prisma.SortOrder
  stripePaymentIntentId?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrder
  challanDueDate?: Prisma.SortOrder
  verifiedById?: Prisma.SortOrder
  verifiedAt?: Prisma.SortOrder
  receiptNumber?: Prisma.SortOrder
  receiptUrl?: Prisma.SortOrder
  ipAddress?: Prisma.SortOrder
  userAgent?: Prisma.SortOrder
  paidAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type PaymentMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  studentId?: Prisma.SortOrder
  feeAssignmentId?: Prisma.SortOrder
  amount?: Prisma.SortOrder
  method?: Prisma.SortOrder
  status?: Prisma.SortOrder
  stripePaymentIntentId?: Prisma.SortOrder
  challanNumber?: Prisma.SortOrder
  challanDueDate?: Prisma.SortOrder
  verifiedById?: Prisma.SortOrder
  verifiedAt?: Prisma.SortOrder
  receiptNumber?: Prisma.SortOrder
  receiptUrl?: Prisma.SortOrder
  ipAddress?: Prisma.SortOrder
  userAgent?: Prisma.SortOrder
  paidAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type PaymentSumOrderByAggregateInput = {
  amount?: Prisma.SortOrder
}

export type PaymentCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutTenantInput, Prisma.PaymentUncheckedCreateWithoutTenantInput> | Prisma.PaymentCreateWithoutTenantInput[] | Prisma.PaymentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutTenantInput | Prisma.PaymentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.PaymentCreateManyTenantInputEnvelope
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
}

export type PaymentUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutTenantInput, Prisma.PaymentUncheckedCreateWithoutTenantInput> | Prisma.PaymentCreateWithoutTenantInput[] | Prisma.PaymentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutTenantInput | Prisma.PaymentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.PaymentCreateManyTenantInputEnvelope
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
}

export type PaymentUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutTenantInput, Prisma.PaymentUncheckedCreateWithoutTenantInput> | Prisma.PaymentCreateWithoutTenantInput[] | Prisma.PaymentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutTenantInput | Prisma.PaymentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutTenantInput | Prisma.PaymentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.PaymentCreateManyTenantInputEnvelope
  set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  update?: Prisma.PaymentUpdateWithWhereUniqueWithoutTenantInput | Prisma.PaymentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutTenantInput | Prisma.PaymentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
}

export type PaymentUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutTenantInput, Prisma.PaymentUncheckedCreateWithoutTenantInput> | Prisma.PaymentCreateWithoutTenantInput[] | Prisma.PaymentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutTenantInput | Prisma.PaymentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutTenantInput | Prisma.PaymentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.PaymentCreateManyTenantInputEnvelope
  set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  update?: Prisma.PaymentUpdateWithWhereUniqueWithoutTenantInput | Prisma.PaymentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutTenantInput | Prisma.PaymentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
}

export type PaymentCreateNestedManyWithoutStudentInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutStudentInput, Prisma.PaymentUncheckedCreateWithoutStudentInput> | Prisma.PaymentCreateWithoutStudentInput[] | Prisma.PaymentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutStudentInput | Prisma.PaymentCreateOrConnectWithoutStudentInput[]
  createMany?: Prisma.PaymentCreateManyStudentInputEnvelope
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
}

export type PaymentUncheckedCreateNestedManyWithoutStudentInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutStudentInput, Prisma.PaymentUncheckedCreateWithoutStudentInput> | Prisma.PaymentCreateWithoutStudentInput[] | Prisma.PaymentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutStudentInput | Prisma.PaymentCreateOrConnectWithoutStudentInput[]
  createMany?: Prisma.PaymentCreateManyStudentInputEnvelope
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
}

export type PaymentUpdateManyWithoutStudentNestedInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutStudentInput, Prisma.PaymentUncheckedCreateWithoutStudentInput> | Prisma.PaymentCreateWithoutStudentInput[] | Prisma.PaymentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutStudentInput | Prisma.PaymentCreateOrConnectWithoutStudentInput[]
  upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutStudentInput | Prisma.PaymentUpsertWithWhereUniqueWithoutStudentInput[]
  createMany?: Prisma.PaymentCreateManyStudentInputEnvelope
  set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  update?: Prisma.PaymentUpdateWithWhereUniqueWithoutStudentInput | Prisma.PaymentUpdateWithWhereUniqueWithoutStudentInput[]
  updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutStudentInput | Prisma.PaymentUpdateManyWithWhereWithoutStudentInput[]
  deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
}

export type PaymentUncheckedUpdateManyWithoutStudentNestedInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutStudentInput, Prisma.PaymentUncheckedCreateWithoutStudentInput> | Prisma.PaymentCreateWithoutStudentInput[] | Prisma.PaymentUncheckedCreateWithoutStudentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutStudentInput | Prisma.PaymentCreateOrConnectWithoutStudentInput[]
  upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutStudentInput | Prisma.PaymentUpsertWithWhereUniqueWithoutStudentInput[]
  createMany?: Prisma.PaymentCreateManyStudentInputEnvelope
  set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  update?: Prisma.PaymentUpdateWithWhereUniqueWithoutStudentInput | Prisma.PaymentUpdateWithWhereUniqueWithoutStudentInput[]
  updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutStudentInput | Prisma.PaymentUpdateManyWithWhereWithoutStudentInput[]
  deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
}

export type PaymentCreateNestedManyWithoutFeeAssignmentInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput> | Prisma.PaymentCreateWithoutFeeAssignmentInput[] | Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput | Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput[]
  createMany?: Prisma.PaymentCreateManyFeeAssignmentInputEnvelope
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
}

export type PaymentUncheckedCreateNestedManyWithoutFeeAssignmentInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput> | Prisma.PaymentCreateWithoutFeeAssignmentInput[] | Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput | Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput[]
  createMany?: Prisma.PaymentCreateManyFeeAssignmentInputEnvelope
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
}

export type PaymentUpdateManyWithoutFeeAssignmentNestedInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput> | Prisma.PaymentCreateWithoutFeeAssignmentInput[] | Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput | Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput[]
  upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutFeeAssignmentInput | Prisma.PaymentUpsertWithWhereUniqueWithoutFeeAssignmentInput[]
  createMany?: Prisma.PaymentCreateManyFeeAssignmentInputEnvelope
  set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  update?: Prisma.PaymentUpdateWithWhereUniqueWithoutFeeAssignmentInput | Prisma.PaymentUpdateWithWhereUniqueWithoutFeeAssignmentInput[]
  updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutFeeAssignmentInput | Prisma.PaymentUpdateManyWithWhereWithoutFeeAssignmentInput[]
  deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
}

export type PaymentUncheckedUpdateManyWithoutFeeAssignmentNestedInput = {
  create?: Prisma.XOR<Prisma.PaymentCreateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput> | Prisma.PaymentCreateWithoutFeeAssignmentInput[] | Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput[]
  connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput | Prisma.PaymentCreateOrConnectWithoutFeeAssignmentInput[]
  upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutFeeAssignmentInput | Prisma.PaymentUpsertWithWhereUniqueWithoutFeeAssignmentInput[]
  createMany?: Prisma.PaymentCreateManyFeeAssignmentInputEnvelope
  set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[]
  update?: Prisma.PaymentUpdateWithWhereUniqueWithoutFeeAssignmentInput | Prisma.PaymentUpdateWithWhereUniqueWithoutFeeAssignmentInput[]
  updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutFeeAssignmentInput | Prisma.PaymentUpdateManyWithWhereWithoutFeeAssignmentInput[]
  deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
}

export type EnumPaymentMethodFieldUpdateOperationsInput = {
  set?: $Enums.PaymentMethod
}

export type EnumPaymentStatusFieldUpdateOperationsInput = {
  set?: $Enums.PaymentStatus
}

export type PaymentCreateWithoutTenantInput = {
  id?: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  student: Prisma.StudentCreateNestedOneWithoutPaymentsInput
  feeAssignment: Prisma.FeeAssignmentCreateNestedOneWithoutPaymentsInput
}

export type PaymentUncheckedCreateWithoutTenantInput = {
  id?: string
  studentId: string
  feeAssignmentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentCreateOrConnectWithoutTenantInput = {
  where: Prisma.PaymentWhereUniqueInput
  create: Prisma.XOR<Prisma.PaymentCreateWithoutTenantInput, Prisma.PaymentUncheckedCreateWithoutTenantInput>
}

export type PaymentCreateManyTenantInputEnvelope = {
  data: Prisma.PaymentCreateManyTenantInput | Prisma.PaymentCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type PaymentUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.PaymentWhereUniqueInput
  update: Prisma.XOR<Prisma.PaymentUpdateWithoutTenantInput, Prisma.PaymentUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.PaymentCreateWithoutTenantInput, Prisma.PaymentUncheckedCreateWithoutTenantInput>
}

export type PaymentUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.PaymentWhereUniqueInput
  data: Prisma.XOR<Prisma.PaymentUpdateWithoutTenantInput, Prisma.PaymentUncheckedUpdateWithoutTenantInput>
}

export type PaymentUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.PaymentScalarWhereInput
  data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutTenantInput>
}

export type PaymentScalarWhereInput = {
  AND?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
  OR?: Prisma.PaymentScalarWhereInput[]
  NOT?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[]
  id?: Prisma.StringFilter<"Payment"> | string
  tenantId?: Prisma.StringFilter<"Payment"> | string
  studentId?: Prisma.StringFilter<"Payment"> | string
  feeAssignmentId?: Prisma.StringFilter<"Payment"> | string
  amount?: Prisma.IntFilter<"Payment"> | number
  method?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.StringNullableFilter<"Payment"> | string | null
  stripeResponse?: Prisma.JsonNullableFilter<"Payment">
  challanNumber?: Prisma.StringNullableFilter<"Payment"> | string | null
  challanDueDate?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  verifiedById?: Prisma.StringNullableFilter<"Payment"> | string | null
  verifiedAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  receiptNumber?: Prisma.StringFilter<"Payment"> | string
  receiptUrl?: Prisma.StringNullableFilter<"Payment"> | string | null
  ipAddress?: Prisma.StringNullableFilter<"Payment"> | string | null
  userAgent?: Prisma.StringNullableFilter<"Payment"> | string | null
  paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Payment"> | Date | string
}

export type PaymentCreateWithoutStudentInput = {
  id?: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutPaymentsInput
  feeAssignment: Prisma.FeeAssignmentCreateNestedOneWithoutPaymentsInput
}

export type PaymentUncheckedCreateWithoutStudentInput = {
  id?: string
  tenantId: string
  feeAssignmentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentCreateOrConnectWithoutStudentInput = {
  where: Prisma.PaymentWhereUniqueInput
  create: Prisma.XOR<Prisma.PaymentCreateWithoutStudentInput, Prisma.PaymentUncheckedCreateWithoutStudentInput>
}

export type PaymentCreateManyStudentInputEnvelope = {
  data: Prisma.PaymentCreateManyStudentInput | Prisma.PaymentCreateManyStudentInput[]
  skipDuplicates?: boolean
}

export type PaymentUpsertWithWhereUniqueWithoutStudentInput = {
  where: Prisma.PaymentWhereUniqueInput
  update: Prisma.XOR<Prisma.PaymentUpdateWithoutStudentInput, Prisma.PaymentUncheckedUpdateWithoutStudentInput>
  create: Prisma.XOR<Prisma.PaymentCreateWithoutStudentInput, Prisma.PaymentUncheckedCreateWithoutStudentInput>
}

export type PaymentUpdateWithWhereUniqueWithoutStudentInput = {
  where: Prisma.PaymentWhereUniqueInput
  data: Prisma.XOR<Prisma.PaymentUpdateWithoutStudentInput, Prisma.PaymentUncheckedUpdateWithoutStudentInput>
}

export type PaymentUpdateManyWithWhereWithoutStudentInput = {
  where: Prisma.PaymentScalarWhereInput
  data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutStudentInput>
}

export type PaymentCreateWithoutFeeAssignmentInput = {
  id?: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutPaymentsInput
  student: Prisma.StudentCreateNestedOneWithoutPaymentsInput
}

export type PaymentUncheckedCreateWithoutFeeAssignmentInput = {
  id?: string
  tenantId: string
  studentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentCreateOrConnectWithoutFeeAssignmentInput = {
  where: Prisma.PaymentWhereUniqueInput
  create: Prisma.XOR<Prisma.PaymentCreateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput>
}

export type PaymentCreateManyFeeAssignmentInputEnvelope = {
  data: Prisma.PaymentCreateManyFeeAssignmentInput | Prisma.PaymentCreateManyFeeAssignmentInput[]
  skipDuplicates?: boolean
}

export type PaymentUpsertWithWhereUniqueWithoutFeeAssignmentInput = {
  where: Prisma.PaymentWhereUniqueInput
  update: Prisma.XOR<Prisma.PaymentUpdateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedUpdateWithoutFeeAssignmentInput>
  create: Prisma.XOR<Prisma.PaymentCreateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedCreateWithoutFeeAssignmentInput>
}

export type PaymentUpdateWithWhereUniqueWithoutFeeAssignmentInput = {
  where: Prisma.PaymentWhereUniqueInput
  data: Prisma.XOR<Prisma.PaymentUpdateWithoutFeeAssignmentInput, Prisma.PaymentUncheckedUpdateWithoutFeeAssignmentInput>
}

export type PaymentUpdateManyWithWhereWithoutFeeAssignmentInput = {
  where: Prisma.PaymentScalarWhereInput
  data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutFeeAssignmentInput>
}

export type PaymentCreateManyTenantInput = {
  id?: string
  studentId: string
  feeAssignmentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  student?: Prisma.StudentUpdateOneRequiredWithoutPaymentsNestedInput
  feeAssignment?: Prisma.FeeAssignmentUpdateOneRequiredWithoutPaymentsNestedInput
}

export type PaymentUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeAssignmentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  feeAssignmentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentCreateManyStudentInput = {
  id?: string
  tenantId: string
  feeAssignmentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentUpdateWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutPaymentsNestedInput
  feeAssignment?: Prisma.FeeAssignmentUpdateOneRequiredWithoutPaymentsNestedInput
}

export type PaymentUncheckedUpdateWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  feeAssignmentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentUncheckedUpdateManyWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  feeAssignmentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentCreateManyFeeAssignmentInput = {
  id?: string
  tenantId: string
  studentId: string
  amount: number
  method: $Enums.PaymentMethod
  status?: $Enums.PaymentStatus
  stripePaymentIntentId?: string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: string | null
  challanDueDate?: Date | string | null
  verifiedById?: string | null
  verifiedAt?: Date | string | null
  receiptNumber: string
  receiptUrl?: string | null
  ipAddress?: string | null
  userAgent?: string | null
  paidAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type PaymentUpdateWithoutFeeAssignmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutPaymentsNestedInput
  student?: Prisma.StudentUpdateOneRequiredWithoutPaymentsNestedInput
}

export type PaymentUncheckedUpdateWithoutFeeAssignmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentUncheckedUpdateManyWithoutFeeAssignmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  studentId?: Prisma.StringFieldUpdateOperationsInput | string
  amount?: Prisma.IntFieldUpdateOperationsInput | number
  method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
  status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  stripePaymentIntentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  stripeResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  challanNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  challanDueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  verifiedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  receiptNumber?: Prisma.StringFieldUpdateOperationsInput | string
  receiptUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type PaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeAssignmentId?: boolean
  amount?: boolean
  method?: boolean
  status?: boolean
  stripePaymentIntentId?: boolean
  stripeResponse?: boolean
  challanNumber?: boolean
  challanDueDate?: boolean
  verifiedById?: boolean
  verifiedAt?: boolean
  receiptNumber?: boolean
  receiptUrl?: boolean
  ipAddress?: boolean
  userAgent?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeAssignment?: boolean | Prisma.FeeAssignmentDefaultArgs<ExtArgs>
}, ExtArgs["result"]["payment"]>

export type PaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeAssignmentId?: boolean
  amount?: boolean
  method?: boolean
  status?: boolean
  stripePaymentIntentId?: boolean
  stripeResponse?: boolean
  challanNumber?: boolean
  challanDueDate?: boolean
  verifiedById?: boolean
  verifiedAt?: boolean
  receiptNumber?: boolean
  receiptUrl?: boolean
  ipAddress?: boolean
  userAgent?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeAssignment?: boolean | Prisma.FeeAssignmentDefaultArgs<ExtArgs>
}, ExtArgs["result"]["payment"]>

export type PaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeAssignmentId?: boolean
  amount?: boolean
  method?: boolean
  status?: boolean
  stripePaymentIntentId?: boolean
  stripeResponse?: boolean
  challanNumber?: boolean
  challanDueDate?: boolean
  verifiedById?: boolean
  verifiedAt?: boolean
  receiptNumber?: boolean
  receiptUrl?: boolean
  ipAddress?: boolean
  userAgent?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeAssignment?: boolean | Prisma.FeeAssignmentDefaultArgs<ExtArgs>
}, ExtArgs["result"]["payment"]>

export type PaymentSelectScalar = {
  id?: boolean
  tenantId?: boolean
  studentId?: boolean
  feeAssignmentId?: boolean
  amount?: boolean
  method?: boolean
  status?: boolean
  stripePaymentIntentId?: boolean
  stripeResponse?: boolean
  challanNumber?: boolean
  challanDueDate?: boolean
  verifiedById?: boolean
  verifiedAt?: boolean
  receiptNumber?: boolean
  receiptUrl?: boolean
  ipAddress?: boolean
  userAgent?: boolean
  paidAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type PaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "studentId" | "feeAssignmentId" | "amount" | "method" | "status" | "stripePaymentIntentId" | "stripeResponse" | "challanNumber" | "challanDueDate" | "verifiedById" | "verifiedAt" | "receiptNumber" | "receiptUrl" | "ipAddress" | "userAgent" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
export type PaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeAssignment?: boolean | Prisma.FeeAssignmentDefaultArgs<ExtArgs>
}
export type PaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeAssignment?: boolean | Prisma.FeeAssignmentDefaultArgs<ExtArgs>
}
export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>
  feeAssignment?: boolean | Prisma.FeeAssignmentDefaultArgs<ExtArgs>
}

export type $PaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Payment"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    student: Prisma.$StudentPayload<ExtArgs>
    feeAssignment: Prisma.$FeeAssignmentPayload<ExtArgs>
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    studentId: string
    feeAssignmentId: string
    amount: number
    method: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    stripePaymentIntentId: string | null
    stripeResponse: runtime.JsonValue | null
    challanNumber: string | null
    challanDueDate: Date | null
    verifiedById: string | null
    verifiedAt: Date | null
    receiptNumber: string
    receiptUrl: string | null
    ipAddress: string | null
    userAgent: string | null
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["payment"]>
  composites: {}
}

export type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentPayload, S>

export type PaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentCountAggregateInputType | true
  }

export interface PaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    findUnique<T extends PaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends PaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends PaymentFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends PaymentCreateArgs>(args: Prisma.SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends PaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends PaymentDeleteArgs>(args: Prisma.SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends PaymentUpdateArgs>(args: Prisma.SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends PaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends PaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends PaymentUpsertArgs>(args: Prisma.SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends PaymentCountArgs>(
    args?: Prisma.Subset<T, PaymentCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], PaymentCountAggregateOutputType>
      : number
  >

    aggregate<T extends PaymentAggregateArgs>(args: Prisma.Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    groupBy<
    T extends PaymentGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: PaymentGroupByArgs['orderBy'] }
      : { orderBy?: PaymentGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: PaymentFieldRefs;
}

export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  student<T extends Prisma.StudentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudentDefaultArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  feeAssignment<T extends Prisma.FeeAssignmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeeAssignmentDefaultArgs<ExtArgs>>): Prisma.Prisma__FeeAssignmentClient<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface PaymentFieldRefs {
  readonly id: Prisma.FieldRef<"Payment", 'String'>
  readonly tenantId: Prisma.FieldRef<"Payment", 'String'>
  readonly studentId: Prisma.FieldRef<"Payment", 'String'>
  readonly feeAssignmentId: Prisma.FieldRef<"Payment", 'String'>
  readonly amount: Prisma.FieldRef<"Payment", 'Int'>
  readonly method: Prisma.FieldRef<"Payment", 'PaymentMethod'>
  readonly status: Prisma.FieldRef<"Payment", 'PaymentStatus'>
  readonly stripePaymentIntentId: Prisma.FieldRef<"Payment", 'String'>
  readonly stripeResponse: Prisma.FieldRef<"Payment", 'Json'>
  readonly challanNumber: Prisma.FieldRef<"Payment", 'String'>
  readonly challanDueDate: Prisma.FieldRef<"Payment", 'DateTime'>
  readonly verifiedById: Prisma.FieldRef<"Payment", 'String'>
  readonly verifiedAt: Prisma.FieldRef<"Payment", 'DateTime'>
  readonly receiptNumber: Prisma.FieldRef<"Payment", 'String'>
  readonly receiptUrl: Prisma.FieldRef<"Payment", 'String'>
  readonly ipAddress: Prisma.FieldRef<"Payment", 'String'>
  readonly userAgent: Prisma.FieldRef<"Payment", 'String'>
  readonly paidAt: Prisma.FieldRef<"Payment", 'DateTime'>
  readonly createdAt: Prisma.FieldRef<"Payment", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Payment", 'DateTime'>
}

export type PaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
    where: Prisma.PaymentWhereUniqueInput
}

export type PaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
    where: Prisma.PaymentWhereUniqueInput
}

export type PaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type PaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type PaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type PaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>
}

export type PaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[]
  skipDuplicates?: boolean
}

export type PaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.PaymentIncludeCreateManyAndReturn<ExtArgs> | null
}

export type PaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>
    where: Prisma.PaymentWhereUniqueInput
}

export type PaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>
    where?: Prisma.PaymentWhereInput
    limit?: number
}

export type PaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>
    where?: Prisma.PaymentWhereInput
    limit?: number
    include?: Prisma.PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type PaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
    where: Prisma.PaymentWhereUniqueInput
    create: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>
    update: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>
}

export type PaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
    where: Prisma.PaymentWhereUniqueInput
}

export type PaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput
    limit?: number
}

export type PaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null
    omit?: Prisma.PaymentOmit<ExtArgs> | null
    include?: Prisma.PaymentInclude<ExtArgs> | null
}
