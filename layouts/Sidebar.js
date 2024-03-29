import Nav from '@/components/Nav'
import Aside from '@/components/Aside'

export default function Layout({ user, children }) {
  return (
    <>
      <Nav user={user} />
      <Aside />
      <div className="relative h-full overflow-y-auto bg-gray-50 pt-16 dark:bg-gray-900 sm:ml-64">
        <main className="min-h-[calc(100vh-4rem)] p-4">{children}</main>
      </div>
    </>
  )
}
