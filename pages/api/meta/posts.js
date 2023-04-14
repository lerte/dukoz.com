const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v16.0'

export default async function handler(req, res) {
  // 获取主页的posts
  const { pageId, accessToken } = req.query
  const url = `${FACEBOOK_GRAPH_URL}/${pageId}/posts?fields=message,created_time,full_picture,comments{message,from,created_time,comments}&access_token=${accessToken}`
  const response = await fetch(url, {
    method: 'GET'
  })
  const result = await response.json()
  res.status(200).json(result)
}
