import { Bell, Search, Settings } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">Attendance Management</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-md bg-zinc-800 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="relative rounded-full p-2 hover:bg-zinc-800">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600"></span>
          </button>
          <button className="rounded-full p-2 hover:bg-zinc-800">
            <Settings className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full transition-transform hover:scale-105">
            <img src="https://github.com/shadcn.png" alt="User avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  )
}

