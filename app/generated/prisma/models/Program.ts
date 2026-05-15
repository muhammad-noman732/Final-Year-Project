
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type ProgramModel = runtime.Types.Result.DefaultSelection<Prisma.$ProgramPayload>

export type AggregateProgram = {
  _count: ProgramCountAggregateOutputType | null
  _avg: ProgramAvgAggregateOutputType | null
  _sum: ProgramSumAggregateOutputType | null
  _min: ProgramMinAggregateOutputType | null
  _max: ProgramMaxAggregateOutputType | null
}

export type ProgramAvgAggregateOutputType = {
  durationYears: number | null
  totalSemesters: number | null
}

export type ProgramSumAggregateOutputType = {
  durationYears: number | null
  totalSemesters: number | null
}

export type ProgramMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  departmentId: string | null
  name: string | null
  code: string | null
  degreeType: string | null
  durationYears: number | null
  totalSemesters: number | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type ProgramMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  departmentId: string | null
  name: string | null
  code: string | null
  degreeType: string | null
  durationYears: number | null
  totalSemesters: number | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type ProgramCountAggregateOutputType = {
  id: number
  tenantId: number
  departmentId: number
  name: number
  code: number
  degreeType: number
  durationYears: number
  totalSemesters: number
  isActive: number
  createdAt: number
  updatedAt: number
  _all: number
}

export type ProgramAvgAggregateInputType = {
  durationYears?: true
  totalSemesters?: true
}

export type ProgramSumAggregateInputType = {
  durationYears?: true
  totalSemesters?: true
}

export type ProgramMinAggregateInputType = {
  id?: true
  tenantId?: true
  departmentId?: true
  name?: true
  code?: true
  degreeType?: true
  durationYears?: true
  totalSemesters?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
}

export type ProgramMaxAggregateInputType = {
  id?: true
  tenantId?: true
  departmentId?: true
  name?: true
  code?: true
  degreeType?: true
  durationYears?: true
  totalSemesters?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
}

export type ProgramCountAggregateInputType = {
  id?: true
  tenantId?: true
  departmentId?: true
  name?: true
  code?: true
  degreeType?: true
  durationYears?: true
  totalSemesters?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type ProgramAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProgramWhereInput
    orderBy?: Prisma.ProgramOrderByWithRelationInput | Prisma.ProgramOrderByWithRelationInput[]
    cursor?: Prisma.ProgramWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | ProgramCountAggregateInputType
    _avg?: ProgramAvgAggregateInputType
    _sum?: ProgramSumAggregateInputType
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
}

export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
      [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateProgram[P]>
    : Prisma.GetScalarType<T[P], AggregateProgram[P]>
}

export type ProgramGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ProgramWhereInput
  orderBy?: Prisma.ProgramOrderByWithAggregationInput | Prisma.ProgramOrderByWithAggregationInput[]
  by: Prisma.ProgramScalarFieldEnum[] | Prisma.ProgramScalarFieldEnum
  having?: Prisma.ProgramScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: ProgramCountAggregateInputType | true
  _avg?: ProgramAvgAggregateInputType
  _sum?: ProgramSumAggregateInputType
  _min?: ProgramMinAggregateInputType
  _max?: ProgramMaxAggregateInputType
}

export type ProgramGroupByOutputType = {
  id: string
  tenantId: string
  departmentId: string
  name: string
  code: string
  degreeType: string
  durationYears: number
  totalSemesters: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count: ProgramCountAggregateOutputType | null
  _avg: ProgramAvgAggregateOutputType | null
  _sum: ProgramSumAggregateOutputType | null
  _min: ProgramMinAggregateOutputType | null
  _max: ProgramMaxAggregateOutputType | null
}

export type GetProgramGroupByPayload<T extends ProgramGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<ProgramGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], ProgramGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], ProgramGroupByOutputType[P]>
      }
    >
  >

