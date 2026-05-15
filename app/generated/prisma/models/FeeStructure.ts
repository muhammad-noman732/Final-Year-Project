
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type FeeStructureModel = runtime.Types.Result.DefaultSelection<Prisma.$FeeStructurePayload>

export type AggregateFeeStructure = {
  _count: FeeStructureCountAggregateOutputType | null
  _avg: FeeStructureAvgAggregateOutputType | null
  _sum: FeeStructureSumAggregateOutputType | null
  _min: FeeStructureMinAggregateOutputType | null
  _max: FeeStructureMaxAggregateOutputType | null
}

export type FeeStructureAvgAggregateOutputType = {
  semester: number | null
  sessionYear: number | null
  tuitionFee: number | null
  labFee: number | null
  libraryFee: number | null
  sportsFee: number | null
  registrationFee: number | null
  examinationFee: number | null
  otherFee: number | null
  totalFee: number | null
  lateFee: number | null
}

export type FeeStructureSumAggregateOutputType = {
  semester: number | null
  sessionYear: number | null
  tuitionFee: number | null
  labFee: number | null
  libraryFee: number | null
  sportsFee: number | null
  registrationFee: number | null
  examinationFee: number | null
  otherFee: number | null
  totalFee: number | null
  lateFee: number | null
}

export type FeeStructureMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  programId: string | null
  semester: number | null
  sessionYear: number | null
  tuitionFee: number | null
  labFee: number | null
  libraryFee: number | null
  sportsFee: number | null
  registrationFee: number | null
  examinationFee: number | null
  otherFee: number | null
  totalFee: number | null
  dueDate: Date | null
  lateFee: number | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type FeeStructureMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  programId: string | null
  semester: number | null
  sessionYear: number | null
  tuitionFee: number | null
  labFee: number | null
  libraryFee: number | null
  sportsFee: number | null
  registrationFee: number | null
  examinationFee: number | null
  otherFee: number | null
  totalFee: number | null
  dueDate: Date | null
  lateFee: number | null
  isActive: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type FeeStructureCountAggregateOutputType = {
  id: number
  tenantId: number
  programId: number
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee: number
  libraryFee: number
  sportsFee: number
  registrationFee: number
  examinationFee: number
  otherFee: number
  totalFee: number
  dueDate: number
  lateFee: number
  isActive: number
  createdAt: number
  updatedAt: number
  _all: number
}

export type FeeStructureAvgAggregateInputType = {
  semester?: true
  sessionYear?: true
  tuitionFee?: true
  labFee?: true
  libraryFee?: true
  sportsFee?: true
  registrationFee?: true
  examinationFee?: true
  otherFee?: true
  totalFee?: true
  lateFee?: true
}

export type FeeStructureSumAggregateInputType = {
  semester?: true
  sessionYear?: true
  tuitionFee?: true
  labFee?: true
  libraryFee?: true
  sportsFee?: true
  registrationFee?: true
  examinationFee?: true
  otherFee?: true
  totalFee?: true
  lateFee?: true
}

export type FeeStructureMinAggregateInputType = {
  id?: true
  tenantId?: true
  programId?: true
  semester?: true
  sessionYear?: true
  tuitionFee?: true
  labFee?: true
  libraryFee?: true
  sportsFee?: true
  registrationFee?: true
  examinationFee?: true
  otherFee?: true
  totalFee?: true
  dueDate?: true
  lateFee?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
}

export type FeeStructureMaxAggregateInputType = {
  id?: true
  tenantId?: true
  programId?: true
  semester?: true
  sessionYear?: true
  tuitionFee?: true
  labFee?: true
  libraryFee?: true
  sportsFee?: true
  registrationFee?: true
  examinationFee?: true
  otherFee?: true
  totalFee?: true
  dueDate?: true
  lateFee?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
}

export type FeeStructureCountAggregateInputType = {
  id?: true
  tenantId?: true
  programId?: true
  semester?: true
  sessionYear?: true
  tuitionFee?: true
  labFee?: true
  libraryFee?: true
  sportsFee?: true
  registrationFee?: true
  examinationFee?: true
  otherFee?: true
  totalFee?: true
  dueDate?: true
  lateFee?: true
  isActive?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type FeeStructureAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeeStructureWhereInput
    orderBy?: Prisma.FeeStructureOrderByWithRelationInput | Prisma.FeeStructureOrderByWithRelationInput[]
    cursor?: Prisma.FeeStructureWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | FeeStructureCountAggregateInputType
    _avg?: FeeStructureAvgAggregateInputType
    _sum?: FeeStructureSumAggregateInputType
    _min?: FeeStructureMinAggregateInputType
    _max?: FeeStructureMaxAggregateInputType
}

export type GetFeeStructureAggregateType<T extends FeeStructureAggregateArgs> = {
      [P in keyof T & keyof AggregateFeeStructure]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateFeeStructure[P]>
    : Prisma.GetScalarType<T[P], AggregateFeeStructure[P]>
}

export type FeeStructureGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.FeeStructureWhereInput
  orderBy?: Prisma.FeeStructureOrderByWithAggregationInput | Prisma.FeeStructureOrderByWithAggregationInput[]
  by: Prisma.FeeStructureScalarFieldEnum[] | Prisma.FeeStructureScalarFieldEnum
  having?: Prisma.FeeStructureScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: FeeStructureCountAggregateInputType | true
  _avg?: FeeStructureAvgAggregateInputType
  _sum?: FeeStructureSumAggregateInputType
  _min?: FeeStructureMinAggregateInputType
  _max?: FeeStructureMaxAggregateInputType
}

