
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>

export type AggregateUser = {
  _count: UserCountAggregateOutputType | null
  _min: UserMinAggregateOutputType | null
  _max: UserMaxAggregateOutputType | null
}

export type UserMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  email: string | null
  passwordHash: string | null
  name: string | null
  phone: string | null
  avatarUrl: string | null
  role: $Enums.Role | null
  isActive: boolean | null
  isFirstLogin: boolean | null
  emailVerified: boolean | null
  lastLoginAt: Date | null
  hodDepartmentId: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type UserMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  email: string | null
  passwordHash: string | null
  name: string | null
  phone: string | null
  avatarUrl: string | null
  role: $Enums.Role | null
  isActive: boolean | null
  isFirstLogin: boolean | null
  emailVerified: boolean | null
  lastLoginAt: Date | null
  hodDepartmentId: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type UserCountAggregateOutputType = {
  id: number
  tenantId: number
  email: number
  passwordHash: number
  name: number
  phone: number
  avatarUrl: number
  role: number
  isActive: number
  isFirstLogin: number
  emailVerified: number
  lastLoginAt: number
  hodDepartmentId: number
  createdAt: number
  updatedAt: number
  _all: number
}

export type UserMinAggregateInputType = {
  id?: true
  tenantId?: true
  email?: true
  passwordHash?: true
  name?: true
  phone?: true
  avatarUrl?: true
  role?: true
  isActive?: true
  isFirstLogin?: true
  emailVerified?: true
  lastLoginAt?: true
  hodDepartmentId?: true
  createdAt?: true
  updatedAt?: true
}

export type UserMaxAggregateInputType = {
  id?: true
  tenantId?: true
  email?: true
  passwordHash?: true
  name?: true
  phone?: true
  avatarUrl?: true
  role?: true
  isActive?: true
  isFirstLogin?: true
  emailVerified?: true
  lastLoginAt?: true
  hodDepartmentId?: true
  createdAt?: true
  updatedAt?: true
}

export type UserCountAggregateInputType = {
  id?: true
  tenantId?: true
  email?: true
  passwordHash?: true
  name?: true
  phone?: true
  avatarUrl?: true
  role?: true
  isActive?: true
  isFirstLogin?: true
  emailVerified?: true
  lastLoginAt?: true
  hodDepartmentId?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[]
    cursor?: Prisma.UserWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | UserCountAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends UserAggregateArgs> = {
      [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateUser[P]>
    : Prisma.GetScalarType<T[P], AggregateUser[P]>
}

export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.UserWhereInput
  orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[]
  by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum
  having?: Prisma.UserScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: UserCountAggregateInputType | true
  _min?: UserMinAggregateInputType
  _max?: UserMaxAggregateInputType
}

export type UserGroupByOutputType = {
  id: string
  tenantId: string | null
  email: string
  passwordHash: string
  name: string
  phone: string | null
  avatarUrl: string | null
  role: $Enums.Role
  isActive: boolean
  isFirstLogin: boolean
  emailVerified: boolean
  lastLoginAt: Date | null
  hodDepartmentId: string | null
  createdAt: Date
  updatedAt: Date
  _count: UserCountAggregateOutputType | null
  _min: UserMinAggregateOutputType | null
  _max: UserMaxAggregateOutputType | null
}

export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<UserGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>
      }
    >
  >

export type UserWhereInput = {
  AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[]
  OR?: Prisma.UserWhereInput[]
  NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[]
  id?: Prisma.StringFilter<"User"> | string
  tenantId?: Prisma.StringNullableFilter<"User"> | string | null
  email?: Prisma.StringFilter<"User"> | string
  passwordHash?: Prisma.StringFilter<"User"> | string
  name?: Prisma.StringFilter<"User"> | string
  phone?: Prisma.StringNullableFilter<"User"> | string | null
  avatarUrl?: Prisma.StringNullableFilter<"User"> | string | null
  role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role
  isActive?: Prisma.BoolFilter<"User"> | boolean
  isFirstLogin?: Prisma.BoolFilter<"User"> | boolean
  emailVerified?: Prisma.BoolFilter<"User"> | boolean
  lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null
  hodDepartmentId?: Prisma.StringNullableFilter<"User"> | string | null
  createdAt?: Prisma.DateTimeFilter<"User"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantNullableScalarRelationFilter, Prisma.TenantWhereInput> | null
  hodDepartment?: Prisma.XOR<Prisma.DepartmentNullableScalarRelationFilter, Prisma.DepartmentWhereInput> | null
  student?: Prisma.XOR<Prisma.StudentNullableScalarRelationFilter, Prisma.StudentWhereInput> | null
  refreshTokens?: Prisma.RefreshTokenListRelationFilter
  passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter
}

