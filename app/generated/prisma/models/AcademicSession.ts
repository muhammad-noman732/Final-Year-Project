
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type AcademicSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$AcademicSessionPayload>

export type AggregateAcademicSession = {
  _count: AcademicSessionCountAggregateOutputType | null
  _avg: AcademicSessionAvgAggregateOutputType | null
  _sum: AcademicSessionSumAggregateOutputType | null
  _min: AcademicSessionMinAggregateOutputType | null
  _max: AcademicSessionMaxAggregateOutputType | null
}

export type AcademicSessionAvgAggregateOutputType = {
  startYear: number | null
  endYear: number | null
}

export type AcademicSessionSumAggregateOutputType = {
  startYear: number | null
  endYear: number | null
}

export type AcademicSessionMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  name: string | null
  startYear: number | null
  endYear: number | null
  isCurrent: boolean | null
  createdAt: Date | null
}

export type AcademicSessionMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  name: string | null
  startYear: number | null
  endYear: number | null
  isCurrent: boolean | null
  createdAt: Date | null
}

export type AcademicSessionCountAggregateOutputType = {
  id: number
  tenantId: number
  name: number
  startYear: number
  endYear: number
  isCurrent: number
  createdAt: number
  _all: number
}

export type AcademicSessionAvgAggregateInputType = {
  startYear?: true
  endYear?: true
}

export type AcademicSessionSumAggregateInputType = {
  startYear?: true
  endYear?: true
}

export type AcademicSessionMinAggregateInputType = {
  id?: true
  tenantId?: true
  name?: true
  startYear?: true
  endYear?: true
  isCurrent?: true
  createdAt?: true
}

export type AcademicSessionMaxAggregateInputType = {
  id?: true
  tenantId?: true
  name?: true
  startYear?: true
  endYear?: true
  isCurrent?: true
  createdAt?: true
}

export type AcademicSessionCountAggregateInputType = {
  id?: true
  tenantId?: true
  name?: true
  startYear?: true
  endYear?: true
  isCurrent?: true
  createdAt?: true
  _all?: true
}

export type AcademicSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AcademicSessionWhereInput
    orderBy?: Prisma.AcademicSessionOrderByWithRelationInput | Prisma.AcademicSessionOrderByWithRelationInput[]
    cursor?: Prisma.AcademicSessionWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | AcademicSessionCountAggregateInputType
    _avg?: AcademicSessionAvgAggregateInputType
    _sum?: AcademicSessionSumAggregateInputType
    _min?: AcademicSessionMinAggregateInputType
    _max?: AcademicSessionMaxAggregateInputType
}

export type GetAcademicSessionAggregateType<T extends AcademicSessionAggregateArgs> = {
      [P in keyof T & keyof AggregateAcademicSession]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateAcademicSession[P]>
    : Prisma.GetScalarType<T[P], AggregateAcademicSession[P]>
}

export type AcademicSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.AcademicSessionWhereInput
  orderBy?: Prisma.AcademicSessionOrderByWithAggregationInput | Prisma.AcademicSessionOrderByWithAggregationInput[]
  by: Prisma.AcademicSessionScalarFieldEnum[] | Prisma.AcademicSessionScalarFieldEnum
  having?: Prisma.AcademicSessionScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: AcademicSessionCountAggregateInputType | true
  _avg?: AcademicSessionAvgAggregateInputType
  _sum?: AcademicSessionSumAggregateInputType
  _min?: AcademicSessionMinAggregateInputType
  _max?: AcademicSessionMaxAggregateInputType
}

export type AcademicSessionGroupByOutputType = {
  id: string
  tenantId: string
  name: string
  startYear: number
  endYear: number
  isCurrent: boolean
  createdAt: Date
  _count: AcademicSessionCountAggregateOutputType | null
  _avg: AcademicSessionAvgAggregateOutputType | null
  _sum: AcademicSessionSumAggregateOutputType | null
  _min: AcademicSessionMinAggregateOutputType | null
  _max: AcademicSessionMaxAggregateOutputType | null
}

export type GetAcademicSessionGroupByPayload<T extends AcademicSessionGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<AcademicSessionGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof AcademicSessionGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], AcademicSessionGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], AcademicSessionGroupByOutputType[P]>
      }
    >
  >