export type ProgramWhereInput = {
  AND?: Prisma.ProgramWhereInput | Prisma.ProgramWhereInput[]
  OR?: Prisma.ProgramWhereInput[]
  NOT?: Prisma.ProgramWhereInput | Prisma.ProgramWhereInput[]
  id?: Prisma.StringFilter<"Program"> | string
  tenantId?: Prisma.StringFilter<"Program"> | string
  departmentId?: Prisma.StringFilter<"Program"> | string
  name?: Prisma.StringFilter<"Program"> | string
  code?: Prisma.StringFilter<"Program"> | string
  degreeType?: Prisma.StringFilter<"Program"> | string
  durationYears?: Prisma.IntFilter<"Program"> | number
  totalSemesters?: Prisma.IntFilter<"Program"> | number
  isActive?: Prisma.BoolFilter<"Program"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Program"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Program"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  department?: Prisma.XOR<Prisma.DepartmentScalarRelationFilter, Prisma.DepartmentWhereInput>
  students?: Prisma.StudentListRelationFilter
  feeStructures?: Prisma.FeeStructureListRelationFilter
}

export type ProgramOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  degreeType?: Prisma.SortOrder
  durationYears?: Prisma.SortOrder
  totalSemesters?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  department?: Prisma.DepartmentOrderByWithRelationInput
  students?: Prisma.StudentOrderByRelationAggregateInput
  feeStructures?: Prisma.FeeStructureOrderByRelationAggregateInput
}

export type ProgramWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  tenantId_code?: Prisma.ProgramTenantIdCodeCompoundUniqueInput
  AND?: Prisma.ProgramWhereInput | Prisma.ProgramWhereInput[]
  OR?: Prisma.ProgramWhereInput[]
  NOT?: Prisma.ProgramWhereInput | Prisma.ProgramWhereInput[]
  tenantId?: Prisma.StringFilter<"Program"> | string
  departmentId?: Prisma.StringFilter<"Program"> | string
  name?: Prisma.StringFilter<"Program"> | string
  code?: Prisma.StringFilter<"Program"> | string
  degreeType?: Prisma.StringFilter<"Program"> | string
  durationYears?: Prisma.IntFilter<"Program"> | number
  totalSemesters?: Prisma.IntFilter<"Program"> | number
  isActive?: Prisma.BoolFilter<"Program"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Program"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Program"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  department?: Prisma.XOR<Prisma.DepartmentScalarRelationFilter, Prisma.DepartmentWhereInput>
  students?: Prisma.StudentListRelationFilter
  feeStructures?: Prisma.FeeStructureListRelationFilter
}, "id" | "tenantId_code">

export type ProgramOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  degreeType?: Prisma.SortOrder
  durationYears?: Prisma.SortOrder
  totalSemesters?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.ProgramCountOrderByAggregateInput
  _avg?: Prisma.ProgramAvgOrderByAggregateInput
  _max?: Prisma.ProgramMaxOrderByAggregateInput
  _min?: Prisma.ProgramMinOrderByAggregateInput
  _sum?: Prisma.ProgramSumOrderByAggregateInput
}

export type ProgramScalarWhereWithAggregatesInput = {
  AND?: Prisma.ProgramScalarWhereWithAggregatesInput | Prisma.ProgramScalarWhereWithAggregatesInput[]
  OR?: Prisma.ProgramScalarWhereWithAggregatesInput[]
  NOT?: Prisma.ProgramScalarWhereWithAggregatesInput | Prisma.ProgramScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Program"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"Program"> | string
  departmentId?: Prisma.StringWithAggregatesFilter<"Program"> | string
  name?: Prisma.StringWithAggregatesFilter<"Program"> | string
  code?: Prisma.StringWithAggregatesFilter<"Program"> | string
  degreeType?: Prisma.StringWithAggregatesFilter<"Program"> | string
  durationYears?: Prisma.IntWithAggregatesFilter<"Program"> | number
  totalSemesters?: Prisma.IntWithAggregatesFilter<"Program"> | number
  isActive?: Prisma.BoolWithAggregatesFilter<"Program"> | boolean
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Program"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Program"> | Date | string
}

export type ProgramCreateInput = {
  id?: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutProgramsInput
  department: Prisma.DepartmentCreateNestedOneWithoutProgramsInput
  students?: Prisma.StudentCreateNestedManyWithoutProgramInput
  feeStructures?: Prisma.FeeStructureCreateNestedManyWithoutProgramInput
}

export type ProgramUncheckedCreateInput = {
  id?: string
  tenantId: string
  departmentId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutProgramInput
  feeStructures?: Prisma.FeeStructureUncheckedCreateNestedManyWithoutProgramInput
}

export type ProgramUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutProgramsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutProgramsNestedInput
  students?: Prisma.StudentUpdateManyWithoutProgramNestedInput
  feeStructures?: Prisma.FeeStructureUpdateManyWithoutProgramNestedInput
}