export type UserOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrderInput | Prisma.SortOrder
  email?: Prisma.SortOrder
  passwordHash?: Prisma.SortOrder
  name?: Prisma.SortOrder
  phone?: Prisma.SortOrderInput | Prisma.SortOrder
  avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  role?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  isFirstLogin?: Prisma.SortOrder
  emailVerified?: Prisma.SortOrder
  lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder
  hodDepartmentId?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  hodDepartment?: Prisma.DepartmentOrderByWithRelationInput
  student?: Prisma.StudentOrderByWithRelationInput
  refreshTokens?: Prisma.RefreshTokenOrderByRelationAggregateInput
  passwordResetTokens?: Prisma.PasswordResetTokenOrderByRelationAggregateInput
}

export type UserWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  email?: string
  AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[]
  OR?: Prisma.UserWhereInput[]
  NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[]
  tenantId?: Prisma.StringNullableFilter<"User"> | string | null
  passwordHash?: Prisma.StringFilter<"User"> | string
  name?: Prisma.StringFilter<"User"> | string
  phone?: Prisma.StringNullableFilter<"User"> | string | null
  avatarUrl?: Prisma.StringNullableFilter<"User"> | string | null
  role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role
  isActive?: Prisma.BoolFilter<"User"> | boolean
  isFirstLogin?: Prisma.BoolFilter<"User"> | boolean
  emailVerified?: Prisma.BoolFilter<"User"> | boolean
  lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null
  hodDepartmentId?: Prisma.StringNullableFilter<"User"> | string | null
  createdAt?: Prisma.DateTimeFilter<"User"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantNullableScalarRelationFilter, Prisma.TenantWhereInput> | null
  hodDepartment?: Prisma.XOR<Prisma.DepartmentNullableScalarRelationFilter, Prisma.DepartmentWhereInput> | null
  student?: Prisma.XOR<Prisma.StudentNullableScalarRelationFilter, Prisma.StudentWhereInput> | null
  refreshTokens?: Prisma.RefreshTokenListRelationFilter
  passwordResetTokens?: Prisma.PasswordResetTokenListRelationFilter
}, "id" | "email">

export type UserOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrderInput | Prisma.SortOrder
  email?: Prisma.SortOrder
  passwordHash?: Prisma.SortOrder
  name?: Prisma.SortOrder
  phone?: Prisma.SortOrderInput | Prisma.SortOrder
  avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder
  role?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  isFirstLogin?: Prisma.SortOrder
  emailVerified?: Prisma.SortOrder
  lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder
  hodDepartmentId?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.UserCountOrderByAggregateInput
  _max?: Prisma.UserMaxOrderByAggregateInput
  _min?: Prisma.UserMinOrderByAggregateInput
}

export type UserScalarWhereWithAggregatesInput = {
  AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[]
  OR?: Prisma.UserScalarWhereWithAggregatesInput[]
  NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"User"> | string
  tenantId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null
  email?: Prisma.StringWithAggregatesFilter<"User"> | string
  passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string
  name?: Prisma.StringWithAggregatesFilter<"User"> | string
  phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null
  avatarUrl?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null
  role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
  isActive?: Prisma.BoolWithAggregatesFilter<"User"> | boolean
  isFirstLogin?: Prisma.BoolWithAggregatesFilter<"User"> | boolean
  emailVerified?: Prisma.BoolWithAggregatesFilter<"User"> | boolean
  lastLoginAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  hodDepartmentId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string
}

export type UserCreateInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant?: Prisma.TenantCreateNestedOneWithoutUsersInput
  hodDepartment?: Prisma.DepartmentCreateNestedOneWithoutHodsInput
  student?: Prisma.StudentCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput
}

export type UserUncheckedCreateInput = {
  id?: string
  tenantId?: string | null
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  hodDepartmentId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
}

export type UserUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneWithoutUsersNestedInput
  hodDepartment?: Prisma.DepartmentUpdateOneWithoutHodsNestedInput
  student?: Prisma.StudentUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  hodDepartmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
}

export type UserCreateManyInput = {
  id?: string
  tenantId?: string | null
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  hodDepartmentId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type UserUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type UserUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  hodDepartmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type UserListRelationFilter = {
  every?: Prisma.UserWhereInput
  some?: Prisma.UserWhereInput
  none?: Prisma.UserWhereInput
}

export type UserOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type UserCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  email?: Prisma.SortOrder
  passwordHash?: Prisma.SortOrder
  name?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  avatarUrl?: Prisma.SortOrder
  role?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  isFirstLogin?: Prisma.SortOrder
  emailVerified?: Prisma.SortOrder
  lastLoginAt?: Prisma.SortOrder
  hodDepartmentId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type UserMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  email?: Prisma.SortOrder
  passwordHash?: Prisma.SortOrder
  name?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  avatarUrl?: Prisma.SortOrder
  role?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  isFirstLogin?: Prisma.SortOrder
  emailVerified?: Prisma.SortOrder
  lastLoginAt?: Prisma.SortOrder
  hodDepartmentId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type UserMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  email?: Prisma.SortOrder
  passwordHash?: Prisma.SortOrder
  name?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  avatarUrl?: Prisma.SortOrder
  role?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  isFirstLogin?: Prisma.SortOrder
  emailVerified?: Prisma.SortOrder
  lastLoginAt?: Prisma.SortOrder
  hodDepartmentId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type UserScalarRelationFilter = {
  is?: Prisma.UserWhereInput
  isNot?: Prisma.UserWhereInput
}

export type UserCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutTenantInput, Prisma.UserUncheckedCreateWithoutTenantInput> | Prisma.UserCreateWithoutTenantInput[] | Prisma.UserUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutTenantInput | Prisma.UserCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.UserCreateManyTenantInputEnvelope
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
}

export type UserUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutTenantInput, Prisma.UserUncheckedCreateWithoutTenantInput> | Prisma.UserCreateWithoutTenantInput[] | Prisma.UserUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutTenantInput | Prisma.UserCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.UserCreateManyTenantInputEnvelope
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
}

export type UserUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutTenantInput, Prisma.UserUncheckedCreateWithoutTenantInput> | Prisma.UserCreateWithoutTenantInput[] | Prisma.UserUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutTenantInput | Prisma.UserCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.UserUpsertWithWhereUniqueWithoutTenantInput | Prisma.UserUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.UserCreateManyTenantInputEnvelope
  set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  update?: Prisma.UserUpdateWithWhereUniqueWithoutTenantInput | Prisma.UserUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.UserUpdateManyWithWhereWithoutTenantInput | Prisma.UserUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[]
}

export type UserUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutTenantInput, Prisma.UserUncheckedCreateWithoutTenantInput> | Prisma.UserCreateWithoutTenantInput[] | Prisma.UserUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutTenantInput | Prisma.UserCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.UserUpsertWithWhereUniqueWithoutTenantInput | Prisma.UserUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.UserCreateManyTenantInputEnvelope
  set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  update?: Prisma.UserUpdateWithWhereUniqueWithoutTenantInput | Prisma.UserUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.UserUpdateManyWithWhereWithoutTenantInput | Prisma.UserUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[]
}

export type EnumRoleFieldUpdateOperationsInput = {
  set?: $Enums.Role
}

