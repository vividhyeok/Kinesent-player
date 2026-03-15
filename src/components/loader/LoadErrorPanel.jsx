function LoadErrorPanel({ error, onClear, children }) {
  const messages = error?.messages?.length
    ? error.messages
    : ['다른 ZIP 파일로 다시 시도해 주세요.']

  return (
    <div className="flex h-full w-full items-center justify-center px-6 py-8">
      <div className="w-full max-w-3xl rounded-[2rem] border border-rose-400/30 bg-rose-950/30 px-8 py-10 shadow-2xl shadow-rose-950/20 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">
          불러오기 실패
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          {error?.title || 'ZIP 파일을 열지 못했습니다.'}
        </h2>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-rose-50/90 sm:text-base">
          {messages.map((message) => (
            <li
              key={message}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              {message}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-6 text-rose-100/80">
          manifest.json의 씬 정보와 assets 파일 구성을 다시 확인한 뒤, 올바른 ZIP 파일을 다시 불러와 주세요.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {children}
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
            onClick={onClear}
            type="button"
          >
            초기 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoadErrorPanel
