import { useEffect, useRef, useState } from 'react'

async function tryMutedAutoplay(videoElement) {
  videoElement.defaultMuted = true
  videoElement.muted = true
  videoElement.playsInline = true
  await videoElement.play()
}

function LoopScene({ scene }) {
  const videoRef = useRef(null)
  const [isPlaybackBlocked, setIsPlaybackBlocked] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement) {
      return undefined
    }

    videoElement.defaultMuted = true
    videoElement.muted = true
    videoElement.playsInline = true
    videoElement.load()
    let isCancelled = false

    async function attemptPlayback() {
      try {
        await tryMutedAutoplay(videoElement)

        if (!isCancelled) {
          setIsPlaybackBlocked(false)
        }
      } catch {
        if (!isCancelled) {
          setIsPlaybackBlocked(true)
        }
      }
    }

    function handleLoadedData() {
      void attemptPlayback()
    }

    videoElement.addEventListener('loadeddata', handleLoadedData)
    void attemptPlayback()

    return () => {
      isCancelled = true
      videoElement.removeEventListener('loadeddata', handleLoadedData)
      videoElement.pause()
    }
  }, [scene.assetUrl])

  async function handleManualPlay() {
    const videoElement = videoRef.current

    if (!videoElement) {
      return
    }

    try {
      await tryMutedAutoplay(videoElement)
      setIsPlaybackBlocked(false)
    } catch {
      setIsPlaybackBlocked(true)
    }
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-slate-950">
      <video
        ref={videoRef}
        autoPlay
        className="h-full w-full object-contain"
        loop
        muted
        playsInline
        preload="auto"
        src={scene.assetUrl}
      />

      {isPlaybackBlocked ? (
        <div className="absolute bottom-5 left-5 max-w-sm rounded-[1.5rem] border border-amber-300/40 bg-slate-950/82 px-4 py-4 text-sm text-amber-50 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <p className="font-semibold">자동 재생이 차단되었습니다.</p>
          <p className="mt-2 leading-6 text-amber-100/90">
            브라우저 정책 때문에 영상이 바로 재생되지 않았습니다. 아래 버튼을 눌러 수동으로 재생해 주세요.
          </p>
          <button
            className="mt-4 inline-flex items-center justify-center rounded-full border border-amber-300/40 px-3 py-1.5 font-semibold transition hover:bg-amber-200/10"
            onClick={() => {
              void handleManualPlay()
            }}
            type="button"
          >
            영상 재생
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default LoopScene