export type UserCreateNestedOneWithoutRefreshTokensInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput
  connect?: Prisma.UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshTokensInput
  upsert?: Prisma.UserUpsertWithoutRefreshTokensInput
  connect?: Prisma.UserWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput, Prisma.UserUpdateWithoutRefreshTokensInput>, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>
}

export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput
  connect?: Prisma.UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput
  upsert?: Prisma.UserUpsertWithoutPasswordResetTokensInput
  connect?: Prisma.UserWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, Prisma.UserUpdateWithoutPasswordResetTokensInput>, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>
}

export type UserCreateNestedManyWithoutHodDepartmentInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutHodDepartmentInput, Prisma.UserUncheckedCreateWithoutHodDepartmentInput> | Prisma.UserCreateWithoutHodDepartmentInput[] | Prisma.UserUncheckedCreateWithoutHodDepartmentInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutHodDepartmentInput | Prisma.UserCreateOrConnectWithoutHodDepartmentInput[]
  createMany?: Prisma.UserCreateManyHodDepartmentInputEnvelope
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
}

export type UserUncheckedCreateNestedManyWithoutHodDepartmentInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutHodDepartmentInput, Prisma.UserUncheckedCreateWithoutHodDepartmentInput> | Prisma.UserCreateWithoutHodDepartmentInput[] | Prisma.UserUncheckedCreateWithoutHodDepartmentInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutHodDepartmentInput | Prisma.UserCreateOrConnectWithoutHodDepartmentInput[]
  createMany?: Prisma.UserCreateManyHodDepartmentInputEnvelope
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
}

export type UserUpdateManyWithoutHodDepartmentNestedInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutHodDepartmentInput, Prisma.UserUncheckedCreateWithoutHodDepartmentInput> | Prisma.UserCreateWithoutHodDepartmentInput[] | Prisma.UserUncheckedCreateWithoutHodDepartmentInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutHodDepartmentInput | Prisma.UserCreateOrConnectWithoutHodDepartmentInput[]
  upsert?: Prisma.UserUpsertWithWhereUniqueWithoutHodDepartmentInput | Prisma.UserUpsertWithWhereUniqueWithoutHodDepartmentInput[]
  createMany?: Prisma.UserCreateManyHodDepartmentInputEnvelope
  set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  update?: Prisma.UserUpdateWithWhereUniqueWithoutHodDepartmentInput | Prisma.UserUpdateWithWhereUniqueWithoutHodDepartmentInput[]
  updateMany?: Prisma.UserUpdateManyWithWhereWithoutHodDepartmentInput | Prisma.UserUpdateManyWithWhereWithoutHodDepartmentInput[]
  deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[]
}

export type UserUncheckedUpdateManyWithoutHodDepartmentNestedInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutHodDepartmentInput, Prisma.UserUncheckedCreateWithoutHodDepartmentInput> | Prisma.UserCreateWithoutHodDepartmentInput[] | Prisma.UserUncheckedCreateWithoutHodDepartmentInput[]
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutHodDepartmentInput | Prisma.UserCreateOrConnectWithoutHodDepartmentInput[]
  upsert?: Prisma.UserUpsertWithWhereUniqueWithoutHodDepartmentInput | Prisma.UserUpsertWithWhereUniqueWithoutHodDepartmentInput[]
  createMany?: Prisma.UserCreateManyHodDepartmentInputEnvelope
  set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[]
  update?: Prisma.UserUpdateWithWhereUniqueWithoutHodDepartmentInput | Prisma.UserUpdateWithWhereUniqueWithoutHodDepartmentInput[]
  updateMany?: Prisma.UserUpdateManyWithWhereWithoutHodDepartmentInput | Prisma.UserUpdateManyWithWhereWithoutHodDepartmentInput[]
  deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[]
}

export type UserCreateNestedOneWithoutStudentInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudentInput
  connect?: Prisma.UserWhereUniqueInput
}

export type UserUpdateOneRequiredWithoutStudentNestedInput = {
  create?: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>
  connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudentInput
  upsert?: Prisma.UserUpsertWithoutStudentInput
  connect?: Prisma.UserWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutStudentInput, Prisma.UserUpdateWithoutStudentInput>, Prisma.UserUncheckedUpdateWithoutStudentInput>
}

export type UserCreateWithoutTenantInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  hodDepartment?: Prisma.DepartmentCreateNestedOneWithoutHodsInput
  student?: Prisma.StudentCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput
}

export type UserUncheckedCreateWithoutTenantInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  hodDepartmentId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
}

export type UserCreateOrConnectWithoutTenantInput = {
  where: Prisma.UserWhereUniqueInput
  create: Prisma.XOR<Prisma.UserCreateWithoutTenantInput, Prisma.UserUncheckedCreateWithoutTenantInput>
}

export type UserCreateManyTenantInputEnvelope = {
  data: Prisma.UserCreateManyTenantInput | Prisma.UserCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type UserUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.UserWhereUniqueInput
  update: Prisma.XOR<Prisma.UserUpdateWithoutTenantInput, Prisma.UserUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.UserCreateWithoutTenantInput, Prisma.UserUncheckedCreateWithoutTenantInput>
}

export type UserUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.UserWhereUniqueInput
  data: Prisma.XOR<Prisma.UserUpdateWithoutTenantInput, Prisma.UserUncheckedUpdateWithoutTenantInput>
}

export type UserUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.UserScalarWhereInput
  data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutTenantInput>
}

export type UserScalarWhereInput = {
  AND?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[]
  OR?: Prisma.UserScalarWhereInput[]
  NOT?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[]
  id?: Prisma.StringFilter<"User"> | string
  tenantId?: Prisma.StringNullableFilter<"User"> | string | null
  email?: Prisma.StringFilter<"User"> | string
  passwordHash?: Prisma.StringFilter<"User"> | string
  name?: Prisma.StringFilter<"User"> | string
  phone?: Prisma.StringNullableFilter<"User"> | string | null
  avatarUrl?: Prisma.StringNullableFilter<"User"> | string | null
  role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role
  isActive?: Prisma.BoolFilter<"User"> | boolean
  isFirstLogin?: Prisma.BoolFilter<"User"> | boolean
  emailVerified?: Prisma.BoolFilter<"User"> | boolean
  lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null
  hodDepartmentId?: Prisma.StringNullableFilter<"User"> | string | null
  createdAt?: Prisma.DateTimeFilter<"User"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string
}

export type UserCreateWithoutRefreshTokensInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant?: Prisma.TenantCreateNestedOneWithoutUsersInput
  hodDepartment?: Prisma.DepartmentCreateNestedOneWithoutHodsInput
  student?: Prisma.StudentCreateNestedOneWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput
}

export type UserUncheckedCreateWithoutRefreshTokensInput = {
  id?: string
  tenantId?: string | null
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  hodDepartmentId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
}

export type UserCreateOrConnectWithoutRefreshTokensInput = {
  where: Prisma.UserWhereUniqueInput
  create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>
}

export type UserUpsertWithoutRefreshTokensInput = {
  update: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>
  create: Prisma.XOR<Prisma.UserCreateWithoutRefreshTokensInput, Prisma.UserUncheckedCreateWithoutRefreshTokensInput>
  where?: Prisma.UserWhereInput
}

export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
  where?: Prisma.UserWhereInput
  data: Prisma.XOR<Prisma.UserUpdateWithoutRefreshTokensInput, Prisma.UserUncheckedUpdateWithoutRefreshTokensInput>
}

export type UserUpdateWithoutRefreshTokensInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneWithoutUsersNestedInput
  hodDepartment?: Prisma.DepartmentUpdateOneWithoutHodsNestedInput
  student?: Prisma.StudentUpdateOneWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateWithoutRefreshTokensInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  hodDepartmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
}

export type UserCreateWithoutPasswordResetTokensInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant?: Prisma.TenantCreateNestedOneWithoutUsersInput
  hodDepartment?: Prisma.DepartmentCreateNestedOneWithoutHodsInput
  student?: Prisma.StudentCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput
}

export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
  id?: string
  tenantId?: string | null
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  hodDepartmentId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput
}

export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
  where: Prisma.UserWhereUniqueInput
  create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>
}

