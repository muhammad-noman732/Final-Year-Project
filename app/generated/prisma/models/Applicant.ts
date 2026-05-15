
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type ApplicantModel = runtime.Types.Result.DefaultSelection<Prisma.$ApplicantPayload>

export type AggregateApplicant = {
  _count: ApplicantCountAggregateOutputType | null
  _avg: ApplicantAvgAggregateOutputType | null
  _sum: ApplicantSumAggregateOutputType | null
  _min: ApplicantMinAggregateOutputType | null
  _max: ApplicantMaxAggregateOutputType | null
}

export type ApplicantAvgAggregateOutputType = {
  matricPercent: number | null
  fscPercent: number | null
  meritScore: number | null
}

export type ApplicantSumAggregateOutputType = {
  matricPercent: number | null
  fscPercent: number | null
  meritScore: number | null
}

export type ApplicantMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  importBatchId: string | null
  fullName: string | null
  email: string | null
  phone: string | null
  program: string | null
  department: string | null
  session: string | null
  matricPercent: number | null
  fscPercent: number | null
  meritScore: number | null
  gender: string | null
  city: string | null
  importedAt: Date | null
}

export type ApplicantMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  importBatchId: string | null
  fullName: string | null
  email: string | null
  phone: string | null
  program: string | null
  department: string | null
  session: string | null
  matricPercent: number | null
  fscPercent: number | null
  meritScore: number | null
  gender: string | null
  city: string | null
  importedAt: Date | null
}

export type ApplicantCountAggregateOutputType = {
  id: number
  tenantId: number
  importBatchId: number
  fullName: number
  email: number
  phone: number
  program: number
  department: number
  session: number
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender: number
  city: number
  importedAt: number
  _all: number
}

export type ApplicantAvgAggregateInputType = {
  matricPercent?: true
  fscPercent?: true
  meritScore?: true
}

export type ApplicantSumAggregateInputType = {
  matricPercent?: true
  fscPercent?: true
  meritScore?: true
}

export type ApplicantMinAggregateInputType = {
  id?: true
  tenantId?: true
  importBatchId?: true
  fullName?: true
  email?: true
  phone?: true
  program?: true
  department?: true
  session?: true
  matricPercent?: true
  fscPercent?: true
  meritScore?: true
  gender?: true
  city?: true
  importedAt?: true
}

export type ApplicantMaxAggregateInputType = {
  id?: true
  tenantId?: true
  importBatchId?: true
  fullName?: true
  email?: true
  phone?: true
  program?: true
  department?: true
  session?: true
  matricPercent?: true
  fscPercent?: true
  meritScore?: true
  gender?: true
  city?: true
  importedAt?: true
}

export type ApplicantCountAggregateInputType = {
  id?: true
  tenantId?: true
  importBatchId?: true
  fullName?: true
  email?: true
  phone?: true
  program?: true
  department?: true
  session?: true
  matricPercent?: true
  fscPercent?: true
  meritScore?: true
  gender?: true
  city?: true
  importedAt?: true
  _all?: true
}

export type ApplicantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApplicantWhereInput
    orderBy?: Prisma.ApplicantOrderByWithRelationInput | Prisma.ApplicantOrderByWithRelationInput[]
    cursor?: Prisma.ApplicantWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | ApplicantCountAggregateInputType
    _avg?: ApplicantAvgAggregateInputType
    _sum?: ApplicantSumAggregateInputType
    _min?: ApplicantMinAggregateInputType
    _max?: ApplicantMaxAggregateInputType
}

export type GetApplicantAggregateType<T extends ApplicantAggregateArgs> = {
      [P in keyof T & keyof AggregateApplicant]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateApplicant[P]>
    : Prisma.GetScalarType<T[P], AggregateApplicant[P]>
}

export type ApplicantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ApplicantWhereInput
  orderBy?: Prisma.ApplicantOrderByWithAggregationInput | Prisma.ApplicantOrderByWithAggregationInput[]
  by: Prisma.ApplicantScalarFieldEnum[] | Prisma.ApplicantScalarFieldEnum
  having?: Prisma.ApplicantScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: ApplicantCountAggregateInputType | true
  _avg?: ApplicantAvgAggregateInputType
  _sum?: ApplicantSumAggregateInputType
  _min?: ApplicantMinAggregateInputType
  _max?: ApplicantMaxAggregateInputType
}

