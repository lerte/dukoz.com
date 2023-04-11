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
    if (user) {
      delete user['review']
      delete user['config']
      delete user['checkmail']
      delete user['facebook_ad_account']

      if (req.url == '/') {
        res.setHeader('location', '/')
        res.statusCode = 302
        res.end()
      }
    } else {
      if (req.url != '/') {
        res.setHeader('location', '/')
        res.statusCode = 302
        res.end()
      }
    }

    return {
      props: {
        user
      }
    }
  } catch (e) {
    res.setHeader('location', '/')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: {}
      }
    }
  }
}