export type ProgramUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  students?: Prisma.StudentUncheckedUpdateManyWithoutProgramNestedInput
  feeStructures?: Prisma.FeeStructureUncheckedUpdateManyWithoutProgramNestedInput
}

export type ProgramCreateManyInput = {
  id?: string
  tenantId: string
  departmentId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ProgramUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ProgramUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ProgramListRelationFilter = {
  every?: Prisma.ProgramWhereInput
  some?: Prisma.ProgramWhereInput
  none?: Prisma.ProgramWhereInput
}

export type ProgramOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type ProgramTenantIdCodeCompoundUniqueInput = {
  tenantId: string
  code: string
}

export type ProgramCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  degreeType?: Prisma.SortOrder
  durationYears?: Prisma.SortOrder
  totalSemesters?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type ProgramAvgOrderByAggregateInput = {
  durationYears?: Prisma.SortOrder
  totalSemesters?: Prisma.SortOrder
}

export type ProgramMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  degreeType?: Prisma.SortOrder
  durationYears?: Prisma.SortOrder
  totalSemesters?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type ProgramMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  name?: Prisma.SortOrder
  code?: Prisma.SortOrder
  degreeType?: Prisma.SortOrder
  durationYears?: Prisma.SortOrder
  totalSemesters?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type ProgramSumOrderByAggregateInput = {
  durationYears?: Prisma.SortOrder
  totalSemesters?: Prisma.SortOrder
}

export type ProgramScalarRelationFilter = {
  is?: Prisma.ProgramWhereInput
  isNot?: Prisma.ProgramWhereInput
}

export type ProgramCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutTenantInput, Prisma.ProgramUncheckedCreateWithoutTenantInput> | Prisma.ProgramCreateWithoutTenantInput[] | Prisma.ProgramUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutTenantInput | Prisma.ProgramCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.ProgramCreateManyTenantInputEnvelope
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
}

export type ProgramUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutTenantInput, Prisma.ProgramUncheckedCreateWithoutTenantInput> | Prisma.ProgramCreateWithoutTenantInput[] | Prisma.ProgramUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutTenantInput | Prisma.ProgramCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.ProgramCreateManyTenantInputEnvelope
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
}

export type ProgramUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutTenantInput, Prisma.ProgramUncheckedCreateWithoutTenantInput> | Prisma.ProgramCreateWithoutTenantInput[] | Prisma.ProgramUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutTenantInput | Prisma.ProgramCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.ProgramUpsertWithWhereUniqueWithoutTenantInput | Prisma.ProgramUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.ProgramCreateManyTenantInputEnvelope
  set?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  disconnect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  delete?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  update?: Prisma.ProgramUpdateWithWhereUniqueWithoutTenantInput | Prisma.ProgramUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.ProgramUpdateManyWithWhereWithoutTenantInput | Prisma.ProgramUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.ProgramScalarWhereInput | Prisma.ProgramScalarWhereInput[]
}

export type ProgramUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutTenantInput, Prisma.ProgramUncheckedCreateWithoutTenantInput> | Prisma.ProgramCreateWithoutTenantInput[] | Prisma.ProgramUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutTenantInput | Prisma.ProgramCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.ProgramUpsertWithWhereUniqueWithoutTenantInput | Prisma.ProgramUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.ProgramCreateManyTenantInputEnvelope
  set?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  disconnect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  delete?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  update?: Prisma.ProgramUpdateWithWhereUniqueWithoutTenantInput | Prisma.ProgramUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.ProgramUpdateManyWithWhereWithoutTenantInput | Prisma.ProgramUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.ProgramScalarWhereInput | Prisma.ProgramScalarWhereInput[]
}

export type ProgramCreateNestedManyWithoutDepartmentInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutDepartmentInput, Prisma.ProgramUncheckedCreateWithoutDepartmentInput> | Prisma.ProgramCreateWithoutDepartmentInput[] | Prisma.ProgramUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutDepartmentInput | Prisma.ProgramCreateOrConnectWithoutDepartmentInput[]
  createMany?: Prisma.ProgramCreateManyDepartmentInputEnvelope
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
}

export type ProgramUncheckedCreateNestedManyWithoutDepartmentInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutDepartmentInput, Prisma.ProgramUncheckedCreateWithoutDepartmentInput> | Prisma.ProgramCreateWithoutDepartmentInput[] | Prisma.ProgramUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutDepartmentInput | Prisma.ProgramCreateOrConnectWithoutDepartmentInput[]
  createMany?: Prisma.ProgramCreateManyDepartmentInputEnvelope
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
}