export type FeeStructureGroupByOutputType = {
  id: string
  tenantId: string
  programId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee: number
  libraryFee: number
  sportsFee: number
  registrationFee: number
  examinationFee: number
  otherFee: number
  totalFee: number
  dueDate: Date
  lateFee: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  _count: FeeStructureCountAggregateOutputType | null
  _avg: FeeStructureAvgAggregateOutputType | null
  _sum: FeeStructureSumAggregateOutputType | null
  _min: FeeStructureMinAggregateOutputType | null
  _max: FeeStructureMaxAggregateOutputType | null
}

export type GetFeeStructureGroupByPayload<T extends FeeStructureGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<FeeStructureGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof FeeStructureGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], FeeStructureGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], FeeStructureGroupByOutputType[P]>
      }
    >
  >

export type FeeStructureWhereInput = {
  AND?: Prisma.FeeStructureWhereInput | Prisma.FeeStructureWhereInput[]
  OR?: Prisma.FeeStructureWhereInput[]
  NOT?: Prisma.FeeStructureWhereInput | Prisma.FeeStructureWhereInput[]
  id?: Prisma.StringFilter<"FeeStructure"> | string
  tenantId?: Prisma.StringFilter<"FeeStructure"> | string
  programId?: Prisma.StringFilter<"FeeStructure"> | string
  semester?: Prisma.IntFilter<"FeeStructure"> | number
  sessionYear?: Prisma.IntFilter<"FeeStructure"> | number
  tuitionFee?: Prisma.IntFilter<"FeeStructure"> | number
  labFee?: Prisma.IntFilter<"FeeStructure"> | number
  libraryFee?: Prisma.IntFilter<"FeeStructure"> | number
  sportsFee?: Prisma.IntFilter<"FeeStructure"> | number
  registrationFee?: Prisma.IntFilter<"FeeStructure"> | number
  examinationFee?: Prisma.IntFilter<"FeeStructure"> | number
  otherFee?: Prisma.IntFilter<"FeeStructure"> | number
  totalFee?: Prisma.IntFilter<"FeeStructure"> | number
  dueDate?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  lateFee?: Prisma.IntFilter<"FeeStructure"> | number
  isActive?: Prisma.BoolFilter<"FeeStructure"> | boolean
  createdAt?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  program?: Prisma.XOR<Prisma.ProgramScalarRelationFilter, Prisma.ProgramWhereInput>
  assignments?: Prisma.FeeAssignmentListRelationFilter
}

export type FeeStructureOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  semester?: Prisma.SortOrder
  sessionYear?: Prisma.SortOrder
  tuitionFee?: Prisma.SortOrder
  labFee?: Prisma.SortOrder
  libraryFee?: Prisma.SortOrder
  sportsFee?: Prisma.SortOrder
  registrationFee?: Prisma.SortOrder
  examinationFee?: Prisma.SortOrder
  otherFee?: Prisma.SortOrder
  totalFee?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  lateFee?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  tenant?: Prisma.TenantOrderByWithRelationInput
  program?: Prisma.ProgramOrderByWithRelationInput
  assignments?: Prisma.FeeAssignmentOrderByRelationAggregateInput
}

export type FeeStructureWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  tenantId_programId_semester_sessionYear?: Prisma.FeeStructureTenantIdProgramIdSemesterSessionYearCompoundUniqueInput
  AND?: Prisma.FeeStructureWhereInput | Prisma.FeeStructureWhereInput[]
  OR?: Prisma.FeeStructureWhereInput[]
  NOT?: Prisma.FeeStructureWhereInput | Prisma.FeeStructureWhereInput[]
  tenantId?: Prisma.StringFilter<"FeeStructure"> | string
  programId?: Prisma.StringFilter<"FeeStructure"> | string
  semester?: Prisma.IntFilter<"FeeStructure"> | number
  sessionYear?: Prisma.IntFilter<"FeeStructure"> | number
  tuitionFee?: Prisma.IntFilter<"FeeStructure"> | number
  labFee?: Prisma.IntFilter<"FeeStructure"> | number
  libraryFee?: Prisma.IntFilter<"FeeStructure"> | number
  sportsFee?: Prisma.IntFilter<"FeeStructure"> | number
  registrationFee?: Prisma.IntFilter<"FeeStructure"> | number
  examinationFee?: Prisma.IntFilter<"FeeStructure"> | number
  otherFee?: Prisma.IntFilter<"FeeStructure"> | number
  totalFee?: Prisma.IntFilter<"FeeStructure"> | number
  dueDate?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  lateFee?: Prisma.IntFilter<"FeeStructure"> | number
  isActive?: Prisma.BoolFilter<"FeeStructure"> | boolean
  createdAt?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>
  program?: Prisma.XOR<Prisma.ProgramScalarRelationFilter, Prisma.ProgramWhereInput>
  assignments?: Prisma.FeeAssignmentListRelationFilter
}, "id" | "tenantId_programId_semester_sessionYear">

