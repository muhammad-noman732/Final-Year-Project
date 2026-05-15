
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type EmailLogModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailLogPayload>

export type AggregateEmailLog = {
  _count: EmailLogCountAggregateOutputType | null
  _min: EmailLogMinAggregateOutputType | null
  _max: EmailLogMaxAggregateOutputType | null
}

export type EmailLogMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  toEmail: string | null
  toName: string | null
  fromEmail: string | null
  subject: string | null
  templateName: string | null
  status: $Enums.EmailStatus | null
  provider: string | null
  providerId: string | null
  paymentId: string | null
  userId: string | null
  scheduledAt: Date | null
  sentAt: Date | null
  deliveredAt: Date | null
  failedAt: Date | null
  failureReason: string | null
  createdAt: Date | null
}

export type EmailLogMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  toEmail: string | null
  toName: string | null
  fromEmail: string | null
  subject: string | null
  templateName: string | null
  status: $Enums.EmailStatus | null
  provider: string | null
  providerId: string | null
  paymentId: string | null
  userId: string | null
  scheduledAt: Date | null
  sentAt: Date | null
  deliveredAt: Date | null
  failedAt: Date | null
  failureReason: string | null
  createdAt: Date | null
}

export type EmailLogCountAggregateOutputType = {
  id: number
  tenantId: number
  toEmail: number
  toName: number
  fromEmail: number
  subject: number
  templateName: number
  templateData: number
  status: number
  provider: number
  providerId: number
  providerResponse: number
  paymentId: number
  userId: number
  scheduledAt: number
  sentAt: number
  deliveredAt: number
  failedAt: number
  failureReason: number
  createdAt: number
  _all: number
}

export type EmailLogMinAggregateInputType = {
  id?: true
  tenantId?: true
  toEmail?: true
  toName?: true
  fromEmail?: true
  subject?: true
  templateName?: true
  status?: true
  provider?: true
  providerId?: true
  paymentId?: true
  userId?: true
  scheduledAt?: true
  sentAt?: true
  deliveredAt?: true
  failedAt?: true
  failureReason?: true
  createdAt?: true
}

export type EmailLogMaxAggregateInputType = {
  id?: true
  tenantId?: true
  toEmail?: true
  toName?: true
  fromEmail?: true
  subject?: true
  templateName?: true
  status?: true
  provider?: true
  providerId?: true
  paymentId?: true
  userId?: true
  scheduledAt?: true
  sentAt?: true
  deliveredAt?: true
  failedAt?: true
  failureReason?: true
  createdAt?: true
}

export type EmailLogCountAggregateInputType = {
  id?: true
  tenantId?: true
  toEmail?: true
  toName?: true
  fromEmail?: true
  subject?: true
  templateName?: true
  templateData?: true
  status?: true
  provider?: true
  providerId?: true
  providerResponse?: true
  paymentId?: true
  userId?: true
  scheduledAt?: true
  sentAt?: true
  deliveredAt?: true
  failedAt?: true
  failureReason?: true
  createdAt?: true
  _all?: true
}

export type EmailLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[]
    cursor?: Prisma.EmailLogWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | EmailLogCountAggregateInputType
    _min?: EmailLogMinAggregateInputType
    _max?: EmailLogMaxAggregateInputType
}

export type GetEmailLogAggregateType<T extends EmailLogAggregateArgs> = {
      [P in keyof T & keyof AggregateEmailLog]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateEmailLog[P]>
    : Prisma.GetScalarType<T[P], AggregateEmailLog[P]>
}

export type EmailLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.EmailLogWhereInput
  orderBy?: Prisma.EmailLogOrderByWithAggregationInput | Prisma.EmailLogOrderByWithAggregationInput[]
  by: Prisma.EmailLogScalarFieldEnum[] | Prisma.EmailLogScalarFieldEnum
  having?: Prisma.EmailLogScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: EmailLogCountAggregateInputType | true
  _min?: EmailLogMinAggregateInputType
  _max?: EmailLogMaxAggregateInputType
}

