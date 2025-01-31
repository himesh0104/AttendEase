import { Users } from "lucide-react"

export function NotificationList({ notifications }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-sm font-medium text-zinc-400">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="group flex items-start space-x-4 rounded-lg bg-zinc-800/50 p-4 transition-colors hover:bg-zinc-800"
          >
            <div className="rounded-full bg-zinc-700 p-2 transition-colors group-hover:bg-zinc-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-zinc-400">{notification.date}</p>
              <p className="mt-1 text-sm text-zinc-400">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