export type AcademicSessionWhereInput = {
  AND?: Prisma.AcademicSessionWhereInput | Prisma.AcademicSessionWhereInput[]
  OR?: Prisma.AcademicSessionWhereInput[]
  NOT?: Prisma.AcademicSessionWhereInput | Prisma.AcademicSessionWhereInput[]
  id?: Prisma.StringFilter<"AcademicSession"> | string
  tenantId?: Prisma.StringFilter<"AcademicSession"> | string
  name?: Prisma.StringFilter<"AcademicSession"> | string
  startYear?: Prisma.IntFilter<"AcademicSession"> | number
  endYear?: Prisma.IntFilter<"AcademicSession"> | number
  isCurrent?: Prisma.BoolFilter<"AcademicSession"> | boolean
  createdAt?: Prisma.DateTimeFilter<"AcademicSession"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  students?: Prisma.StudentListRelationFilter
}

export type AcademicSessionOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  startYear?: Prisma.SortOrder
  endYear?: Prisma.SortOrder
  isCurrent?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  students?: Prisma.StudentOrderByRelationAggregateInput
}

export type AcademicSessionWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  tenantId_name?: Prisma.AcademicSessionTenantIdNameCompoundUniqueInput
  AND?: Prisma.AcademicSessionWhereInput | Prisma.AcademicSessionWhereInput[]
  OR?: Prisma.AcademicSessionWhereInput[]
  NOT?: Prisma.AcademicSessionWhereInput | Prisma.AcademicSessionWhereInput[]
  tenantId?: Prisma.StringFilter<"AcademicSession"> | string
  name?: Prisma.StringFilter<"AcademicSession"> | string
  startYear?: Prisma.IntFilter<"AcademicSession"> | number
  endYear?: Prisma.IntFilter<"AcademicSession"> | number
  isCurrent?: Prisma.BoolFilter<"AcademicSession"> | boolean
  createdAt?: Prisma.DateTimeFilter<"AcademicSession"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  students?: Prisma.StudentListRelationFilter
}, "id" | "tenantId_name">

export type AcademicSessionOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  startYear?: Prisma.SortOrder
  endYear?: Prisma.SortOrder
  isCurrent?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  _count?: Prisma.AcademicSessionCountOrderByAggregateInput
  _avg?: Prisma.AcademicSessionAvgOrderByAggregateInput
  _max?: Prisma.AcademicSessionMaxOrderByAggregateInput
  _min?: Prisma.AcademicSessionMinOrderByAggregateInput
  _sum?: Prisma.AcademicSessionSumOrderByAggregateInput
}

export type AcademicSessionScalarWhereWithAggregatesInput = {
  AND?: Prisma.AcademicSessionScalarWhereWithAggregatesInput | Prisma.AcademicSessionScalarWhereWithAggregatesInput[]
  OR?: Prisma.AcademicSessionScalarWhereWithAggregatesInput[]
  NOT?: Prisma.AcademicSessionScalarWhereWithAggregatesInput | Prisma.AcademicSessionScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"AcademicSession"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"AcademicSession"> | string
  name?: Prisma.StringWithAggregatesFilter<"AcademicSession"> | string
  startYear?: Prisma.IntWithAggregatesFilter<"AcademicSession"> | number
  endYear?: Prisma.IntWithAggregatesFilter<"AcademicSession"> | number
  isCurrent?: Prisma.BoolWithAggregatesFilter<"AcademicSession"> | boolean
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"AcademicSession"> | Date | string
}

export type AcademicSessionCreateInput = {
  id?: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutAcademicSessionsInput
  students?: Prisma.StudentCreateNestedManyWithoutSessionInput
}

export type AcademicSessionUncheckedCreateInput = {
  id?: string
  tenantId: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutSessionInput
}

export type AcademicSessionUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutAcademicSessionsNestedInput
  students?: Prisma.StudentUpdateManyWithoutSessionNestedInput
}

export type AcademicSessionUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  students?: Prisma.StudentUncheckedUpdateManyWithoutSessionNestedInput
}

export type AcademicSessionCreateManyInput = {
  id?: string
  tenantId: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
}

export type AcademicSessionUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type AcademicSessionUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type AcademicSessionListRelationFilter = {
  every?: Prisma.AcademicSessionWhereInput
  some?: Prisma.AcademicSessionWhereInput
  none?: Prisma.AcademicSessionWhereInput
}