export type ProgramUpdateManyWithoutDepartmentNestedInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutDepartmentInput, Prisma.ProgramUncheckedCreateWithoutDepartmentInput> | Prisma.ProgramCreateWithoutDepartmentInput[] | Prisma.ProgramUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutDepartmentInput | Prisma.ProgramCreateOrConnectWithoutDepartmentInput[]
  upsert?: Prisma.ProgramUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.ProgramUpsertWithWhereUniqueWithoutDepartmentInput[]
  createMany?: Prisma.ProgramCreateManyDepartmentInputEnvelope
  set?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  disconnect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  delete?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  update?: Prisma.ProgramUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.ProgramUpdateWithWhereUniqueWithoutDepartmentInput[]
  updateMany?: Prisma.ProgramUpdateManyWithWhereWithoutDepartmentInput | Prisma.ProgramUpdateManyWithWhereWithoutDepartmentInput[]
  deleteMany?: Prisma.ProgramScalarWhereInput | Prisma.ProgramScalarWhereInput[]
}

export type ProgramUncheckedUpdateManyWithoutDepartmentNestedInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutDepartmentInput, Prisma.ProgramUncheckedCreateWithoutDepartmentInput> | Prisma.ProgramCreateWithoutDepartmentInput[] | Prisma.ProgramUncheckedCreateWithoutDepartmentInput[]
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutDepartmentInput | Prisma.ProgramCreateOrConnectWithoutDepartmentInput[]
  upsert?: Prisma.ProgramUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.ProgramUpsertWithWhereUniqueWithoutDepartmentInput[]
  createMany?: Prisma.ProgramCreateManyDepartmentInputEnvelope
  set?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  disconnect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  delete?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  connect?: Prisma.ProgramWhereUniqueInput | Prisma.ProgramWhereUniqueInput[]
  update?: Prisma.ProgramUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.ProgramUpdateWithWhereUniqueWithoutDepartmentInput[]
  updateMany?: Prisma.ProgramUpdateManyWithWhereWithoutDepartmentInput | Prisma.ProgramUpdateManyWithWhereWithoutDepartmentInput[]
  deleteMany?: Prisma.ProgramScalarWhereInput | Prisma.ProgramScalarWhereInput[]
}

export type ProgramCreateNestedOneWithoutStudentsInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutStudentsInput, Prisma.ProgramUncheckedCreateWithoutStudentsInput>
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutStudentsInput
  connect?: Prisma.ProgramWhereUniqueInput
}

export type ProgramUpdateOneRequiredWithoutStudentsNestedInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutStudentsInput, Prisma.ProgramUncheckedCreateWithoutStudentsInput>
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutStudentsInput
  upsert?: Prisma.ProgramUpsertWithoutStudentsInput
  connect?: Prisma.ProgramWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.ProgramUpdateToOneWithWhereWithoutStudentsInput, Prisma.ProgramUpdateWithoutStudentsInput>, Prisma.ProgramUncheckedUpdateWithoutStudentsInput>
}

export type ProgramCreateNestedOneWithoutFeeStructuresInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutFeeStructuresInput, Prisma.ProgramUncheckedCreateWithoutFeeStructuresInput>
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutFeeStructuresInput
  connect?: Prisma.ProgramWhereUniqueInput
}

export type ProgramUpdateOneRequiredWithoutFeeStructuresNestedInput = {
  create?: Prisma.XOR<Prisma.ProgramCreateWithoutFeeStructuresInput, Prisma.ProgramUncheckedCreateWithoutFeeStructuresInput>
  connectOrCreate?: Prisma.ProgramCreateOrConnectWithoutFeeStructuresInput
  upsert?: Prisma.ProgramUpsertWithoutFeeStructuresInput
  connect?: Prisma.ProgramWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.ProgramUpdateToOneWithWhereWithoutFeeStructuresInput, Prisma.ProgramUpdateWithoutFeeStructuresInput>, Prisma.ProgramUncheckedUpdateWithoutFeeStructuresInput>
}

export type ProgramCreateWithoutTenantInput = {
  id?: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  department: Prisma.DepartmentCreateNestedOneWithoutProgramsInput
  students?: Prisma.StudentCreateNestedManyWithoutProgramInput
  feeStructures?: Prisma.FeeStructureCreateNestedManyWithoutProgramInput
}