export type FeeStructureOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  semester?: Prisma.SortOrder
  sessionYear?: Prisma.SortOrder
  tuitionFee?: Prisma.SortOrder
  labFee?: Prisma.SortOrder
  libraryFee?: Prisma.SortOrder
  sportsFee?: Prisma.SortOrder
  registrationFee?: Prisma.SortOrder
  examinationFee?: Prisma.SortOrder
  otherFee?: Prisma.SortOrder
  totalFee?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  lateFee?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.FeeStructureCountOrderByAggregateInput
  _avg?: Prisma.FeeStructureAvgOrderByAggregateInput
  _max?: Prisma.FeeStructureMaxOrderByAggregateInput
  _min?: Prisma.FeeStructureMinOrderByAggregateInput
  _sum?: Prisma.FeeStructureSumOrderByAggregateInput
}

export type FeeStructureScalarWhereWithAggregatesInput = {
  AND?: Prisma.FeeStructureScalarWhereWithAggregatesInput | Prisma.FeeStructureScalarWhereWithAggregatesInput[]
  OR?: Prisma.FeeStructureScalarWhereWithAggregatesInput[]
  NOT?: Prisma.FeeStructureScalarWhereWithAggregatesInput | Prisma.FeeStructureScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"FeeStructure"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"FeeStructure"> | string
  programId?: Prisma.StringWithAggregatesFilter<"FeeStructure"> | string
  semester?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  sessionYear?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  tuitionFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  labFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  libraryFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  sportsFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  registrationFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  examinationFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  otherFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  totalFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  dueDate?: Prisma.DateTimeWithAggregatesFilter<"FeeStructure"> | Date | string
  lateFee?: Prisma.IntWithAggregatesFilter<"FeeStructure"> | number
  isActive?: Prisma.BoolWithAggregatesFilter<"FeeStructure"> | boolean
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"FeeStructure"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FeeStructure"> | Date | string
}

export type FeeStructureCreateInput = {
  id?: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutFeeStructuresInput
  program: Prisma.ProgramCreateNestedOneWithoutFeeStructuresInput
  assignments?: Prisma.FeeAssignmentCreateNestedManyWithoutFeeStructureInput
}

export type FeeStructureUncheckedCreateInput = {
  id?: string
  tenantId: string
  programId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  assignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutFeeStructureInput
}

export type FeeStructureUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutFeeStructuresNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutFeeStructuresNestedInput
  assignments?: Prisma.FeeAssignmentUpdateManyWithoutFeeStructureNestedInput
}

export type FeeStructureUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutFeeStructureNestedInput
}

export type FeeStructureCreateManyInput = {
  id?: string
  tenantId: string
  programId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeStructureUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeStructureUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeStructureListRelationFilter = {
  every?: Prisma.FeeStructureWhereInput
  some?: Prisma.FeeStructureWhereInput
  none?: Prisma.FeeStructureWhereInput
}

export type FeeStructureOrderByRelationAggregateInput = {
  _count?: Prisma.SortOrder
}

export type FeeStructureTenantIdProgramIdSemesterSessionYearCompoundUniqueInput = {
  tenantId: string
  programId: string
  semester: number
  sessionYear: number
}

export type FeeStructureCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  semester?: Prisma.SortOrder
  sessionYear?: Prisma.SortOrder
  tuitionFee?: Prisma.SortOrder
  labFee?: Prisma.SortOrder
  libraryFee?: Prisma.SortOrder
  sportsFee?: Prisma.SortOrder
  registrationFee?: Prisma.SortOrder
  examinationFee?: Prisma.SortOrder
  otherFee?: Prisma.SortOrder
  totalFee?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  lateFee?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type FeeStructureAvgOrderByAggregateInput = {
  semester?: Prisma.SortOrder
  sessionYear?: Prisma.SortOrder
  tuitionFee?: Prisma.SortOrder
  labFee?: Prisma.SortOrder
  libraryFee?: Prisma.SortOrder
  sportsFee?: Prisma.SortOrder
  registrationFee?: Prisma.SortOrder
  examinationFee?: Prisma.SortOrder
  otherFee?: Prisma.SortOrder
  totalFee?: Prisma.SortOrder
  lateFee?: Prisma.SortOrder
}

export type FeeStructureMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  semester?: Prisma.SortOrder
  sessionYear?: Prisma.SortOrder
  tuitionFee?: Prisma.SortOrder
  labFee?: Prisma.SortOrder
  libraryFee?: Prisma.SortOrder
  sportsFee?: Prisma.SortOrder
  registrationFee?: Prisma.SortOrder
  examinationFee?: Prisma.SortOrder
  otherFee?: Prisma.SortOrder
  totalFee?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  lateFee?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type FeeStructureMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  programId?: Prisma.SortOrder
  semester?: Prisma.SortOrder
  sessionYear?: Prisma.SortOrder
  tuitionFee?: Prisma.SortOrder
  labFee?: Prisma.SortOrder
  libraryFee?: Prisma.SortOrder
  sportsFee?: Prisma.SortOrder
  registrationFee?: Prisma.SortOrder
  examinationFee?: Prisma.SortOrder
  otherFee?: Prisma.SortOrder
  totalFee?: Prisma.SortOrder
  dueDate?: Prisma.SortOrder
  lateFee?: Prisma.SortOrder
  isActive?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type FeeStructureSumOrderByAggregateInput = {
  semester?: Prisma.SortOrder
  sessionYear?: Prisma.SortOrder
  tuitionFee?: Prisma.SortOrder
  labFee?: Prisma.SortOrder
  libraryFee?: Prisma.SortOrder
  sportsFee?: Prisma.SortOrder
  registrationFee?: Prisma.SortOrder
  examinationFee?: Prisma.SortOrder
  otherFee?: Prisma.SortOrder
  totalFee?: Prisma.SortOrder
  lateFee?: Prisma.SortOrder
}

export type FeeStructureScalarRelationFilter = {
  is?: Prisma.FeeStructureWhereInput
  isNot?: Prisma.FeeStructureWhereInput
}

export type FeeStructureCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutTenantInput, Prisma.FeeStructureUncheckedCreateWithoutTenantInput> | Prisma.FeeStructureCreateWithoutTenantInput[] | Prisma.FeeStructureUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutTenantInput | Prisma.FeeStructureCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.FeeStructureCreateManyTenantInputEnvelope
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
}