export type AcademicSessionOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type AcademicSessionTenantIdNameCompoundUniqueInput = {
  tenantId: string
  name: string
}

export type AcademicSessionCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  startYear?: Prisma.SortOrder
  endYear?: Prisma.SortOrder
  isCurrent?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type AcademicSessionAvgOrderByAggregateInput = {
  startYear?: Prisma.SortOrder
  endYear?: Prisma.SortOrder
}

export type AcademicSessionMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  startYear?: Prisma.SortOrder
  endYear?: Prisma.SortOrder
  isCurrent?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type AcademicSessionMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  startYear?: Prisma.SortOrder
  endYear?: Prisma.SortOrder
  isCurrent?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type AcademicSessionSumOrderByAggregateInput = {
  startYear?: Prisma.SortOrder
  endYear?: Prisma.SortOrder
}

export type AcademicSessionScalarRelationFilter = {
  is?: Prisma.AcademicSessionWhereInput
  isNot?: Prisma.AcademicSessionWhereInput
}

export type AcademicSessionCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.AcademicSessionCreateWithoutTenantInput, Prisma.AcademicSessionUncheckedCreateWithoutTenantInput> | Prisma.AcademicSessionCreateWithoutTenantInput[] | Prisma.AcademicSessionUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.AcademicSessionCreateOrConnectWithoutTenantInput | Prisma.AcademicSessionCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.AcademicSessionCreateManyTenantInputEnvelope
  connect?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
}

export type AcademicSessionUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.AcademicSessionCreateWithoutTenantInput, Prisma.AcademicSessionUncheckedCreateWithoutTenantInput> | Prisma.AcademicSessionCreateWithoutTenantInput[] | Prisma.AcademicSessionUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.AcademicSessionCreateOrConnectWithoutTenantInput | Prisma.AcademicSessionCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.AcademicSessionCreateManyTenantInputEnvelope
  connect?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
}

export type AcademicSessionUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.AcademicSessionCreateWithoutTenantInput, Prisma.AcademicSessionUncheckedCreateWithoutTenantInput> | Prisma.AcademicSessionCreateWithoutTenantInput[] | Prisma.AcademicSessionUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.AcademicSessionCreateOrConnectWithoutTenantInput | Prisma.AcademicSessionCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.AcademicSessionUpsertWithWhereUniqueWithoutTenantInput | Prisma.AcademicSessionUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.AcademicSessionCreateManyTenantInputEnvelope
  set?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  disconnect?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  delete?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  connect?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  update?: Prisma.AcademicSessionUpdateWithWhereUniqueWithoutTenantInput | Prisma.AcademicSessionUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.AcademicSessionUpdateManyWithWhereWithoutTenantInput | Prisma.AcademicSessionUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.AcademicSessionScalarWhereInput | Prisma.AcademicSessionScalarWhereInput[]
}

export type AcademicSessionUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.AcademicSessionCreateWithoutTenantInput, Prisma.AcademicSessionUncheckedCreateWithoutTenantInput> | Prisma.AcademicSessionCreateWithoutTenantInput[] | Prisma.AcademicSessionUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.AcademicSessionCreateOrConnectWithoutTenantInput | Prisma.AcademicSessionCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.AcademicSessionUpsertWithWhereUniqueWithoutTenantInput | Prisma.AcademicSessionUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.AcademicSessionCreateManyTenantInputEnvelope
  set?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  disconnect?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  delete?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  connect?: Prisma.AcademicSessionWhereUniqueInput | Prisma.AcademicSessionWhereUniqueInput[]
  update?: Prisma.AcademicSessionUpdateWithWhereUniqueWithoutTenantInput | Prisma.AcademicSessionUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.AcademicSessionUpdateManyWithWhereWithoutTenantInput | Prisma.AcademicSessionUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.AcademicSessionScalarWhereInput | Prisma.AcademicSessionScalarWhereInput[]
}

export type AcademicSessionCreateNestedOneWithoutStudentsInput = {
  create?: Prisma.XOR<Prisma.AcademicSessionCreateWithoutStudentsInput, Prisma.AcademicSessionUncheckedCreateWithoutStudentsInput>
  connectOrCreate?: Prisma.AcademicSessionCreateOrConnectWithoutStudentsInput
  connect?: Prisma.AcademicSessionWhereUniqueInput
}

