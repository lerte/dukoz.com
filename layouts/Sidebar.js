import Nav from '@/components/Nav'
import Aside from '@/components/Aside'

export default function Layout({ children }) {
  return (
    <>
      <Nav props={children.props} />
      <Aside />
      <div className="pl-2 pt-16 sm:ml-64">{children}</div>
    </>
  )
}