export type EmailLogGroupByOutputType = {
  id: string
  tenantId: string | null
  toEmail: string
  toName: string | null
  fromEmail: string
  subject: string
  templateName: string
  templateData: runtime.JsonValue | null
  status: $Enums.EmailStatus
  provider: string
  providerId: string | null
  providerResponse: runtime.JsonValue | null
  paymentId: string | null
  userId: string | null
  scheduledAt: Date | null
  sentAt: Date | null
  deliveredAt: Date | null
  failedAt: Date | null
  failureReason: string | null
  createdAt: Date
  _count: EmailLogCountAggregateOutputType | null
  _min: EmailLogMinAggregateOutputType | null
  _max: EmailLogMaxAggregateOutputType | null
}

export type GetEmailLogGroupByPayload<T extends EmailLogGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<EmailLogGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof EmailLogGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], EmailLogGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], EmailLogGroupByOutputType[P]>
      }
    >
  >

export type EmailLogWhereInput = {
  AND?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[]
  OR?: Prisma.EmailLogWhereInput[]
  NOT?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[]
  id?: Prisma.StringFilter<"EmailLog"> | string
  tenantId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  toEmail?: Prisma.StringFilter<"EmailLog"> | string
  toName?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  fromEmail?: Prisma.StringFilter<"EmailLog"> | string
  subject?: Prisma.StringFilter<"EmailLog"> | string
  templateName?: Prisma.StringFilter<"EmailLog"> | string
  templateData?: Prisma.JsonNullableFilter<"EmailLog">
  status?: Prisma.EnumEmailStatusFilter<"EmailLog"> | $Enums.EmailStatus
  provider?: Prisma.StringFilter<"EmailLog"> | string
  providerId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  providerResponse?: Prisma.JsonNullableFilter<"EmailLog">
  paymentId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  userId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  scheduledAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  sentAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  deliveredAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  failedAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  failureReason?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  createdAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantNullableScalarRelationFilter, Prisma.TenantWhereInput> | null
}

export type EmailLogOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrderInput | Prisma.SortOrder
  toEmail?: Prisma.SortOrder
  toName?: Prisma.SortOrderInput | Prisma.SortOrder
  fromEmail?: Prisma.SortOrder
  subject?: Prisma.SortOrder
  templateName?: Prisma.SortOrder
  templateData?: Prisma.SortOrderInput | Prisma.SortOrder
  status?: Prisma.SortOrder
  provider?: Prisma.SortOrder
  providerId?: Prisma.SortOrderInput | Prisma.SortOrder
  providerResponse?: Prisma.SortOrderInput | Prisma.SortOrder
  paymentId?: Prisma.SortOrderInput | Prisma.SortOrder
  userId?: Prisma.SortOrderInput | Prisma.SortOrder
  scheduledAt?: Prisma.SortOrderInput | Prisma.SortOrder
  sentAt?: Prisma.SortOrderInput | Prisma.SortOrder
  deliveredAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failureReason?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
}

export type EmailLogWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  providerId?: string
  AND?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[]
  OR?: Prisma.EmailLogWhereInput[]
  NOT?: Prisma.EmailLogWhereInput | Prisma.EmailLogWhereInput[]
  tenantId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  toEmail?: Prisma.StringFilter<"EmailLog"> | string
  toName?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  fromEmail?: Prisma.StringFilter<"EmailLog"> | string
  subject?: Prisma.StringFilter<"EmailLog"> | string
  templateName?: Prisma.StringFilter<"EmailLog"> | string
  templateData?: Prisma.JsonNullableFilter<"EmailLog">
  status?: Prisma.EnumEmailStatusFilter<"EmailLog"> | $Enums.EmailStatus
  provider?: Prisma.StringFilter<"EmailLog"> | string
  providerResponse?: Prisma.JsonNullableFilter<"EmailLog">
  paymentId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  userId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  scheduledAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  sentAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  deliveredAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  failedAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  failureReason?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  createdAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantNullableScalarRelationFilter, Prisma.TenantWhereInput> | null
}, "id" | "providerId">

