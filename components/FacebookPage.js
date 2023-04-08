export default function FacebookPage({ account }) {
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-center py-10">
        <picture className="h-24 w-24 overflow-hidden rounded-full border">
          <img
            className="h-full w-full object-cover"
            src={
              account.cover?.source ||
              `https://ui-avatars.com/api/?name=${user?.name}&background=0D8ABC&color=fff`
            }
            alt={account?.name}
          />
        </picture>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {account.name}
        </h5>
        <div className="mt-4 flex space-x-3 md:mt-6">
          <button
            type="button"
            class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            赞
            <span class="ml-2 inline-flex h-4 w-8 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
              {account.fan_count}
            </span>
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            粉丝
            <span class="ml-2 inline-flex h-4 w-8 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
              {account.followers_count}
            </span>
          </button>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-6">
          <button className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Feed
          </button>
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            Message
          </button>
        </div>
      </div>
    </div>
  )
}