export type FeeStructureUncheckedCreateNestedManyWithoutTenantInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutTenantInput, Prisma.FeeStructureUncheckedCreateWithoutTenantInput> | Prisma.FeeStructureCreateWithoutTenantInput[] | Prisma.FeeStructureUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutTenantInput | Prisma.FeeStructureCreateOrConnectWithoutTenantInput[]
  createMany?: Prisma.FeeStructureCreateManyTenantInputEnvelope
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
}

export type FeeStructureUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutTenantInput, Prisma.FeeStructureUncheckedCreateWithoutTenantInput> | Prisma.FeeStructureCreateWithoutTenantInput[] | Prisma.FeeStructureUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutTenantInput | Prisma.FeeStructureCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.FeeStructureUpsertWithWhereUniqueWithoutTenantInput | Prisma.FeeStructureUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.FeeStructureCreateManyTenantInputEnvelope
  set?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  disconnect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  delete?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  update?: Prisma.FeeStructureUpdateWithWhereUniqueWithoutTenantInput | Prisma.FeeStructureUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.FeeStructureUpdateManyWithWhereWithoutTenantInput | Prisma.FeeStructureUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.FeeStructureScalarWhereInput | Prisma.FeeStructureScalarWhereInput[]
}

export type FeeStructureUncheckedUpdateManyWithoutTenantNestedInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutTenantInput, Prisma.FeeStructureUncheckedCreateWithoutTenantInput> | Prisma.FeeStructureCreateWithoutTenantInput[] | Prisma.FeeStructureUncheckedCreateWithoutTenantInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutTenantInput | Prisma.FeeStructureCreateOrConnectWithoutTenantInput[]
  upsert?: Prisma.FeeStructureUpsertWithWhereUniqueWithoutTenantInput | Prisma.FeeStructureUpsertWithWhereUniqueWithoutTenantInput[]
  createMany?: Prisma.FeeStructureCreateManyTenantInputEnvelope
  set?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  disconnect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  delete?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  update?: Prisma.FeeStructureUpdateWithWhereUniqueWithoutTenantInput | Prisma.FeeStructureUpdateWithWhereUniqueWithoutTenantInput[]
  updateMany?: Prisma.FeeStructureUpdateManyWithWhereWithoutTenantInput | Prisma.FeeStructureUpdateManyWithWhereWithoutTenantInput[]
  deleteMany?: Prisma.FeeStructureScalarWhereInput | Prisma.FeeStructureScalarWhereInput[]
}

export type FeeStructureCreateNestedManyWithoutProgramInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutProgramInput, Prisma.FeeStructureUncheckedCreateWithoutProgramInput> | Prisma.FeeStructureCreateWithoutProgramInput[] | Prisma.FeeStructureUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutProgramInput | Prisma.FeeStructureCreateOrConnectWithoutProgramInput[]
  createMany?: Prisma.FeeStructureCreateManyProgramInputEnvelope
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
}

export type FeeStructureUncheckedCreateNestedManyWithoutProgramInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutProgramInput, Prisma.FeeStructureUncheckedCreateWithoutProgramInput> | Prisma.FeeStructureCreateWithoutProgramInput[] | Prisma.FeeStructureUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutProgramInput | Prisma.FeeStructureCreateOrConnectWithoutProgramInput[]
  createMany?: Prisma.FeeStructureCreateManyProgramInputEnvelope
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
}

export type FeeStructureUpdateManyWithoutProgramNestedInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutProgramInput, Prisma.FeeStructureUncheckedCreateWithoutProgramInput> | Prisma.FeeStructureCreateWithoutProgramInput[] | Prisma.FeeStructureUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutProgramInput | Prisma.FeeStructureCreateOrConnectWithoutProgramInput[]
  upsert?: Prisma.FeeStructureUpsertWithWhereUniqueWithoutProgramInput | Prisma.FeeStructureUpsertWithWhereUniqueWithoutProgramInput[]
  createMany?: Prisma.FeeStructureCreateManyProgramInputEnvelope
  set?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  disconnect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  delete?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  update?: Prisma.FeeStructureUpdateWithWhereUniqueWithoutProgramInput | Prisma.FeeStructureUpdateWithWhereUniqueWithoutProgramInput[]
  updateMany?: Prisma.FeeStructureUpdateManyWithWhereWithoutProgramInput | Prisma.FeeStructureUpdateManyWithWhereWithoutProgramInput[]
  deleteMany?: Prisma.FeeStructureScalarWhereInput | Prisma.FeeStructureScalarWhereInput[]
}

