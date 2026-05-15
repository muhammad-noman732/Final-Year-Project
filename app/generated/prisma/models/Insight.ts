
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type InsightModel = runtime.Types.Result.DefaultSelection<Prisma.$InsightPayload>

export type AggregateInsight = {
  _count: InsightCountAggregateOutputType | null
  _min: InsightMinAggregateOutputType | null
  _max: InsightMaxAggregateOutputType | null
}

export type InsightMinAggregateOutputType = {
  id: string | null
  tenantId: string | null
  module: string | null
  type: string | null
  message: string | null
  actionLabel: string | null
  actionType: string | null
  priority: string | null
  isRead: boolean | null
  departmentId: string | null
  createdAt: Date | null
  expiresAt: Date | null
}

export type InsightMaxAggregateOutputType = {
  id: string | null
  tenantId: string | null
  module: string | null
  type: string | null
  message: string | null
  actionLabel: string | null
  actionType: string | null
  priority: string | null
  isRead: boolean | null
  departmentId: string | null
  createdAt: Date | null
  expiresAt: Date | null
}

export type InsightCountAggregateOutputType = {
  id: number
  tenantId: number
  module: number
  type: number
  message: number
  actionLabel: number
  actionType: number
  priority: number
  isRead: number
  departmentId: number
  createdAt: number
  expiresAt: number
  _all: number
}

export type InsightMinAggregateInputType = {
  id?: true
  tenantId?: true
  module?: true
  type?: true
  message?: true
  actionLabel?: true
  actionType?: true
  priority?: true
  isRead?: true
  departmentId?: true
  createdAt?: true
  expiresAt?: true
}

export type InsightMaxAggregateInputType = {
  id?: true
  tenantId?: true
  module?: true
  type?: true
  message?: true
  actionLabel?: true
  actionType?: true
  priority?: true
  isRead?: true
  departmentId?: true
  createdAt?: true
  expiresAt?: true
}

export type InsightCountAggregateInputType = {
  id?: true
  tenantId?: true
  module?: true
  type?: true
  message?: true
  actionLabel?: true
  actionType?: true
  priority?: true
  isRead?: true
  departmentId?: true
  createdAt?: true
  expiresAt?: true
  _all?: true
}

export type InsightAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InsightWhereInput
    orderBy?: Prisma.InsightOrderByWithRelationInput | Prisma.InsightOrderByWithRelationInput[]
    cursor?: Prisma.InsightWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | InsightCountAggregateInputType
    _min?: InsightMinAggregateInputType
    _max?: InsightMaxAggregateInputType
}

export type GetInsightAggregateType<T extends InsightAggregateArgs> = {
      [P in keyof T & keyof AggregateInsight]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateInsight[P]>
    : Prisma.GetScalarType<T[P], AggregateInsight[P]>
}

export type InsightGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.InsightWhereInput
  orderBy?: Prisma.InsightOrderByWithAggregationInput | Prisma.InsightOrderByWithAggregationInput[]
  by: Prisma.InsightScalarFieldEnum[] | Prisma.InsightScalarFieldEnum
  having?: Prisma.InsightScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: InsightCountAggregateInputType | true
  _min?: InsightMinAggregateInputType
  _max?: InsightMaxAggregateInputType
}

export type InsightGroupByOutputType = {
  id: string
  tenantId: string
  module: string
  type: string
  message: string
  actionLabel: string | null
  actionType: string | null
  priority: string
  isRead: boolean
  departmentId: string | null
  createdAt: Date
  expiresAt: Date
  _count: InsightCountAggregateOutputType | null
  _min: InsightMinAggregateOutputType | null
  _max: InsightMaxAggregateOutputType | null
}

export type GetInsightGroupByPayload<T extends InsightGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<InsightGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof InsightGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], InsightGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], InsightGroupByOutputType[P]>
      }
    >
  >

export type InsightWhereInput = {
  AND?: Prisma.InsightWhereInput | Prisma.InsightWhereInput[]
  OR?: Prisma.InsightWhereInput[]
  NOT?: Prisma.InsightWhereInput | Prisma.InsightWhereInput[]
  id?: Prisma.StringFilter<"Insight"> | string
  tenantId?: Prisma.StringFilter<"Insight"> | string
  module?: Prisma.StringFilter<"Insight"> | string
  type?: Prisma.StringFilter<"Insight"> | string
  message?: Prisma.StringFilter<"Insight"> | string
  actionLabel?: Prisma.StringNullableFilter<"Insight"> | string | null
  actionType?: Prisma.StringNullableFilter<"Insight"> | string | null
  priority?: Prisma.StringFilter<"Insight"> | string
  isRead?: Prisma.BoolFilter<"Insight"> | boolean
  departmentId?: Prisma.StringNullableFilter<"Insight"> | string | null
  createdAt?: Prisma.DateTimeFilter<"Insight"> | Date | string
  expiresAt?: Prisma.DateTimeFilter<"Insight"> | Date | string
}

