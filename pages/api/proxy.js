export default async function handler(req, res) {
  // 代理访问文件
  const { url } = req.query
  const response = await fetch(url)

  res.writeHead(200, {
    'Content-Type': response.headers.get('Content-Type'),
    'Content-Length': response.headers.get('Content-Length')
  })
  res.end(Buffer.from(await response.arrayBuffer()))
}
