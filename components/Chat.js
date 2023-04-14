import dayjs from 'dayjs'
import { useState } from 'react'
import HiSmile from '@/components/HeroIcons/HiSmile'
import HiThumb from '@/components/HeroIcons/HiThumb'
import HiAttachment from '@/components/HeroIcons/HiAttachment'

export default function Chat({ currentPage, currentConversation }) {
  const [text, setText] = useState('')
  const handleChange = (event) => {
    setText(event.target.value)
  }

  const handleKeyUp = async (e) => {
    if (e.key == 'Enter') {
      // 回复消息
      const params = new URLSearchParams({
        text: text.trim(),
        id: '6223149661075983',
        pageId: currentPage.id,
        accessToken: currentPage.access_token
      })
      const response = await fetch(`/api/meta/messages?${params}`)
      const data = await response.json()
      if (data.message_id) {
        setText('')
      }
    }
  }

  return (
    <div className="flex h-full max-h-screen flex-col bg-gray-50">
      <ul className="flex-1 p-4">
        {currentConversation.messages?.data.map((message) => (
          <li
            key={message.id}
            className="mb-2 flex items-center rounded-lg bg-gray-200 py-2 px-4"
          >
            <img
              alt={message.from.name}
              src={`/api/meta/picture?userID=${message.from.id}&accessToken=${currentPage.access_token}`}
              className="mr-2 h-8 w-8 rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-800">
                {message.from.name}
              </div>
              <div className="text-sm text-gray-600">{message.message}</div>
            </div>
            <div className="text-sm text-gray-500">
              {dayjs(message.created_time).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </li>
        ))}
      </ul>
      <div className="m-4 flex items-center justify-center rounded-lg bg-white p-2">
        <div className="mr-2 w-8">
          <img
            alt={currentPage.name}
            src={`/api/meta/picture?userID=${currentPage.id}&accessToken=${currentPage.access_token}`}
          />
        </div>
        <div className="flex-1">
          <textarea
            value={text}
            disabled={false}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            placeholder="消息已经超过24小时，无法回复！"
            className="block h-10 max-h-20 w-full cursor-not-allowed resize-none rounded-lg border-none bg-gray-200 text-xs"
          />
        </div>
        <div className="flex items-center justify-end">
          <HiAttachment />
          <HiSmile />
          <HiThumb />
        </div>
      </div>
    </div>
  )
}
