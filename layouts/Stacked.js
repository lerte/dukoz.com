import Nav from '@/components/Nav'

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="flex h-screen overflow-hidden bg-gray-50 pt-16 dark:bg-gray-900">
        {children}
      </div>
    </>
  )
}
