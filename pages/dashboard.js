import Layout from '@/layouts/Sidebar'
import { useState, useEffect } from 'react'
import FacebookPage from '@/components/FacebookPage'

export default function Dashboard() {
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
      <section className="grid grid-cols-1 space-y-12 pt-9 md:grid-cols-2 md:gap-6 md:gap-x-6 md:space-y-0 lg:grid-cols-3">
        {accounts.map((account) => (
          <FacebookPage key={account.id} account={account} />
        ))}
      </section>
    </Layout>
  )
}
