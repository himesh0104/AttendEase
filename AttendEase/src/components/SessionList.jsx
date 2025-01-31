import { BookOpen, Clock } from "lucide-react"

export function SessionList({ sessions }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-sm font-medium text-zinc-400">Session Overview</h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="group flex items-center space-x-4 rounded-lg bg-zinc-800/50 p-4 transition-colors hover:bg-zinc-800"
          >
            <div className="rounded bg-zinc-700 p-2 transition-colors group-hover:bg-zinc-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{session.name}</h3>
              <p className="flex items-center text-sm text-zinc-400">
                <Clock className="mr-1 h-4 w-4" />
                {session.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

