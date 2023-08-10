import { DocsSidebarNav } from "@/components/sidebar-nav"
import { docsConfig } from "@/config/docs"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div>
      <div className="container flex-1 items-start overflow-hidden md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-screen w-full shrink-0 overflow-y-scroll border-r p-6 md:sticky md:block">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </aside>
        <div className="lg:px-16 lg:pt-28">{children}</div>
      </div>
    </div>
  )
}
