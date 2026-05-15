
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type DepartmentModel = runtime.Types.Result.DefaultSelection<Prisma.$DepartmentPayload>

export type AggregateDepartment = {
  _count: DepartmentCountAggregateOutputType | null
  _min: DepartmentMinAggregateOutputType | null
  _max: DepartmentMaxAggregateOutputType | null
}

export type DepartmentMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  name: string | null
  code: string | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type DepartmentMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  name: string | null
  code: string | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type DepartmentCountAggregateOutputType = {
  id: number
  tenantId: number
  name: number
  code: number
  isActive: number
  createdAt: number
  updatedAt: number
  _all: number
}

export type DepartmentMinAggregateInputType = {
  id?: true
  tenantId?: true
  name?: true
  code?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
}

export type DepartmentMaxAggregateInputType = {
  id?: true
  tenantId?: true
  name?: true
  code?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
}

export type DepartmentCountAggregateInputType = {
  id?: true
  tenantId?: true
  name?: true
  code?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type DepartmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DepartmentWhereInput
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[]
    cursor?: Prisma.DepartmentWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | DepartmentCountAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
}

export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
      [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateDepartment[P]>
    : Prisma.GetScalarType<T[P], AggregateDepartment[P]>
}

export type DepartmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.DepartmentWhereInput
  orderBy?: Prisma.DepartmentOrderByWithAggregationInput | Prisma.DepartmentOrderByWithAggregationInput[]
  by: Prisma.DepartmentScalarFieldEnum[] | Prisma.DepartmentScalarFieldEnum
  having?: Prisma.DepartmentScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: DepartmentCountAggregateInputType | true
  _min?: DepartmentMinAggregateInputType
  _max?: DepartmentMaxAggregateInputType
}

export type DepartmentGroupByOutputType = {
  id: string
  tenantId: string
  name: string
  code: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count: DepartmentCountAggregateOutputType | null
  _min: DepartmentMinAggregateOutputType | null
  _max: DepartmentMaxAggregateOutputType | null
}

export type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<DepartmentGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], DepartmentGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], DepartmentGroupByOutputType[P]>
      }
    >
  >

export type DepartmentWhereInput = {
  AND?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[]
  OR?: Prisma.DepartmentWhereInput[]
  NOT?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[]
  id?: Prisma.StringFilter<"Department"> | string
  tenantId?: Prisma.StringFilter<"Department"> | string
  name?: Prisma.StringFilter<"Department"> | string
  code?: Prisma.StringFilter<"Department"> | string
  isActive?: Prisma.BoolFilter<"Department"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Department"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Department"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  hods?: Prisma.UserListRelationFilter
  programs?: Prisma.ProgramListRelationFilter
  students?: Prisma.StudentListRelationFilter
}

export type DepartmentOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  hods?: Prisma.UserOrderByRelationAggregateInput
  programs?: Prisma.ProgramOrderByRelationAggregateInput
  students?: Prisma.StudentOrderByRelationAggregateInput
}

export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  tenantId_code?: Prisma.DepartmentTenantIdCodeCompoundUniqueInput
  AND?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[]
  OR?: Prisma.DepartmentWhereInput[]
  NOT?: Prisma.DepartmentWhereInput | Prisma.DepartmentWhereInput[]
  tenantId?: Prisma.StringFilter<"Department"> | string
  name?: Prisma.StringFilter<"Department"> | string
  code?: Prisma.StringFilter<"Department"> | string
  isActive?: Prisma.BoolFilter<"Department"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Department"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Department"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  hods?: Prisma.UserListRelationFilter
  programs?: Prisma.ProgramListRelationFilter
  students?: Prisma.StudentListRelationFilter
}, "id" | "tenantId_code">

export type DepartmentOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.DepartmentCountOrderByAggregateInput
  _max?: Prisma.DepartmentMaxOrderByAggregateInput
  _min?: Prisma.DepartmentMinOrderByAggregateInput
}

export type DepartmentScalarWhereWithAggregatesInput = {
  AND?: Prisma.DepartmentScalarWhereWithAggregatesInput | Prisma.DepartmentScalarWhereWithAggregatesInput[]
  OR?: Prisma.DepartmentScalarWhereWithAggregatesInput[]
  NOT?: Prisma.DepartmentScalarWhereWithAggregatesInput | Prisma.DepartmentScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Department"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"Department"> | string
  name?: Prisma.StringWithAggregatesFilter<"Department"> | string
  code?: Prisma.StringWithAggregatesFilter<"Department"> | string
  isActive?: Prisma.BoolWithAggregatesFilter<"Department"> | boolean
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Department"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Department"> | Date | string
}