export type AcademicSessionUpdateOneRequiredWithoutStudentsNestedInput = {
  create?: Prisma.XOR<Prisma.AcademicSessionCreateWithoutStudentsInput, Prisma.AcademicSessionUncheckedCreateWithoutStudentsInput>
  connectOrCreate?: Prisma.AcademicSessionCreateOrConnectWithoutStudentsInput
  upsert?: Prisma.AcademicSessionUpsertWithoutStudentsInput
  connect?: Prisma.AcademicSessionWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.AcademicSessionUpdateToOneWithWhereWithoutStudentsInput, Prisma.AcademicSessionUpdateWithoutStudentsInput>, Prisma.AcademicSessionUncheckedUpdateWithoutStudentsInput>
}

export type AcademicSessionCreateWithoutTenantInput = {
  id?: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
  students?: Prisma.StudentCreateNestedManyWithoutSessionInput
}

export type AcademicSessionUncheckedCreateWithoutTenantInput = {
  id?: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutSessionInput
}

export type AcademicSessionCreateOrConnectWithoutTenantInput = {
  where: Prisma.AcademicSessionWhereUniqueInput
  create: Prisma.XOR<Prisma.AcademicSessionCreateWithoutTenantInput, Prisma.AcademicSessionUncheckedCreateWithoutTenantInput>
}

export type AcademicSessionCreateManyTenantInputEnvelope = {
  data: Prisma.AcademicSessionCreateManyTenantInput | Prisma.AcademicSessionCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type AcademicSessionUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.AcademicSessionWhereUniqueInput
  update: Prisma.XOR<Prisma.AcademicSessionUpdateWithoutTenantInput, Prisma.AcademicSessionUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.AcademicSessionCreateWithoutTenantInput, Prisma.AcademicSessionUncheckedCreateWithoutTenantInput>
}

export type AcademicSessionUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.AcademicSessionWhereUniqueInput
  data: Prisma.XOR<Prisma.AcademicSessionUpdateWithoutTenantInput, Prisma.AcademicSessionUncheckedUpdateWithoutTenantInput>
}

export type AcademicSessionUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.AcademicSessionScalarWhereInput
  data: Prisma.XOR<Prisma.AcademicSessionUpdateManyMutationInput, Prisma.AcademicSessionUncheckedUpdateManyWithoutTenantInput>
}

export type AcademicSessionScalarWhereInput = {
  AND?: Prisma.AcademicSessionScalarWhereInput | Prisma.AcademicSessionScalarWhereInput[]
  OR?: Prisma.AcademicSessionScalarWhereInput[]
  NOT?: Prisma.AcademicSessionScalarWhereInput | Prisma.AcademicSessionScalarWhereInput[]
  id?: Prisma.StringFilter<"AcademicSession"> | string
  tenantId?: Prisma.StringFilter<"AcademicSession"> | string
  name?: Prisma.StringFilter<"AcademicSession"> | string
  startYear?: Prisma.IntFilter<"AcademicSession"> | number
  endYear?: Prisma.IntFilter<"AcademicSession"> | number
  isCurrent?: Prisma.BoolFilter<"AcademicSession"> | boolean
  createdAt?: Prisma.DateTimeFilter<"AcademicSession"> | Date | string
}

export type AcademicSessionCreateWithoutStudentsInput = {
  id?: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutAcademicSessionsInput
}

export type AcademicSessionUncheckedCreateWithoutStudentsInput = {
  id?: string
  tenantId: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
}

export type AcademicSessionCreateOrConnectWithoutStudentsInput = {
  where: Prisma.AcademicSessionWhereUniqueInput
  create: Prisma.XOR<Prisma.AcademicSessionCreateWithoutStudentsInput, Prisma.AcademicSessionUncheckedCreateWithoutStudentsInput>
}

export type AcademicSessionUpsertWithoutStudentsInput = {
  update: Prisma.XOR<Prisma.AcademicSessionUpdateWithoutStudentsInput, Prisma.AcademicSessionUncheckedUpdateWithoutStudentsInput>
  create: Prisma.XOR<Prisma.AcademicSessionCreateWithoutStudentsInput, Prisma.AcademicSessionUncheckedCreateWithoutStudentsInput>
  where?: Prisma.AcademicSessionWhereInput
}