export type UserUpsertWithoutPasswordResetTokensInput = {
  update: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>
  create: Prisma.XOR<Prisma.UserCreateWithoutPasswordResetTokensInput, Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput>
  where?: Prisma.UserWhereInput
}

export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
  where?: Prisma.UserWhereInput
  data: Prisma.XOR<Prisma.UserUpdateWithoutPasswordResetTokensInput, Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput>
}

export type UserUpdateWithoutPasswordResetTokensInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneWithoutUsersNestedInput
  hodDepartment?: Prisma.DepartmentUpdateOneWithoutHodsNestedInput
  student?: Prisma.StudentUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  hodDepartmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
}

export type UserCreateWithoutHodDepartmentInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant?: Prisma.TenantCreateNestedOneWithoutUsersInput
  student?: Prisma.StudentCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput
}

export type UserUncheckedCreateWithoutHodDepartmentInput = {
  id?: string
  tenantId?: string | null
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  student?: Prisma.StudentUncheckedCreateNestedOneWithoutUserInput
  refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
}

export type UserCreateOrConnectWithoutHodDepartmentInput = {
  where: Prisma.UserWhereUniqueInput
  create: Prisma.XOR<Prisma.UserCreateWithoutHodDepartmentInput, Prisma.UserUncheckedCreateWithoutHodDepartmentInput>
}

export type UserCreateManyHodDepartmentInputEnvelope = {
  data: Prisma.UserCreateManyHodDepartmentInput | Prisma.UserCreateManyHodDepartmentInput[]
  skipDuplicates?: boolean
}

export type UserUpsertWithWhereUniqueWithoutHodDepartmentInput = {
  where: Prisma.UserWhereUniqueInput
  update: Prisma.XOR<Prisma.UserUpdateWithoutHodDepartmentInput, Prisma.UserUncheckedUpdateWithoutHodDepartmentInput>
  create: Prisma.XOR<Prisma.UserCreateWithoutHodDepartmentInput, Prisma.UserUncheckedCreateWithoutHodDepartmentInput>
}

export type UserUpdateWithWhereUniqueWithoutHodDepartmentInput = {
  where: Prisma.UserWhereUniqueInput
  data: Prisma.XOR<Prisma.UserUpdateWithoutHodDepartmentInput, Prisma.UserUncheckedUpdateWithoutHodDepartmentInput>
}

export type UserUpdateManyWithWhereWithoutHodDepartmentInput = {
  where: Prisma.UserScalarWhereInput
  data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutHodDepartmentInput>
}

export type UserCreateWithoutStudentInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant?: Prisma.TenantCreateNestedOneWithoutUsersInput
  hodDepartment?: Prisma.DepartmentCreateNestedOneWithoutHodsInput
  refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput
}

export type UserUncheckedCreateWithoutStudentInput = {
  id?: string
  tenantId?: string | null
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  hodDepartmentId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  refreshTokens?: Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
}

export type UserCreateOrConnectWithoutStudentInput = {
  where: Prisma.UserWhereUniqueInput
  create: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>
}

export type UserUpsertWithoutStudentInput = {
  update: Prisma.XOR<Prisma.UserUpdateWithoutStudentInput, Prisma.UserUncheckedUpdateWithoutStudentInput>
  create: Prisma.XOR<Prisma.UserCreateWithoutStudentInput, Prisma.UserUncheckedCreateWithoutStudentInput>
  where?: Prisma.UserWhereInput
}

export type UserUpdateToOneWithWhereWithoutStudentInput = {
  where?: Prisma.UserWhereInput
  data: Prisma.XOR<Prisma.UserUpdateWithoutStudentInput, Prisma.UserUncheckedUpdateWithoutStudentInput>
}

export type UserUpdateWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneWithoutUsersNestedInput
  hodDepartment?: Prisma.DepartmentUpdateOneWithoutHodsNestedInput
  refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateWithoutStudentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  hodDepartmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
}

