import Layout from '@/layouts/Sidebar'
import { useState, useEffect } from 'react'
import FacebookPage from '@/components/FacebookPage'

export default function Meta({ user }) {
  const [loginInfo, setLoginInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [pages, setPages] = useState([])

  useEffect(() => {
    // if (user.meta) {
    //   setUserInfo({
    //     id: user.meta.userId,
    //     name: user.meta.userName
    //   })
    //   setLoginInfo({
    //     authResponse: {
    //       userID: user.meta.userId,
    //       accessToken: user.meta.userAccessToken
    //     }
    //   })
    // }
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

  const saveUserInfo = async ({ id, name }, { authResponse }) => {
    const response = await fetch('/api/user/account', {
      method: 'POST',
      body: JSON.stringify({
        _id: user._id,
        userId: id,
        userName: name,
        userAccessToken: authResponse.accessToken
      })
    })
    if (!response.ok) {
      const { errors } = await response.json()
      throw errors
    } else {
      //
    }
  }

  const login = () => {
    FB.login(
      (response) => {
        setLoginInfo(response)
        if (response.authResponse) {
          FB.api('/me', (res) => {
            setUserInfo(res)
            // 保存facebook用户的id和name到数据库
            saveUserInfo(res, response)
          })
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      },
      {
        scope:
          'email,ads_management,pages_show_list,pages_messaging,pages_read_engagement,pages_manage_engagement,pages_manage_metadata,public_profile,pages_read_user_content'
      }
    )
  }

  const savePages = async (data) => {
    const pages = data.map(({ id, name, access_token }) => ({
      pageId: id,
      pageName: name,
      pageAccessToken: access_token
    }))
    const response = await fetch('/api/user/page', {
      method: 'POST',
      body: JSON.stringify({ _id: user.meta._id, pages })
    })
    if (!response.ok) {
      const { errors } = await response.json()
      throw errors
    } else {
      //
    }
  }

  const getPages = async () => {
    // 获取您的公共主页编号
    const params = new URLSearchParams({
      userID: loginInfo.authResponse.userID,
      accessToken: loginInfo.authResponse.accessToken
    })
    const response = await fetch(`/api/meta/pageShowList?${params}`)
    const { data } = await response.json()
    savePages(data)
    setPages(data)
  }

  return (
    <Layout user={user}>
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
      <section className="grid grid-cols-1 space-y-12 pt-9 md:grid-cols-2 md:gap-6 md:gap-x-6 md:space-y-0 lg:grid-cols-3">
        {pages.map((page) => (
          <FacebookPage key={page.id} page={page} />
        ))}
      </section>
    </Layout>
  )
}

export { getServerSideProps } from '@/pages/index'
