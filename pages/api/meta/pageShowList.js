const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v16.0'

export default async function handler(req, res) {
  // 获取授权的主页
  const { userID, accessToken } = req.query
  const response =
    await fetch(`${FACEBOOK_GRAPH_URL}/${userID}/accounts?fields=name,cover,fan_count,followers_count,rating_count,is_owned,access_token&
    access_token=${accessToken}`)
  const result = await response.json()
  res.status(200).json(result)
}