export type InsightOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  module?: Prisma.SortOrder
  type?: Prisma.SortOrder
  message?: Prisma.SortOrder
  actionLabel?: Prisma.SortOrderInput | Prisma.SortOrder
  actionType?: Prisma.SortOrderInput | Prisma.SortOrder
  priority?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  departmentId?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  expiresAt?: Prisma.SortOrder
}

export type InsightWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  AND?: Prisma.InsightWhereInput | Prisma.InsightWhereInput[]
  OR?: Prisma.InsightWhereInput[]
  NOT?: Prisma.InsightWhereInput | Prisma.InsightWhereInput[]
  tenantId?: Prisma.StringFilter<"Insight"> | string
  module?: Prisma.StringFilter<"Insight"> | string
  type?: Prisma.StringFilter<"Insight"> | string
  message?: Prisma.StringFilter<"Insight"> | string
  actionLabel?: Prisma.StringNullableFilter<"Insight"> | string | null
  actionType?: Prisma.StringNullableFilter<"Insight"> | string | null
  priority?: Prisma.StringFilter<"Insight"> | string
  isRead?: Prisma.BoolFilter<"Insight"> | boolean
  departmentId?: Prisma.StringNullableFilter<"Insight"> | string | null
  createdAt?: Prisma.DateTimeFilter<"Insight"> | Date | string
  expiresAt?: Prisma.DateTimeFilter<"Insight"> | Date | string
}, "id">

export type InsightOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  module?: Prisma.SortOrder
  type?: Prisma.SortOrder
  message?: Prisma.SortOrder
  actionLabel?: Prisma.SortOrderInput | Prisma.SortOrder
  actionType?: Prisma.SortOrderInput | Prisma.SortOrder
  priority?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  departmentId?: Prisma.SortOrderInput | Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  expiresAt?: Prisma.SortOrder
  _count?: Prisma.InsightCountOrderByAggregateInput
  _max?: Prisma.InsightMaxOrderByAggregateInput
  _min?: Prisma.InsightMinOrderByAggregateInput
}

export type InsightScalarWhereWithAggregatesInput = {
  AND?: Prisma.InsightScalarWhereWithAggregatesInput | Prisma.InsightScalarWhereWithAggregatesInput[]
  OR?: Prisma.InsightScalarWhereWithAggregatesInput[]
  NOT?: Prisma.InsightScalarWhereWithAggregatesInput | Prisma.InsightScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"Insight"> | string
  tenantId?: Prisma.StringWithAggregatesFilter<"Insight"> | string
  module?: Prisma.StringWithAggregatesFilter<"Insight"> | string
  type?: Prisma.StringWithAggregatesFilter<"Insight"> | string
  message?: Prisma.StringWithAggregatesFilter<"Insight"> | string
  actionLabel?: Prisma.StringNullableWithAggregatesFilter<"Insight"> | string | null
  actionType?: Prisma.StringNullableWithAggregatesFilter<"Insight"> | string | null
  priority?: Prisma.StringWithAggregatesFilter<"Insight"> | string
  isRead?: Prisma.BoolWithAggregatesFilter<"Insight"> | boolean
  departmentId?: Prisma.StringNullableWithAggregatesFilter<"Insight"> | string | null
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Insight"> | Date | string
  expiresAt?: Prisma.DateTimeWithAggregatesFilter<"Insight"> | Date | string
}

export type InsightCreateInput = {
  id?: string
  tenantId: string
  module?: string
  type: string
  message: string
  actionLabel?: string | null
  actionType?: string | null
  priority: string
  isRead?: boolean
  departmentId?: string | null
  createdAt?: Date | string
  expiresAt: Date | string
}

export type InsightUncheckedCreateInput = {
  id?: string
  tenantId: string
  module?: string
  type: string
  message: string
  actionLabel?: string | null
  actionType?: string | null
  priority: string
  isRead?: boolean
  departmentId?: string | null
  createdAt?: Date | string
  expiresAt: Date | string
}

