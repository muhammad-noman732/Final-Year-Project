
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type ImportBatchModel = runtime.Types.Result.DefaultSelection<Prisma.$ImportBatchPayload>

export type AggregateImportBatch = {
  _count: ImportBatchCountAggregateOutputType | null
  _avg: ImportBatchAvgAggregateOutputType | null
  _sum: ImportBatchSumAggregateOutputType | null
  _min: ImportBatchMinAggregateOutputType | null
  _max: ImportBatchMaxAggregateOutputType | null
}

export type ImportBatchAvgAggregateOutputType = {
  totalCount: number | null
}

export type ImportBatchSumAggregateOutputType = {
  totalCount: number | null
}

export type ImportBatchMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  fileName: string | null
  totalCount: number | null
  program: string | null
  session: string | null
  importedBy: string | null
  importedAt: Date | null
}

export type ImportBatchMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  fileName: string | null
  totalCount: number | null
  program: string | null
  session: string | null
  importedBy: string | null
  importedAt: Date | null
}

export type ImportBatchCountAggregateOutputType = {
  id: number
  tenantId: number
  fileName: number
  totalCount: number
  program: number
  session: number
  importedBy: number
  importedAt: number
  _all: number
}

export type ImportBatchAvgAggregateInputType = {
  totalCount?: true
}

export type ImportBatchSumAggregateInputType = {
  totalCount?: true
}

export type ImportBatchMinAggregateInputType = {
  id?: true
  tenantId?: true
  fileName?: true
  totalCount?: true
  program?: true
  session?: true
  importedBy?: true
  importedAt?: true
}

export type ImportBatchMaxAggregateInputType = {
  id?: true
  tenantId?: true
  fileName?: true
  totalCount?: true
  program?: true
  session?: true
  importedBy?: true
  importedAt?: true
}

export type ImportBatchCountAggregateInputType = {
  id?: true
  tenantId?: true
  fileName?: true
  totalCount?: true
  program?: true
  session?: true
  importedBy?: true
  importedAt?: true
  _all?: true
}

export type ImportBatchAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImportBatchWhereInput
    orderBy?: Prisma.ImportBatchOrderByWithRelationInput | Prisma.ImportBatchOrderByWithRelationInput[]
    cursor?: Prisma.ImportBatchWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | ImportBatchCountAggregateInputType
    _avg?: ImportBatchAvgAggregateInputType
    _sum?: ImportBatchSumAggregateInputType
    _min?: ImportBatchMinAggregateInputType
    _max?: ImportBatchMaxAggregateInputType
}

export type GetImportBatchAggregateType<T extends ImportBatchAggregateArgs> = {
      [P in keyof T & keyof AggregateImportBatch]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateImportBatch[P]>
    : Prisma.GetScalarType<T[P], AggregateImportBatch[P]>
}

export type ImportBatchGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ImportBatchWhereInput
  orderBy?: Prisma.ImportBatchOrderByWithAggregationInput | Prisma.ImportBatchOrderByWithAggregationInput[]
  by: Prisma.ImportBatchScalarFieldEnum[] | Prisma.ImportBatchScalarFieldEnum
  having?: Prisma.ImportBatchScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: ImportBatchCountAggregateInputType | true
  _avg?: ImportBatchAvgAggregateInputType
  _sum?: ImportBatchSumAggregateInputType
  _min?: ImportBatchMinAggregateInputType
  _max?: ImportBatchMaxAggregateInputType
}

export type ImportBatchGroupByOutputType = {
  id: string
  tenantId: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt: Date
  _count: ImportBatchCountAggregateOutputType | null
  _avg: ImportBatchAvgAggregateOutputType | null
  _sum: ImportBatchSumAggregateOutputType | null
  _min: ImportBatchMinAggregateOutputType | null
  _max: ImportBatchMaxAggregateOutputType | null
}

export type GetImportBatchGroupByPayload<T extends ImportBatchGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<ImportBatchGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ImportBatchGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], ImportBatchGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], ImportBatchGroupByOutputType[P]>
      }
    >
  >

