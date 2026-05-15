
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

export type WebhookEventModel = runtime.Types.Result.DefaultSelection<Prisma.$WebhookEventPayload>

export type AggregateWebhookEvent = {
  _count: WebhookEventCountAggregateOutputType | null
  _min: WebhookEventMinAggregateOutputType | null
  _max: WebhookEventMaxAggregateOutputType | null
}

export type WebhookEventMinAggregateOutputType = {
  id: string | null
  stripeEventId: string | null
  type: string | null
  tenantId: string | null
  processed: boolean | null
  processedAt: Date | null
  failedAt: Date | null
  failureReason: string | null
  rawPayload: string | null
  createdAt: Date | null
}

export type WebhookEventMaxAggregateOutputType = {
  id: string | null
  stripeEventId: string | null
  type: string | null
  tenantId: string | null
  processed: boolean | null
  processedAt: Date | null
  failedAt: Date | null
  failureReason: string | null
  rawPayload: string | null
  createdAt: Date | null
}

export type WebhookEventCountAggregateOutputType = {
  id: number
  stripeEventId: number
  type: number
  tenantId: number
  processed: number
  processedAt: number
  failedAt: number
  failureReason: number
  rawPayload: number
  createdAt: number
  _all: number
}

export type WebhookEventMinAggregateInputType = {
  id?: true
  stripeEventId?: true
  type?: true
  tenantId?: true
  processed?: true
  processedAt?: true
  failedAt?: true
  failureReason?: true
  rawPayload?: true
  createdAt?: true
}

export type WebhookEventMaxAggregateInputType = {
  id?: true
  stripeEventId?: true
  type?: true
  tenantId?: true
  processed?: true
  processedAt?: true
  failedAt?: true
  failureReason?: true
  rawPayload?: true
  createdAt?: true
}

export type WebhookEventCountAggregateInputType = {
  id?: true
  stripeEventId?: true
  type?: true
  tenantId?: true
  processed?: true
  processedAt?: true
  failedAt?: true
  failureReason?: true
  rawPayload?: true
  createdAt?: true
  _all?: true
}

export type WebhookEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WebhookEventWhereInput
    orderBy?: Prisma.WebhookEventOrderByWithRelationInput | Prisma.WebhookEventOrderByWithRelationInput[]
    cursor?: Prisma.WebhookEventWhereUniqueInput
    take?: number
    skip?: number
    _count?: true | WebhookEventCountAggregateInputType
    _min?: WebhookEventMinAggregateInputType
    _max?: WebhookEventMaxAggregateInputType
}

export type GetWebhookEventAggregateType<T extends WebhookEventAggregateArgs> = {
      [P in keyof T & keyof AggregateWebhookEvent]: P extends '_count' | 'count'
    ? T[P] extends true
      ? number
      : Prisma.GetScalarType<T[P], AggregateWebhookEvent[P]>
    : Prisma.GetScalarType<T[P], AggregateWebhookEvent[P]>
}

export type WebhookEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.WebhookEventWhereInput
  orderBy?: Prisma.WebhookEventOrderByWithAggregationInput | Prisma.WebhookEventOrderByWithAggregationInput[]
  by: Prisma.WebhookEventScalarFieldEnum[] | Prisma.WebhookEventScalarFieldEnum
  having?: Prisma.WebhookEventScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: WebhookEventCountAggregateInputType | true
  _min?: WebhookEventMinAggregateInputType
  _max?: WebhookEventMaxAggregateInputType
}

export type WebhookEventGroupByOutputType = {
  id: string
  stripeEventId: string
  type: string
  tenantId: string | null
  processed: boolean
  processedAt: Date | null
  failedAt: Date | null
  failureReason: string | null
  rawPayload: string
  createdAt: Date
  _count: WebhookEventCountAggregateOutputType | null
  _min: WebhookEventMinAggregateOutputType | null
  _max: WebhookEventMaxAggregateOutputType | null
}

export type GetWebhookEventGroupByPayload<T extends WebhookEventGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<WebhookEventGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof WebhookEventGroupByOutputType))]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : Prisma.GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
          : Prisma.GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
      }
    >
  >

export type WebhookEventWhereInput = {
  AND?: Prisma.WebhookEventWhereInput | Prisma.WebhookEventWhereInput[]
  OR?: Prisma.WebhookEventWhereInput[]
  NOT?: Prisma.WebhookEventWhereInput | Prisma.WebhookEventWhereInput[]
  id?: Prisma.StringFilter<"WebhookEvent"> | string
  stripeEventId?: Prisma.StringFilter<"WebhookEvent"> | string
  type?: Prisma.StringFilter<"WebhookEvent"> | string
  tenantId?: Prisma.StringNullableFilter<"WebhookEvent"> | string | null
  processed?: Prisma.BoolFilter<"WebhookEvent"> | boolean
  processedAt?: Prisma.DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
  failedAt?: Prisma.DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
  failureReason?: Prisma.StringNullableFilter<"WebhookEvent"> | string | null
  rawPayload?: Prisma.StringFilter<"WebhookEvent"> | string
  createdAt?: Prisma.DateTimeFilter<"WebhookEvent"> | Date | string
}