export type InsightUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  module?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  message?: Prisma.StringFieldUpdateOperationsInput | string
  actionLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  actionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  priority?: Prisma.StringFieldUpdateOperationsInput | string
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type InsightUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  module?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  message?: Prisma.StringFieldUpdateOperationsInput | string
  actionLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  actionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  priority?: Prisma.StringFieldUpdateOperationsInput | string
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type InsightCreateManyInput = {
  id?: string
  tenantId: string
  module?: string
  type: string
  message: string
  actionLabel?: string | null
  actionType?: string | null
  priority: string
  isRead?: boolean
  departmentId?: string | null
  createdAt?: Date | string
  expiresAt: Date | string
}

export type InsightUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  module?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  message?: Prisma.StringFieldUpdateOperationsInput | string
  actionLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  actionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  priority?: Prisma.StringFieldUpdateOperationsInput | string
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type InsightUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.StringFieldUpdateOperationsInput | string
  module?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  message?: Prisma.StringFieldUpdateOperationsInput | string
  actionLabel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  actionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  priority?: Prisma.StringFieldUpdateOperationsInput | string
  isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean
  departmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type InsightCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  module?: Prisma.SortOrder
  type?: Prisma.SortOrder
  message?: Prisma.SortOrder
  actionLabel?: Prisma.SortOrder
  actionType?: Prisma.SortOrder
  priority?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  expiresAt?: Prisma.SortOrder
}

export type InsightMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  module?: Prisma.SortOrder
  type?: Prisma.SortOrder
  message?: Prisma.SortOrder
  actionLabel?: Prisma.SortOrder
  actionType?: Prisma.SortOrder
  priority?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  expiresAt?: Prisma.SortOrder
}

export type InsightMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  module?: Prisma.SortOrder
  type?: Prisma.SortOrder
  message?: Prisma.SortOrder
  actionLabel?: Prisma.SortOrder
  actionType?: Prisma.SortOrder
  priority?: Prisma.SortOrder
  isRead?: Prisma.SortOrder
  departmentId?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  expiresAt?: Prisma.SortOrder
}

export type InsightSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  module?: boolean
  type?: boolean
  message?: boolean
  actionLabel?: boolean
  actionType?: boolean
  priority?: boolean
  isRead?: boolean
  departmentId?: boolean
  createdAt?: boolean
  expiresAt?: boolean
}, ExtArgs["result"]["insight"]>

export type InsightSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  module?: boolean
  type?: boolean
  message?: boolean
  actionLabel?: boolean
  actionType?: boolean
  priority?: boolean
  isRead?: boolean
  departmentId?: boolean
  createdAt?: boolean
  expiresAt?: boolean
}, ExtArgs["result"]["insight"]>

export type InsightSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  tenantId?: boolean
  module?: boolean
  type?: boolean
  message?: boolean
  actionLabel?: boolean
  actionType?: boolean
  priority?: boolean
  isRead?: boolean
  departmentId?: boolean
  createdAt?: boolean
  expiresAt?: boolean
}, ExtArgs["result"]["insight"]>

export type InsightSelectScalar = {
  id?: boolean
  tenantId?: boolean
  module?: boolean
  type?: boolean
  message?: boolean
  actionLabel?: boolean
  actionType?: boolean
  priority?: boolean
  isRead?: boolean
  departmentId?: boolean
  createdAt?: boolean
  expiresAt?: boolean
}

export type InsightOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "module" | "type" | "message" | "actionLabel" | "actionType" | "priority" | "isRead" | "departmentId" | "createdAt" | "expiresAt", ExtArgs["result"]["insight"]>

export type $InsightPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Insight"
  objects: {}
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    tenantId: string
    module: string
    type: string
    message: string
    actionLabel: string | null
    actionType: string | null
    priority: string
    isRead: boolean
    departmentId: string | null
    createdAt: Date
    expiresAt: Date
  }, ExtArgs["result"]["insight"]>
  composites: {}
}

export type InsightGetPayload<S extends boolean | null | undefined | InsightDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InsightPayload, S>

export type InsightCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<InsightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InsightCountAggregateInputType | true
  }