export type ImportBatchWhereInput = {
  AND?: Prisma.ImportBatchWhereInput | Prisma.ImportBatchWhereInput[]
  OR?: Prisma.ImportBatchWhereInput[]
  NOT?: Prisma.ImportBatchWhereInput | Prisma.ImportBatchWhereInput[]
  id?: Prisma.StringFilter<"ImportBatch"> | string
  tenantId?: Prisma.StringFilter<"ImportBatch"> | string
  fileName?: Prisma.StringFilter<"ImportBatch"> | string
  totalCount?: Prisma.IntFilter<"ImportBatch"> | number
  program?: Prisma.StringFilter<"ImportBatch"> | string
  session?: Prisma.StringFilter<"ImportBatch"> | string
  importedBy?: Prisma.StringFilter<"ImportBatch"> | string
  importedAt?: Prisma.DateTimeFilter<"ImportBatch"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  applicants?: Prisma.ApplicantListRelationFilter
}

export type ImportBatchOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  fileName?: Prisma.SortOrder
  totalCount?: Prisma.SortOrder
  program?: Prisma.SortOrder
  session?: Prisma.SortOrder
  importedBy?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  applicants?: Prisma.ApplicantOrderByRelationAggregateInput
}

export type ImportBatchWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.ImportBatchWhereInput | Prisma.ImportBatchWhereInput[]
  OR?: Prisma.ImportBatchWhereInput[]
  NOT?: Prisma.ImportBatchWhereInput | Prisma.ImportBatchWhereInput[]
  tenantId?: Prisma.StringFilter<"ImportBatch"> | string
  fileName?: Prisma.StringFilter<"ImportBatch"> | string
  totalCount?: Prisma.IntFilter<"ImportBatch"> | number
  program?: Prisma.StringFilter<"ImportBatch"> | string
  session?: Prisma.StringFilter<"ImportBatch"> | string
  importedBy?: Prisma.StringFilter<"ImportBatch"> | string
  importedAt?: Prisma.DateTimeFilter<"ImportBatch"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  applicants?: Prisma.ApplicantListRelationFilter
}, "id">

export type ImportBatchOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  fileName?: Prisma.SortOrder
  totalCount?: Prisma.SortOrder
  program?: Prisma.SortOrder
  session?: Prisma.SortOrder
  importedBy?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
  _count?: Prisma.ImportBatchCountOrderByAggregateInput
  _avg?: Prisma.ImportBatchAvgOrderByAggregateInput
  _max?: Prisma.ImportBatchMaxOrderByAggregateInput
  _min?: Prisma.ImportBatchMinOrderByAggregateInput
  _sum?: Prisma.ImportBatchSumOrderByAggregateInput
}

export type ImportBatchScalarWhereWithAggregatesInput = {
  AND?: Prisma.ImportBatchScalarWhereWithAggregatesInput | Prisma.ImportBatchScalarWhereWithAggregatesInput[]
  OR?: Prisma.ImportBatchScalarWhereWithAggregatesInput[]
  NOT?: Prisma.ImportBatchScalarWhereWithAggregatesInput | Prisma.ImportBatchScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"ImportBatch"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"ImportBatch"> | string
  fileName?: Prisma.StringWithAggregatesFilter<"ImportBatch"> | string
  totalCount?: Prisma.IntWithAggregatesFilter<"ImportBatch"> | number
  program?: Prisma.StringWithAggregatesFilter<"ImportBatch"> | string
  session?: Prisma.StringWithAggregatesFilter<"ImportBatch"> | string
  importedBy?: Prisma.StringWithAggregatesFilter<"ImportBatch"> | string
  importedAt?: Prisma.DateTimeWithAggregatesFilter<"ImportBatch"> | Date | string
}

export type ImportBatchCreateInput = {
  id?: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutImportBatchesInput
  applicants?: Prisma.ApplicantCreateNestedManyWithoutImportBatchInput
}

export type ImportBatchUncheckedCreateInput = {
  id?: string
  tenantId: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
  applicants?: Prisma.ApplicantUncheckedCreateNestedManyWithoutImportBatchInput
}

export type ImportBatchUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutImportBatchesNestedInput
  applicants?: Prisma.ApplicantUpdateManyWithoutImportBatchNestedInput
}

export type ImportBatchUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  applicants?: Prisma.ApplicantUncheckedUpdateManyWithoutImportBatchNestedInput
}

export type ImportBatchCreateManyInput = {
  id?: string
  tenantId: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
}

export type ImportBatchUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ImportBatchUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ImportBatchListRelationFilter = {
  every?: Prisma.ImportBatchWhereInput
  some?: Prisma.ImportBatchWhereInput
  none?: Prisma.ImportBatchWhereInput
}

export type ImportBatchOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type ImportBatchScalarRelationFilter = {
  is?: Prisma.ImportBatchWhereInput
  isNot?: Prisma.ImportBatchWhereInput
}