export type ApplicantGroupByOutputType = {
  id: string
  tenantId: string
  importBatchId: string
  fullName: string
  email: string
  phone: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender: string | null
  city: string | null
  importedAt: Date
  _count: ApplicantCountAggregateOutputType | null
  _avg: ApplicantAvgAggregateOutputType | null
  _sum: ApplicantSumAggregateOutputType | null
  _min: ApplicantMinAggregateOutputType | null
  _max: ApplicantMaxAggregateOutputType | null
}

export type GetApplicantGroupByPayload<T extends ApplicantGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<ApplicantGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ApplicantGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], ApplicantGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], ApplicantGroupByOutputType[P]>
      }
    >
  >

export type ApplicantWhereInput = {
  AND?: Prisma.ApplicantWhereInput | Prisma.ApplicantWhereInput[]
  OR?: Prisma.ApplicantWhereInput[]
  NOT?: Prisma.ApplicantWhereInput | Prisma.ApplicantWhereInput[]
  id?: Prisma.StringFilter<"Applicant"> | string
  tenantId?: Prisma.StringFilter<"Applicant"> | string
  importBatchId?: Prisma.StringFilter<"Applicant"> | string
  fullName?: Prisma.StringFilter<"Applicant"> | string
  email?: Prisma.StringFilter<"Applicant"> | string
  phone?: Prisma.StringNullableFilter<"Applicant"> | string | null
  program?: Prisma.StringFilter<"Applicant"> | string
  department?: Prisma.StringFilter<"Applicant"> | string
  session?: Prisma.StringFilter<"Applicant"> | string
  matricPercent?: Prisma.FloatFilter<"Applicant"> | number
  fscPercent?: Prisma.FloatFilter<"Applicant"> | number
  meritScore?: Prisma.FloatFilter<"Applicant"> | number
  gender?: Prisma.StringNullableFilter<"Applicant"> | string | null
  city?: Prisma.StringNullableFilter<"Applicant"> | string | null
  importedAt?: Prisma.DateTimeFilter<"Applicant"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  importBatch?: Prisma.XOR<Prisma.ImportBatchScalarRelationFilter, Prisma.ImportBatchWhereInput>
}

export type ApplicantOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  importBatchId?: Prisma.SortOrder
  fullName?: Prisma.SortOrder
  email?: Prisma.SortOrder
  phone?: Prisma.SortOrderInput | Prisma.SortOrder
  program?: Prisma.SortOrder
  department?: Prisma.SortOrder
  session?: Prisma.SortOrder
  matricPercent?: Prisma.SortOrder
  fscPercent?: Prisma.SortOrder
  meritScore?: Prisma.SortOrder
  gender?: Prisma.SortOrderInput | Prisma.SortOrder
  city?: Prisma.SortOrderInput | Prisma.SortOrder
  importedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  importBatch?: Prisma.ImportBatchOrderByWithRelationInput
}

export type ApplicantWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.ApplicantWhereInput | Prisma.ApplicantWhereInput[]
  OR?: Prisma.ApplicantWhereInput[]
  NOT?: Prisma.ApplicantWhereInput | Prisma.ApplicantWhereInput[]
  tenantId?: Prisma.StringFilter<"Applicant"> | string
  importBatchId?: Prisma.StringFilter<"Applicant"> | string
  fullName?: Prisma.StringFilter<"Applicant"> | string
  email?: Prisma.StringFilter<"Applicant"> | string
  phone?: Prisma.StringNullableFilter<"Applicant"> | string | null
  program?: Prisma.StringFilter<"Applicant"> | string
  department?: Prisma.StringFilter<"Applicant"> | string
  session?: Prisma.StringFilter<"Applicant"> | string
  matricPercent?: Prisma.FloatFilter<"Applicant"> | number
  fscPercent?: Prisma.FloatFilter<"Applicant"> | number
  meritScore?: Prisma.FloatFilter<"Applicant"> | number
  gender?: Prisma.StringNullableFilter<"Applicant"> | string | null
  city?: Prisma.StringNullableFilter<"Applicant"> | string | null
  importedAt?: Prisma.DateTimeFilter<"Applicant"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  importBatch?: Prisma.XOR<Prisma.ImportBatchScalarRelationFilter, Prisma.ImportBatchWhereInput>
}, "id">