export type ProgramUncheckedCreateWithoutTenantInput = {
  id?: string
  departmentId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutProgramInput
  feeStructures?: Prisma.FeeStructureUncheckedCreateNestedManyWithoutProgramInput
}

export type ProgramCreateOrConnectWithoutTenantInput = {
  where: Prisma.ProgramWhereUniqueInput
  create: Prisma.XOR<Prisma.ProgramCreateWithoutTenantInput, Prisma.ProgramUncheckedCreateWithoutTenantInput>
}

export type ProgramCreateManyTenantInputEnvelope = {
  data: Prisma.ProgramCreateManyTenantInput | Prisma.ProgramCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type ProgramUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.ProgramWhereUniqueInput
  update: Prisma.XOR<Prisma.ProgramUpdateWithoutTenantInput, Prisma.ProgramUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.ProgramCreateWithoutTenantInput, Prisma.ProgramUncheckedCreateWithoutTenantInput>
}

export type ProgramUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.ProgramWhereUniqueInput
  data: Prisma.XOR<Prisma.ProgramUpdateWithoutTenantInput, Prisma.ProgramUncheckedUpdateWithoutTenantInput>
}

export type ProgramUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.ProgramScalarWhereInput
  data: Prisma.XOR<Prisma.ProgramUpdateManyMutationInput, Prisma.ProgramUncheckedUpdateManyWithoutTenantInput>
}

export type ProgramScalarWhereInput = {
  AND?: Prisma.ProgramScalarWhereInput | Prisma.ProgramScalarWhereInput[]
  OR?: Prisma.ProgramScalarWhereInput[]
  NOT?: Prisma.ProgramScalarWhereInput | Prisma.ProgramScalarWhereInput[]
  id?: Prisma.StringFilter<"Program"> | string
  tenantId?: Prisma.StringFilter<"Program"> | string
  departmentId?: Prisma.StringFilter<"Program"> | string
  name?: Prisma.StringFilter<"Program"> | string
  code?: Prisma.StringFilter<"Program"> | string
  degreeType?: Prisma.StringFilter<"Program"> | string
  durationYears?: Prisma.IntFilter<"Program"> | number
  totalSemesters?: Prisma.IntFilter<"Program"> | number
  isActive?: Prisma.BoolFilter<"Program"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Program"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Program"> | Date | string
}

export type ProgramCreateWithoutDepartmentInput = {
  id?: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutProgramsInput
  students?: Prisma.StudentCreateNestedManyWithoutProgramInput
  feeStructures?: Prisma.FeeStructureCreateNestedManyWithoutProgramInput
}

export type ProgramUncheckedCreateWithoutDepartmentInput = {
  id?: string
  tenantId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutProgramInput
  feeStructures?: Prisma.FeeStructureUncheckedCreateNestedManyWithoutProgramInput
}

export type ProgramCreateOrConnectWithoutDepartmentInput = {
  where: Prisma.ProgramWhereUniqueInput
  create: Prisma.XOR<Prisma.ProgramCreateWithoutDepartmentInput, Prisma.ProgramUncheckedCreateWithoutDepartmentInput>
}

export type ProgramCreateManyDepartmentInputEnvelope = {
  data: Prisma.ProgramCreateManyDepartmentInput | Prisma.ProgramCreateManyDepartmentInput[]
  skipDuplicates?: boolean
}

export type ProgramUpsertWithWhereUniqueWithoutDepartmentInput = {
  where: Prisma.ProgramWhereUniqueInput
  update: Prisma.XOR<Prisma.ProgramUpdateWithoutDepartmentInput, Prisma.ProgramUncheckedUpdateWithoutDepartmentInput>
  create: Prisma.XOR<Prisma.ProgramCreateWithoutDepartmentInput, Prisma.ProgramUncheckedCreateWithoutDepartmentInput>
}

export type ProgramUpdateWithWhereUniqueWithoutDepartmentInput = {
  where: Prisma.ProgramWhereUniqueInput
  data: Prisma.XOR<Prisma.ProgramUpdateWithoutDepartmentInput, Prisma.ProgramUncheckedUpdateWithoutDepartmentInput>
}

export type ProgramUpdateManyWithWhereWithoutDepartmentInput = {
  where: Prisma.ProgramScalarWhereInput
  data: Prisma.XOR<Prisma.ProgramUpdateManyMutationInput, Prisma.ProgramUncheckedUpdateManyWithoutDepartmentInput>
}

