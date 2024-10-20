import Sidebar from '@/components/live/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for Ergovision.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="w-dvh flex h-dvh gap-1 overflow-clip bg-[#f6f6f6] p-2">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">{children}</div>
    </main>
  )
}