export type EmailLogOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrderInput | Prisma.SortOrder
  toEmail?: Prisma.SortOrder
  toName?: Prisma.SortOrderInput | Prisma.SortOrder
  fromEmail?: Prisma.SortOrder
  subject?: Prisma.SortOrder
  templateName?: Prisma.SortOrder
  templateData?: Prisma.SortOrderInput | Prisma.SortOrder
  status?: Prisma.SortOrder
  provider?: Prisma.SortOrder
  providerId?: Prisma.SortOrderInput | Prisma.SortOrder
  providerResponse?: Prisma.SortOrderInput | Prisma.SortOrder
  paymentId?: Prisma.SortOrderInput | Prisma.SortOrder
  userId?: Prisma.SortOrderInput | Prisma.SortOrder
  scheduledAt?: Prisma.SortOrderInput | Prisma.SortOrder
  sentAt?: Prisma.SortOrderInput | Prisma.SortOrder
  deliveredAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failureReason?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  _count?: Prisma.EmailLogCountOrderByAggregateInput
  _max?: Prisma.EmailLogMaxOrderByAggregateInput
  _min?: Prisma.EmailLogMinOrderByAggregateInput
}

export type EmailLogScalarWhereWithAggregatesInput = {
  AND?: Prisma.EmailLogScalarWhereWithAggregatesInput | Prisma.EmailLogScalarWhereWithAggregatesInput[]
  OR?: Prisma.EmailLogScalarWhereWithAggregatesInput[]
  NOT?: Prisma.EmailLogScalarWhereWithAggregatesInput | Prisma.EmailLogScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string
  tenantId?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null
  toEmail?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string
  toName?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null
  fromEmail?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string
  subject?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string
  templateName?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string
  templateData?: Prisma.JsonNullableWithAggregatesFilter<"EmailLog">
  status?: Prisma.EnumEmailStatusWithAggregatesFilter<"EmailLog"> | $Enums.EmailStatus
  provider?: Prisma.StringWithAggregatesFilter<"EmailLog"> | string
  providerId?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null
  providerResponse?: Prisma.JsonNullableWithAggregatesFilter<"EmailLog">
  paymentId?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null
  userId?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null
  scheduledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EmailLog"> | Date | string | null
  sentAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EmailLog"> | Date | string | null
  deliveredAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EmailLog"> | Date | string | null
  failedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EmailLog"> | Date | string | null
  failureReason?: Prisma.StringNullableWithAggregatesFilter<"EmailLog"> | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"EmailLog"> | Date | string
}

export type EmailLogCreateInput = {
  id?: string
  toEmail: string
  toName?: string | null
  fromEmail: string
  subject: string
  templateName: string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: $Enums.EmailStatus
  provider?: string
  providerId?: string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: string | null
  userId?: string | null
  scheduledAt?: Date | string | null
  sentAt?: Date | string | null
  deliveredAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  createdAt?: Date | string
  tenant?: Prisma.TenantCreateNestedOneWithoutEmailLogsInput
}

export type EmailLogUncheckedCreateInput = {
  id?: string
  tenantId?: string | null
  toEmail: string
  toName?: string | null
  fromEmail: string
  subject: string
  templateName: string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: $Enums.EmailStatus
  provider?: string
  providerId?: string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: string | null
  userId?: string | null
  scheduledAt?: Date | string | null
  sentAt?: Date | string | null
  deliveredAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  createdAt?: Date | string
}

export type EmailLogUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  toEmail?: Prisma.StringFieldUpdateOperationsInput | string
  toName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  fromEmail?: Prisma.StringFieldUpdateOperationsInput | string
  subject?: Prisma.StringFieldUpdateOperationsInput | string
  templateName?: Prisma.StringFieldUpdateOperationsInput | string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus
  provider?: Prisma.StringFieldUpdateOperationsInput | string
  providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneWithoutEmailLogsNestedInput
}