export type ImportBatchCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  fileName?: Prisma.SortOrder
  totalCount?: Prisma.SortOrder
  program?: Prisma.SortOrder
  session?: Prisma.SortOrder
  importedBy?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
}

export type ImportBatchAvgOrderByAggregateInput = {
  totalCount?: Prisma.SortOrder
}

export type ImportBatchMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  fileName?: Prisma.SortOrder
  totalCount?: Prisma.SortOrder
  program?: Prisma.SortOrder
  session?: Prisma.SortOrder
  importedBy?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
}

export type ImportBatchMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  fileName?: Prisma.SortOrder
  totalCount?: Prisma.SortOrder
  program?: Prisma.SortOrder
  session?: Prisma.SortOrder
  importedBy?: Prisma.SortOrder
  importedAt?: Prisma.SortOrder
}

export type ImportBatchSumOrderByAggregateInput = {
  totalCount?: Prisma.SortOrder
}

export type ImportBatchCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.ImportBatchCreateWithoutTenantInput, Prisma.ImportBatchUncheckedCreateWithoutTenantInput> | Prisma.ImportBatchCreateWithoutTenantInput[] | Prisma.ImportBatchUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ImportBatchCreateOrConnectWithoutTenantInput | Prisma.ImportBatchCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.ImportBatchCreateManyTenantInputEnvelope
  connect?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
}

export type ImportBatchUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.ImportBatchCreateWithoutTenantInput, Prisma.ImportBatchUncheckedCreateWithoutTenantInput> | Prisma.ImportBatchCreateWithoutTenantInput[] | Prisma.ImportBatchUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ImportBatchCreateOrConnectWithoutTenantInput | Prisma.ImportBatchCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.ImportBatchCreateManyTenantInputEnvelope
  connect?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
}

export type ImportBatchUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.ImportBatchCreateWithoutTenantInput, Prisma.ImportBatchUncheckedCreateWithoutTenantInput> | Prisma.ImportBatchCreateWithoutTenantInput[] | Prisma.ImportBatchUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ImportBatchCreateOrConnectWithoutTenantInput | Prisma.ImportBatchCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.ImportBatchUpsertWithWhereUniqueWithoutTenantInput | Prisma.ImportBatchUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.ImportBatchCreateManyTenantInputEnvelope
  set?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  disconnect?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  delete?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  connect?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  update?: Prisma.ImportBatchUpdateWithWhereUniqueWithoutTenantInput | Prisma.ImportBatchUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.ImportBatchUpdateManyWithWhereWithoutTenantInput | Prisma.ImportBatchUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.ImportBatchScalarWhereInput | Prisma.ImportBatchScalarWhereInput[]
}

export type ImportBatchUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.ImportBatchCreateWithoutTenantInput, Prisma.ImportBatchUncheckedCreateWithoutTenantInput> | Prisma.ImportBatchCreateWithoutTenantInput[] | Prisma.ImportBatchUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.ImportBatchCreateOrConnectWithoutTenantInput | Prisma.ImportBatchCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.ImportBatchUpsertWithWhereUniqueWithoutTenantInput | Prisma.ImportBatchUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.ImportBatchCreateManyTenantInputEnvelope
  set?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  disconnect?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  delete?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  connect?: Prisma.ImportBatchWhereUniqueInput | Prisma.ImportBatchWhereUniqueInput[]
  update?: Prisma.ImportBatchUpdateWithWhereUniqueWithoutTenantInput | Prisma.ImportBatchUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.ImportBatchUpdateManyWithWhereWithoutTenantInput | Prisma.ImportBatchUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.ImportBatchScalarWhereInput | Prisma.ImportBatchScalarWhereInput[]
}

export type ImportBatchCreateNestedOneWithoutApplicantsInput = {
  create?: Prisma.XOR<Prisma.ImportBatchCreateWithoutApplicantsInput, Prisma.ImportBatchUncheckedCreateWithoutApplicantsInput>
  connectOrCreate?: Prisma.ImportBatchCreateOrConnectWithoutApplicantsInput
  connect?: Prisma.ImportBatchWhereUniqueInput
}

export type ImportBatchUpdateOneRequiredWithoutApplicantsNestedInput = {
  create?: Prisma.XOR<Prisma.ImportBatchCreateWithoutApplicantsInput, Prisma.ImportBatchUncheckedCreateWithoutApplicantsInput>
  connectOrCreate?: Prisma.ImportBatchCreateOrConnectWithoutApplicantsInput
  upsert?: Prisma.ImportBatchUpsertWithoutApplicantsInput
  connect?: Prisma.ImportBatchWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.ImportBatchUpdateToOneWithWhereWithoutApplicantsInput, Prisma.ImportBatchUpdateWithoutApplicantsInput>, Prisma.ImportBatchUncheckedUpdateWithoutApplicantsInput>
}