export type DepartmentCreateInput = {
  id?: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutDepartmentsInput
  hods?: Prisma.UserCreateNestedManyWithoutHodDepartmentInput
  programs?: Prisma.ProgramCreateNestedManyWithoutDepartmentInput
  students?: Prisma.StudentCreateNestedManyWithoutDepartmentInput
}

export type DepartmentUncheckedCreateInput = {
  id?: string
  tenantId: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  hods?: Prisma.UserUncheckedCreateNestedManyWithoutHodDepartmentInput
  programs?: Prisma.ProgramUncheckedCreateNestedManyWithoutDepartmentInput
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutDepartmentInput
}

export type DepartmentUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutDepartmentsNestedInput
  hods?: Prisma.UserUpdateManyWithoutHodDepartmentNestedInput
  programs?: Prisma.ProgramUpdateManyWithoutDepartmentNestedInput
  students?: Prisma.StudentUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  hods?: Prisma.UserUncheckedUpdateManyWithoutHodDepartmentNestedInput
  programs?: Prisma.ProgramUncheckedUpdateManyWithoutDepartmentNestedInput
  students?: Prisma.StudentUncheckedUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentCreateManyInput = {
  id?: string
  tenantId: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type DepartmentUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type DepartmentUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type DepartmentListRelationFilter = {
  every?: Prisma.DepartmentWhereInput
  some?: Prisma.DepartmentWhereInput
  none?: Prisma.DepartmentWhereInput
}

export type DepartmentOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type DepartmentNullableScalarRelationFilter = {
  is?: Prisma.DepartmentWhereInput | null
  isNot?: Prisma.DepartmentWhereInput | null
}

export type DepartmentTenantIdCodeCompoundUniqueInput = {
  tenantId: string
  code: string
}

export type DepartmentCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type DepartmentMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type DepartmentMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type DepartmentScalarRelationFilter = {
  is?: Prisma.DepartmentWhereInput
  isNot?: Prisma.DepartmentWhereInput
}

export type DepartmentCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutTenantInput, Prisma.DepartmentUncheckedCreateWithoutTenantInput> | Prisma.DepartmentCreateWithoutTenantInput[] | Prisma.DepartmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutTenantInput | Prisma.DepartmentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.DepartmentCreateManyTenantInputEnvelope
  connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
}

export type DepartmentUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutTenantInput, Prisma.DepartmentUncheckedCreateWithoutTenantInput> | Prisma.DepartmentCreateWithoutTenantInput[] | Prisma.DepartmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutTenantInput | Prisma.DepartmentCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.DepartmentCreateManyTenantInputEnvelope
  connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
}

export type DepartmentUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutTenantInput, Prisma.DepartmentUncheckedCreateWithoutTenantInput> | Prisma.DepartmentCreateWithoutTenantInput[] | Prisma.DepartmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutTenantInput | Prisma.DepartmentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.DepartmentUpsertWithWhereUniqueWithoutTenantInput | Prisma.DepartmentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.DepartmentCreateManyTenantInputEnvelope
  set?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  disconnect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  delete?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  update?: Prisma.DepartmentUpdateWithWhereUniqueWithoutTenantInput | Prisma.DepartmentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.DepartmentUpdateManyWithWhereWithoutTenantInput | Prisma.DepartmentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[]
}

export type DepartmentUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutTenantInput, Prisma.DepartmentUncheckedCreateWithoutTenantInput> | Prisma.DepartmentCreateWithoutTenantInput[] | Prisma.DepartmentUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutTenantInput | Prisma.DepartmentCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.DepartmentUpsertWithWhereUniqueWithoutTenantInput | Prisma.DepartmentUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.DepartmentCreateManyTenantInputEnvelope
  set?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  disconnect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  delete?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  connect?: Prisma.DepartmentWhereUniqueInput | Prisma.DepartmentWhereUniqueInput[]
  update?: Prisma.DepartmentUpdateWithWhereUniqueWithoutTenantInput | Prisma.DepartmentUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.DepartmentUpdateManyWithWhereWithoutTenantInput | Prisma.DepartmentUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[]
}

export type DepartmentCreateNestedOneWithoutHodsInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutHodsInput, Prisma.DepartmentUncheckedCreateWithoutHodsInput>
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutHodsInput
  connect?: Prisma.DepartmentWhereUniqueInput
}