export type EmailLogUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  toEmail?: Prisma.StringFieldUpdateOperationsInput | string
  toName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  fromEmail?: Prisma.StringFieldUpdateOperationsInput | string
  subject?: Prisma.StringFieldUpdateOperationsInput | string
  templateName?: Prisma.StringFieldUpdateOperationsInput | string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus
  provider?: Prisma.StringFieldUpdateOperationsInput | string
  providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EmailLogCreateManyInput = {
  id?: string
  tenantId?: string | null
  toEmail: string
  toName?: string | null
  fromEmail: string
  subject: string
  templateName: string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: $Enums.EmailStatus
  provider?: string
  providerId?: string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: string | null
  userId?: string | null
  scheduledAt?: Date | string | null
  sentAt?: Date | string | null
  deliveredAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  createdAt?: Date | string
}

export type EmailLogUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  toEmail?: Prisma.StringFieldUpdateOperationsInput | string
  toName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  fromEmail?: Prisma.StringFieldUpdateOperationsInput | string
  subject?: Prisma.StringFieldUpdateOperationsInput | string
  templateName?: Prisma.StringFieldUpdateOperationsInput | string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus
  provider?: Prisma.StringFieldUpdateOperationsInput | string
  providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EmailLogUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  toEmail?: Prisma.StringFieldUpdateOperationsInput | string
  toName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  fromEmail?: Prisma.StringFieldUpdateOperationsInput | string
  subject?: Prisma.StringFieldUpdateOperationsInput | string
  templateName?: Prisma.StringFieldUpdateOperationsInput | string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus
  provider?: Prisma.StringFieldUpdateOperationsInput | string
  providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EmailLogListRelationFilter = {
  every?: Prisma.EmailLogWhereInput
  some?: Prisma.EmailLogWhereInput
  none?: Prisma.EmailLogWhereInput
}

export type EmailLogOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type EmailLogCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  toEmail?: Prisma.SortOrder
  toName?: Prisma.SortOrder
  fromEmail?: Prisma.SortOrder
  subject?: Prisma.SortOrder
  templateName?: Prisma.SortOrder
  templateData?: Prisma.SortOrder
  status?: Prisma.SortOrder
  provider?: Prisma.SortOrder
  providerId?: Prisma.SortOrder
  providerResponse?: Prisma.SortOrder
  paymentId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  scheduledAt?: Prisma.SortOrder
  sentAt?: Prisma.SortOrder
  deliveredAt?: Prisma.SortOrder
  failedAt?: Prisma.SortOrder
  failureReason?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type EmailLogMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  toEmail?: Prisma.SortOrder
  toName?: Prisma.SortOrder
  fromEmail?: Prisma.SortOrder
  subject?: Prisma.SortOrder
  templateName?: Prisma.SortOrder
  status?: Prisma.SortOrder
  provider?: Prisma.SortOrder
  providerId?: Prisma.SortOrder
  paymentId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  scheduledAt?: Prisma.SortOrder
  sentAt?: Prisma.SortOrder
  deliveredAt?: Prisma.SortOrder
  failedAt?: Prisma.SortOrder
  failureReason?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type EmailLogMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  toEmail?: Prisma.SortOrder
  toName?: Prisma.SortOrder
  fromEmail?: Prisma.SortOrder
  subject?: Prisma.SortOrder
  templateName?: Prisma.SortOrder
  status?: Prisma.SortOrder
  provider?: Prisma.SortOrder
  providerId?: Prisma.SortOrder
  paymentId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  scheduledAt?: Prisma.SortOrder
  sentAt?: Prisma.SortOrder
  deliveredAt?: Prisma.SortOrder
  failedAt?: Prisma.SortOrder
  failureReason?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type EmailLogCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.EmailLogCreateWithoutTenantInput, Prisma.EmailLogUncheckedCreateWithoutTenantInput> | Prisma.EmailLogCreateWithoutTenantInput[] | Prisma.EmailLogUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutTenantInput | Prisma.EmailLogCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.EmailLogCreateManyTenantInputEnvelope
  connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
}

