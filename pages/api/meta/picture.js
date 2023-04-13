const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v16.0'

export default async function handler(req, res) {
  // 获取用户的头像
  const { userID, accessToken } = req.query
  const response = await fetch(
    `${FACEBOOK_GRAPH_URL}/${userID}/picture?access_token=${accessToken}`
  )

  res.writeHead(200, {
    'Content-Type': response.headers.get('Content-Type'),
    'Content-Length': response.headers.get('Content-Length')
  })
  res.end(Buffer.from(await response.arrayBuffer()))
}