export type FeeStructureUncheckedUpdateManyWithoutProgramNestedInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutProgramInput, Prisma.FeeStructureUncheckedCreateWithoutProgramInput> | Prisma.FeeStructureCreateWithoutProgramInput[] | Prisma.FeeStructureUncheckedCreateWithoutProgramInput[]
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutProgramInput | Prisma.FeeStructureCreateOrConnectWithoutProgramInput[]
  upsert?: Prisma.FeeStructureUpsertWithWhereUniqueWithoutProgramInput | Prisma.FeeStructureUpsertWithWhereUniqueWithoutProgramInput[]
  createMany?: Prisma.FeeStructureCreateManyProgramInputEnvelope
  set?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  disconnect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  delete?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  connect?: Prisma.FeeStructureWhereUniqueInput | Prisma.FeeStructureWhereUniqueInput[]
  update?: Prisma.FeeStructureUpdateWithWhereUniqueWithoutProgramInput | Prisma.FeeStructureUpdateWithWhereUniqueWithoutProgramInput[]
  updateMany?: Prisma.FeeStructureUpdateManyWithWhereWithoutProgramInput | Prisma.FeeStructureUpdateManyWithWhereWithoutProgramInput[]
  deleteMany?: Prisma.FeeStructureScalarWhereInput | Prisma.FeeStructureScalarWhereInput[]
}

export type FeeStructureCreateNestedOneWithoutAssignmentsInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutAssignmentsInput, Prisma.FeeStructureUncheckedCreateWithoutAssignmentsInput>
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutAssignmentsInput
  connect?: Prisma.FeeStructureWhereUniqueInput
}

export type FeeStructureUpdateOneRequiredWithoutAssignmentsNestedInput = {
  create?: Prisma.XOR<Prisma.FeeStructureCreateWithoutAssignmentsInput, Prisma.FeeStructureUncheckedCreateWithoutAssignmentsInput>
  connectOrCreate?: Prisma.FeeStructureCreateOrConnectWithoutAssignmentsInput
  upsert?: Prisma.FeeStructureUpsertWithoutAssignmentsInput
  connect?: Prisma.FeeStructureWhereUniqueInput
  update?: Prisma.XOR<Prisma.XOR<Prisma.FeeStructureUpdateToOneWithWhereWithoutAssignmentsInput, Prisma.FeeStructureUpdateWithoutAssignmentsInput>, Prisma.FeeStructureUncheckedUpdateWithoutAssignmentsInput>
}

export type FeeStructureCreateWithoutTenantInput = {
  id?: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  program: Prisma.ProgramCreateNestedOneWithoutFeeStructuresInput
  assignments?: Prisma.FeeAssignmentCreateNestedManyWithoutFeeStructureInput
}

export type FeeStructureUncheckedCreateWithoutTenantInput = {
  id?: string
  programId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  assignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutFeeStructureInput
}

export type FeeStructureCreateOrConnectWithoutTenantInput = {
  where: Prisma.FeeStructureWhereUniqueInput
  create: Prisma.XOR<Prisma.FeeStructureCreateWithoutTenantInput, Prisma.FeeStructureUncheckedCreateWithoutTenantInput>
}

export type FeeStructureCreateManyTenantInputEnvelope = {
  data: Prisma.FeeStructureCreateManyTenantInput | Prisma.FeeStructureCreateManyTenantInput[]
  skipDuplicates?: boolean
}

export type FeeStructureUpsertWithWhereUniqueWithoutTenantInput = {
  where: Prisma.FeeStructureWhereUniqueInput
  update: Prisma.XOR<Prisma.FeeStructureUpdateWithoutTenantInput, Prisma.FeeStructureUncheckedUpdateWithoutTenantInput>
  create: Prisma.XOR<Prisma.FeeStructureCreateWithoutTenantInput, Prisma.FeeStructureUncheckedCreateWithoutTenantInput>
}

export type FeeStructureUpdateWithWhereUniqueWithoutTenantInput = {
  where: Prisma.FeeStructureWhereUniqueInput
  data: Prisma.XOR<Prisma.FeeStructureUpdateWithoutTenantInput, Prisma.FeeStructureUncheckedUpdateWithoutTenantInput>
}

export type FeeStructureUpdateManyWithWhereWithoutTenantInput = {
  where: Prisma.FeeStructureScalarWhereInput
  data: Prisma.XOR<Prisma.FeeStructureUpdateManyMutationInput, Prisma.FeeStructureUncheckedUpdateManyWithoutTenantInput>
}

export type FeeStructureScalarWhereInput = {
  AND?: Prisma.FeeStructureScalarWhereInput | Prisma.FeeStructureScalarWhereInput[]
  OR?: Prisma.FeeStructureScalarWhereInput[]
  NOT?: Prisma.FeeStructureScalarWhereInput | Prisma.FeeStructureScalarWhereInput[]
  id?: Prisma.StringFilter<"FeeStructure"> | string
  tenantId?: Prisma.StringFilter<"FeeStructure"> | string
  programId?: Prisma.StringFilter<"FeeStructure"> | string
  semester?: Prisma.IntFilter<"FeeStructure"> | number
  sessionYear?: Prisma.IntFilter<"FeeStructure"> | number
  tuitionFee?: Prisma.IntFilter<"FeeStructure"> | number
  labFee?: Prisma.IntFilter<"FeeStructure"> | number
  libraryFee?: Prisma.IntFilter<"FeeStructure"> | number
  sportsFee?: Prisma.IntFilter<"FeeStructure"> | number
  registrationFee?: Prisma.IntFilter<"FeeStructure"> | number
  examinationFee?: Prisma.IntFilter<"FeeStructure"> | number
  otherFee?: Prisma.IntFilter<"FeeStructure"> | number
  totalFee?: Prisma.IntFilter<"FeeStructure"> | number
  dueDate?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  lateFee?: Prisma.IntFilter<"FeeStructure"> | number
  isActive?: Prisma.BoolFilter<"FeeStructure"> | boolean
  createdAt?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"FeeStructure"> | Date | string
}