export type ApplicantOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  importBatchId?: Prisma.SortOrder
  fullName?: Prisma.SortOrder
  email?: Prisma.SortOrder
  phone?: Prisma.SortOrderInput | Prisma.SortOrder
  program?: Prisma.SortOrder
  department?: Prisma.SortOrder
  session?: Prisma.SortOrder
  matricPercent?: Prisma.SortOrder
  fscPercent?: Prisma.SortOrder
  meritScore?: Prisma.SortOrder
  gender?: Prisma.SortOrderInput | Prisma.SortOrder
  city?: Prisma.SortOrderInput | Prisma.SortOrder
  importedAt?: Prisma.SortOrder
  _count?: Prisma.ApplicantCountOrderByAggregateInput
  _avg?: Prisma.ApplicantAvgOrderByAggregateInput
  _max?: Prisma.ApplicantMaxOrderByAggregateInput
  _min?: Prisma.ApplicantMinOrderByAggregateInput
  _sum?: Prisma.ApplicantSumOrderByAggregateInput
}

export type ApplicantScalarWhereWithAggregatesInput = {
  AND?: Prisma.ApplicantScalarWhereWithAggregatesInput | Prisma.ApplicantScalarWhereWithAggregatesInput[]
  OR?: Prisma.ApplicantScalarWhereWithAggregatesInput[]
  NOT?: Prisma.ApplicantScalarWhereWithAggregatesInput | Prisma.ApplicantScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  importBatchId?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  fullName?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  email?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  phone?: Prisma.StringNullableWithAggregatesFilter<"Applicant"> | string | null
  program?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  department?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  session?: Prisma.StringWithAggregatesFilter<"Applicant"> | string
  matricPercent?: Prisma.FloatWithAggregatesFilter<"Applicant"> | number
  fscPercent?: Prisma.FloatWithAggregatesFilter<"Applicant"> | number
  meritScore?: Prisma.FloatWithAggregatesFilter<"Applicant"> | number
  gender?: Prisma.StringNullableWithAggregatesFilter<"Applicant"> | string | null
  city?: Prisma.StringNullableWithAggregatesFilter<"Applicant"> | string | null
  importedAt?: Prisma.DateTimeWithAggregatesFilter<"Applicant"> | Date | string
}

export type ApplicantCreateInput = {
  id?: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutApplicantsInput
  importBatch: Prisma.ImportBatchCreateNestedOneWithoutApplicantsInput
}

export type ApplicantUncheckedCreateInput = {
  id?: string
  tenantId: string
  importBatchId: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
}

export type ApplicantUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutApplicantsNestedInput
  importBatch?: Prisma.ImportBatchUpdateOneRequiredWithoutApplicantsNestedInput
}

export type ApplicantUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  importBatchId?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ApplicantCreateManyInput = {
  id?: string
  tenantId: string
  importBatchId: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
}

export type ApplicantUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ApplicantUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  importBatchId?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ApplicantListRelationFilter = {
  every?: Prisma.ApplicantWhereInput
  some?: Prisma.ApplicantWhereInput
  none?: Prisma.ApplicantWhereInput
}

export type ApplicantOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type ApplicantCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  importBatchId?: Prisma.SortOrder
  fullName?: Prisma.SortOrder
  email?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  program?: Prisma.SortOrder
  department?: Prisma.SortOrder
  session?: Prisma.SortOrder
  matricPercent?: Prisma.SortOrder
  fscPercent?: Prisma.SortOrder
  meritScore?: Prisma.SortOrder
  gender?: Prisma.SortOrder
  city?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
}

export type ApplicantAvgOrderByAggregateInput = {
  matricPercent?: Prisma.SortOrder
  fscPercent?: Prisma.SortOrder
  meritScore?: Prisma.SortOrder
}

export type ApplicantMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  importBatchId?: Prisma.SortOrder
  fullName?: Prisma.SortOrder
  email?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  program?: Prisma.SortOrder
  department?: Prisma.SortOrder
  session?: Prisma.SortOrder
  matricPercent?: Prisma.SortOrder
  fscPercent?: Prisma.SortOrder
  meritScore?: Prisma.SortOrder
  gender?: Prisma.SortOrder
  city?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
}

