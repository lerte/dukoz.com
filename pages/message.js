import Layout from '@/layouts/Sidebar'
import { Card } from 'flowbite-react'

export default function Message({ user }) {
  return (
    <Layout user={user}>
      <Card>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          主页消息中心
        </h5>
      </Card>
    </Layout>
  )
}

export { getServerSideProps } from '@/pages/index'
