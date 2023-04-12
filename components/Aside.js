import Link from 'next/link'
import HiView from '@/components/HeroIcons/HiView'
import HiUser from '@/components/HeroIcons/HiUser'
import HiDashboard from '@/components/HeroIcons/HiDashboard'
import { Sidebar } from 'flowbite-react'

export default function Aside() {
  return (
    <Sidebar
      id="logo-sidebar"
      aria-label="Sidebar"
      className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-14 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiDashboard} href="/meta">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiView} label="Meta">
            <Sidebar.Item href="/permission">公共主页管理</Sidebar.Item>
            <Sidebar.Item href="/comment">评论管控</Sidebar.Item>
            <Sidebar.Item href="/keywords">关键词规则</Sidebar.Item>
            <Sidebar.Item href="/message">主页消息中心</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="/profile" icon={HiUser}>
            Account
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