export type DepartmentUpdateOneWithoutHodsNestedInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutHodsInput, Prisma.DepartmentUncheckedCreateWithoutHodsInput>
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutHodsInput
  upsert?: Prisma.DepartmentUpsertWithoutHodsInput
  disconnect?: Prisma.DepartmentWhereInput | boolean
  delete?: Prisma.DepartmentWhereInput | boolean
  connect?: Prisma.DepartmentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.DepartmentUpdateToOneWithWhereWithoutHodsInput, Prisma.DepartmentUpdateWithoutHodsInput>, Prisma.DepartmentUncheckedUpdateWithoutHodsInput>
}

export type DepartmentCreateNestedOneWithoutProgramsInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutProgramsInput, Prisma.DepartmentUncheckedCreateWithoutProgramsInput>
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutProgramsInput
  connect?: Prisma.DepartmentWhereUniqueInput
}

export type DepartmentUpdateOneRequiredWithoutProgramsNestedInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutProgramsInput, Prisma.DepartmentUncheckedCreateWithoutProgramsInput>
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutProgramsInput
  upsert?: Prisma.DepartmentUpsertWithoutProgramsInput
  connect?: Prisma.DepartmentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.DepartmentUpdateToOneWithWhereWithoutProgramsInput, Prisma.DepartmentUpdateWithoutProgramsInput>, Prisma.DepartmentUncheckedUpdateWithoutProgramsInput>
}

export type DepartmentCreateNestedOneWithoutStudentsInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutStudentsInput, Prisma.DepartmentUncheckedCreateWithoutStudentsInput>
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutStudentsInput
  connect?: Prisma.DepartmentWhereUniqueInput
}

export type DepartmentUpdateOneRequiredWithoutStudentsNestedInput = {
  create?: Prisma.XOR<Prisma.DepartmentCreateWithoutStudentsInput, Prisma.DepartmentUncheckedCreateWithoutStudentsInput>
  connectOrCreate?: Prisma.DepartmentCreateOrConnectWithoutStudentsInput
  upsert?: Prisma.DepartmentUpsertWithoutStudentsInput
  connect?: Prisma.DepartmentWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.DepartmentUpdateToOneWithWhereWithoutStudentsInput, Prisma.DepartmentUpdateWithoutStudentsInput>, Prisma.DepartmentUncheckedUpdateWithoutStudentsInput>
}

export type DepartmentCreateWithoutTenantInput = {
  id?: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  hods?: Prisma.UserCreateNestedManyWithoutHodDepartmentInput
  programs?: Prisma.ProgramCreateNestedManyWithoutDepartmentInput
  students?: Prisma.StudentCreateNestedManyWithoutDepartmentInput
}

export type DepartmentUncheckedCreateWithoutTenantInput = {
  id?: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  hods?: Prisma.UserUncheckedCreateNestedManyWithoutHodDepartmentInput
  programs?: Prisma.ProgramUncheckedCreateNestedManyWithoutDepartmentInput
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutDepartmentInput
}

export type DepartmentCreateOrConnectWithoutTenantInput = {
  where: Prisma.DepartmentWhereUniqueInput
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutTenantInput, Prisma.DepartmentUncheckedCreateWithoutTenantInput>
}

export type DepartmentCreateManyTenantInputEnvelope = {
  data: Prisma.DepartmentCreateManyTenantInput | Prisma.DepartmentCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type DepartmentUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.DepartmentWhereUniqueInput
  update: Prisma.XOR<Prisma.DepartmentUpdateWithoutTenantInput, Prisma.DepartmentUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutTenantInput, Prisma.DepartmentUncheckedCreateWithoutTenantInput>
}

export type DepartmentUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.DepartmentWhereUniqueInput
  data: Prisma.XOR<Prisma.DepartmentUpdateWithoutTenantInput, Prisma.DepartmentUncheckedUpdateWithoutTenantInput>
}

export type DepartmentUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.DepartmentScalarWhereInput
  data: Prisma.XOR<Prisma.DepartmentUpdateManyMutationInput, Prisma.DepartmentUncheckedUpdateManyWithoutTenantInput>
}

