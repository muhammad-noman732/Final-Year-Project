
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type NotificationModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationPayload>

export type AggregateNotification = {
  _count: NotificationCountAggregateOutputType | null
  _min: NotificationMinAggregateOutputType | null
  _max: NotificationMaxAggregateOutputType | null
}

export type NotificationMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  userId: string | null
  type: $Enums.NotificationType | null
  title: string | null
  body: string | null
  isRead: boolean | null
  readAt: Date | null
  channel: $Enums.NotificationChannel | null
  sentAt: Date | null
  createdAt: Date | null
}

export type NotificationMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  userId: string | null
  type: $Enums.NotificationType | null
  title: string | null
  body: string | null
  isRead: boolean | null
  readAt: Date | null
  channel: $Enums.NotificationChannel | null
  sentAt: Date | null
  createdAt: Date | null
}

export type NotificationCountAggregateOutputType = {
  id: number
  tenantId: number
  userId: number
  type: number
  title: number
  body: number
  data: number
  isRead: number
  readAt: number
  channel: number
  sentAt: number
  createdAt: number
  _all: number
}

export type NotificationMinAggregateInputType = {
  id?: true
  tenantId?: true
  userId?: true
  type?: true
  title?: true
  body?: true
  isRead?: true
  readAt?: true
  channel?: true
  sentAt?: true
  createdAt?: true
}

export type NotificationMaxAggregateInputType = {
  id?: true
  tenantId?: true
  userId?: true
  type?: true
  title?: true
  body?: true
  isRead?: true
  readAt?: true
  channel?: true
  sentAt?: true
  createdAt?: true
}

export type NotificationCountAggregateInputType = {
  id?: true
  tenantId?: true
  userId?: true
  type?: true
  title?: true
  body?: true
  data?: true
  isRead?: true
  readAt?: true
  channel?: true
  sentAt?: true
  createdAt?: true
  _all?: true
}

export type NotificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[]
    cursor?: Prisma.NotificationWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | NotificationCountAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
}

export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
      [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateNotification[P]>
    : Prisma.GetScalarType<T[P], AggregateNotification[P]>
}

export type NotificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.NotificationWhereInput
  orderBy?: Prisma.NotificationOrderByWithAggregationInput | Prisma.NotificationOrderByWithAggregationInput[]
  by: Prisma.NotificationScalarFieldEnum[] | Prisma.NotificationScalarFieldEnum
  having?: Prisma.NotificationScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: NotificationCountAggregateInputType | true
  _min?: NotificationMinAggregateInputType
  _max?: NotificationMaxAggregateInputType
}

export type NotificationGroupByOutputType = {
  id: string
  tenantId: string
  userId: string
  type: $Enums.NotificationType
  title: string
  body: string
  data: runtime.JsonValue | null
  isRead: boolean
  readAt: Date | null
  channel: $Enums.NotificationChannel
  sentAt: Date | null
  createdAt: Date
  _count: NotificationCountAggregateOutputType | null
  _min: NotificationMinAggregateOutputType | null
  _max: NotificationMaxAggregateOutputType | null
}

export type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<NotificationGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]>
      }
    >
  >

export type NotificationWhereInput = {
  AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[]
  OR?: Prisma.NotificationWhereInput[]
  NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[]
  id?: Prisma.StringFilter<"Notification"> | string
  tenantId?: Prisma.StringFilter<"Notification"> | string
  userId?: Prisma.StringFilter<"Notification"> | string
  type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
  title?: Prisma.StringFilter<"Notification"> | string
  body?: Prisma.StringFilter<"Notification"> | string
  data?: Prisma.JsonNullableFilter<"Notification">
  isRead?: Prisma.BoolFilter<"Notification"> | boolean
  readAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null
  channel?: Prisma.EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel
  sentAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
}

export type NotificationOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  title?: Prisma.SortOrder
  body?: Prisma.SortOrder
  data?: Prisma.SortOrderInput | Prisma.SortOrder
  isRead?: Prisma.SortOrder
  readAt?: Prisma.SortOrderInput | Prisma.SortOrder
  channel?: Prisma.SortOrder
  sentAt?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
}

export type NotificationWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[]
  OR?: Prisma.NotificationWhereInput[]
  NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[]
  tenantId?: Prisma.StringFilter<"Notification"> | string
  userId?: Prisma.StringFilter<"Notification"> | string
  type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
  title?: Prisma.StringFilter<"Notification"> | string
  body?: Prisma.StringFilter<"Notification"> | string
  data?: Prisma.JsonNullableFilter<"Notification">
  isRead?: Prisma.BoolFilter<"Notification"> | boolean
  readAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null
  channel?: Prisma.EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel
  sentAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
}, "id">