export type FeeStructureCreateWithoutProgramInput = {
  id?: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutFeeStructuresInput
  assignments?: Prisma.FeeAssignmentCreateNestedManyWithoutFeeStructureInput
}

export type FeeStructureUncheckedCreateWithoutProgramInput = {
  id?: string
  tenantId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  assignments?: Prisma.FeeAssignmentUncheckedCreateNestedManyWithoutFeeStructureInput
}

export type FeeStructureCreateOrConnectWithoutProgramInput = {
  where: Prisma.FeeStructureWhereUniqueInput
  create: Prisma.XOR<Prisma.FeeStructureCreateWithoutProgramInput, Prisma.FeeStructureUncheckedCreateWithoutProgramInput>
}

export type FeeStructureCreateManyProgramInputEnvelope = {
  data: Prisma.FeeStructureCreateManyProgramInput | Prisma.FeeStructureCreateManyProgramInput[]
  skipDuplicates?: boolean
}

export type FeeStructureUpsertWithWhereUniqueWithoutProgramInput = {
  where: Prisma.FeeStructureWhereUniqueInput
  update: Prisma.XOR<Prisma.FeeStructureUpdateWithoutProgramInput, Prisma.FeeStructureUncheckedUpdateWithoutProgramInput>
  create: Prisma.XOR<Prisma.FeeStructureCreateWithoutProgramInput, Prisma.FeeStructureUncheckedCreateWithoutProgramInput>
}

export type FeeStructureUpdateWithWhereUniqueWithoutProgramInput = {
  where: Prisma.FeeStructureWhereUniqueInput
  data: Prisma.XOR<Prisma.FeeStructureUpdateWithoutProgramInput, Prisma.FeeStructureUncheckedUpdateWithoutProgramInput>
}

export type FeeStructureUpdateManyWithWhereWithoutProgramInput = {
  where: Prisma.FeeStructureScalarWhereInput
  data: Prisma.XOR<Prisma.FeeStructureUpdateManyMutationInput, Prisma.FeeStructureUncheckedUpdateManyWithoutProgramInput>
}

export type FeeStructureCreateWithoutAssignmentsInput = {
  id?: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
  tenant: Prisma.TenantCreateNestedOneWithoutFeeStructuresInput
  program: Prisma.ProgramCreateNestedOneWithoutFeeStructuresInput
}

export type FeeStructureUncheckedCreateWithoutAssignmentsInput = {
  id?: string
  tenantId: string
  programId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeStructureCreateOrConnectWithoutAssignmentsInput = {
  where: Prisma.FeeStructureWhereUniqueInput
  create: Prisma.XOR<Prisma.FeeStructureCreateWithoutAssignmentsInput, Prisma.FeeStructureUncheckedCreateWithoutAssignmentsInput>
}

export type FeeStructureUpsertWithoutAssignmentsInput = {
  update: Prisma.XOR<Prisma.FeeStructureUpdateWithoutAssignmentsInput, Prisma.FeeStructureUncheckedUpdateWithoutAssignmentsInput>
  create: Prisma.XOR<Prisma.FeeStructureCreateWithoutAssignmentsInput, Prisma.FeeStructureUncheckedCreateWithoutAssignmentsInput>
  where?: Prisma.FeeStructureWhereInput
}

export type FeeStructureUpdateToOneWithWhereWithoutAssignmentsInput = {
  where?: Prisma.FeeStructureWhereInput
  data: Prisma.XOR<Prisma.FeeStructureUpdateWithoutAssignmentsInput, Prisma.FeeStructureUncheckedUpdateWithoutAssignmentsInput>
}

export type FeeStructureUpdateWithoutAssignmentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutFeeStructuresNestedInput
  program?: Prisma.ProgramUpdateOneRequiredWithoutFeeStructuresNestedInput
}

export type FeeStructureUncheckedUpdateWithoutAssignmentsInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeStructureCreateManyTenantInput = {
  id?: string
  programId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeStructureUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  program?: Prisma.ProgramUpdateOneRequiredWithoutFeeStructuresNestedInput
  assignments?: Prisma.FeeAssignmentUpdateManyWithoutFeeStructureNestedInput
}

export type FeeStructureUncheckedUpdateWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutFeeStructureNestedInput
}

export type FeeStructureUncheckedUpdateManyWithoutTenantInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  programId?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeStructureCreateManyProgramInput = {
  id?: string
  tenantId: string
  semester: number
  sessionYear: number
  tuitionFee: number
  labFee?: number
  libraryFee?: number
  sportsFee?: number
  registrationFee?: number
  examinationFee?: number
  otherFee?: number
  totalFee: number
  dueDate: Date | string
  lateFee?: number
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type FeeStructureUpdateWithoutProgramInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  tenant?: Prisma.TenantUpdateOneRequiredWithoutFeeStructuresNestedInput
  assignments?: Prisma.FeeAssignmentUpdateManyWithoutFeeStructureNestedInput
}