export type DepartmentScalarWhereInput = {
  AND?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[]
  OR?: Prisma.DepartmentScalarWhereInput[]
  NOT?: Prisma.DepartmentScalarWhereInput | Prisma.DepartmentScalarWhereInput[]
  id?: Prisma.StringFilter<"Department"> | string
  tenantId?: Prisma.StringFilter<"Department"> | string
  name?: Prisma.StringFilter<"Department"> | string
  code?: Prisma.StringFilter<"Department"> | string
  isActive?: Prisma.BoolFilter<"Department"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Department"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Department"> | Date | string
}

export type DepartmentCreateWithoutHodsInput = {
  id?: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutDepartmentsInput
  programs?: Prisma.ProgramCreateNestedManyWithoutDepartmentInput
  students?: Prisma.StudentCreateNestedManyWithoutDepartmentInput
}

export type DepartmentUncheckedCreateWithoutHodsInput = {
  id?: string
  tenantId: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  programs?: Prisma.ProgramUncheckedCreateNestedManyWithoutDepartmentInput
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutDepartmentInput
}

export type DepartmentCreateOrConnectWithoutHodsInput = {
  where: Prisma.DepartmentWhereUniqueInput
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutHodsInput, Prisma.DepartmentUncheckedCreateWithoutHodsInput>
}

export type DepartmentUpsertWithoutHodsInput = {
  update: Prisma.XOR<Prisma.DepartmentUpdateWithoutHodsInput, Prisma.DepartmentUncheckedUpdateWithoutHodsInput>
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutHodsInput, Prisma.DepartmentUncheckedCreateWithoutHodsInput>
  where?: Prisma.DepartmentWhereInput
}

export type DepartmentUpdateToOneWithWhereWithoutHodsInput = {
  where?: Prisma.DepartmentWhereInput
  data: Prisma.XOR<Prisma.DepartmentUpdateWithoutHodsInput, Prisma.DepartmentUncheckedUpdateWithoutHodsInput>
}

export type DepartmentUpdateWithoutHodsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutDepartmentsNestedInput
  programs?: Prisma.ProgramUpdateManyWithoutDepartmentNestedInput
  students?: Prisma.StudentUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentUncheckedUpdateWithoutHodsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  programs?: Prisma.ProgramUncheckedUpdateManyWithoutDepartmentNestedInput
  students?: Prisma.StudentUncheckedUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentCreateWithoutProgramsInput = {
  id?: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutDepartmentsInput
  hods?: Prisma.UserCreateNestedManyWithoutHodDepartmentInput
  students?: Prisma.StudentCreateNestedManyWithoutDepartmentInput
}

export type DepartmentUncheckedCreateWithoutProgramsInput = {
  id?: string
  tenantId: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  hods?: Prisma.UserUncheckedCreateNestedManyWithoutHodDepartmentInput
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutDepartmentInput
}

export type DepartmentCreateOrConnectWithoutProgramsInput = {
  where: Prisma.DepartmentWhereUniqueInput
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutProgramsInput, Prisma.DepartmentUncheckedCreateWithoutProgramsInput>
}

export type DepartmentUpsertWithoutProgramsInput = {
  update: Prisma.XOR<Prisma.DepartmentUpdateWithoutProgramsInput, Prisma.DepartmentUncheckedUpdateWithoutProgramsInput>
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutProgramsInput, Prisma.DepartmentUncheckedCreateWithoutProgramsInput>
  where?: Prisma.DepartmentWhereInput
}

export type DepartmentUpdateToOneWithWhereWithoutProgramsInput = {
  where?: Prisma.DepartmentWhereInput
  data: Prisma.XOR<Prisma.DepartmentUpdateWithoutProgramsInput, Prisma.DepartmentUncheckedUpdateWithoutProgramsInput>
}

export type DepartmentUpdateWithoutProgramsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutDepartmentsNestedInput
  hods?: Prisma.UserUpdateManyWithoutHodDepartmentNestedInput
  students?: Prisma.StudentUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentUncheckedUpdateWithoutProgramsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  hods?: Prisma.UserUncheckedUpdateManyWithoutHodDepartmentNestedInput
  students?: Prisma.StudentUncheckedUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentCreateWithoutStudentsInput = {
  id?: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutDepartmentsInput
  hods?: Prisma.UserCreateNestedManyWithoutHodDepartmentInput
  programs?: Prisma.ProgramCreateNestedManyWithoutDepartmentInput
}

export type DepartmentUncheckedCreateWithoutStudentsInput = {
  id?: string
  tenantId: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  hods?: Prisma.UserUncheckedCreateNestedManyWithoutHodDepartmentInput
  programs?: Prisma.ProgramUncheckedCreateNestedManyWithoutDepartmentInput
}