export type ApplicantMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  importBatchId?: Prisma.SortOrder
  fullName?: Prisma.SortOrder
  email?: Prisma.SortOrder
  phone?: Prisma.SortOrder
  program?: Prisma.SortOrder
  department?: Prisma.SortOrder
  session?: Prisma.SortOrder
  matricPercent?: Prisma.SortOrder
  fscPercent?: Prisma.SortOrder
  meritScore?: Prisma.SortOrder
  gender?: Prisma.SortOrder
  city?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
}

export type ApplicantSumOrderByAggregateInput = {
  matricPercent?: Prisma.SortOrder
  fscPercent?: Prisma.SortOrder
  meritScore?: Prisma.SortOrder
}

export type ApplicantCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutTenantInput, Prisma.ApplicantUncheckedCreateWithoutTenantInput> | Prisma.ApplicantCreateWithoutTenantInput[] | Prisma.ApplicantUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutTenantInput | Prisma.ApplicantCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.ApplicantCreateManyTenantInputEnvelope
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
}

export type ApplicantUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutTenantInput, Prisma.ApplicantUncheckedCreateWithoutTenantInput> | Prisma.ApplicantCreateWithoutTenantInput[] | Prisma.ApplicantUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutTenantInput | Prisma.ApplicantCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.ApplicantCreateManyTenantInputEnvelope
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
}

export type ApplicantUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutTenantInput, Prisma.ApplicantUncheckedCreateWithoutTenantInput> | Prisma.ApplicantCreateWithoutTenantInput[] | Prisma.ApplicantUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutTenantInput | Prisma.ApplicantCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.ApplicantUpsertWithWhereUniqueWithoutTenantInput | Prisma.ApplicantUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.ApplicantCreateManyTenantInputEnvelope
  set?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  disconnect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  delete?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  update?: Prisma.ApplicantUpdateWithWhereUniqueWithoutTenantInput | Prisma.ApplicantUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.ApplicantUpdateManyWithWhereWithoutTenantInput | Prisma.ApplicantUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.ApplicantScalarWhereInput | Prisma.ApplicantScalarWhereInput[]
}

export type ApplicantUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutTenantInput, Prisma.ApplicantUncheckedCreateWithoutTenantInput> | Prisma.ApplicantCreateWithoutTenantInput[] | Prisma.ApplicantUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutTenantInput | Prisma.ApplicantCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.ApplicantUpsertWithWhereUniqueWithoutTenantInput | Prisma.ApplicantUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.ApplicantCreateManyTenantInputEnvelope
  set?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  disconnect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  delete?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  update?: Prisma.ApplicantUpdateWithWhereUniqueWithoutTenantInput | Prisma.ApplicantUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.ApplicantUpdateManyWithWhereWithoutTenantInput | Prisma.ApplicantUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.ApplicantScalarWhereInput | Prisma.ApplicantScalarWhereInput[]
}

export type FloatFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type ApplicantCreateNestedManyWithoutImportBatchInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutImportBatchInput, Prisma.ApplicantUncheckedCreateWithoutImportBatchInput> | Prisma.ApplicantCreateWithoutImportBatchInput[] | Prisma.ApplicantUncheckedCreateWithoutImportBatchInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutImportBatchInput | Prisma.ApplicantCreateOrConnectWithoutImportBatchInput[]
  createMany?: Prisma.ApplicantCreateManyImportBatchInputEnvelope
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
}

export type ApplicantUncheckedCreateNestedManyWithoutImportBatchInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutImportBatchInput, Prisma.ApplicantUncheckedCreateWithoutImportBatchInput> | Prisma.ApplicantCreateWithoutImportBatchInput[] | Prisma.ApplicantUncheckedCreateWithoutImportBatchInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutImportBatchInput | Prisma.ApplicantCreateOrConnectWithoutImportBatchInput[]
  createMany?: Prisma.ApplicantCreateManyImportBatchInputEnvelope
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
}

