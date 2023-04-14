import Layout from '@/layouts/Sidebar'
import { useState, useEffect } from 'react'
import HiTrash from '@/components/HeroIcons/HiTrash'
import { Button, Card, Table, ToggleSwitch } from 'flowbite-react'

export default function Permission({ user }) {
  const [open, setOpen] = useState(false)
  const [pages, setPages] = useState([])

  const getPages = async ({ userId, userAccessToken }) => {
    // 获取您的公共主页编号
    const params = new URLSearchParams({
      userID: userId,
      accessToken: userAccessToken
    })
    const response = await fetch(`/api/meta/accounts?${params}`)
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
      <Card>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          公共主页管理
        </h5>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>主页ID</Table.HeadCell>
            <Table.HeadCell>主页名称</Table.HeadCell>
            <Table.HeadCell>BM</Table.HeadCell>
            <Table.HeadCell>Facebook个号</Table.HeadCell>
            <Table.HeadCell>负责人</Table.HeadCell>
            <Table.HeadCell>授权状态</Table.HeadCell>
            <Table.HeadCell>主页评分</Table.HeadCell>
            <Table.HeadCell>点赞</Table.HeadCell>
            <Table.HeadCell>粉丝</Table.HeadCell>
            <Table.HeadCell>差评隐藏</Table.HeadCell>
            <Table.HeadCell>操作</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {pages.map((page) => (
              <Table.Row
                key={page.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {page.id}
                </Table.Cell>
                <Table.Cell>{page.name}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>{user.meta.userId}</Table.Cell>
                <Table.Cell>{user.meta.userName}</Table.Cell>
                <Table.Cell>{page.is_owned ? '有效' : '无效'}</Table.Cell>
                <Table.Cell>{page.rating_count || '暂无评分'}</Table.Cell>
                <Table.Cell>{page.fan_count}</Table.Cell>
                <Table.Cell>{page.followers_count}</Table.Cell>
                <Table.Cell>
                  <ToggleSwitch
                    checked={open}
                    color="success"
                    onChange={() => setOpen(!open)}
                    label="差评隐藏"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button color="failure">
                    <HiTrash />
                    移除
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </Layout>
  )
}

export { getServerSideProps } from '@/pages/index'