export type DepartmentCreateOrConnectWithoutStudentsInput = {
  where: Prisma.DepartmentWhereUniqueInput
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutStudentsInput, Prisma.DepartmentUncheckedCreateWithoutStudentsInput>
}

export type DepartmentUpsertWithoutStudentsInput = {
  update: Prisma.XOR<Prisma.DepartmentUpdateWithoutStudentsInput, Prisma.DepartmentUncheckedUpdateWithoutStudentsInput>
  create: Prisma.XOR<Prisma.DepartmentCreateWithoutStudentsInput, Prisma.DepartmentUncheckedCreateWithoutStudentsInput>
  where?: Prisma.DepartmentWhereInput
}

export type DepartmentUpdateToOneWithWhereWithoutStudentsInput = {
  where?: Prisma.DepartmentWhereInput
  data: Prisma.XOR<Prisma.DepartmentUpdateWithoutStudentsInput, Prisma.DepartmentUncheckedUpdateWithoutStudentsInput>
}

export type DepartmentUpdateWithoutStudentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutDepartmentsNestedInput
  hods?: Prisma.UserUpdateManyWithoutHodDepartmentNestedInput
  programs?: Prisma.ProgramUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentUncheckedUpdateWithoutStudentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  hods?: Prisma.UserUncheckedUpdateManyWithoutHodDepartmentNestedInput
  programs?: Prisma.ProgramUncheckedUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentCreateManyTenantInput = {
  id?: string
  name: string
  code: string
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type DepartmentUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  hods?: Prisma.UserUpdateManyWithoutHodDepartmentNestedInput
  programs?: Prisma.ProgramUpdateManyWithoutDepartmentNestedInput
  students?: Prisma.StudentUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  hods?: Prisma.UserUncheckedUpdateManyWithoutHodDepartmentNestedInput
  programs?: Prisma.ProgramUncheckedUpdateManyWithoutDepartmentNestedInput
  students?: Prisma.StudentUncheckedUpdateManyWithoutDepartmentNestedInput
}

export type DepartmentUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type DepartmentCountOutputType = {
  hods: number
  programs: number
  students: number
}

export type DepartmentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  hods?: boolean | DepartmentCountOutputTypeCountHodsArgs
  programs?: boolean | DepartmentCountOutputTypeCountProgramsArgs
  students?: boolean | DepartmentCountOutputTypeCountStudentsArgs
}

export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentCountOutputTypeSelect<ExtArgs> | null
}

export type DepartmentCountOutputTypeCountHodsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.UserWhereInput
}

export type DepartmentCountOutputTypeCountProgramsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ProgramWhereInput
}

export type DepartmentCountOutputTypeCountStudentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.StudentWhereInput
}

export type DepartmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  name?: boolean
  code?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  hods?: boolean | Prisma.Department$hodsArgs<ExtArgs>
  programs?: boolean | Prisma.Department$programsArgs<ExtArgs>
  students?: boolean | Prisma.Department$studentsArgs<ExtArgs>
  _count?: boolean | Prisma.DepartmentCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["department"]>

export type DepartmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  name?: boolean
  code?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["department"]>

export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  name?: boolean
  code?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["department"]>

export type DepartmentSelectScalar = {
  id?: boolean
  tenantId?: boolean
  name?: boolean
  code?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type DepartmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "name" | "code" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["department"]>
export type DepartmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  hods?: boolean | Prisma.Department$hodsArgs<ExtArgs>
  programs?: boolean | Prisma.Department$programsArgs<ExtArgs>
  students?: boolean | Prisma.Department$studentsArgs<ExtArgs>
  _count?: boolean | Prisma.DepartmentCountOutputTypeDefaultArgs<ExtArgs>
}
export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}
export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}

export type $DepartmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Department"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    hods: Prisma.$UserPayload<ExtArgs>[]
    programs: Prisma.$ProgramPayload<ExtArgs>[]
    students: Prisma.$StudentPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    name: string
    code: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["department"]>
  composites: {}
}

export type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DepartmentPayload, S>

export type DepartmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DepartmentCountAggregateInputType | true
  }