export type ApplicantUpdateManyWithoutImportBatchNestedInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutImportBatchInput, Prisma.ApplicantUncheckedCreateWithoutImportBatchInput> | Prisma.ApplicantCreateWithoutImportBatchInput[] | Prisma.ApplicantUncheckedCreateWithoutImportBatchInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutImportBatchInput | Prisma.ApplicantCreateOrConnectWithoutImportBatchInput[]
  upsert?: Prisma.ApplicantUpsertWithWhereUniqueWithoutImportBatchInput | Prisma.ApplicantUpsertWithWhereUniqueWithoutImportBatchInput[]
  createMany?: Prisma.ApplicantCreateManyImportBatchInputEnvelope
  set?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  disconnect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  delete?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  update?: Prisma.ApplicantUpdateWithWhereUniqueWithoutImportBatchInput | Prisma.ApplicantUpdateWithWhereUniqueWithoutImportBatchInput[]
  updateMany?: Prisma.ApplicantUpdateManyWithWhereWithoutImportBatchInput | Prisma.ApplicantUpdateManyWithWhereWithoutImportBatchInput[]
  deleteMany?: Prisma.ApplicantScalarWhereInput | Prisma.ApplicantScalarWhereInput[]
}

export type ApplicantUncheckedUpdateManyWithoutImportBatchNestedInput = {
  create?: Prisma.XOR<Prisma.ApplicantCreateWithoutImportBatchInput, Prisma.ApplicantUncheckedCreateWithoutImportBatchInput> | Prisma.ApplicantCreateWithoutImportBatchInput[] | Prisma.ApplicantUncheckedCreateWithoutImportBatchInput[]
  connectOrCreate?: Prisma.ApplicantCreateOrConnectWithoutImportBatchInput | Prisma.ApplicantCreateOrConnectWithoutImportBatchInput[]
  upsert?: Prisma.ApplicantUpsertWithWhereUniqueWithoutImportBatchInput | Prisma.ApplicantUpsertWithWhereUniqueWithoutImportBatchInput[]
  createMany?: Prisma.ApplicantCreateManyImportBatchInputEnvelope
  set?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  disconnect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  delete?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  connect?: Prisma.ApplicantWhereUniqueInput | Prisma.ApplicantWhereUniqueInput[]
  update?: Prisma.ApplicantUpdateWithWhereUniqueWithoutImportBatchInput | Prisma.ApplicantUpdateWithWhereUniqueWithoutImportBatchInput[]
  updateMany?: Prisma.ApplicantUpdateManyWithWhereWithoutImportBatchInput | Prisma.ApplicantUpdateManyWithWhereWithoutImportBatchInput[]
  deleteMany?: Prisma.ApplicantScalarWhereInput | Prisma.ApplicantScalarWhereInput[]
}

export type ApplicantCreateWithoutTenantInput = {
  id?: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
  importBatch: Prisma.ImportBatchCreateNestedOneWithoutApplicantsInput
}

export type ApplicantUncheckedCreateWithoutTenantInput = {
  id?: string
  importBatchId: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
}

export type ApplicantCreateOrConnectWithoutTenantInput = {
  where: Prisma.ApplicantWhereUniqueInput
  create: Prisma.XOR<Prisma.ApplicantCreateWithoutTenantInput, Prisma.ApplicantUncheckedCreateWithoutTenantInput>
}

export type ApplicantCreateManyTenantInputEnvelope = {
  data: Prisma.ApplicantCreateManyTenantInput | Prisma.ApplicantCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type ApplicantUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.ApplicantWhereUniqueInput
  update: Prisma.XOR<Prisma.ApplicantUpdateWithoutTenantInput, Prisma.ApplicantUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.ApplicantCreateWithoutTenantInput, Prisma.ApplicantUncheckedCreateWithoutTenantInput>
}

export type ApplicantUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.ApplicantWhereUniqueInput
  data: Prisma.XOR<Prisma.ApplicantUpdateWithoutTenantInput, Prisma.ApplicantUncheckedUpdateWithoutTenantInput>
}

export type ApplicantUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.ApplicantScalarWhereInput
  data: Prisma.XOR<Prisma.ApplicantUpdateManyMutationInput, Prisma.ApplicantUncheckedUpdateManyWithoutTenantInput>
}

