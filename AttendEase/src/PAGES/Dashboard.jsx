import { AttendanceGraph } from "@/components/AttendanceGraph"
import { ExportSync } from "@/components/ExportSync"
import { Header } from "@/components/Header"
import { NotificationList } from "@/components/NotificationList"
import { QuickActions } from "@/components/QuickActions"
import { SessionList } from "@/components/SessionList"


const sessions = [
  {
    id: 1,
    name: "CSE 101 - Introduction to Computer Science",
    time: "12:00 PM - 1:00 PM",
  },
  {
    id: 2,
    name: "MATH 101 - Introduction to Calculus",
    time: "11:00 AM - 12:00 PM",
  },
  {
    id: 3,
    name: "ENG 101 - Introduction to Literature",
    time: "10:00 AM - 11:00 AM",
  },
]

const notifications = [
  {
    id: 1,
    title: "Assignment 2 submissions",
    date: "Oct 5, 2023",
    description: "Two students have submitted their assignments on time.",
  },
  {
    id: 2,
    title: "Assignment 2 submissions",
    date: "Oct 1, 2023",
    description: "Four students have submitted their assignments on time.",
  },
  {
    id: 3,
    title: "Assignment 2 submissions",
    date: "Oct 2, 2023",
    description: "Three students have submitted their assignments on time.",
  },
]

function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Home</h1>
          <p className="text-zinc-400">Good morning, Dr. Smith. Here's what's happening today.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <QuickActions />
            <SessionList sessions={sessions} />
            <NotificationList notifications={notifications} />
          </div>
          <div className="space-y-6">
            <AttendanceGraph />
            <ExportSync />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

