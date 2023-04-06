import altogic from '@/libs/altogic'

export default function Sessions({ sessions, setSessions }) {
  const logoutSession = async (session) => {
    const { errors } = await altogic.auth.signOut(session.token)
    if (!errors) {
      setSessions(sessions.filter((s) => s.token !== session.token))
    }
  }

  return (
    <div className="space-y-4 border p-4">
      <p className="text-3xl">All Sessions</p>
      <ul className="flex flex-col gap-2">
        {sessions?.map((session) => (
          <li key={session.token} className="flex justify-between gap-12">
            <div>
              {session.isCurrent && <span> Current Session </span>}
              <span>
                {' '}
                <strong>Device name: </strong>
                {session?.userAgent.device.family}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                {new Date(session.creationDtm).toLocaleDateString('en-US')}
              </span>
              {!session.isCurrent && (
                <button
                  onClick={() => logoutSession(session)}
                  className="grid aspect-square h-8 w-8 place-items-center border p-2 leading-none"
                >
                  X
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