export type AcademicSessionUpdateToOneWithWhereWithoutStudentsInput = {
  where?: Prisma.AcademicSessionWhereInput
  data: Prisma.XOR<Prisma.AcademicSessionUpdateWithoutStudentsInput, Prisma.AcademicSessionUncheckedUpdateWithoutStudentsInput>
}

export type AcademicSessionUpdateWithoutStudentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutAcademicSessionsNestedInput
}

export type AcademicSessionUncheckedUpdateWithoutStudentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type AcademicSessionCreateManyTenantInput = {
  id?: string
  name: string
  startYear: number
  endYear: number
  isCurrent?: boolean
  createdAt?: Date | string
}

export type AcademicSessionUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  students?: Prisma.StudentUpdateManyWithoutSessionNestedInput
}

export type AcademicSessionUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  students?: Prisma.StudentUncheckedUpdateManyWithoutSessionNestedInput
}

export type AcademicSessionUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  startYear?: Prisma.IntFieldUpdateOperationsInput | number
  endYear?: Prisma.IntFieldUpdateOperationsInput | number
  isCurrent?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type AcademicSessionCountOutputType = {
  students: number
}

export type AcademicSessionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  students?: boolean | AcademicSessionCountOutputTypeCountStudentsArgs
}

export type AcademicSessionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionCountOutputTypeSelect<ExtArgs> | null
}

export type AcademicSessionCountOutputTypeCountStudentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.StudentWhereInput
}

export type AcademicSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  name?: boolean
  startYear?: boolean
  endYear?: boolean
  isCurrent?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  students?: boolean | Prisma.AcademicSession$studentsArgs<ExtArgs>
  _count?: boolean | Prisma.AcademicSessionCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["academicSession"]>

export type AcademicSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  name?: boolean
  startYear?: boolean
  endYear?: boolean
  isCurrent?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["academicSession"]>

export type AcademicSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  name?: boolean
  startYear?: boolean
  endYear?: boolean
  isCurrent?: boolean
  createdAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["academicSession"]>

export type AcademicSessionSelectScalar = {
  id?: boolean
  tenantId?: boolean
  name?: boolean
  startYear?: boolean
  endYear?: boolean
  isCurrent?: boolean
  createdAt?: boolean
}

export type AcademicSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "name" | "startYear" | "endYear" | "isCurrent" | "createdAt", ExtArgs["result"]["academicSession"]>
export type AcademicSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  students?: boolean | Prisma.AcademicSession$studentsArgs<ExtArgs>
  _count?: boolean | Prisma.AcademicSessionCountOutputTypeDefaultArgs<ExtArgs>
}
export type AcademicSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}
export type AcademicSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}

export type $AcademicSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "AcademicSession"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    students: Prisma.$StudentPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    name: string
    startYear: number
    endYear: number
    isCurrent: boolean
    createdAt: Date
  }, ExtArgs["result"]["academicSession"]>
  composites: {}
}

export type AcademicSessionGetPayload<S extends boolean | null | undefined | AcademicSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload, S>

export type AcademicSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<AcademicSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AcademicSessionCountAggregateInputType | true
  }