export type ImportBatchCreateWithoutTenantInput = {
  id?: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
  applicants?: Prisma.ApplicantCreateNestedManyWithoutImportBatchInput
}

export type ImportBatchUncheckedCreateWithoutTenantInput = {
  id?: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
  applicants?: Prisma.ApplicantUncheckedCreateNestedManyWithoutImportBatchInput
}

export type ImportBatchCreateOrConnectWithoutTenantInput = {
  where: Prisma.ImportBatchWhereUniqueInput
  create: Prisma.XOR<Prisma.ImportBatchCreateWithoutTenantInput, Prisma.ImportBatchUncheckedCreateWithoutTenantInput>
}

export type ImportBatchCreateManyTenantInputEnvelope = {
  data: Prisma.ImportBatchCreateManyTenantInput | Prisma.ImportBatchCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type ImportBatchUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.ImportBatchWhereUniqueInput
  update: Prisma.XOR<Prisma.ImportBatchUpdateWithoutTenantInput, Prisma.ImportBatchUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.ImportBatchCreateWithoutTenantInput, Prisma.ImportBatchUncheckedCreateWithoutTenantInput>
}

export type ImportBatchUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.ImportBatchWhereUniqueInput
  data: Prisma.XOR<Prisma.ImportBatchUpdateWithoutTenantInput, Prisma.ImportBatchUncheckedUpdateWithoutTenantInput>
}

export type ImportBatchUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.ImportBatchScalarWhereInput
  data: Prisma.XOR<Prisma.ImportBatchUpdateManyMutationInput, Prisma.ImportBatchUncheckedUpdateManyWithoutTenantInput>
}

export type ImportBatchScalarWhereInput = {
  AND?: Prisma.ImportBatchScalarWhereInput | Prisma.ImportBatchScalarWhereInput[]
  OR?: Prisma.ImportBatchScalarWhereInput[]
  NOT?: Prisma.ImportBatchScalarWhereInput | Prisma.ImportBatchScalarWhereInput[]
  id?: Prisma.StringFilter<"ImportBatch"> | string
  tenantId?: Prisma.StringFilter<"ImportBatch"> | string
  fileName?: Prisma.StringFilter<"ImportBatch"> | string
  totalCount?: Prisma.IntFilter<"ImportBatch"> | number
  program?: Prisma.StringFilter<"ImportBatch"> | string
  session?: Prisma.StringFilter<"ImportBatch"> | string
  importedBy?: Prisma.StringFilter<"ImportBatch"> | string
  importedAt?: Prisma.DateTimeFilter<"ImportBatch"> | Date | string
}

export type ImportBatchCreateWithoutApplicantsInput = {
  id?: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutImportBatchesInput
}

export type ImportBatchUncheckedCreateWithoutApplicantsInput = {
  id?: string
  tenantId: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
}

export type ImportBatchCreateOrConnectWithoutApplicantsInput = {
  where: Prisma.ImportBatchWhereUniqueInput
  create: Prisma.XOR<Prisma.ImportBatchCreateWithoutApplicantsInput, Prisma.ImportBatchUncheckedCreateWithoutApplicantsInput>
}

export type ImportBatchUpsertWithoutApplicantsInput = {
  update: Prisma.XOR<Prisma.ImportBatchUpdateWithoutApplicantsInput, Prisma.ImportBatchUncheckedUpdateWithoutApplicantsInput>
  create: Prisma.XOR<Prisma.ImportBatchCreateWithoutApplicantsInput, Prisma.ImportBatchUncheckedCreateWithoutApplicantsInput>
  where?: Prisma.ImportBatchWhereInput
}

export type ImportBatchUpdateToOneWithWhereWithoutApplicantsInput = {
  where?: Prisma.ImportBatchWhereInput
  data: Prisma.XOR<Prisma.ImportBatchUpdateWithoutApplicantsInput, Prisma.ImportBatchUncheckedUpdateWithoutApplicantsInput>
}

export type ImportBatchUpdateWithoutApplicantsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutImportBatchesNestedInput
}

export type ImportBatchUncheckedUpdateWithoutApplicantsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ImportBatchCreateManyTenantInput = {
  id?: string
  fileName: string
  totalCount: number
  program: string
  session: string
  importedBy: string
  importedAt?: Date | string
}

