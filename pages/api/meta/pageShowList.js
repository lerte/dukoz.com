export default async function handler(req, res) {
  // 获取授权的主页
  const { userID, accessToken } = req.query
  const response =
    await fetch(`https://graph.facebook.com/${userID}/accounts?fields=name,cover,fan_count,followers_count,access_token&
    access_token=${accessToken}`)
  const result = await response.json()
  res.status(200).json(result)
}