export type EmailLogUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.EmailLogCreateWithoutTenantInput, Prisma.EmailLogUncheckedCreateWithoutTenantInput> | Prisma.EmailLogCreateWithoutTenantInput[] | Prisma.EmailLogUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutTenantInput | Prisma.EmailLogCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.EmailLogCreateManyTenantInputEnvelope
  connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
}

export type EmailLogUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.EmailLogCreateWithoutTenantInput, Prisma.EmailLogUncheckedCreateWithoutTenantInput> | Prisma.EmailLogCreateWithoutTenantInput[] | Prisma.EmailLogUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutTenantInput | Prisma.EmailLogCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.EmailLogUpsertWithWhereUniqueWithoutTenantInput | Prisma.EmailLogUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.EmailLogCreateManyTenantInputEnvelope
  set?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  disconnect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  delete?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  update?: Prisma.EmailLogUpdateWithWhereUniqueWithoutTenantInput | Prisma.EmailLogUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.EmailLogUpdateManyWithWhereWithoutTenantInput | Prisma.EmailLogUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[]
}

export type EmailLogUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.EmailLogCreateWithoutTenantInput, Prisma.EmailLogUncheckedCreateWithoutTenantInput> | Prisma.EmailLogCreateWithoutTenantInput[] | Prisma.EmailLogUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.EmailLogCreateOrConnectWithoutTenantInput | Prisma.EmailLogCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.EmailLogUpsertWithWhereUniqueWithoutTenantInput | Prisma.EmailLogUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.EmailLogCreateManyTenantInputEnvelope
  set?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  disconnect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  delete?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  connect?: Prisma.EmailLogWhereUniqueInput | Prisma.EmailLogWhereUniqueInput[]
  update?: Prisma.EmailLogUpdateWithWhereUniqueWithoutTenantInput | Prisma.EmailLogUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.EmailLogUpdateManyWithWhereWithoutTenantInput | Prisma.EmailLogUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[]
}

export type EnumEmailStatusFieldUpdateOperationsInput = {
  set?: $Enums.EmailStatus
}

export type EmailLogCreateWithoutTenantInput = {
  id?: string
  toEmail: string
  toName?: string | null
  fromEmail: string
  subject: string
  templateName: string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: $Enums.EmailStatus
  provider?: string
  providerId?: string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: string | null
  userId?: string | null
  scheduledAt?: Date | string | null
  sentAt?: Date | string | null
  deliveredAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  createdAt?: Date | string
}

export type EmailLogUncheckedCreateWithoutTenantInput = {
  id?: string
  toEmail: string
  toName?: string | null
  fromEmail: string
  subject: string
  templateName: string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: $Enums.EmailStatus
  provider?: string
  providerId?: string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: string | null
  userId?: string | null
  scheduledAt?: Date | string | null
  sentAt?: Date | string | null
  deliveredAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  createdAt?: Date | string
}

export type EmailLogCreateOrConnectWithoutTenantInput = {
  where: Prisma.EmailLogWhereUniqueInput
  create: Prisma.XOR<Prisma.EmailLogCreateWithoutTenantInput, Prisma.EmailLogUncheckedCreateWithoutTenantInput>
}

export type EmailLogCreateManyTenantInputEnvelope = {
  data: Prisma.EmailLogCreateManyTenantInput | Prisma.EmailLogCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type EmailLogUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.EmailLogWhereUniqueInput
  update: Prisma.XOR<Prisma.EmailLogUpdateWithoutTenantInput, Prisma.EmailLogUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.EmailLogCreateWithoutTenantInput, Prisma.EmailLogUncheckedCreateWithoutTenantInput>
}

export type EmailLogUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.EmailLogWhereUniqueInput
  data: Prisma.XOR<Prisma.EmailLogUpdateWithoutTenantInput, Prisma.EmailLogUncheckedUpdateWithoutTenantInput>
}

export type EmailLogUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.EmailLogScalarWhereInput
  data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyWithoutTenantInput>
}

