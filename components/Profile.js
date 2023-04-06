import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import altogic from '@/libs/altogic'
import Avatar from '@/components/Avatar'
import Sessions from '@/components/Sessions'
import UserInfo from '@/components/UserInfo'

export default function ProfileClient({ user: userProp, sessionList }) {
  const [user, setUser] = useState(userProp)
  const [sessions, setSessions] = useState(sessionList)

  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signOut', {
        method: 'POST'
      })
      const { errors } = await response.json()

      if (!response.ok) {
        throw errors
      }
      altogic.auth.clearLocalData()
      router.push('/profile')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (user && sessionList) {
      const currentSession = sessionList.find((s) => s.isCurrent)
      altogic.auth.setUser(user)
      altogic.auth.setSession(currentSession)
    }
  }, [])

  return (
    <section className="flex h-screen flex-col items-center space-y-4 py-4 text-center">
      <Avatar user={user} setUser={setUser} />
      <UserInfo user={user} setUser={setUser} />
      <Sessions sessions={sessions} setSessions={setSessions} />

      <button
        className="rounded bg-gray-400 py-2 px-3 text-white"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </section>
  )
}