export interface DepartmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    findUnique<T extends DepartmentFindUniqueArgs>(args: Prisma.SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends DepartmentFindFirstArgs>(args?: Prisma.SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends DepartmentFindManyArgs>(args?: Prisma.SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends DepartmentCreateArgs>(args: Prisma.SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends DepartmentCreateManyArgs>(args?: Prisma.SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends DepartmentDeleteArgs>(args: Prisma.SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends DepartmentUpdateArgs>(args: Prisma.SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends DepartmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends DepartmentUpdateManyArgs>(args: Prisma.SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends DepartmentUpsertArgs>(args: Prisma.SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends DepartmentCountArgs>(
    args?: Prisma.Subset<T, DepartmentCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], DepartmentCountAggregateOutputType>
      : number
  >

    aggregate<T extends DepartmentAggregateArgs>(args: Prisma.Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    groupBy<
    T extends DepartmentGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: DepartmentGroupByArgs['orderBy'] }
      : { orderBy?: DepartmentGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: DepartmentFieldRefs;
}

export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  hods<T extends Prisma.Department$hodsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Department$hodsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  programs<T extends Prisma.Department$programsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Department$programsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  students<T extends Prisma.Department$studentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Department$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface DepartmentFieldRefs {
  readonly id: Prisma.FieldRef<"Department", 'String'>
  readonly tenantId: Prisma.FieldRef<"Department", 'String'>
  readonly name: Prisma.FieldRef<"Department", 'String'>
  readonly code: Prisma.FieldRef<"Department", 'String'>
  readonly isActive: Prisma.FieldRef<"Department", 'Boolean'>
  readonly createdAt: Prisma.FieldRef<"Department", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Department", 'DateTime'>
}

export type DepartmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    where: Prisma.DepartmentWhereUniqueInput
}

export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    where: Prisma.DepartmentWhereUniqueInput
}

export type DepartmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    where?: Prisma.DepartmentWhereInput
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[]
    cursor?: Prisma.DepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.DepartmentScalarFieldEnum | Prisma.DepartmentScalarFieldEnum[]
}

export type DepartmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    where?: Prisma.DepartmentWhereInput
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[]
    cursor?: Prisma.DepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.DepartmentScalarFieldEnum | Prisma.DepartmentScalarFieldEnum[]
}

export type DepartmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    where?: Prisma.DepartmentWhereInput
    orderBy?: Prisma.DepartmentOrderByWithRelationInput | Prisma.DepartmentOrderByWithRelationInput[]
    cursor?: Prisma.DepartmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.DepartmentScalarFieldEnum | Prisma.DepartmentScalarFieldEnum[]
}

export type DepartmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.DepartmentCreateInput, Prisma.DepartmentUncheckedCreateInput>
}

export type DepartmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DepartmentCreateManyInput | Prisma.DepartmentCreateManyInput[]
  skipDuplicates?: boolean
}

export type DepartmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    data: Prisma.DepartmentCreateManyInput | Prisma.DepartmentCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.DepartmentIncludeCreateManyAndReturn<ExtArgs> | null
}

export type DepartmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.DepartmentUpdateInput, Prisma.DepartmentUncheckedUpdateInput>
    where: Prisma.DepartmentWhereUniqueInput
}

export type DepartmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DepartmentUpdateManyMutationInput, Prisma.DepartmentUncheckedUpdateManyInput>
    where?: Prisma.DepartmentWhereInput
    limit?: number
}

export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.DepartmentUpdateManyMutationInput, Prisma.DepartmentUncheckedUpdateManyInput>
    where?: Prisma.DepartmentWhereInput
    limit?: number
    include?: Prisma.DepartmentIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type DepartmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    where: Prisma.DepartmentWhereUniqueInput
    create: Prisma.XOR<Prisma.DepartmentCreateInput, Prisma.DepartmentUncheckedCreateInput>
    update: Prisma.XOR<Prisma.DepartmentUpdateInput, Prisma.DepartmentUncheckedUpdateInput>
}

export type DepartmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
    where: Prisma.DepartmentWhereUniqueInput
}

export type DepartmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DepartmentWhereInput
    limit?: number
}

export type Department$hodsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type Department$programsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
  where?: Prisma.ProgramWhereInput
  orderBy?: Prisma.ProgramOrderByWithRelationInput | Prisma.ProgramOrderByWithRelationInput[]
  cursor?: Prisma.ProgramWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.ProgramScalarFieldEnum | Prisma.ProgramScalarFieldEnum[]
}

export type Department$studentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type DepartmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DepartmentSelect<ExtArgs> | null
    omit?: Prisma.DepartmentOmit<ExtArgs> | null
    include?: Prisma.DepartmentInclude<ExtArgs> | null
}
