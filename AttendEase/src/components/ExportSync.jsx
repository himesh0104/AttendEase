export function ExportSync() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-4 text-sm font-medium text-zinc-400">Export & Sync</h2>
      <button className="flex w-full items-start rounded-lg border border-zinc-800 bg-transparent p-4 text-left hover:bg-zinc-800">
        <div className="rounded bg-zinc-700 p-2 mr-4">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M9 13L12 16L15 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium">Sync with Google Classroom</p>
          <p className="text-sm text-zinc-400">Sync your session details for more accurate attendance reporting.</p>
        </div>
      </button>
    </div>
  )
}

