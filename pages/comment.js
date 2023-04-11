import Layout from '@/layouts/Sidebar'

export default function Commnet({ user }) {
  return <Layout user={user}>todo</Layout>
}

export { getServerSideProps } from '@/pages/index'