export type ApplicantScalarWhereInput = {
  AND?: Prisma.ApplicantScalarWhereInput | Prisma.ApplicantScalarWhereInput[]
  OR?: Prisma.ApplicantScalarWhereInput[]
  NOT?: Prisma.ApplicantScalarWhereInput | Prisma.ApplicantScalarWhereInput[]
  id?: Prisma.StringFilter<"Applicant"> | string
  tenantId?: Prisma.StringFilter<"Applicant"> | string
  importBatchId?: Prisma.StringFilter<"Applicant"> | string
  fullName?: Prisma.StringFilter<"Applicant"> | string
  email?: Prisma.StringFilter<"Applicant"> | string
  phone?: Prisma.StringNullableFilter<"Applicant"> | string | null
  program?: Prisma.StringFilter<"Applicant"> | string
  department?: Prisma.StringFilter<"Applicant"> | string
  session?: Prisma.StringFilter<"Applicant"> | string
  matricPercent?: Prisma.FloatFilter<"Applicant"> | number
  fscPercent?: Prisma.FloatFilter<"Applicant"> | number
  meritScore?: Prisma.FloatFilter<"Applicant"> | number
  gender?: Prisma.StringNullableFilter<"Applicant"> | string | null
  city?: Prisma.StringNullableFilter<"Applicant"> | string | null
  importedAt?: Prisma.DateTimeFilter<"Applicant"> | Date | string
}

export type ApplicantCreateWithoutImportBatchInput = {
  id?: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutApplicantsInput
}

export type ApplicantUncheckedCreateWithoutImportBatchInput = {
  id?: string
  tenantId: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
}

export type ApplicantCreateOrConnectWithoutImportBatchInput = {
  where: Prisma.ApplicantWhereUniqueInput
  create: Prisma.XOR<Prisma.ApplicantCreateWithoutImportBatchInput, Prisma.ApplicantUncheckedCreateWithoutImportBatchInput>
}

export type ApplicantCreateManyImportBatchInputEnvelope = {
  data: Prisma.ApplicantCreateManyImportBatchInput | Prisma.ApplicantCreateManyImportBatchInput[]
  skipDuplicates?: boolean
}

export type ApplicantUpsertWithWhereUniqueWithoutImportBatchInput = {
  where: Prisma.ApplicantWhereUniqueInput
  update: Prisma.XOR<Prisma.ApplicantUpdateWithoutImportBatchInput, Prisma.ApplicantUncheckedUpdateWithoutImportBatchInput>
  create: Prisma.XOR<Prisma.ApplicantCreateWithoutImportBatchInput, Prisma.ApplicantUncheckedCreateWithoutImportBatchInput>
}

export type ApplicantUpdateWithWhereUniqueWithoutImportBatchInput = {
  where: Prisma.ApplicantWhereUniqueInput
  data: Prisma.XOR<Prisma.ApplicantUpdateWithoutImportBatchInput, Prisma.ApplicantUncheckedUpdateWithoutImportBatchInput>
}

export type ApplicantUpdateManyWithWhereWithoutImportBatchInput = {
  where: Prisma.ApplicantScalarWhereInput
  data: Prisma.XOR<Prisma.ApplicantUpdateManyMutationInput, Prisma.ApplicantUncheckedUpdateManyWithoutImportBatchInput>
}

export type ApplicantCreateManyTenantInput = {
  id?: string
  importBatchId: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
}

export type ApplicantUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  importBatch?: Prisma.ImportBatchUpdateOneRequiredWithoutApplicantsNestedInput
}

export type ApplicantUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  importBatchId?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ApplicantUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  importBatchId?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ApplicantCreateManyImportBatchInput = {
  id?: string
  tenantId: string
  fullName: string
  email: string
  phone?: string | null
  program: string
  department: string
  session: string
  matricPercent: number
  fscPercent: number
  meritScore: number
  gender?: string | null
  city?: string | null
  importedAt?: Date | string
}

export type ApplicantUpdateWithoutImportBatchInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutApplicantsNestedInput
}

export type ApplicantUncheckedUpdateWithoutImportBatchInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ApplicantUncheckedUpdateManyWithoutImportBatchInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  fullName?: Prisma.StringFieldUpdateOperationsInput | string
  email?: Prisma.StringFieldUpdateOperationsInput | string
  phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  program?: Prisma.StringFieldUpdateOperationsInput | string
  department?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  matricPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  fscPercent?: Prisma.FloatFieldUpdateOperationsInput | number
  meritScore?: Prisma.FloatFieldUpdateOperationsInput | number
  gender?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  city?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ApplicantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  importBatchId?: boolean
  fullName?: boolean
  email?: boolean
  phone?: boolean
  program?: boolean
  department?: boolean
  session?: boolean
  matricPercent?: boolean
  fscPercent?: boolean
  meritScore?: boolean
  gender?: boolean
  city?: boolean
  importedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  importBatch?: boolean | Prisma.ImportBatchDefaultArgs<ExtArgs>
}, ExtArgs["result"]["applicant"]>