export type UserCreateManyTenantInput = {
  id?: string
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  hodDepartmentId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type UserUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  hodDepartment?: Prisma.DepartmentUpdateOneWithoutHodsNestedInput
  student?: Prisma.StudentUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  hodDepartmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  hodDepartmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type UserCreateManyHodDepartmentInput = {
  id?: string
  tenantId?: string | null
  email: string
  passwordHash: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: $Enums.Role
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: Date | string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type UserUpdateWithoutHodDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneWithoutUsersNestedInput
  student?: Prisma.StudentUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateWithoutHodDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  student?: Prisma.StudentUncheckedUpdateOneWithoutUserNestedInput
  refreshTokens?: Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
  passwordResetTokens?: Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
}

export type UserUncheckedUpdateManyWithoutHodDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  email?: Prisma.StringFieldUpdateOperationsInput | string
  passwordHash?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  isFirstLogin?: Prisma.BoolFieldUpdateOperationsInput | boolean
  emailVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean
  lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type UserCountOutputType = {
  refreshTokens: number
  passwordResetTokens: number
}

export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
  passwordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs
}

export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null
}

export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.RefreshTokenWhereInput
}

export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.PasswordResetTokenWhereInput
}

export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  email?: boolean
  passwordHash?: boolean
  name?: boolean
  phone?: boolean
  avatarUrl?: boolean
  role?: boolean
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: boolean
  hodDepartmentId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.User$tenantArgs<ExtArgs>
  hodDepartment?: boolean | Prisma.User$hodDepartmentArgs<ExtArgs>
  student?: boolean | Prisma.User$studentArgs<ExtArgs>
  refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>
  passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>
  _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["user"]>

export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  email?: boolean
  passwordHash?: boolean
  name?: boolean
  phone?: boolean
  avatarUrl?: boolean
  role?: boolean
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: boolean
  hodDepartmentId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.User$tenantArgs<ExtArgs>
  hodDepartment?: boolean | Prisma.User$hodDepartmentArgs<ExtArgs>
}, ExtArgs["result"]["user"]>

export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  email?: boolean
  passwordHash?: boolean
  name?: boolean
  phone?: boolean
  avatarUrl?: boolean
  role?: boolean
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: boolean
  hodDepartmentId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.User$tenantArgs<ExtArgs>
  hodDepartment?: boolean | Prisma.User$hodDepartmentArgs<ExtArgs>
}, ExtArgs["result"]["user"]>

export type UserSelectScalar = {
  id?: boolean
  tenantId?: boolean
  email?: boolean
  passwordHash?: boolean
  name?: boolean
  phone?: boolean
  avatarUrl?: boolean
  role?: boolean
  isActive?: boolean
  isFirstLogin?: boolean
  emailVerified?: boolean
  lastLoginAt?: boolean
  hodDepartmentId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "email" | "passwordHash" | "name" | "phone" | "avatarUrl" | "role" | "isActive" | "isFirstLogin" | "emailVerified" | "lastLoginAt" | "hodDepartmentId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.User$tenantArgs<ExtArgs>
  hodDepartment?: boolean | Prisma.User$hodDepartmentArgs<ExtArgs>
  student?: boolean | Prisma.User$studentArgs<ExtArgs>
  refreshTokens?: boolean | Prisma.User$refreshTokensArgs<ExtArgs>
  passwordResetTokens?: boolean | Prisma.User$passwordResetTokensArgs<ExtArgs>
  _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>
}
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.User$tenantArgs<ExtArgs>
  hodDepartment?: boolean | Prisma.User$hodDepartmentArgs<ExtArgs>
}
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.User$tenantArgs<ExtArgs>
  hodDepartment?: boolean | Prisma.User$hodDepartmentArgs<ExtArgs>
}

export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "User"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs> | null
    hodDepartment: Prisma.$DepartmentPayload<ExtArgs> | null
    student: Prisma.$StudentPayload<ExtArgs> | null
    refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
    passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string | null
    email: string
    passwordHash: string
    name: string
    phone: string | null
    avatarUrl: string | null
    role: $Enums.Role
    isActive: boolean
    isFirstLogin: boolean
    emailVerified: boolean
    lastLoginAt: Date | null
    hodDepartmentId: string | null
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["user"]>
  composites: {}
}