export type EmailLogScalarWhereInput = {
  AND?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[]
  OR?: Prisma.EmailLogScalarWhereInput[]
  NOT?: Prisma.EmailLogScalarWhereInput | Prisma.EmailLogScalarWhereInput[]
  id?: Prisma.StringFilter<"EmailLog"> | string
  tenantId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  toEmail?: Prisma.StringFilter<"EmailLog"> | string
  toName?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  fromEmail?: Prisma.StringFilter<"EmailLog"> | string
  subject?: Prisma.StringFilter<"EmailLog"> | string
  templateName?: Prisma.StringFilter<"EmailLog"> | string
  templateData?: Prisma.JsonNullableFilter<"EmailLog">
  status?: Prisma.EnumEmailStatusFilter<"EmailLog"> | $Enums.EmailStatus
  provider?: Prisma.StringFilter<"EmailLog"> | string
  providerId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  providerResponse?: Prisma.JsonNullableFilter<"EmailLog">
  paymentId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  userId?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  scheduledAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  sentAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  deliveredAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  failedAt?: Prisma.DateTimeNullableFilter<"EmailLog"> | Date | string | null
  failureReason?: Prisma.StringNullableFilter<"EmailLog"> | string | null
  createdAt?: Prisma.DateTimeFilter<"EmailLog"> | Date | string
}

export type EmailLogCreateManyTenantInput = {
  id?: string
  toEmail: string
  toName?: string | null
  fromEmail: string
  subject: string
  templateName: string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: $Enums.EmailStatus
  provider?: string
  providerId?: string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: string | null
  userId?: string | null
  scheduledAt?: Date | string | null
  sentAt?: Date | string | null
  deliveredAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  createdAt?: Date | string
}

export type EmailLogUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  toEmail?: Prisma.StringFieldUpdateOperationsInput | string
  toName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  fromEmail?: Prisma.StringFieldUpdateOperationsInput | string
  subject?: Prisma.StringFieldUpdateOperationsInput | string
  templateName?: Prisma.StringFieldUpdateOperationsInput | string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus
  provider?: Prisma.StringFieldUpdateOperationsInput | string
  providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EmailLogUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  toEmail?: Prisma.StringFieldUpdateOperationsInput | string
  toName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  fromEmail?: Prisma.StringFieldUpdateOperationsInput | string
  subject?: Prisma.StringFieldUpdateOperationsInput | string
  templateName?: Prisma.StringFieldUpdateOperationsInput | string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus
  provider?: Prisma.StringFieldUpdateOperationsInput | string
  providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EmailLogUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  toEmail?: Prisma.StringFieldUpdateOperationsInput | string
  toName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  fromEmail?: Prisma.StringFieldUpdateOperationsInput | string
  subject?: Prisma.StringFieldUpdateOperationsInput | string
  templateName?: Prisma.StringFieldUpdateOperationsInput | string
  templateData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  status?: Prisma.EnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus
  provider?: Prisma.StringFieldUpdateOperationsInput | string
  providerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  providerResponse?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  paymentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  userId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  scheduledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  deliveredAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type EmailLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  toEmail?: boolean
  toName?: boolean
  fromEmail?: boolean
  subject?: boolean
  templateName?: boolean
  templateData?: boolean
  status?: boolean
  provider?: boolean
  providerId?: boolean
  providerResponse?: boolean
  paymentId?: boolean
  userId?: boolean
  scheduledAt?: boolean
  sentAt?: boolean
  deliveredAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.EmailLog$tenantArgs<ExtArgs>
}, ExtArgs["result"]["emailLog"]>

export type EmailLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  toEmail?: boolean
  toName?: boolean
  fromEmail?: boolean
  subject?: boolean
  templateName?: boolean
  templateData?: boolean
  status?: boolean
  provider?: boolean
  providerId?: boolean
  providerResponse?: boolean
  paymentId?: boolean
  userId?: boolean
  scheduledAt?: boolean
  sentAt?: boolean
  deliveredAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.EmailLog$tenantArgs<ExtArgs>
}, ExtArgs["result"]["emailLog"]>

