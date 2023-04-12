import Layout from '@/layouts/Sidebar'
import { Card } from 'flowbite-react'

export default function Keywords({ user }) {
  return (
    <Layout user={user}>
      <Card>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          关键词规则
        </h5>
      </Card>
    </Layout>
  )
}

export { getServerSideProps } from '@/pages/index'
