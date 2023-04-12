import Layout from '@/layouts/Sidebar'
import { useState, useEffect } from 'react'
import FacebookPage from '@/components/FacebookPage'

export default function Permission({ user }) {
  const [pages, setPages] = useState([])

  const getPages = async ({ userId, userAccessToken }) => {
    // 获取您的公共主页编号
    const params = new URLSearchParams({
      userID: userId,
      accessToken: userAccessToken
    })
    const response = await fetch(`/api/meta/pageShowList?${params}`)
    const { data } = await response.json()
    setPages(data)
  }

  useEffect(() => {
    if (user.meta) {
      getPages(user.meta)
    }
  }, [user])

  return (
    <Layout user={user}>
      <section className="grid grid-cols-1 space-y-12 md:grid-cols-2 md:gap-6 md:gap-x-6 md:space-y-0 lg:grid-cols-3">
        {pages.map((page) => (
          <FacebookPage key={page.id} page={page} />
        ))}
      </section>
    </Layout>
  )
}

export { getServerSideProps } from '@/pages/index'