export type ImportBatchUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  applicants?: Prisma.ApplicantUpdateManyWithoutImportBatchNestedInput
}

export type ImportBatchUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  applicants?: Prisma.ApplicantUncheckedUpdateManyWithoutImportBatchNestedInput
}

export type ImportBatchUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  fileName?: Prisma.StringFieldUpdateOperationsInput | string
  totalCount?: Prisma.IntFieldUpdateOperationsInput | number
  program?: Prisma.StringFieldUpdateOperationsInput | string
  session?: Prisma.StringFieldUpdateOperationsInput | string
  importedBy?: Prisma.StringFieldUpdateOperationsInput | string
  importedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type ImportBatchCountOutputType = {
  applicants: number
}

export type ImportBatchCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  applicants?: boolean | ImportBatchCountOutputTypeCountApplicantsArgs
}

export type ImportBatchCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchCountOutputTypeSelect<ExtArgs> | null
}

export type ImportBatchCountOutputTypeCountApplicantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.ApplicantWhereInput
}

export type ImportBatchSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  fileName?: boolean
  totalCount?: boolean
  program?: boolean
  session?: boolean
  importedBy?: boolean
  importedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  applicants?: boolean | Prisma.ImportBatch$applicantsArgs<ExtArgs>
  _count?: boolean | Prisma.ImportBatchCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["importBatch"]>

export type ImportBatchSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  fileName?: boolean
  totalCount?: boolean
  program?: boolean
  session?: boolean
  importedBy?: boolean
  importedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["importBatch"]>

export type ImportBatchSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  fileName?: boolean
  totalCount?: boolean
  program?: boolean
  session?: boolean
  importedBy?: boolean
  importedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}, ExtArgs["result"]["importBatch"]>

export type ImportBatchSelectScalar = {
  id?: boolean
  tenantId?: boolean
  fileName?: boolean
  totalCount?: boolean
  program?: boolean
  session?: boolean
  importedBy?: boolean
  importedAt?: boolean
}

export type ImportBatchOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "fileName" | "totalCount" | "program" | "session" | "importedBy" | "importedAt", ExtArgs["result"]["importBatch"]>
export type ImportBatchInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  applicants?: boolean | Prisma.ImportBatch$applicantsArgs<ExtArgs>
  _count?: boolean | Prisma.ImportBatchCountOutputTypeDefaultArgs<ExtArgs>
}
export type ImportBatchIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}
export type ImportBatchIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
}

export type $ImportBatchPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "ImportBatch"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    applicants: Prisma.$ApplicantPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    fileName: string
    totalCount: number
    program: string
    session: string
    importedBy: string
    importedAt: Date
  }, ExtArgs["result"]["importBatch"]>
  composites: {}
}

export type ImportBatchGetPayload<S extends boolean | null | undefined | ImportBatchDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload, S>

export type ImportBatchCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<ImportBatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ImportBatchCountAggregateInputType | true
  }

