import Layout from '@/layouts/Sidebar'
import { redirect } from 'next/navigation'
import { altogicWithToken } from '@/libs/altogic'
import ProfileClient from '@/components/Profile'

export default function ProfileView({ user, sessionList, token }) {
  return (
    <Layout>
      <ProfileClient user={user} sessionList={sessionList} token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  try {
    const session_token = req.cookies.session_token

    const { user, errors } = await altogicWithToken(
      session_token
    ).auth.getUserFromDB()

    if (errors) redirect('/sign-in')

    const { sessions } = await altogicWithToken(
      session_token
    ).auth.getAllSessions()
    const sessionList = sessions.map((session) =>
      session.token === session_token
        ? { ...session, isCurrent: true }
        : session
    )
    return {
      props: {
        user,
        sessionList,
        token: session_token
      }
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        user: {},
        sessionList: [],
        token: ''
      }
    }
  }
}
