import Layout from '@/layouts/Sidebar'
import { Dropdown } from 'flowbite-react'
import { useState, useEffect } from 'react'
import FacebookPage from '@/components/FacebookPage'
import HiUser from '@/components/HeroIcons/HiUser'
import HiBriefcase from '@/components/HeroIcons/HiBriefcase'

export default function Meta({ user }) {
  const [pages, setPages] = useState([])
  const [userInfo, setUserInfo] = useState([])

  const getPages = async ({ userId, userAccessToken }) => {
    // 获取您的公共主页编号
    const params = new URLSearchParams({
      userID: userId,
      accessToken: userAccessToken
    })
    const response = await fetch(`/api/meta/pageShowList?${params}`)
    const { data } = await response.json()
    setPages(data)
  }

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
    setUserInfo({
      ...user.meta
    })
  }, [])

  useEffect(() => {
    if (userInfo?.userAccessToken) {
      getPages(userInfo)
    }
  }, [userInfo])

  const getUserAccessToken = async (me, accessToken) => {
    // 获取长期用户访问口令
    const response = await fetch('/api/meta/userAccessToken', {
      method: 'POST',
      body: JSON.stringify({
        accessToken
      })
    })
    const { access_token } = await response.json()
    setUserInfo({
      userId: me.id,
      userName: me.name,
      userAccessToken: access_token
    })
    // 保存facebook用户的id,name,userAccessToken到数据库
    saveUserInfo(me, access_token)
  }

  const saveUserInfo = async ({ id, name }, userAccessToken) => {
    const response = await fetch('/api/user/account', {
      method: 'POST',
      body: JSON.stringify({
        _id: user._id,
        userId: id,
        userName: name,
        userAccessToken
      })
    })
    if (!response.ok) {
      const { errors } = await response.json()
      throw errors
    } else {
      //
    }
  }

  const login = (scope) => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          FB.api('/me', (me) => {
            getUserAccessToken(me, response.authResponse.accessToken)
          })
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      },
      {
        scope
      }
    )
  }

  return (
    <Layout user={user}>
      <Dropdown label="授权主页">
        <Dropdown.Item
          icon={HiUser}
          onClick={() =>
            login(
              'email,ads_management,pages_show_list,pages_messaging,pages_read_engagement,pages_manage_engagement,pages_manage_metadata,public_profile,pages_read_user_content'
            )
          }
        >
          个号授权Page
        </Dropdown.Item>
        <Dropdown.Item
          icon={HiBriefcase}
          onClick={() => login('business_management')}
        >
          BM授权Page
        </Dropdown.Item>
      </Dropdown>
      <section className="grid grid-cols-1 space-y-12 pt-4 md:grid-cols-2 md:gap-6 md:gap-x-6 md:space-y-0 lg:grid-cols-3">
        {pages.map((page) => (
          <FacebookPage key={page.id} page={page} />
        ))}
      </section>
    </Layout>
  )
}

export { getServerSideProps } from '@/pages/index'