export type WebhookEventOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  stripeEventId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  tenantId?: Prisma.SortOrderInput | Prisma.SortOrder
  processed?: Prisma.SortOrder
  processedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failureReason?: Prisma.SortOrderInput | Prisma.SortOrder
  rawPayload?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type WebhookEventWhereUniqueInput = Prisma.AtLeast<{
  id?: string
  stripeEventId?: string
  AND?: Prisma.WebhookEventWhereInput | Prisma.WebhookEventWhereInput[]
  OR?: Prisma.WebhookEventWhereInput[]
  NOT?: Prisma.WebhookEventWhereInput | Prisma.WebhookEventWhereInput[]
  type?: Prisma.StringFilter<"WebhookEvent"> | string
  tenantId?: Prisma.StringNullableFilter<"WebhookEvent"> | string | null
  processed?: Prisma.BoolFilter<"WebhookEvent"> | boolean
  processedAt?: Prisma.DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
  failedAt?: Prisma.DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
  failureReason?: Prisma.StringNullableFilter<"WebhookEvent"> | string | null
  rawPayload?: Prisma.StringFilter<"WebhookEvent"> | string
  createdAt?: Prisma.DateTimeFilter<"WebhookEvent"> | Date | string
}, "id" | "stripeEventId">

export type WebhookEventOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  stripeEventId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  tenantId?: Prisma.SortOrderInput | Prisma.SortOrder
  processed?: Prisma.SortOrder
  processedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  failureReason?: Prisma.SortOrderInput | Prisma.SortOrder
  rawPayload?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  _count?: Prisma.WebhookEventCountOrderByAggregateInput
  _max?: Prisma.WebhookEventMaxOrderByAggregateInput
  _min?: Prisma.WebhookEventMinOrderByAggregateInput
}

export type WebhookEventScalarWhereWithAggregatesInput = {
  AND?: Prisma.WebhookEventScalarWhereWithAggregatesInput | Prisma.WebhookEventScalarWhereWithAggregatesInput[]
  OR?: Prisma.WebhookEventScalarWhereWithAggregatesInput[]
  NOT?: Prisma.WebhookEventScalarWhereWithAggregatesInput | Prisma.WebhookEventScalarWhereWithAggregatesInput[]
  id?: Prisma.StringWithAggregatesFilter<"WebhookEvent"> | string
  stripeEventId?: Prisma.StringWithAggregatesFilter<"WebhookEvent"> | string
  type?: Prisma.StringWithAggregatesFilter<"WebhookEvent"> | string
  tenantId?: Prisma.StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
  processed?: Prisma.BoolWithAggregatesFilter<"WebhookEvent"> | boolean
  processedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WebhookEvent"> | Date | string | null
  failedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WebhookEvent"> | Date | string | null
  failureReason?: Prisma.StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
  rawPayload?: Prisma.StringWithAggregatesFilter<"WebhookEvent"> | string
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"WebhookEvent"> | Date | string
}

export type WebhookEventCreateInput = {
  id?: string
  stripeEventId: string
  type: string
  tenantId?: string | null
  processed?: boolean
  processedAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  rawPayload: string
  createdAt?: Date | string
}

export type WebhookEventUncheckedCreateInput = {
  id?: string
  stripeEventId: string
  type: string
  tenantId?: string | null
  processed?: boolean
  processedAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  rawPayload: string
  createdAt?: Date | string
}

export type WebhookEventUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  stripeEventId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  processed?: Prisma.BoolFieldUpdateOperationsInput | boolean
  processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  rawPayload?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type WebhookEventUncheckedUpdateInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  stripeEventId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  processed?: Prisma.BoolFieldUpdateOperationsInput | boolean
  processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  rawPayload?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type WebhookEventCreateManyInput = {
  id?: string
  stripeEventId: string
  type: string
  tenantId?: string | null
  processed?: boolean
  processedAt?: Date | string | null
  failedAt?: Date | string | null
  failureReason?: string | null
  rawPayload: string
  createdAt?: Date | string
}

export type WebhookEventUpdateManyMutationInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  stripeEventId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  processed?: Prisma.BoolFieldUpdateOperationsInput | boolean
  processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  rawPayload?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type WebhookEventUncheckedUpdateManyInput = {
  id?: Prisma.StringFieldUpdateOperationsInput | string
  stripeEventId?: Prisma.StringFieldUpdateOperationsInput | string
  type?: Prisma.StringFieldUpdateOperationsInput | string
  tenantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  processed?: Prisma.BoolFieldUpdateOperationsInput | boolean
  processedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  failureReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null
  rawPayload?: Prisma.StringFieldUpdateOperationsInput | string
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type WebhookEventCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  stripeEventId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  processed?: Prisma.SortOrder
  processedAt?: Prisma.SortOrder
  failedAt?: Prisma.SortOrder
  failureReason?: Prisma.SortOrder
  rawPayload?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type WebhookEventMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  stripeEventId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  processed?: Prisma.SortOrder
  processedAt?: Prisma.SortOrder
  failedAt?: Prisma.SortOrder
  failureReason?: Prisma.SortOrder
  rawPayload?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type WebhookEventMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  stripeEventId?: Prisma.SortOrder
  type?: Prisma.SortOrder
  tenantId?: Prisma.SortOrder
  processed?: Prisma.SortOrder
  processedAt?: Prisma.SortOrder
  failedAt?: Prisma.SortOrder
  failureReason?: Prisma.SortOrder
  rawPayload?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
}

export type WebhookEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  stripeEventId?: boolean
  type?: boolean
  tenantId?: boolean
  processed?: boolean
  processedAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  rawPayload?: boolean
  createdAt?: boolean
}, ExtArgs["result"]["webhookEvent"]>

export type WebhookEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  stripeEventId?: boolean
  type?: boolean
  tenantId?: boolean
  processed?: boolean
  processedAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  rawPayload?: boolean
  createdAt?: boolean
}, ExtArgs["result"]["webhookEvent"]>

export type WebhookEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  stripeEventId?: boolean
  type?: boolean
  tenantId?: boolean
  processed?: boolean
  processedAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  rawPayload?: boolean
  createdAt?: boolean
}, ExtArgs["result"]["webhookEvent"]>

export type WebhookEventSelectScalar = {
  id?: boolean
  stripeEventId?: boolean
  type?: boolean
  tenantId?: boolean
  processed?: boolean
  processedAt?: boolean
  failedAt?: boolean
  failureReason?: boolean
  rawPayload?: boolean
  createdAt?: boolean
}

export type WebhookEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "stripeEventId" | "type" | "tenantId" | "processed" | "processedAt" | "failedAt" | "failureReason" | "rawPayload" | "createdAt", ExtArgs["result"]["webhookEvent"]>

export type $WebhookEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "WebhookEvent"
  objects: {}
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: string
    stripeEventId: string
    type: string
    tenantId: string | null
    processed: boolean
    processedAt: Date | null
    failedAt: Date | null
    failureReason: string | null
    rawPayload: string
    createdAt: Date
  }, ExtArgs["result"]["webhookEvent"]>
  composites: {}
}

export type WebhookEventGetPayload<S extends boolean | null | undefined | WebhookEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload, S>

export type WebhookEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<WebhookEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WebhookEventCountAggregateInputType | true
  }