export type FeeStructureUncheckedUpdateWithoutProgramInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  assignments?: Prisma.FeeAssignmentUncheckedUpdateManyWithoutFeeStructureNestedInput
}

export type FeeStructureUncheckedUpdateManyWithoutProgramInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  semester?: Prisma.IntFieldUpdateOperationsInput | number
  sessionYear?: Prisma.IntFieldUpdateOperationsInput | number
  tuitionFee?: Prisma.IntFieldUpdateOperationsInput | number
  labFee?: Prisma.IntFieldUpdateOperationsInput | number
  libraryFee?: Prisma.IntFieldUpdateOperationsInput | number
  sportsFee?: Prisma.IntFieldUpdateOperationsInput | number
  registrationFee?: Prisma.IntFieldUpdateOperationsInput | number
  examinationFee?: Prisma.IntFieldUpdateOperationsInput | number
  otherFee?: Prisma.IntFieldUpdateOperationsInput | number
  totalFee?: Prisma.IntFieldUpdateOperationsInput | number
  dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  lateFee?: Prisma.IntFieldUpdateOperationsInput | number
  isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type FeeStructureCountOutputType = {
  assignments: number
}

export type FeeStructureCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  assignments?: boolean | FeeStructureCountOutputTypeCountAssignmentsArgs
}

export type FeeStructureCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureCountOutputTypeSelect<ExtArgs> | null
}

export type FeeStructureCountOutputTypeCountAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.FeeAssignmentWhereInput
}

export type FeeStructureSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  programId?: boolean
  semester?: boolean
  sessionYear?: boolean
  tuitionFee?: boolean
  labFee?: boolean
  libraryFee?: boolean
  sportsFee?: boolean
  registrationFee?: boolean
  examinationFee?: boolean
  otherFee?: boolean
  totalFee?: boolean
  dueDate?: boolean
  lateFee?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
  assignments?: boolean | Prisma.FeeStructure$assignmentsArgs<ExtArgs>
  _count?: boolean | Prisma.FeeStructureCountOutputTypeDefaultArgs<ExtArgs>
}, ExtArgs["result"]["feeStructure"]>

export type FeeStructureSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  programId?: boolean
  semester?: boolean
  sessionYear?: boolean
  tuitionFee?: boolean
  labFee?: boolean
  libraryFee?: boolean
  sportsFee?: boolean
  registrationFee?: boolean
  examinationFee?: boolean
  otherFee?: boolean
  totalFee?: boolean
  dueDate?: boolean
  lateFee?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}, ExtArgs["result"]["feeStructure"]>

export type FeeStructureSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  programId?: boolean
  semester?: boolean
  sessionYear?: boolean
  tuitionFee?: boolean
  labFee?: boolean
  libraryFee?: boolean
  sportsFee?: boolean
  registrationFee?: boolean
  examinationFee?: boolean
  otherFee?: boolean
  totalFee?: boolean
  dueDate?: boolean
  lateFee?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}, ExtArgs["result"]["feeStructure"]>

export type FeeStructureSelectScalar = {
  id?: boolean
  tenantId?: boolean
  programId?: boolean
  semester?: boolean
  sessionYear?: boolean
  tuitionFee?: boolean
  labFee?: boolean
  libraryFee?: boolean
  sportsFee?: boolean
  registrationFee?: boolean
  examinationFee?: boolean
  otherFee?: boolean
  totalFee?: boolean
  dueDate?: boolean
  lateFee?: boolean
  isActive?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type FeeStructureOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "programId" | "semester" | "sessionYear" | "tuitionFee" | "labFee" | "libraryFee" | "sportsFee" | "registrationFee" | "examinationFee" | "otherFee" | "totalFee" | "dueDate" | "lateFee" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["feeStructure"]>
export type FeeStructureInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
  assignments?: boolean | Prisma.FeeStructure$assignmentsArgs<ExtArgs>
  _count?: boolean | Prisma.FeeStructureCountOutputTypeDefaultArgs<ExtArgs>
}
export type FeeStructureIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}
export type FeeStructureIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>
  program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>
}

export type $FeeStructurePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "FeeStructure"
  objects: {
    tenant: Prisma.$TenantPayload<ExtArgs>
    program: Prisma.$ProgramPayload<ExtArgs>
    assignments: Prisma.$FeeAssignmentPayload<ExtArgs>[]
  }
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    programId: string
    semester: number
    sessionYear: number
    tuitionFee: number
    labFee: number
    libraryFee: number
    sportsFee: number
    registrationFee: number
    examinationFee: number
    otherFee: number
    totalFee: number
    dueDate: Date
    lateFee: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["feeStructure"]>
  composites: {}
}

export type FeeStructureGetPayload<S extends boolean | null | undefined | FeeStructureDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload, S>

export type FeeStructureCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<FeeStructureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FeeStructureCountAggregateInputType | true
  }

