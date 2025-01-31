import { PlusCircle, Upload, Play } from "lucide-react"

export function QuickActions() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-sm font-medium text-zinc-400">Quick Actions</h2>
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create session
        </button>
        <button className="flex items-center rounded-md border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
          <Play className="mr-2 h-4 w-4" />
          Start a new session
        </button>
        <button className="flex items-center rounded-md border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
          <Upload className="mr-2 h-4 w-4" />
          Import attendance data
        </button>
      </div>
    </div>
  )
}