export type ApplicantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  importBatchId?: boolean
  fullName?: boolean
  email?: boolean
  phone?: boolean
  program?: boolean
  department?: boolean
  session?: boolean
  matricPercent?: boolean
  fscPercent?: boolean
  meritScore?: boolean
  gender?: boolean
  city?: boolean
  importedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  importBatch?: boolean | Prisma.ImportBatchDefaultArgs<ExtArgs>
}, ExtArgs["result"]["applicant"]>

export type ApplicantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  importBatchId?: boolean
  fullName?: boolean
  email?: boolean
  phone?: boolean
  program?: boolean
  department?: boolean
  session?: boolean
  matricPercent?: boolean
  fscPercent?: boolean
  meritScore?: boolean
  gender?: boolean
  city?: boolean
  importedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  importBatch?: boolean | Prisma.ImportBatchDefaultArgs<ExtArgs>
}, ExtArgs["result"]["applicant"]>

export type ApplicantSelectScalar = {
  id?: boolean
  tenantId?: boolean
  importBatchId?: boolean
  fullName?: boolean
  email?: boolean
  phone?: boolean
  program?: boolean
  department?: boolean
  session?: boolean
  matricPercent?: boolean
  fscPercent?: boolean
  meritScore?: boolean
  gender?: boolean
  city?: boolean
  importedAt?: boolean
}

export type ApplicantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "importBatchId" | "fullName" | "email" | "phone" | "program" | "department" | "session" | "matricPercent" | "fscPercent" | "meritScore" | "gender" | "city" | "importedAt", ExtArgs["result"]["applicant"]>
export type ApplicantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  importBatch?: boolean | Prisma.ImportBatchDefaultArgs<ExtArgs>
}
export type ApplicantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  importBatch?: boolean | Prisma.ImportBatchDefaultArgs<ExtArgs>
}
export type ApplicantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  importBatch?: boolean | Prisma.ImportBatchDefaultArgs<ExtArgs>
}

export type $ApplicantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Applicant"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    importBatch: Prisma.$ImportBatchPayload<ExtArgs>
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    importBatchId: string
    fullName: string
    email: string
    phone: string | null
    program: string
    department: string
    session: string
    matricPercent: number
    fscPercent: number
    meritScore: number
    gender: string | null
    city: string | null
    importedAt: Date
  }, ExtArgs["result"]["applicant"]>
  composites: {}
}

export type ApplicantGetPayload<S extends boolean | null | undefined | ApplicantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ApplicantPayload, S>

export type ApplicantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<ApplicantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ApplicantCountAggregateInputType | true
  }