export type ProgramCreateWithoutStudentsInput = {
  id?: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutProgramsInput
  department: Prisma.DepartmentCreateNestedOneWithoutProgramsInput
  feeStructures?: Prisma.FeeStructureCreateNestedManyWithoutProgramInput
}

export type ProgramUncheckedCreateWithoutStudentsInput = {
  id?: string
  tenantId: string
  departmentId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  feeStructures?: Prisma.FeeStructureUncheckedCreateNestedManyWithoutProgramInput
}

export type ProgramCreateOrConnectWithoutStudentsInput = {
  where: Prisma.ProgramWhereUniqueInput
  create: Prisma.XOR<Prisma.ProgramCreateWithoutStudentsInput, Prisma.ProgramUncheckedCreateWithoutStudentsInput>
}

export type ProgramUpsertWithoutStudentsInput = {
  update: Prisma.XOR<Prisma.ProgramUpdateWithoutStudentsInput, Prisma.ProgramUncheckedUpdateWithoutStudentsInput>
  create: Prisma.XOR<Prisma.ProgramCreateWithoutStudentsInput, Prisma.ProgramUncheckedCreateWithoutStudentsInput>
  where?: Prisma.ProgramWhereInput
}

export type ProgramUpdateToOneWithWhereWithoutStudentsInput = {
  where?: Prisma.ProgramWhereInput
  data: Prisma.XOR<Prisma.ProgramUpdateWithoutStudentsInput, Prisma.ProgramUncheckedUpdateWithoutStudentsInput>
}

export type ProgramUpdateWithoutStudentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutProgramsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutProgramsNestedInput
  feeStructures?: Prisma.FeeStructureUpdateManyWithoutProgramNestedInput
}

export type ProgramUncheckedUpdateWithoutStudentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  feeStructures?: Prisma.FeeStructureUncheckedUpdateManyWithoutProgramNestedInput
}

export type ProgramCreateWithoutFeeStructuresInput = {
  id?: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutProgramsInput
  department: Prisma.DepartmentCreateNestedOneWithoutProgramsInput
  students?: Prisma.StudentCreateNestedManyWithoutProgramInput
}

export type ProgramUncheckedCreateWithoutFeeStructuresInput = {
  id?: string
  tenantId: string
  departmentId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  students?: Prisma.StudentUncheckedCreateNestedManyWithoutProgramInput
}

export type ProgramCreateOrConnectWithoutFeeStructuresInput = {
  where: Prisma.ProgramWhereUniqueInput
  create: Prisma.XOR<Prisma.ProgramCreateWithoutFeeStructuresInput, Prisma.ProgramUncheckedCreateWithoutFeeStructuresInput>
}

export type ProgramUpsertWithoutFeeStructuresInput = {
  update: Prisma.XOR<Prisma.ProgramUpdateWithoutFeeStructuresInput, Prisma.ProgramUncheckedUpdateWithoutFeeStructuresInput>
  create: Prisma.XOR<Prisma.ProgramCreateWithoutFeeStructuresInput, Prisma.ProgramUncheckedCreateWithoutFeeStructuresInput>
  where?: Prisma.ProgramWhereInput
}

export type ProgramUpdateToOneWithWhereWithoutFeeStructuresInput = {
  where?: Prisma.ProgramWhereInput
  data: Prisma.XOR<Prisma.ProgramUpdateWithoutFeeStructuresInput, Prisma.ProgramUncheckedUpdateWithoutFeeStructuresInput>
}

export type ProgramUpdateWithoutFeeStructuresInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutProgramsNestedInput
  department?: Prisma.DepartmentUpdateOneRequiredWithoutProgramsNestedInput
  students?: Prisma.StudentUpdateManyWithoutProgramNestedInput
}

export type ProgramUncheckedUpdateWithoutFeeStructuresInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  students?: Prisma.StudentUncheckedUpdateManyWithoutProgramNestedInput
}

export type ProgramCreateManyTenantInput = {
  id?: string
  departmentId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ProgramUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  department?: Prisma.DepartmentUpdateOneRequiredWithoutProgramsNestedInput
  students?: Prisma.StudentUpdateManyWithoutProgramNestedInput
  feeStructures?: Prisma.FeeStructureUpdateManyWithoutProgramNestedInput
}