export type EmailLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  toEmail?: boolean
  toName?: boolean
  fromEmail?: boolean
  subject?: boolean
  templateName?: boolean
  templateData?: boolean
  status?: boolean
  provider?: boolean
  providerId?: boolean
  providerResponse?: boolean
  paymentId?: boolean
  userId?: boolean
  scheduledAt?: boolean
  sentAt?: boolean
  deliveredAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.EmailLog$tenantArgs<ExtArgs>
}, ExtArgs["result"]["emailLog"]>

export type EmailLogSelectScalar = {
  id?: boolean
  tenantId?: boolean
  toEmail?: boolean
  toName?: boolean
  fromEmail?: boolean
  subject?: boolean
  templateName?: boolean
  templateData?: boolean
  status?: boolean
  provider?: boolean
  providerId?: boolean
  providerResponse?: boolean
  paymentId?: boolean
  userId?: boolean
  scheduledAt?: boolean
  sentAt?: boolean
  deliveredAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  createdAt?: boolean
}

export type EmailLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "toEmail" | "toName" | "fromEmail" | "subject" | "templateName" | "templateData" | "status" | "provider" | "providerId" | "providerResponse" | "paymentId" | "userId" | "scheduledAt" | "sentAt" | "deliveredAt" | "failedAt" | "failureReason" | "createdAt", ExtArgs["result"]["emailLog"]>
export type EmailLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.EmailLog$tenantArgs<ExtArgs>
}
export type EmailLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.EmailLog$tenantArgs<ExtArgs>
}
export type EmailLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.EmailLog$tenantArgs<ExtArgs>
}

export type $EmailLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "EmailLog"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs> | null
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string | null
    toEmail: string
    toName: string | null
    fromEmail: string
    subject: string
    templateName: string
    templateData: runtime.JsonValue | null
    status: $Enums.EmailStatus
    provider: string
    providerId: string | null
    providerResponse: runtime.JsonValue | null
    paymentId: string | null
    userId: string | null
    scheduledAt: Date | null
    sentAt: Date | null
    deliveredAt: Date | null
    failedAt: Date | null
    failureReason: string | null
    createdAt: Date
  }, ExtArgs["result"]["emailLog"]>
  composites: {}
}

export type EmailLogGetPayload<S extends boolean | null | undefined | EmailLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailLogPayload, S>

export type EmailLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<EmailLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailLogCountAggregateInputType | true
  }

export interface EmailLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailLog'], meta: { name: 'EmailLog' } }
    findUnique<T extends EmailLogFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends EmailLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends EmailLogFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends EmailLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends EmailLogFindManyArgs>(args?: Prisma.SelectSubset<T, EmailLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends EmailLogCreateArgs>(args: Prisma.SelectSubset<T, EmailLogCreateArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends EmailLogCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends EmailLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmailLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends EmailLogDeleteArgs>(args: Prisma.SelectSubset<T, EmailLogDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends EmailLogUpdateArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends EmailLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends EmailLogUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends EmailLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmailLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends EmailLogUpsertArgs>(args: Prisma.SelectSubset<T, EmailLogUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailLogClient<runtime.Types.Result.GetResult<Prisma.$EmailLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends EmailLogCountArgs>(
    args?: Prisma.Subset<T, EmailLogCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], EmailLogCountAggregateOutputType>
      : number
  >

    aggregate<T extends EmailLogAggregateArgs>(args: Prisma.Subset<T, EmailLogAggregateArgs>): Prisma.PrismaPromise<GetEmailLogAggregateType<T>>

    groupBy<
    T extends EmailLogGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: EmailLogGroupByArgs['orderBy'] }
      : { orderBy?: EmailLogGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, EmailLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: EmailLogFieldRefs;
}

export interface Prisma__EmailLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.EmailLog$tenantArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmailLog$tenantArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface EmailLogFieldRefs {
  readonly id: Prisma.FieldRef<"EmailLog", 'String'>
  readonly tenantId: Prisma.FieldRef<"EmailLog", 'String'>
  readonly toEmail: Prisma.FieldRef<"EmailLog", 'String'>
  readonly toName: Prisma.FieldRef<"EmailLog", 'String'>
  readonly fromEmail: Prisma.FieldRef<"EmailLog", 'String'>
  readonly subject: Prisma.FieldRef<"EmailLog", 'String'>
  readonly templateName: Prisma.FieldRef<"EmailLog", 'String'>
  readonly templateData: Prisma.FieldRef<"EmailLog", 'Json'>
  readonly status: Prisma.FieldRef<"EmailLog", 'EmailStatus'>
  readonly provider: Prisma.FieldRef<"EmailLog", 'String'>
  readonly providerId: Prisma.FieldRef<"EmailLog", 'String'>
  readonly providerResponse: Prisma.FieldRef<"EmailLog", 'Json'>
  readonly paymentId: Prisma.FieldRef<"EmailLog", 'String'>
  readonly userId: Prisma.FieldRef<"EmailLog", 'String'>
  readonly scheduledAt: Prisma.FieldRef<"EmailLog", 'DateTime'>
  readonly sentAt: Prisma.FieldRef<"EmailLog", 'DateTime'>
  readonly deliveredAt: Prisma.FieldRef<"EmailLog", 'DateTime'>
  readonly failedAt: Prisma.FieldRef<"EmailLog", 'DateTime'>
  readonly failureReason: Prisma.FieldRef<"EmailLog", 'String'>
  readonly createdAt: Prisma.FieldRef<"EmailLog", 'DateTime'>
}

export type EmailLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    where: Prisma.EmailLogWhereUniqueInput
}

export type EmailLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    where: Prisma.EmailLogWhereUniqueInput
}

export type EmailLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    where?: Prisma.EmailLogWhereInput
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[]
    cursor?: Prisma.EmailLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[]
}

