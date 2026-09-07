"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { CheckCheck } from "lucide-react"
import { NotificationDialog } from "@/components/notification-dialog"
import { useNotifications, AppNotification } from "@/context/NotificationContext"
import {
  getNotificationColumns,
  getNotificationType,
} from "@/components/columns/notifications-columns"

export default function AdminNotificationPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [selectedNotification, setSelectedNotification] = useState<AppNotification | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenNotification = (notif: AppNotification) => {
    setSelectedNotification(notif)
    setIsDialogOpen(true)
    if (!notif.is_read) {
      markAsRead(notif.id)
    }
  }

  const columns = getNotificationColumns({
    onOpenNotification: handleOpenNotification,
    onMarkAsRead: markAsRead,
  })

  const getRowClassName = (row: AppNotification) => {
    const type = getNotificationType(row.title)
    if (type === "success") {
      return row.is_read ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "bg-emerald-500/10 hover:bg-emerald-500/15"
    }
    if (type === "error") {
      return row.is_read ? "bg-destructive/5 hover:bg-destructive/10" : "bg-destructive/10 hover:bg-destructive/15"
    }
    return row.is_read ? "opacity-75" : "bg-muted/30"
  }

  const MarkAllButton = unreadCount > 0 ? (
    <Button size="sm" className="h-9 gap-2" onClick={markAllAsRead}>
      <CheckCheck className="size-4" /> Mark all as read ({unreadCount})
    </Button>
  ) : null

  return (
    <div className="flex flex-col gap-4 px-2">
      <div>
        <h1 className="text-2xl font-bold">Admin Notifications</h1>
        <p className="text-muted-foreground mt-2">View system alerts and activity log.</p>
      </div>

      <DataTable
        columns={columns}
        data={notifications}
        actionButton={MarkAllButton}
        getRowClassName={getRowClassName}
      />

      <NotificationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        notification={selectedNotification}
      />
    </div>
  )
}