export interface ApplicantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Applicant'], meta: { name: 'Applicant' } }
    findUnique<T extends ApplicantFindUniqueArgs>(args: Prisma.SelectSubset<T, ApplicantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends ApplicantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ApplicantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends ApplicantFindFirstArgs>(args?: Prisma.SelectSubset<T, ApplicantFindFirstArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends ApplicantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ApplicantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends ApplicantFindManyArgs>(args?: Prisma.SelectSubset<T, ApplicantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends ApplicantCreateArgs>(args: Prisma.SelectSubset<T, ApplicantCreateArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends ApplicantCreateManyArgs>(args?: Prisma.SelectSubset<T, ApplicantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends ApplicantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ApplicantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends ApplicantDeleteArgs>(args: Prisma.SelectSubset<T, ApplicantDeleteArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends ApplicantUpdateArgs>(args: Prisma.SelectSubset<T, ApplicantUpdateArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends ApplicantDeleteManyArgs>(args?: Prisma.SelectSubset<T, ApplicantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends ApplicantUpdateManyArgs>(args: Prisma.SelectSubset<T, ApplicantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends ApplicantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ApplicantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends ApplicantUpsertArgs>(args: Prisma.SelectSubset<T, ApplicantUpsertArgs<ExtArgs>>): Prisma.Prisma__ApplicantClient<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends ApplicantCountArgs>(
    args?: Prisma.Subset<T, ApplicantCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], ApplicantCountAggregateOutputType>
      : number
  >

    aggregate<T extends ApplicantAggregateArgs>(args: Prisma.Subset<T, ApplicantAggregateArgs>): Prisma.PrismaPromise<GetApplicantAggregateType<T>>

    groupBy<
    T extends ApplicantGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: ApplicantGroupByArgs['orderBy'] }
      : { orderBy?: ApplicantGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, ApplicantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: ApplicantFieldRefs;
}

export interface Prisma__ApplicantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  importBatch<T extends Prisma.ImportBatchDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ImportBatchDefaultArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface ApplicantFieldRefs {
  readonly id: Prisma.FieldRef<"Applicant", 'String'>
  readonly tenantId: Prisma.FieldRef<"Applicant", 'String'>
  readonly importBatchId: Prisma.FieldRef<"Applicant", 'String'>
  readonly fullName: Prisma.FieldRef<"Applicant", 'String'>
  readonly email: Prisma.FieldRef<"Applicant", 'String'>
  readonly phone: Prisma.FieldRef<"Applicant", 'String'>
  readonly program: Prisma.FieldRef<"Applicant", 'String'>
  readonly department: Prisma.FieldRef<"Applicant", 'String'>
  readonly session: Prisma.FieldRef<"Applicant", 'String'>
  readonly matricPercent: Prisma.FieldRef<"Applicant", 'Float'>
  readonly fscPercent: Prisma.FieldRef<"Applicant", 'Float'>
  readonly meritScore: Prisma.FieldRef<"Applicant", 'Float'>
  readonly gender: Prisma.FieldRef<"Applicant", 'String'>
  readonly city: Prisma.FieldRef<"Applicant", 'String'>
  readonly importedAt: Prisma.FieldRef<"Applicant", 'DateTime'>
}

export type ApplicantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    where: Prisma.ApplicantWhereUniqueInput
}

export type ApplicantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    where: Prisma.ApplicantWhereUniqueInput
}

export type ApplicantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    where?: Prisma.ApplicantWhereInput
    orderBy?: Prisma.ApplicantOrderByWithRelationInput | Prisma.ApplicantOrderByWithRelationInput[]
    cursor?: Prisma.ApplicantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.ApplicantScalarFieldEnum | Prisma.ApplicantScalarFieldEnum[]
}

export type ApplicantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    where?: Prisma.ApplicantWhereInput
    orderBy?: Prisma.ApplicantOrderByWithRelationInput | Prisma.ApplicantOrderByWithRelationInput[]
    cursor?: Prisma.ApplicantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.ApplicantScalarFieldEnum | Prisma.ApplicantScalarFieldEnum[]
}

export type ApplicantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    where?: Prisma.ApplicantWhereInput
    orderBy?: Prisma.ApplicantOrderByWithRelationInput | Prisma.ApplicantOrderByWithRelationInput[]
    cursor?: Prisma.ApplicantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.ApplicantScalarFieldEnum | Prisma.ApplicantScalarFieldEnum[]
}

export type ApplicantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.ApplicantCreateInput, Prisma.ApplicantUncheckedCreateInput>
}

export type ApplicantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ApplicantCreateManyInput | Prisma.ApplicantCreateManyInput[]
  skipDuplicates?: boolean
}

export type ApplicantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    data: Prisma.ApplicantCreateManyInput | Prisma.ApplicantCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.ApplicantIncludeCreateManyAndReturn<ExtArgs> | null
}

export type ApplicantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.ApplicantUpdateInput, Prisma.ApplicantUncheckedUpdateInput>
    where: Prisma.ApplicantWhereUniqueInput
}

export type ApplicantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ApplicantUpdateManyMutationInput, Prisma.ApplicantUncheckedUpdateManyInput>
    where?: Prisma.ApplicantWhereInput
    limit?: number
}

export type ApplicantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.ApplicantUpdateManyMutationInput, Prisma.ApplicantUncheckedUpdateManyInput>
    where?: Prisma.ApplicantWhereInput
    limit?: number
    include?: Prisma.ApplicantIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type ApplicantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    where: Prisma.ApplicantWhereUniqueInput
    create: Prisma.XOR<Prisma.ApplicantCreateInput, Prisma.ApplicantUncheckedCreateInput>
    update: Prisma.XOR<Prisma.ApplicantUpdateInput, Prisma.ApplicantUncheckedUpdateInput>
}

export type ApplicantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
    where: Prisma.ApplicantWhereUniqueInput
}

export type ApplicantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ApplicantWhereInput
    limit?: number
}

export type ApplicantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ApplicantSelect<ExtArgs> | null
    omit?: Prisma.ApplicantOmit<ExtArgs> | null
    include?: Prisma.ApplicantInclude<ExtArgs> | null
}