export type EmailLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    where?: Prisma.EmailLogWhereInput
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[]
    cursor?: Prisma.EmailLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[]
}

export type EmailLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    where?: Prisma.EmailLogWhereInput
    orderBy?: Prisma.EmailLogOrderByWithRelationInput | Prisma.EmailLogOrderByWithRelationInput[]
    cursor?: Prisma.EmailLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.EmailLogScalarFieldEnum | Prisma.EmailLogScalarFieldEnum[]
}

export type EmailLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.EmailLogCreateInput, Prisma.EmailLogUncheckedCreateInput>
}

export type EmailLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmailLogCreateManyInput | Prisma.EmailLogCreateManyInput[]
  skipDuplicates?: boolean
}

export type EmailLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    data: Prisma.EmailLogCreateManyInput | Prisma.EmailLogCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.EmailLogIncludeCreateManyAndReturn<ExtArgs> | null
}

export type EmailLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.EmailLogUpdateInput, Prisma.EmailLogUncheckedUpdateInput>
    where: Prisma.EmailLogWhereUniqueInput
}

export type EmailLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyInput>
    where?: Prisma.EmailLogWhereInput
    limit?: number
}

export type EmailLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.EmailLogUpdateManyMutationInput, Prisma.EmailLogUncheckedUpdateManyInput>
    where?: Prisma.EmailLogWhereInput
    limit?: number
    include?: Prisma.EmailLogIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type EmailLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    where: Prisma.EmailLogWhereUniqueInput
    create: Prisma.XOR<Prisma.EmailLogCreateInput, Prisma.EmailLogUncheckedCreateInput>
    update: Prisma.XOR<Prisma.EmailLogUpdateInput, Prisma.EmailLogUncheckedUpdateInput>
}

export type EmailLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
    where: Prisma.EmailLogWhereUniqueInput
}

export type EmailLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailLogWhereInput
    limit?: number
}

export type EmailLog$tenantArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null
    omit?: Prisma.TenantOmit<ExtArgs> | null
    include?: Prisma.TenantInclude<ExtArgs> | null
  where?: Prisma.TenantWhereInput
}

export type EmailLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailLogSelect<ExtArgs> | null
    omit?: Prisma.EmailLogOmit<ExtArgs> | null
    include?: Prisma.EmailLogInclude<ExtArgs> | null
}