export type ProgramUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  students?: Prisma.StudentUncheckedUpdateManyWithoutProgramNestedInput
  feeStructures?: Prisma.FeeStructureUncheckedUpdateManyWithoutProgramNestedInput
}

export type ProgramUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  departmentId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ProgramCreateManyDepartmentInput = {
  id?: string
  tenantId: string
  name: string
  code: string
  degreeType: string
  durationYears?: number
  totalSemesters?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type ProgramUpdateWithoutDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutProgramsNestedInput
  students?: Prisma.StudentUpdateManyWithoutProgramNestedInput
  feeStructures?: Prisma.FeeStructureUpdateManyWithoutProgramNestedInput
}

export type ProgramUncheckedUpdateWithoutDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  students?: Prisma.StudentUncheckedUpdateManyWithoutProgramNestedInput
  feeStructures?: Prisma.FeeStructureUncheckedUpdateManyWithoutProgramNestedInput
}

export type ProgramUncheckedUpdateManyWithoutDepartmentInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  name?: Prisma.StringFieldUpdateOperationsInput | string
  code?: Prisma.StringFieldUpdateOperationsInput | string
  degreeType?: Prisma.StringFieldUpdateOperationsInput | string
  durationYears?: Prisma.IntFieldUpdateOperationsInput | number
  totalSemesters?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ProgramCountOutputType = {
  students: number
  feeStructures: number
}

export type ProgramCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  students?: boolean | ProgramCountOutputTypeCountStudentsArgs
  feeStructures?: boolean | ProgramCountOutputTypeCountFeeStructuresArgs
}

export type ProgramCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramCountOutputTypeSelect<ExtArgs> | null
}

export type ProgramCountOutputTypeCountStudentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.StudentWhereInput
}

export type ProgramCountOutputTypeCountFeeStructuresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.FeeStructureWhereInput
}

export type ProgramSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  departmentId?: boolean
  name?: boolean
  code?: boolean
  degreeType?: boolean
  durationYears?: boolean
  totalSemesters?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  students?: boolean | Prisma.Program$studentsArgs<ExtArgs>
  feeStructures?: boolean | Prisma.Program$feeStructuresArgs<ExtArgs>
  _count?: boolean | Prisma.ProgramCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["program"]>

export type ProgramSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  departmentId?: boolean
  name?: boolean
  code?: boolean
  degreeType?: boolean
  durationYears?: boolean
  totalSemesters?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
}, ExtArgs["result"]["program"]>

export type ProgramSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  departmentId?: boolean
  name?: boolean
  code?: boolean
  degreeType?: boolean
  durationYears?: boolean
  totalSemesters?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
}, ExtArgs["result"]["program"]>

export type ProgramSelectScalar = {
  id?: boolean
  tenantId?: boolean
  departmentId?: boolean
  name?: boolean
  code?: boolean
  degreeType?: boolean
  durationYears?: boolean
  totalSemesters?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type ProgramOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "departmentId" | "name" | "code" | "degreeType" | "durationYears" | "totalSemesters" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["program"]>
export type ProgramInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
  students?: boolean | Prisma.Program$studentsArgs<ExtArgs>
  feeStructures?: boolean | Prisma.Program$feeStructuresArgs<ExtArgs>
  _count?: boolean | Prisma.ProgramCountOutputTypeDefaultArgs<ExtArgs>
}
export type ProgramIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
}
export type ProgramIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>
}

export type $ProgramPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Program"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    department: Prisma.$DepartmentPayload<ExtArgs>
    students: Prisma.$StudentPayload<ExtArgs>[]
    feeStructures: Prisma.$FeeStructurePayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    departmentId: string
    name: string
    code: string
    degreeType: string
    durationYears: number
    totalSemesters: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["program"]>
  composites: {}
}

export type ProgramGetPayload<S extends boolean | null | undefined | ProgramDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProgramPayload, S>

export type ProgramCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<ProgramFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProgramCountAggregateInputType | true
  }

