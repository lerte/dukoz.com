import stream from 'stream'
import { promisify } from 'util'

export default async function handler(req, res) {
  // 代理访问文件
  const pipeline = promisify(stream.pipeline)
  const { url } = req.query
  const response = await fetch(url)

  if (!response.ok) {
    console.log(`unexpected response ${response.statusText}`)
  }
  res.setHeader('Content-Type', 'image/*')
  await pipeline(response.body, res)
}
