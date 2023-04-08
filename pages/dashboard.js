import Layout from '@/layouts/Sidebar'
import { useState, useEffect } from 'react'
import { altogicWithToken } from '@/libs/altogic'

export default function Meta() {
  const [loginInfo, setLoginInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '518242687131507',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v16.0'
      })
      FB.AppEvents.logPageView()
    }
    ;(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }, [])

  const login = () => {
    FB.login((response) => {
      setLoginInfo(response)
      if (response.authResponse) {
        FB.api('/me', (response) => {
          setUserInfo(response)
        })
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    })
  }

  const getPages = async () => {
    // 获取您的公共主页编号
    const params = new URLSearchParams({
      userID: loginInfo.authResponse.userID,
      accessToken: loginInfo.authResponse.accessToken
    })
    const response = await fetch(`/api/meta/pageAccounts?${params}`)
    const { data } = await response.json()
    setAccounts(data)
  }

  return (
    <Layout>
      <button
        type="button"
        onClick={login}
        className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        授权登录
      </button>
      {userInfo.id ? (
        <button
          type="button"
          onClick={getPages}
          className="mr-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          获取公共主页
        </button>
      ) : (
        ''
      )}
      <div>{JSON.stringify(accounts)}</div>
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
