import Layout from '@/layouts/Sidebar'

export default function Message({ user }) {
  return <Layout user={user}>todo</Layout>
}

export { getServerSideProps } from '@/pages/index'