export type NotificationOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  title?: Prisma.SortOrder
  body?: Prisma.SortOrder
  data?: Prisma.SortOrderInput | Prisma.SortOrder
  isRead?: Prisma.SortOrder
  readAt?: Prisma.SortOrderInput | Prisma.SortOrder
  channel?: Prisma.SortOrder
  sentAt?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  _count?: Prisma.NotificationCountOrderByAggregateInput
  _max?: Prisma.NotificationMaxOrderByAggregateInput
  _min?: Prisma.NotificationMinOrderByAggregateInput
}

export type NotificationScalarWhereWithAggregatesInput = {
  AND?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[]
  OR?: Prisma.NotificationScalarWhereWithAggregatesInput[]
  NOT?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Notification"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"Notification"> | string
  userId?: Prisma.StringWithAggregatesFilter<"Notification"> | string
  type?: Prisma.EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
  title?: Prisma.StringWithAggregatesFilter<"Notification"> | string
  body?: Prisma.StringWithAggregatesFilter<"Notification"> | string
  data?: Prisma.JsonNullableWithAggregatesFilter<"Notification">
  isRead?: Prisma.BoolWithAggregatesFilter<"Notification"> | boolean
  readAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
  channel?: Prisma.EnumNotificationChannelWithAggregatesFilter<"Notification"> | $Enums.NotificationChannel
  sentAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Notification"> | Date | string
}

export type NotificationCreateInput = {
  id?: string
  userId: string
  type: $Enums.NotificationType
  title: string
  body: string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: boolean
  readAt?: Date | string | null
  channel?: $Enums.NotificationChannel
  sentAt?: Date | string | null
  createdAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutNotificationsInput
}

export type NotificationUncheckedCreateInput = {
  id?: string
  tenantId: string
  userId: string
  type: $Enums.NotificationType
  title: string
  body: string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: boolean
  readAt?: Date | string | null
  channel?: $Enums.NotificationChannel
  sentAt?: Date | string | null
  createdAt?: Date | string
}

export type NotificationUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
  title?: Prisma.StringFieldUpdateOperationsInput | string
  body?: Prisma.StringFieldUpdateOperationsInput | string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutNotificationsNestedInput
}

export type NotificationUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
  title?: Prisma.StringFieldUpdateOperationsInput | string
  body?: Prisma.StringFieldUpdateOperationsInput | string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type NotificationCreateManyInput = {
  id?: string
  tenantId: string
  userId: string
  type: $Enums.NotificationType
  title: string
  body: string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: boolean
  readAt?: Date | string | null
  channel?: $Enums.NotificationChannel
  sentAt?: Date | string | null
  createdAt?: Date | string
}

export type NotificationUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
  title?: Prisma.StringFieldUpdateOperationsInput | string
  body?: Prisma.StringFieldUpdateOperationsInput | string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type NotificationUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
  title?: Prisma.StringFieldUpdateOperationsInput | string
  body?: Prisma.StringFieldUpdateOperationsInput | string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type NotificationListRelationFilter = {
  every?: Prisma.NotificationWhereInput
  some?: Prisma.NotificationWhereInput
  none?: Prisma.NotificationWhereInput
}

export type NotificationOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type NotificationCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  title?: Prisma.SortOrder
  body?: Prisma.SortOrder
  data?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  readAt?: Prisma.SortOrder
  channel?: Prisma.SortOrder
  sentAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type NotificationMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  title?: Prisma.SortOrder
  body?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  readAt?: Prisma.SortOrder
  channel?: Prisma.SortOrder
  sentAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type NotificationMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  userId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  title?: Prisma.SortOrder
  body?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  readAt?: Prisma.SortOrder
  channel?: Prisma.SortOrder
  sentAt?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type NotificationCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.NotificationCreateWithoutTenantInput, Prisma.NotificationUncheckedCreateWithoutTenantInput> | Prisma.NotificationCreateWithoutTenantInput[] | Prisma.NotificationUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutTenantInput | Prisma.NotificationCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.NotificationCreateManyTenantInputEnvelope
  connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
}

export type NotificationUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.NotificationCreateWithoutTenantInput, Prisma.NotificationUncheckedCreateWithoutTenantInput> | Prisma.NotificationCreateWithoutTenantInput[] | Prisma.NotificationUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutTenantInput | Prisma.NotificationCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.NotificationCreateManyTenantInputEnvelope
  connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
}