export interface WebhookEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEvent'], meta: { name: 'WebhookEvent' } }
    findUnique<T extends WebhookEventFindUniqueArgs>(args: Prisma.SelectSubset<T, WebhookEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findUniqueOrThrow<T extends WebhookEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WebhookEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findFirst<T extends WebhookEventFindFirstArgs>(args?: Prisma.SelectSubset<T, WebhookEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    findFirstOrThrow<T extends WebhookEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WebhookEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    findMany<T extends WebhookEventFindManyArgs>(args?: Prisma.SelectSubset<T, WebhookEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    create<T extends WebhookEventCreateArgs>(args: Prisma.SelectSubset<T, WebhookEventCreateArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    createMany<T extends WebhookEventCreateManyArgs>(args?: Prisma.SelectSubset<T, WebhookEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    createManyAndReturn<T extends WebhookEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WebhookEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    delete<T extends WebhookEventDeleteArgs>(args: Prisma.SelectSubset<T, WebhookEventDeleteArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    update<T extends WebhookEventUpdateArgs>(args: Prisma.SelectSubset<T, WebhookEventUpdateArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    deleteMany<T extends WebhookEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, WebhookEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateMany<T extends WebhookEventUpdateManyArgs>(args: Prisma.SelectSubset<T, WebhookEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

    updateManyAndReturn<T extends WebhookEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WebhookEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    upsert<T extends WebhookEventUpsertArgs>(args: Prisma.SelectSubset<T, WebhookEventUpsertArgs<ExtArgs>>): Prisma.Prisma__WebhookEventClient<runtime.Types.Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    count<T extends WebhookEventCountArgs>(
    args?: Prisma.Subset<T, WebhookEventCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
      ? T['select'] extends true
        ? number
        : Prisma.GetScalarType<T['select'], WebhookEventCountAggregateOutputType>
      : number
  >

    aggregate<T extends WebhookEventAggregateArgs>(args: Prisma.Subset<T, WebhookEventAggregateArgs>): Prisma.PrismaPromise<GetWebhookEventAggregateType<T>>

    groupBy<
    T extends WebhookEventGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
      ? { orderBy: WebhookEventGroupByArgs['orderBy'] }
      : { orderBy?: WebhookEventGroupByArgs['orderBy'] },
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
  >(args: Prisma.SubsetIntersection<T, WebhookEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
readonly fields: WebhookEventFieldRefs;
}

export interface Prisma__WebhookEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}

export interface WebhookEventFieldRefs {
  readonly id: Prisma.FieldRef<"WebhookEvent", 'String'>
  readonly stripeEventId: Prisma.FieldRef<"WebhookEvent", 'String'>
  readonly type: Prisma.FieldRef<"WebhookEvent", 'String'>
  readonly tenantId: Prisma.FieldRef<"WebhookEvent", 'String'>
  readonly processed: Prisma.FieldRef<"WebhookEvent", 'Boolean'>
  readonly processedAt: Prisma.FieldRef<"WebhookEvent", 'DateTime'>
  readonly failedAt: Prisma.FieldRef<"WebhookEvent", 'DateTime'>
  readonly failureReason: Prisma.FieldRef<"WebhookEvent", 'String'>
  readonly rawPayload: Prisma.FieldRef<"WebhookEvent", 'String'>
  readonly createdAt: Prisma.FieldRef<"WebhookEvent", 'DateTime'>
}

export type WebhookEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    where: Prisma.WebhookEventWhereUniqueInput
}

export type WebhookEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    where: Prisma.WebhookEventWhereUniqueInput
}

export type WebhookEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    where?: Prisma.WebhookEventWhereInput
    orderBy?: Prisma.WebhookEventOrderByWithRelationInput | Prisma.WebhookEventOrderByWithRelationInput[]
    cursor?: Prisma.WebhookEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.WebhookEventScalarFieldEnum | Prisma.WebhookEventScalarFieldEnum[]
}

export type WebhookEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    where?: Prisma.WebhookEventWhereInput
    orderBy?: Prisma.WebhookEventOrderByWithRelationInput | Prisma.WebhookEventOrderByWithRelationInput[]
    cursor?: Prisma.WebhookEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.WebhookEventScalarFieldEnum | Prisma.WebhookEventScalarFieldEnum[]
}

export type WebhookEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    where?: Prisma.WebhookEventWhereInput
    orderBy?: Prisma.WebhookEventOrderByWithRelationInput | Prisma.WebhookEventOrderByWithRelationInput[]
    cursor?: Prisma.WebhookEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Prisma.WebhookEventScalarFieldEnum | Prisma.WebhookEventScalarFieldEnum[]
}

export type WebhookEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.WebhookEventCreateInput, Prisma.WebhookEventUncheckedCreateInput>
}

export type WebhookEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WebhookEventCreateManyInput | Prisma.WebhookEventCreateManyInput[]
  skipDuplicates?: boolean
}

export type WebhookEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelectCreateManyAndReturn<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    data: Prisma.WebhookEventCreateManyInput | Prisma.WebhookEventCreateManyInput[]
  skipDuplicates?: boolean
}

export type WebhookEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.WebhookEventUpdateInput, Prisma.WebhookEventUncheckedUpdateInput>
    where: Prisma.WebhookEventWhereUniqueInput
}

export type WebhookEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WebhookEventUpdateManyMutationInput, Prisma.WebhookEventUncheckedUpdateManyInput>
    where?: Prisma.WebhookEventWhereInput
    limit?: number
}

export type WebhookEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelectUpdateManyAndReturn<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    data: Prisma.XOR<Prisma.WebhookEventUpdateManyMutationInput, Prisma.WebhookEventUncheckedUpdateManyInput>
    where?: Prisma.WebhookEventWhereInput
    limit?: number
}

export type WebhookEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    where: Prisma.WebhookEventWhereUniqueInput
    create: Prisma.XOR<Prisma.WebhookEventCreateInput, Prisma.WebhookEventUncheckedCreateInput>
    update: Prisma.XOR<Prisma.WebhookEventUpdateInput, Prisma.WebhookEventUncheckedUpdateInput>
}

export type WebhookEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
    where: Prisma.WebhookEventWhereUniqueInput
}

export type WebhookEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WebhookEventWhereInput
    limit?: number
}

export type WebhookEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WebhookEventSelect<ExtArgs> | null
    omit?: Prisma.WebhookEventOmit<ExtArgs> | null
}
