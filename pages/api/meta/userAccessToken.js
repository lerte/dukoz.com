const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v16.0'

export default async function handler(req, res) {
  // 生成长期用户访问口令
  const { accessToken } = req.query
  const { APP_ID, APP_SECRET } = process.env
  const response =
    await fetch(`${FACEBOOK_GRAPH_URL}/oauth/access_token?grant_type=fb_exchange_token&
  client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${accessToken}`)
  const result = await response.json()
  res.status(200).json(result)
}
