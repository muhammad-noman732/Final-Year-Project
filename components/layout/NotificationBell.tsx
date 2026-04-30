"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  CheckCircle2,
  CreditCard,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  UserCircle,
  BellOff,
  CheckCheck,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkReadMutation,
  useMarkAllReadMutation,
} from "@/store/api/notificationsApi"
import { useNotificationStream } from "@/hooks/useNotificationStream"
import type { NotificationItem } from "@/types/client/store/notifications.store.types"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

interface TypeMeta {
  icon: React.ElementType
  color: string
  bg: string
}

const TYPE_META: Record<string, TypeMeta> = {
  FEE_ASSIGNED: { icon: CreditCard, color: "text-[#6366F1]", bg: "bg-indigo-50" },
  PAYMENT_RECEIVED: { icon: CheckCircle2, color: "text-[#22C55E]", bg: "bg-emerald-50" },
  FEE_DUE: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  FEE_OVERDUE: { icon: AlertCircle, color: "text-[#EF4444]", bg: "bg-red-50" },
  PAYMENT_FAILED: { icon: XCircle, color: "text-[#EF4444]", bg: "bg-red-50" },
  CHALLAN_GENERATED: { icon: FileText, color: "text-violet-500", bg: "bg-violet-50" },
  DEADLINE_EXTENDED: { icon: Clock, color: "text-cyan-500", bg: "bg-cyan-50" },
  ACCOUNT_CREATED: { icon: UserCircle, color: "text-amber-500", bg: "bg-amber-50" },
}

function getTypeMeta(type: string): TypeMeta {
  return TYPE_META[type] ?? { icon: Bell, color: "text-[#64748B]", bg: "bg-slate-100" }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NotificationRow({
  item,
  onMarkRead,
}: {
  item: NotificationItem
  onMarkRead: (id: string) => void
}) {
  const meta = getTypeMeta(item.type)
  const Icon = meta.icon

  return (
    <button
      onClick={() => !item.isRead && onMarkRead(item.id)}
      className={cn(
        "w-full text-left flex items-start gap-3 px-4 py-3 transition-colors duration-150 group",
        item.isRead
          ? "hover:bg-slate-50"
          : "hover:bg-indigo-50/30 cursor-pointer",
      )}
    >
      {/* Type icon */}
      <div
        className={cn(
          "mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100 shadow-sm",
          meta.bg,
        )}
      >
        <Icon className={cn("w-4 h-4", meta.color)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-xs font-bold leading-tight truncate",
              item.isRead ? "text-[#64748B]" : "text-[#0F172A]",
            )}
          >
            {item.title}
          </p>
          <span className="flex-shrink-0 text-[10px] font-medium text-[#64748B]">
            {relativeTime(item.createdAt)}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] font-medium text-[#64748B] leading-snug line-clamp-2">
          {item.body}
        </p>
      </div>

      {/* Unread dot */}
      {!item.isRead && (
        <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
      )}
    </button>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center">
      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
        <BellOff className="w-5 h-5 text-[#64748B]" />
      </div>
      <div>
        <p className="text-xs font-bold text-[#0F172A]">All caught up</p>
        <p className="text-[11px] font-medium text-[#64748B] mt-0.5">No notifications yet</p>
      </div>
    </div>
  )
}

function SkeletonRows() {
  return (
    <div className="space-y-px">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 px-4 py-3 animate-pulse">
          <div className="w-8 h-8 rounded-lg bg-slate-200 flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-2/3 bg-slate-200 rounded" />
            <div className="h-2 w-full bg-slate-100 rounded" />
            <div className="h-2 w-4/5 bg-slate-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function NotificationBell() {
  useNotificationStream()

  const { data: countData } = useGetUnreadCountQuery()
  const { data: listData, isLoading } = useGetNotificationsQuery({ limit: 20 })
  const [markRead] = useMarkReadMutation()
  const [markAllRead, { isLoading: isMarkingAll }] = useMarkAllReadMutation()

  const unreadCount = countData?.data?.count ?? 0
  const notifications = listData?.data?.data ?? []
  const hasUnread = unreadCount > 0

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] bg-slate-50 transition-colors duration-150" aria-label="Notifications loading">
        <Bell className="w-4 h-4" />
      </button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#6366F1]"
          aria-label={`Notifications${hasUnread ? ` (${unreadCount} unread)` : ""}`}
        >
          <Bell className="w-4 h-4" />
          {hasUnread && (
            <>
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[15px] h-[15px] px-1 rounded-full bg-[#EF4444] text-[9px] font-bold text-white leading-none z-10">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-[15px] h-[15px] rounded-full bg-[#EF4444] animate-ping opacity-50" />
            </>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[340px] p-0 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0F172A]" />
            <span className="text-xs font-bold text-[#0F172A]">Notifications</span>
            {hasUnread && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-50 border border-red-100 text-[9px] font-bold text-[#EF4444] leading-none">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>
          {hasUnread && (
            <button
              onClick={() => markAllRead()}
              disabled={isMarkingAll}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] hover:text-[#6366F1] transition-colors duration-150 disabled:opacity-50"
            >
              <CheckCheck className="w-3 h-3" />
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <ScrollArea className="max-h-[400px]">
          {isLoading ? (
            <SkeletonRows />
          ) : notifications.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((item) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  onMarkRead={(id) => markRead(id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-slate-100 px-4 py-2.5 text-center bg-slate-50">
            <p className="text-[11px] font-medium text-[#64748B]">
              Showing latest {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