export interface FeeStructureDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeeStructure'], meta: { name: 'FeeStructure' } }
    findUnique<T extends FeeStructureFindUniqueArgs>(args: Prisma.SelectSubset<T, FeeStructureFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends FeeStructureFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FeeStructureFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends FeeStructureFindFirstArgs>(args?: Prisma.SelectSubset<T, FeeStructureFindFirstArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends FeeStructureFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FeeStructureFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends FeeStructureFindManyArgs>(args?: Prisma.SelectSubset<T, FeeStructureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends FeeStructureCreateArgs>(args: Prisma.SelectSubset<T, FeeStructureCreateArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends FeeStructureCreateManyArgs>(args?: Prisma.SelectSubset<T, FeeStructureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends FeeStructureCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FeeStructureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends FeeStructureDeleteArgs>(args: Prisma.SelectSubset<T, FeeStructureDeleteArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends FeeStructureUpdateArgs>(args: Prisma.SelectSubset<T, FeeStructureUpdateArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends FeeStructureDeleteManyArgs>(args?: Prisma.SelectSubset<T, FeeStructureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends FeeStructureUpdateManyArgs>(args: Prisma.SelectSubset<T, FeeStructureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends FeeStructureUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FeeStructureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends FeeStructureUpsertArgs>(args: Prisma.SelectSubset<T, FeeStructureUpsertArgs<ExtArgs>>): Prisma.Prisma__FeeStructureClient<runtime.Types.Result.GetResult<Prisma.$FeeStructurePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends FeeStructureCountArgs>(
    args?: Prisma.Subset<T, FeeStructureCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], FeeStructureCountAggregateOutputType>
      : number
  >

    aggregate<T extends FeeStructureAggregateArgs>(args: Prisma.Subset<T, FeeStructureAggregateArgs>): Prisma.PrismaPromise<GetFeeStructureAggregateType<T>>

    groupBy<
    T extends FeeStructureGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: FeeStructureGroupByArgs['orderBy'] }
      : { orderBy?: FeeStructureGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, FeeStructureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeeStructureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: FeeStructureFieldRefs;
}

export interface Prisma__FeeStructureClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  program<T extends Prisma.ProgramDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProgramDefaultArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
  assignments<T extends Prisma.FeeStructure$assignmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeeStructure$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeeAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface FeeStructureFieldRefs {
  readonly id: Prisma.FieldRef<"FeeStructure", 'String'>
  readonly tenantId: Prisma.FieldRef<"FeeStructure", 'String'>
  readonly programId: Prisma.FieldRef<"FeeStructure", 'String'>
  readonly semester: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly sessionYear: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly tuitionFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly labFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly libraryFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly sportsFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly registrationFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly examinationFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly otherFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly totalFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly dueDate: Prisma.FieldRef<"FeeStructure", 'DateTime'>
  readonly lateFee: Prisma.FieldRef<"FeeStructure", 'Int'>
  readonly isActive: Prisma.FieldRef<"FeeStructure", 'Boolean'>
  readonly createdAt: Prisma.FieldRef<"FeeStructure", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"FeeStructure", 'DateTime'>
}

export type FeeStructureFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
    where: Prisma.FeeStructureWhereUniqueInput
}

export type FeeStructureFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
    where: Prisma.FeeStructureWhereUniqueInput
}

export type FeeStructureFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeStructureFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeStructureFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeStructureCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.FeeStructureCreateInput, Prisma.FeeStructureUncheckedCreateInput>
}

export type FeeStructureCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FeeStructureCreateManyInput | Prisma.FeeStructureCreateManyInput[]
  skipDuplicates?: boolean
}

export type FeeStructureCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    data: Prisma.FeeStructureCreateManyInput | Prisma.FeeStructureCreateManyInput[]
  skipDuplicates?: boolean
    include?: Prisma.FeeStructureIncludeCreateManyAndReturn<ExtArgs> | null
}

export type FeeStructureUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
    data: Prisma.XOR<Prisma.FeeStructureUpdateInput, Prisma.FeeStructureUncheckedUpdateInput>
    where: Prisma.FeeStructureWhereUniqueInput
}

export type FeeStructureUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FeeStructureUpdateManyMutationInput, Prisma.FeeStructureUncheckedUpdateManyInput>
    where?: Prisma.FeeStructureWhereInput
    limit?: number
}

export type FeeStructureUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.FeeStructureUpdateManyMutationInput, Prisma.FeeStructureUncheckedUpdateManyInput>
    where?: Prisma.FeeStructureWhereInput
    limit?: number
    include?: Prisma.FeeStructureIncludeUpdateManyAndReturn<ExtArgs> | null
}

export type FeeStructureUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
    where: Prisma.FeeStructureWhereUniqueInput
    create: Prisma.XOR<Prisma.FeeStructureCreateInput, Prisma.FeeStructureUncheckedCreateInput>
    update: Prisma.XOR<Prisma.FeeStructureUpdateInput, Prisma.FeeStructureUncheckedUpdateInput>
}

export type FeeStructureDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
    where: Prisma.FeeStructureWhereUniqueInput
}

export type FeeStructureDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeeStructureWhereInput
    limit?: number
}

export type FeeStructure$assignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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

export type FeeStructureDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeeStructureSelect<ExtArgs> | null
    omit?: Prisma.FeeStructureOmit<ExtArgs> | null
    include?: Prisma.FeeStructureInclude<ExtArgs> | null
}