export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>

export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true
  }

export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends UserCountArgs>(
    args?: Prisma.Subset<T, UserCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType>
      : number
  >

    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    groupBy<
    T extends UserGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: UserGroupByArgs['orderBy'] }
      : { orderBy?: UserGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: UserFieldRefs;
}

export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.User$tenantArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$tenantArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
  hodDepartment<T extends Prisma.User$hodDepartmentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$hodDepartmentArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
  student<T extends Prisma.User$studentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$studentArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
  refreshTokens<T extends Prisma.User$refreshTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  passwordResetTokens<T extends Prisma.User$passwordResetTokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface UserFieldRefs {
  readonly id: Prisma.FieldRef<"User", 'String'>
  readonly tenantId: Prisma.FieldRef<"User", 'String'>
  readonly email: Prisma.FieldRef<"User", 'String'>
  readonly passwordHash: Prisma.FieldRef<"User", 'String'>
  readonly name: Prisma.FieldRef<"User", 'String'>
  readonly phone: Prisma.FieldRef<"User", 'String'>
  readonly avatarUrl: Prisma.FieldRef<"User", 'String'>
  readonly role: Prisma.FieldRef<"User", 'Role'>
  readonly isActive: Prisma.FieldRef<"User", 'Boolean'>
  readonly isFirstLogin: Prisma.FieldRef<"User", 'Boolean'>
  readonly emailVerified: Prisma.FieldRef<"User", 'Boolean'>
  readonly lastLoginAt: Prisma.FieldRef<"User", 'DateTime'>
  readonly hodDepartmentId: Prisma.FieldRef<"User", 'String'>
  readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>
}

export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    where: Prisma.UserWhereUniqueInput
}

export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    where: Prisma.UserWhereUniqueInput
}

export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[]
    cursor?: Prisma.UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[]
}

export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[]
    cursor?: Prisma.UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[]
}

export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[]
    cursor?: Prisma.UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[]
}

export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>
}

export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[]
  skipDuplicates?: boolean
}

export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.UserIncludeCreateManyAndReturn<ExtArgs> | null
}

export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>
    where: Prisma.UserWhereUniqueInput
}

export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>
    where?: Prisma.UserWhereInput
    limit?: number
}

export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>
    where?: Prisma.UserWhereInput
    limit?: number
    include?: Prisma.UserIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    where: Prisma.UserWhereUniqueInput
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>
}

export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
    where: Prisma.UserWhereUniqueInput
}

export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput
    limit?: number
}

export type User$tenantArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenantSelect<ExtArgs> | null
    omit?: Prisma.TenantOmit<ExtArgs> | null
    include?: Prisma.TenantInclude<ExtArgs> | null
  where?: Prisma.TenantWhereInput
}

export type User$hodDepartmentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
  where?: Prisma.DepartmentWhereInput
}

export type User$studentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null
    omit?: Prisma.StudentOmit<ExtArgs> | null
    include?: Prisma.StudentInclude<ExtArgs> | null
  where?: Prisma.StudentWhereInput
}

export type User$refreshTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null
  where?: Prisma.RefreshTokenWhereInput
  orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[]
  cursor?: Prisma.RefreshTokenWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[]
}

export type User$passwordResetTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetTokenSelect<ExtArgs> | null
    omit?: Prisma.PasswordResetTokenOmit<ExtArgs> | null
    include?: Prisma.PasswordResetTokenInclude<ExtArgs> | null
  where?: Prisma.PasswordResetTokenWhereInput
  orderBy?: Prisma.PasswordResetTokenOrderByWithRelationInput | Prisma.PasswordResetTokenOrderByWithRelationInput[]
  cursor?: Prisma.PasswordResetTokenWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.PasswordResetTokenScalarFieldEnum | Prisma.PasswordResetTokenScalarFieldEnum[]
}

export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null
    omit?: Prisma.UserOmit<ExtArgs> | null
    include?: Prisma.UserInclude<ExtArgs> | null
}
