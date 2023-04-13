export default function Chat({ currentPage, currentConversation }) {
  return (
    <div className="bg-gray-50">
      <ul className="p-4">
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
            <div className="text-sm text-gray-500">{message.created_time}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
