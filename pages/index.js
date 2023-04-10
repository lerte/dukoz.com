import SignIn from './sign-in'
import { altogicWithToken } from '@/libs/altogic'

export default function Home() {
  return <SignIn />
}

export async function getServerSideProps({ res, req }) {
  try {
    const session_token = req.cookies.session_token
    const { user, errors } = await altogicWithToken(
      session_token
    ).auth.getUserFromDB()
    if (!errors) {
      res.setHeader('location', '/dashboard')
      res.statusCode = 302
      res.end()
    }
    return {
      props: {
        user
      }
    }
  } catch (e) {
    console.error(e)
    return {
      props: {
        user: {}
      }
    }
  }
}
