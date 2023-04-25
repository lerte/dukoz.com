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

  const handleKeyUp = async (id, e) => {
    console.log(JSON.stringify(currentPage.id))
    if (e.key == 'Enter') {
      // 回复消息
      const params = new URLSearchParams({
        id,
        text: text.trim(),
        pageId: currentPage.id,
        accessToken: currentPage.access_token
      })
      console.log(params.toString())
      return
      const response = await fetch(`/api/meta/messages?${params}`)
      const data = await response.json()
      if (data.message_id) {
        setText('')
      }
    }
  }

  return (
    <div className="flex flex-col bg-gray-50">
      <ul className="flex-1 p-4">
        {currentConversation.messages?.data.reverse().map((message) => (
          <li key={message.id} className="mb-2">
            <div
              className={`chat ${
                message.from.id == currentPage.id ? 'chat-end' : 'chat-start'
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {message.from.id == currentPage.id ? (
                    <img
                      alt={message.from.name}
                      src={`/api/meta/picture?userID=${message.from.id}&accessToken=${currentPage.access_token}`}
                      className="mr-2 h-8 w-8 rounded-full"
                    />
                  ) : (
                    <img
                      alt={message.from.name}
                      className="mr-2 h-8 w-8 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${message.from.name}&background=0D8ABC&color=fff`}
                    />
                  )}
                </div>
              </div>
              <div className="chat-header">{message.from.name}</div>
              <div
                className={`chat-bubble ${
                  message.from.id == currentPage.id
                    ? 'chat-bubble-primary'
                    : 'chat-bubble-success'
                }`}
              >
                {message.message}
              </div>
              <div className="chat-footer opacity-50">
                {dayjs(message.created_time).format('YYYY-MM-DD HH:mm:ss')}
              </div>
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
            onKeyUp={(e) => handleKeyUp(currentConversation, e)}
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
