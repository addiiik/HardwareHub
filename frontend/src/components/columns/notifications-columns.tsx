import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Eye, CheckCircle2, XCircle, Bell } from "lucide-react"
import { AppNotification } from "@/context/NotificationContext"

export type NotificationType = "success" | "error" | "info"

export function getNotificationType(title: string): NotificationType {
  const lowerTitle = title.toLowerCase()
  if (
    title.includes("✅") ||
    lowerTitle.includes("success") ||
    lowerTitle.includes("started") ||
    lowerTitle.includes("completed")
  ) {
    return "success"
  }
  if (
    title.includes("❌") ||
    lowerTitle.includes("error") ||
    lowerTitle.includes("failed")
  ) {
    return "error"
  }
  return "info"
}

interface NotificationColumnsProps {
  onOpenNotification: (notif: AppNotification) => void
  onMarkAsRead: (id: number) => void
}

export const getNotificationColumns = ({
  onOpenNotification,
  onMarkAsRead,
}: NotificationColumnsProps): ColumnDef<AppNotification>[] => [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = getNotificationType(row.original.title)
      if (type === "success") {
        return (
          <Badge
            variant="outline"
            className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          >
            <CheckCircle2 className="size-3.5" /> Success
          </Badge>
        )
      }
      if (type === "error") {
        return (
          <Badge
            variant="outline"
            className="gap-1 bg-destructive/10 text-destructive border-destructive/20"
          >
            <XCircle className="size-3.5" /> Error
          </Badge>
        )
      }
      return (
        <Badge variant="outline" className="gap-1 bg-muted/50 text-muted-foreground">
          <Bell className="size-3.5" /> Info
        </Badge>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const notif = row.original
      const cleanTitle = notif.title.replace(/[✅❌]/g, "").trim()
      return (
        <div className="flex flex-col gap-0.5">
          <span
            className={`font-medium text-sm ${
              notif.is_read ? "text-muted-foreground" : "text-foreground font-semibold"
            }`}
          >
            {cleanTitle}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Received",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {new Date(row.getValue("created_at")).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "is_read",
    header: "Status",
    cell: ({ row }) => {
      const isRead = row.getValue("is_read") as boolean
      return isRead ? (
        <Badge variant="secondary" className="text-xs opacity-70">
          Read
        </Badge>
      ) : (
        <Badge className="text-xs bg-primary">Unread</Badge>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const notif = row.original

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={() => onOpenNotification(notif)}
          >
            <Eye className="size-3.5" /> Open
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            disabled={notif.is_read}
            onClick={() => onMarkAsRead(notif.id)}
          >
            <Check className="size-3.5" />
            {notif.is_read ? "Read" : "Mark Read"}
          </Button>
        </div>
      )
    },
  },
]