export type NotificationUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.NotificationCreateWithoutTenantInput, Prisma.NotificationUncheckedCreateWithoutTenantInput> | Prisma.NotificationCreateWithoutTenantInput[] | Prisma.NotificationUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutTenantInput | Prisma.NotificationCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutTenantInput | Prisma.NotificationUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.NotificationCreateManyTenantInputEnvelope
  set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  update?: Prisma.NotificationUpdateWithWhereUniqueWithoutTenantInput | Prisma.NotificationUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutTenantInput | Prisma.NotificationUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[]
}

export type NotificationUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.NotificationCreateWithoutTenantInput, Prisma.NotificationUncheckedCreateWithoutTenantInput> | Prisma.NotificationCreateWithoutTenantInput[] | Prisma.NotificationUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutTenantInput | Prisma.NotificationCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutTenantInput | Prisma.NotificationUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.NotificationCreateManyTenantInputEnvelope
  set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[]
  update?: Prisma.NotificationUpdateWithWhereUniqueWithoutTenantInput | Prisma.NotificationUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutTenantInput | Prisma.NotificationUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[]
}

export type EnumNotificationTypeFieldUpdateOperationsInput = {
  set?: $Enums.NotificationType
}

export type EnumNotificationChannelFieldUpdateOperationsInput = {
  set?: $Enums.NotificationChannel
}

export type NotificationCreateWithoutTenantInput = {
  id?: string
  userId: string
  type: $Enums.NotificationType
  title: string
  body: string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: boolean
  readAt?: Date | string | null
  channel?: $Enums.NotificationChannel
  sentAt?: Date | string | null
  createdAt?: Date | string
}

export type NotificationUncheckedCreateWithoutTenantInput = {
  id?: string
  userId: string
  type: $Enums.NotificationType
  title: string
  body: string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: boolean
  readAt?: Date | string | null
  channel?: $Enums.NotificationChannel
  sentAt?: Date | string | null
  createdAt?: Date | string
}

export type NotificationCreateOrConnectWithoutTenantInput = {
  where: Prisma.NotificationWhereUniqueInput
  create: Prisma.XOR<Prisma.NotificationCreateWithoutTenantInput, Prisma.NotificationUncheckedCreateWithoutTenantInput>
}

export type NotificationCreateManyTenantInputEnvelope = {
  data: Prisma.NotificationCreateManyTenantInput | Prisma.NotificationCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type NotificationUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.NotificationWhereUniqueInput
  update: Prisma.XOR<Prisma.NotificationUpdateWithoutTenantInput, Prisma.NotificationUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.NotificationCreateWithoutTenantInput, Prisma.NotificationUncheckedCreateWithoutTenantInput>
}

export type NotificationUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.NotificationWhereUniqueInput
  data: Prisma.XOR<Prisma.NotificationUpdateWithoutTenantInput, Prisma.NotificationUncheckedUpdateWithoutTenantInput>
}

export type NotificationUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.NotificationScalarWhereInput
  data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutTenantInput>
}

export type NotificationScalarWhereInput = {
  AND?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[]
  OR?: Prisma.NotificationScalarWhereInput[]
  NOT?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[]
  id?: Prisma.StringFilter<"Notification"> | string
  tenantId?: Prisma.StringFilter<"Notification"> | string
  userId?: Prisma.StringFilter<"Notification"> | string
  type?: Prisma.EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
  title?: Prisma.StringFilter<"Notification"> | string
  body?: Prisma.StringFilter<"Notification"> | string
  data?: Prisma.JsonNullableFilter<"Notification">
  isRead?: Prisma.BoolFilter<"Notification"> | boolean
  readAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null
  channel?: Prisma.EnumNotificationChannelFilter<"Notification"> | $Enums.NotificationChannel
  sentAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null
  createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string
}

export type NotificationCreateManyTenantInput = {
  id?: string
  userId: string
  type: $Enums.NotificationType
  title: string
  body: string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: boolean
  readAt?: Date | string | null
  channel?: $Enums.NotificationChannel
  sentAt?: Date | string | null
  createdAt?: Date | string
}

export type NotificationUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
  title?: Prisma.StringFieldUpdateOperationsInput | string
  body?: Prisma.StringFieldUpdateOperationsInput | string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type NotificationUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
  title?: Prisma.StringFieldUpdateOperationsInput | string
  body?: Prisma.StringFieldUpdateOperationsInput | string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type NotificationUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  userId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
  title?: Prisma.StringFieldUpdateOperationsInput | string
  body?: Prisma.StringFieldUpdateOperationsInput | string
  data?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  channel?: Prisma.EnumNotificationChannelFieldUpdateOperationsInput | $Enums.NotificationChannel
  sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type NotificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  type?: boolean
  title?: boolean
  body?: boolean
  data?: boolean
  isRead?: boolean
  readAt?: boolean
  channel?: boolean
  sentAt?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["notification"]>

