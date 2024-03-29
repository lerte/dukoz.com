import dayjs from 'dayjs'
import Layout from '@/layouts/Sidebar'
import { useState, useEffect } from 'react'
import { Card, Tabs } from 'flowbite-react'
import Chat from '@/components/Chat'
import Comment from '@/components/Comment'

export default function Message({ user }) {
  const [pages, setPages] = useState([])
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [currentPage, setCurrentPage] = useState([])
  const [currentPost, setCurrentPost] = useState([])
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState([])
  const getPages = async ({ userId, userAccessToken }) => {
    // 获取您的公共主页编号
    const params = new URLSearchParams({
      userID: userId,
      accessToken: userAccessToken
    })
    const response = await fetch(`/api/meta/accounts?${params}`)
    const { data } = await response.json()
    if (data) {
      setPages(data)
      setCurrentPage(data[0])
    }
  }
  const getConversations = async () => {
    // 获取当前主页的conversations
    const params = new URLSearchParams({
      pageId: currentPage.id,
      accessToken: currentPage.access_token
    })
    const response = await fetch(`/api/meta/conversations?${params}`)
    const { data } = await response.json()
    setConversations(data)
    if (data.length) {
      setCurrentConversation(data[0])
    } else {
      setCurrentConversation({})
    }
  }
  const getPosts = async () => {
    // 获取当前主页的posts
    const params = new URLSearchParams({
      pageId: currentPage.id,
      accessToken: currentPage.access_token
    })
    const response = await fetch(`/api/meta/posts?${params}`)
    const { data } = await response.json()
    setPosts(data)
    if (data.length) {
      setCurrentPost(data[0])
    } else {
      setCurrentPost({})
    }
  }
  useEffect(() => {
    if (user.meta) {
      getPages(user.meta)
    }
  }, [user])

  useEffect(() => {
    if (currentPage.id) {
      getConversations()
      getPosts()
    }
  }, [currentPage])

  return (
    <Layout user={user}>
      <Card>
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          主页消息中心
        </h5>
        <div className="grid grid-cols-1 space-y-12 pt-4 md:grid-cols-2 md:gap-6 md:gap-x-6 md:space-y-0 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-400 py-2 px-3"
                placeholder="请输入主页ID或名称"
              />
            </div>
            <div className="border-t border-gray-300">
              <ul>
                {pages.map((page) => (
                  <li
                    key={page.id}
                    onClick={() => setCurrentPage(page)}
                    className={`${
                      page.id == currentPage.id
                        ? 'border-l-2 border-yellow-400'
                        : 'border-l-2 border-gray-200'
                    } mb-2 flex items-center bg-gray-200 py-2 px-4 hover:bg-gray-400`}
                  >
                    <img
                      className="mr-2 h-8 w-8 rounded-full"
                      src={`/api/meta/picture?userID=${page.id}&accessToken=${page.access_token}`}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {page.name}
                      </div>
                      <div className="text-sm text-gray-600">{page.id}</div>
                    </div>
                    <div className="text-sm text-gray-500">忽略</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <Tabs.Group
              aria-label="Tabs with icons"
              style="underline"
              onActiveTabChange={(tab) => setActiveTab(tab)}
            >
              <Tabs.Item active={true} title="Message">
                <ul>
                  {conversations.map((conversations) => (
                    <li
                      key={conversations.id}
                      onClick={() => setCurrentConversation(conversations)}
                      className="mb-2 flex items-center bg-gray-200 py-2 px-4 hover:bg-gray-400"
                    >
                      {/* <img
                        alt={conversations.senders?.data[0]?.name}
                        src={`/api/meta/picture?userID=${conversations?.senders?.data[0].id}&accessToken=${currentPage.access_token}`}
                        className="mr-2 h-8 w-8 rounded-full"
                      /> */}
                      <img
                        className="mr-2 h-8 w-8 rounded-full"
                        alt={conversations.senders?.data[0]?.name}
                        src={`https://ui-avatars.com/api/?name=${conversations.senders?.data[0]?.name}&background=0D8ABC&color=fff`}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {conversations.senders?.data[0]?.name}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {dayjs(
                          conversations.messages?.data[0]?.created_time
                        ).format('YYYY-MM-DD HH:mm:ss')}
                      </div>
                    </li>
                  ))}
                </ul>
              </Tabs.Item>
              <Tabs.Item title="评论">
                <ul>
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      onClick={() => setCurrentPost(post)}
                      className="mb-2 flex items-center bg-gray-200 py-2 px-4 hover:bg-gray-400"
                    >
                      <img
                        alt={currentPage.name}
                        src={`/api/meta/picture?userID=${currentPage.id}&accessToken=${currentPage.access_token}`}
                        className="mr-2 h-8 w-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {post.message?.slice(0, 100)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {dayjs(post.created_time).format(
                            'YYYY-MM-DD HH:mm:ss'
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Tabs.Item>
            </Tabs.Group>
          </div>
          <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            {activeTab == 0 && (
              <Chat
                currentPage={currentPage}
                currentConversation={currentConversation}
              />
            )}
            {activeTab == 1 && (
              <Comment currentPage={currentPage} currentPost={currentPost} />
            )}
          </div>
        </div>
      </Card>
    </Layout>
  )
}

export { getServerSideProps } from '@/pages/index'