export interface AcademicSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicSession'], meta: { name: 'AcademicSession' } }
    findUnique<T extends AcademicSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, AcademicSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends AcademicSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AcademicSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends AcademicSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, AcademicSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends AcademicSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AcademicSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends AcademicSessionFindManyArgs>(args?: Prisma.SelectSubset<T, AcademicSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends AcademicSessionCreateArgs>(args: Prisma.SelectSubset<T, AcademicSessionCreateArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends AcademicSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, AcademicSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends AcademicSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AcademicSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends AcademicSessionDeleteArgs>(args: Prisma.SelectSubset<T, AcademicSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends AcademicSessionUpdateArgs>(args: Prisma.SelectSubset<T, AcademicSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends AcademicSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AcademicSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends AcademicSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, AcademicSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends AcademicSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AcademicSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends AcademicSessionUpsertArgs>(args: Prisma.SelectSubset<T, AcademicSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__AcademicSessionClient<runtime.Types.Result.GetResult<Prisma.$AcademicSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends AcademicSessionCountArgs>(
    args?: Prisma.Subset<T, AcademicSessionCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], AcademicSessionCountAggregateOutputType>
      : number
  >

    aggregate<T extends AcademicSessionAggregateArgs>(args: Prisma.Subset<T, AcademicSessionAggregateArgs>): Prisma.PrismaPromise<GetAcademicSessionAggregateType<T>>

    groupBy<
    T extends AcademicSessionGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: AcademicSessionGroupByArgs['orderBy'] }
      : { orderBy?: AcademicSessionGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, AcademicSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: AcademicSessionFieldRefs;
}

export interface Prisma__AcademicSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  students<T extends Prisma.AcademicSession$studentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicSession$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface AcademicSessionFieldRefs {
  readonly id: Prisma.FieldRef<"AcademicSession", 'String'>
  readonly tenantId: Prisma.FieldRef<"AcademicSession", 'String'>
  readonly name: Prisma.FieldRef<"AcademicSession", 'String'>
  readonly startYear: Prisma.FieldRef<"AcademicSession", 'Int'>
  readonly endYear: Prisma.FieldRef<"AcademicSession", 'Int'>
  readonly isCurrent: Prisma.FieldRef<"AcademicSession", 'Boolean'>
  readonly createdAt: Prisma.FieldRef<"AcademicSession", 'DateTime'>
}

export type AcademicSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    where: Prisma.AcademicSessionWhereUniqueInput
}

export type AcademicSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    where: Prisma.AcademicSessionWhereUniqueInput
}

export type AcademicSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    where?: Prisma.AcademicSessionWhereInput
    orderBy?: Prisma.AcademicSessionOrderByWithRelationInput | Prisma.AcademicSessionOrderByWithRelationInput[]
    cursor?: Prisma.AcademicSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.AcademicSessionScalarFieldEnum | Prisma.AcademicSessionScalarFieldEnum[]
}

export type AcademicSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    where?: Prisma.AcademicSessionWhereInput
    orderBy?: Prisma.AcademicSessionOrderByWithRelationInput | Prisma.AcademicSessionOrderByWithRelationInput[]
    cursor?: Prisma.AcademicSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.AcademicSessionScalarFieldEnum | Prisma.AcademicSessionScalarFieldEnum[]
}

export type AcademicSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    where?: Prisma.AcademicSessionWhereInput
    orderBy?: Prisma.AcademicSessionOrderByWithRelationInput | Prisma.AcademicSessionOrderByWithRelationInput[]
    cursor?: Prisma.AcademicSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.AcademicSessionScalarFieldEnum | Prisma.AcademicSessionScalarFieldEnum[]
}

export type AcademicSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.AcademicSessionCreateInput, Prisma.AcademicSessionUncheckedCreateInput>
}

export type AcademicSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AcademicSessionCreateManyInput | Prisma.AcademicSessionCreateManyInput[]
  skipDuplicates?: boolean
}

export type AcademicSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    data: Prisma.AcademicSessionCreateManyInput | Prisma.AcademicSessionCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.AcademicSessionIncludeCreateManyAndReturn<ExtArgs> | null
}

export type AcademicSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.AcademicSessionUpdateInput, Prisma.AcademicSessionUncheckedUpdateInput>
    where: Prisma.AcademicSessionWhereUniqueInput
}

export type AcademicSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AcademicSessionUpdateManyMutationInput, Prisma.AcademicSessionUncheckedUpdateManyInput>
    where?: Prisma.AcademicSessionWhereInput
    limit?: number
}

export type AcademicSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.AcademicSessionUpdateManyMutationInput, Prisma.AcademicSessionUncheckedUpdateManyInput>
    where?: Prisma.AcademicSessionWhereInput
    limit?: number
    include?: Prisma.AcademicSessionIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type AcademicSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    where: Prisma.AcademicSessionWhereUniqueInput
    create: Prisma.XOR<Prisma.AcademicSessionCreateInput, Prisma.AcademicSessionUncheckedCreateInput>
    update: Prisma.XOR<Prisma.AcademicSessionUpdateInput, Prisma.AcademicSessionUncheckedUpdateInput>
}

export type AcademicSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
    where: Prisma.AcademicSessionWhereUniqueInput
}

export type AcademicSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AcademicSessionWhereInput
    limit?: number
}

export type AcademicSession$studentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type AcademicSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AcademicSessionSelect<ExtArgs> | null
    omit?: Prisma.AcademicSessionOmit<ExtArgs> | null
    include?: Prisma.AcademicSessionInclude<ExtArgs> | null
}