export interface InsightDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Insight'], meta: { name: 'Insight' } }
    findUnique<T extends InsightFindUniqueArgs>(args: Prisma.SelectSubset<T, InsightFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends InsightFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InsightFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends InsightFindFirstArgs>(args?: Prisma.SelectSubset<T, InsightFindFirstArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends InsightFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InsightFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends InsightFindManyArgs>(args?: Prisma.SelectSubset<T, InsightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends InsightCreateArgs>(args: Prisma.SelectSubset<T, InsightCreateArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends InsightCreateManyArgs>(args?: Prisma.SelectSubset<T, InsightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends InsightCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InsightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends InsightDeleteArgs>(args: Prisma.SelectSubset<T, InsightDeleteArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends InsightUpdateArgs>(args: Prisma.SelectSubset<T, InsightUpdateArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends InsightDeleteManyArgs>(args?: Prisma.SelectSubset<T, InsightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends InsightUpdateManyArgs>(args: Prisma.SelectSubset<T, InsightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends InsightUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InsightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends InsightUpsertArgs>(args: Prisma.SelectSubset<T, InsightUpsertArgs<ExtArgs>>): Prisma.Prisma__InsightClient<runtime.Types.Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends InsightCountArgs>(
    args?: Prisma.Subset<T, InsightCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], InsightCountAggregateOutputType>
      : number
  >

    aggregate<T extends InsightAggregateArgs>(args: Prisma.Subset<T, InsightAggregateArgs>): Prisma.PrismaPromise<GetInsightAggregateType<T>>

    groupBy<
    T extends InsightGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: InsightGroupByArgs['orderBy'] }
      : { orderBy?: InsightGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, InsightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: InsightFieldRefs;
}

export interface Prisma__InsightClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface InsightFieldRefs {
  readonly id: Prisma.FieldRef<"Insight", 'String'>
  readonly tenantId: Prisma.FieldRef<"Insight", 'String'>
  readonly module: Prisma.FieldRef<"Insight", 'String'>
  readonly type: Prisma.FieldRef<"Insight", 'String'>
  readonly message: Prisma.FieldRef<"Insight", 'String'>
  readonly actionLabel: Prisma.FieldRef<"Insight", 'String'>
  readonly actionType: Prisma.FieldRef<"Insight", 'String'>
  readonly priority: Prisma.FieldRef<"Insight", 'String'>
  readonly isRead: Prisma.FieldRef<"Insight", 'Boolean'>
  readonly departmentId: Prisma.FieldRef<"Insight", 'String'>
  readonly createdAt: Prisma.FieldRef<"Insight", 'DateTime'>
  readonly expiresAt: Prisma.FieldRef<"Insight", 'DateTime'>
}

export type InsightFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    where: Prisma.InsightWhereUniqueInput
}

export type InsightFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    where: Prisma.InsightWhereUniqueInput
}

export type InsightFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    where?: Prisma.InsightWhereInput
    orderBy?: Prisma.InsightOrderByWithRelationInput | Prisma.InsightOrderByWithRelationInput[]
    cursor?: Prisma.InsightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.InsightScalarFieldEnum | Prisma.InsightScalarFieldEnum[]
}

export type InsightFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    where?: Prisma.InsightWhereInput
    orderBy?: Prisma.InsightOrderByWithRelationInput | Prisma.InsightOrderByWithRelationInput[]
    cursor?: Prisma.InsightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.InsightScalarFieldEnum | Prisma.InsightScalarFieldEnum[]
}

export type InsightFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    where?: Prisma.InsightWhereInput
    orderBy?: Prisma.InsightOrderByWithRelationInput | Prisma.InsightOrderByWithRelationInput[]
    cursor?: Prisma.InsightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.InsightScalarFieldEnum | Prisma.InsightScalarFieldEnum[]
}

export type InsightCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.InsightCreateInput, Prisma.InsightUncheckedCreateInput>
}

export type InsightCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InsightCreateManyInput | Prisma.InsightCreateManyInput[]
  skipDuplicates?: boolean
}

export type InsightCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    data: Prisma.InsightCreateManyInput | Prisma.InsightCreateManyInput[]
  skipDuplicates?: boolean
}

export type InsightUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.InsightUpdateInput, Prisma.InsightUncheckedUpdateInput>
    where: Prisma.InsightWhereUniqueInput
}

export type InsightUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InsightUpdateManyMutationInput, Prisma.InsightUncheckedUpdateManyInput>
    where?: Prisma.InsightWhereInput
    limit?: number
}

export type InsightUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.InsightUpdateManyMutationInput, Prisma.InsightUncheckedUpdateManyInput>
    where?: Prisma.InsightWhereInput
    limit?: number
}

export type InsightUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    where: Prisma.InsightWhereUniqueInput
    create: Prisma.XOR<Prisma.InsightCreateInput, Prisma.InsightUncheckedCreateInput>
    update: Prisma.XOR<Prisma.InsightUpdateInput, Prisma.InsightUncheckedUpdateInput>
}

export type InsightDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
    where: Prisma.InsightWhereUniqueInput
}

export type InsightDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InsightWhereInput
    limit?: number
}

export type InsightDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InsightSelect<ExtArgs> | null
    omit?: Prisma.InsightOmit<ExtArgs> | null
}