export type NotificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  type?: boolean
  title?: boolean
  body?: boolean
  data?: boolean
  isRead?: boolean
  readAt?: boolean
  channel?: boolean
  sentAt?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["notification"]>

export type NotificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  type?: boolean
  title?: boolean
  body?: boolean
  data?: boolean
  isRead?: boolean
  readAt?: boolean
  channel?: boolean
  sentAt?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["notification"]>

export type NotificationSelectScalar = {
  id?: boolean
  tenantId?: boolean
  userId?: boolean
  type?: boolean
  title?: boolean
  body?: boolean
  data?: boolean
  isRead?: boolean
  readAt?: boolean
  channel?: boolean
  sentAt?: boolean
  createdAt?: boolean
}

export type NotificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "userId" | "type" | "title" | "body" | "data" | "isRead" | "readAt" | "channel" | "sentAt" | "createdAt", ExtArgs["result"]["notification"]>
export type NotificationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}
export type NotificationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}
export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}

export type $NotificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Notification"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    userId: string
    type: $Enums.NotificationType
    title: string
    body: string
    data: runtime.JsonValue | null
    isRead: boolean
    readAt: Date | null
    channel: $Enums.NotificationChannel
    sentAt: Date | null
    createdAt: Date
  }, ExtArgs["result"]["notification"]>
  composites: {}
}

export type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationPayload, S>

export type NotificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationCountAggregateInputType | true
  }

export interface NotificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    findUnique<T extends NotificationFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends NotificationFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends NotificationFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends NotificationCreateArgs>(args: Prisma.SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends NotificationCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends NotificationDeleteArgs>(args: Prisma.SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends NotificationUpdateArgs>(args: Prisma.SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends NotificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends NotificationUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends NotificationUpsertArgs>(args: Prisma.SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends NotificationCountArgs>(
    args?: Prisma.Subset<T, NotificationCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], NotificationCountAggregateOutputType>
      : number
  >

    aggregate<T extends NotificationAggregateArgs>(args: Prisma.Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    groupBy<
    T extends NotificationGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: NotificationGroupByArgs['orderBy'] }
      : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: NotificationFieldRefs;
}

export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface NotificationFieldRefs {
  readonly id: Prisma.FieldRef<"Notification", 'String'>
  readonly tenantId: Prisma.FieldRef<"Notification", 'String'>
  readonly userId: Prisma.FieldRef<"Notification", 'String'>
  readonly type: Prisma.FieldRef<"Notification", 'NotificationType'>
  readonly title: Prisma.FieldRef<"Notification", 'String'>
  readonly body: Prisma.FieldRef<"Notification", 'String'>
  readonly data: Prisma.FieldRef<"Notification", 'Json'>
  readonly isRead: Prisma.FieldRef<"Notification", 'Boolean'>
  readonly readAt: Prisma.FieldRef<"Notification", 'DateTime'>
  readonly channel: Prisma.FieldRef<"Notification", 'NotificationChannel'>
  readonly sentAt: Prisma.FieldRef<"Notification", 'DateTime'>
  readonly createdAt: Prisma.FieldRef<"Notification", 'DateTime'>
}

export type NotificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    where: Prisma.NotificationWhereUniqueInput
}

export type NotificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    where: Prisma.NotificationWhereUniqueInput
}

export type NotificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    where?: Prisma.NotificationWhereInput
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[]
    cursor?: Prisma.NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[]
}

export type NotificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    where?: Prisma.NotificationWhereInput
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[]
    cursor?: Prisma.NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[]
}

export type NotificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    where?: Prisma.NotificationWhereInput
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[]
    cursor?: Prisma.NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[]
}

export type NotificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>
}

export type NotificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[]
  skipDuplicates?: boolean
}

export type NotificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.NotificationIncludeCreateManyAndReturn<ExtArgs> | null
}

export type NotificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>
    where: Prisma.NotificationWhereUniqueInput
}

export type NotificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>
    where?: Prisma.NotificationWhereInput
    limit?: number
}

export type NotificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>
    where?: Prisma.NotificationWhereInput
    limit?: number
    include?: Prisma.NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type NotificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    where: Prisma.NotificationWhereUniqueInput
    create: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>
    update: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>
}

export type NotificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
    where: Prisma.NotificationWhereUniqueInput
}

export type NotificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput
    limit?: number
}

export type NotificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null
    omit?: Prisma.NotificationOmit<ExtArgs> | null
    include?: Prisma.NotificationInclude<ExtArgs> | null
}