export interface ImportBatchDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImportBatch'], meta: { name: 'ImportBatch' } }
    findUnique<T extends ImportBatchFindUniqueArgs>(args: Prisma.SelectSubset<T, ImportBatchFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends ImportBatchFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ImportBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends ImportBatchFindFirstArgs>(args?: Prisma.SelectSubset<T, ImportBatchFindFirstArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends ImportBatchFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ImportBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends ImportBatchFindManyArgs>(args?: Prisma.SelectSubset<T, ImportBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends ImportBatchCreateArgs>(args: Prisma.SelectSubset<T, ImportBatchCreateArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends ImportBatchCreateManyArgs>(args?: Prisma.SelectSubset<T, ImportBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends ImportBatchCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ImportBatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends ImportBatchDeleteArgs>(args: Prisma.SelectSubset<T, ImportBatchDeleteArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends ImportBatchUpdateArgs>(args: Prisma.SelectSubset<T, ImportBatchUpdateArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends ImportBatchDeleteManyArgs>(args?: Prisma.SelectSubset<T, ImportBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends ImportBatchUpdateManyArgs>(args: Prisma.SelectSubset<T, ImportBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends ImportBatchUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ImportBatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends ImportBatchUpsertArgs>(args: Prisma.SelectSubset<T, ImportBatchUpsertArgs<ExtArgs>>): Prisma.Prisma__ImportBatchClient<runtime.Types.Result.GetResult<Prisma.$ImportBatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends ImportBatchCountArgs>(
    args?: Prisma.Subset<T, ImportBatchCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], ImportBatchCountAggregateOutputType>
      : number
  >

    aggregate<T extends ImportBatchAggregateArgs>(args: Prisma.Subset<T, ImportBatchAggregateArgs>): Prisma.PrismaPromise<GetImportBatchAggregateType<T>>

    groupBy<
    T extends ImportBatchGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: ImportBatchGroupByArgs['orderBy'] }
      : { orderBy?: ImportBatchGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, ImportBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: ImportBatchFieldRefs;
}

export interface Prisma__ImportBatchClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  applicants<T extends Prisma.ImportBatch$applicantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ImportBatch$applicantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ApplicantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface ImportBatchFieldRefs {
  readonly id: Prisma.FieldRef<"ImportBatch", 'String'>
  readonly tenantId: Prisma.FieldRef<"ImportBatch", 'String'>
  readonly fileName: Prisma.FieldRef<"ImportBatch", 'String'>
  readonly totalCount: Prisma.FieldRef<"ImportBatch", 'Int'>
  readonly program: Prisma.FieldRef<"ImportBatch", 'String'>
  readonly session: Prisma.FieldRef<"ImportBatch", 'String'>
  readonly importedBy: Prisma.FieldRef<"ImportBatch", 'String'>
  readonly importedAt: Prisma.FieldRef<"ImportBatch", 'DateTime'>
}

export type ImportBatchFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    where: Prisma.ImportBatchWhereUniqueInput
}

export type ImportBatchFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    where: Prisma.ImportBatchWhereUniqueInput
}

export type ImportBatchFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    where?: Prisma.ImportBatchWhereInput
    orderBy?: Prisma.ImportBatchOrderByWithRelationInput | Prisma.ImportBatchOrderByWithRelationInput[]
    cursor?: Prisma.ImportBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.ImportBatchScalarFieldEnum | Prisma.ImportBatchScalarFieldEnum[]
}

export type ImportBatchFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    where?: Prisma.ImportBatchWhereInput
    orderBy?: Prisma.ImportBatchOrderByWithRelationInput | Prisma.ImportBatchOrderByWithRelationInput[]
    cursor?: Prisma.ImportBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.ImportBatchScalarFieldEnum | Prisma.ImportBatchScalarFieldEnum[]
}

export type ImportBatchFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    where?: Prisma.ImportBatchWhereInput
    orderBy?: Prisma.ImportBatchOrderByWithRelationInput | Prisma.ImportBatchOrderByWithRelationInput[]
    cursor?: Prisma.ImportBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.ImportBatchScalarFieldEnum | Prisma.ImportBatchScalarFieldEnum[]
}

export type ImportBatchCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.ImportBatchCreateInput, Prisma.ImportBatchUncheckedCreateInput>
}

export type ImportBatchCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ImportBatchCreateManyInput | Prisma.ImportBatchCreateManyInput[]
  skipDuplicates?: boolean
}

export type ImportBatchCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    data: Prisma.ImportBatchCreateManyInput | Prisma.ImportBatchCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.ImportBatchIncludeCreateManyAndReturn<ExtArgs> | null
}

export type ImportBatchUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.ImportBatchUpdateInput, Prisma.ImportBatchUncheckedUpdateInput>
    where: Prisma.ImportBatchWhereUniqueInput
}

export type ImportBatchUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ImportBatchUpdateManyMutationInput, Prisma.ImportBatchUncheckedUpdateManyInput>
    where?: Prisma.ImportBatchWhereInput
    limit?: number
}

export type ImportBatchUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.ImportBatchUpdateManyMutationInput, Prisma.ImportBatchUncheckedUpdateManyInput>
    where?: Prisma.ImportBatchWhereInput
    limit?: number
    include?: Prisma.ImportBatchIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type ImportBatchUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    where: Prisma.ImportBatchWhereUniqueInput
    create: Prisma.XOR<Prisma.ImportBatchCreateInput, Prisma.ImportBatchUncheckedCreateInput>
    update: Prisma.XOR<Prisma.ImportBatchUpdateInput, Prisma.ImportBatchUncheckedUpdateInput>
}

export type ImportBatchDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
    where: Prisma.ImportBatchWhereUniqueInput
}

export type ImportBatchDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImportBatchWhereInput
    limit?: number
}

export type ImportBatch$applicantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type ImportBatchDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImportBatchSelect<ExtArgs> | null
    omit?: Prisma.ImportBatchOmit<ExtArgs> | null
    include?: Prisma.ImportBatchInclude<ExtArgs> | null
}
