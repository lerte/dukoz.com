const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v16.0'

export default async function handler(req, res) {
  // 获取授权的主页
  const { pageId, accessToken, id, text } = req.query
  const url = `${FACEBOOK_GRAPH_URL}/${pageId}/messages?recipient={'id': ${id}}&messaging_type=RESPONSE&message={'text': '${text}'}&access_token=${accessToken}`
  const response = await fetch(url, {
    method: 'POST'
  })
  const result = await response.json()
  res.status(200).json(result)
}