export interface ProgramDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Program'], meta: { name: 'Program' } }
    findUnique<T extends ProgramFindUniqueArgs>(args: Prisma.SelectSubset<T, ProgramFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends ProgramFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends ProgramFindFirstArgs>(args?: Prisma.SelectSubset<T, ProgramFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends ProgramFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends ProgramFindManyArgs>(args?: Prisma.SelectSubset<T, ProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends ProgramCreateArgs>(args: Prisma.SelectSubset<T, ProgramCreateArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends ProgramCreateManyArgs>(args?: Prisma.SelectSubset<T, ProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends ProgramCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends ProgramDeleteArgs>(args: Prisma.SelectSubset<T, ProgramDeleteArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends ProgramUpdateArgs>(args: Prisma.SelectSubset<T, ProgramUpdateArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends ProgramDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends ProgramUpdateManyArgs>(args: Prisma.SelectSubset<T, ProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends ProgramUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProgramUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends ProgramUpsertArgs>(args: Prisma.SelectSubset<T, ProgramUpsertArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends ProgramCountArgs>(
    args?: Prisma.Subset<T, ProgramCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], ProgramCountAggregateOutputType>
      : number
  >

    aggregate<T extends ProgramAggregateArgs>(args: Prisma.Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    groupBy<
    T extends ProgramGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: ProgramGroupByArgs['orderBy'] }
      : { orderBy?: ProgramGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, ProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: ProgramFieldRefs;
}

export interface Prisma__ProgramClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  department<T extends Prisma.DepartmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DepartmentDefaultArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  students<T extends Prisma.Program$studentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Program$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
  feeStructures<T extends Prisma.Program$feeStructuresArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Program$feeStructuresArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface ProgramFieldRefs {
  readonly id: Prisma.FieldRef<"Program", 'String'>
  readonly tenantId: Prisma.FieldRef<"Program", 'String'>
  readonly departmentId: Prisma.FieldRef<"Program", 'String'>
  readonly name: Prisma.FieldRef<"Program", 'String'>
  readonly code: Prisma.FieldRef<"Program", 'String'>
  readonly degreeType: Prisma.FieldRef<"Program", 'String'>
  readonly durationYears: Prisma.FieldRef<"Program", 'Int'>
  readonly totalSemesters: Prisma.FieldRef<"Program", 'Int'>
  readonly isActive: Prisma.FieldRef<"Program", 'Boolean'>
  readonly createdAt: Prisma.FieldRef<"Program", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Program", 'DateTime'>
}

export type ProgramFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
    where: Prisma.ProgramWhereUniqueInput
}

export type ProgramFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
    where: Prisma.ProgramWhereUniqueInput
}

export type ProgramFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type ProgramFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type ProgramFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type ProgramCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.ProgramCreateInput, Prisma.ProgramUncheckedCreateInput>
}

export type ProgramCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProgramCreateManyInput | Prisma.ProgramCreateManyInput[]
  skipDuplicates?: boolean
}

export type ProgramCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    data: Prisma.ProgramCreateManyInput | Prisma.ProgramCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.ProgramIncludeCreateManyAndReturn<ExtArgs> | null
}

export type ProgramUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.ProgramUpdateInput, Prisma.ProgramUncheckedUpdateInput>
    where: Prisma.ProgramWhereUniqueInput
}

export type ProgramUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProgramUpdateManyMutationInput, Prisma.ProgramUncheckedUpdateManyInput>
    where?: Prisma.ProgramWhereInput
    limit?: number
}

export type ProgramUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.ProgramUpdateManyMutationInput, Prisma.ProgramUncheckedUpdateManyInput>
    where?: Prisma.ProgramWhereInput
    limit?: number
    include?: Prisma.ProgramIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type ProgramUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
    where: Prisma.ProgramWhereUniqueInput
    create: Prisma.XOR<Prisma.ProgramCreateInput, Prisma.ProgramUncheckedCreateInput>
    update: Prisma.XOR<Prisma.ProgramUpdateInput, Prisma.ProgramUncheckedUpdateInput>
}

export type ProgramDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
    where: Prisma.ProgramWhereUniqueInput
}

export type ProgramDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProgramWhereInput
    limit?: number
}

export type Program$studentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type Program$feeStructuresArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
  where?: Prisma.FeeStructureWhereInput
  orderBy?: Prisma.FeeStructureOrderByWithRelationInput | Prisma.FeeStructureOrderByWithRelationInput[]
  cursor?: Prisma.FeeStructureWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Prisma.FeeStructureScalarFieldEnum | Prisma.FeeStructureScalarFieldEnum[]
}

export type ProgramDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgramSelect<ExtArgs> | null
    omit?: Prisma.ProgramOmit<ExtArgs> | null
    include?: Prisma.ProgramInclude<ExtArgs> | null
}
