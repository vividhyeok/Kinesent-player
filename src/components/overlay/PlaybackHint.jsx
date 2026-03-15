import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { PLAYBACK_HINT_IDLE_MS } from '../../lib/constants.js'

function PlaybackHint({ isPresentationReady }) {
  const hideTimerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  const scheduleHide = useEffectEvent(() => {
    if (!isPresentationReady) {
      setIsVisible(true)
      return
    }

    window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => {
      setIsVisible(false)
    }, PLAYBACK_HINT_IDLE_MS)
  })

  const revealHint = useEffectEvent(() => {
    setIsVisible(true)
    scheduleHide()
  })

  useEffect(() => {
    revealHint()

    if (!isPresentationReady) {
      return () => {
        window.clearTimeout(hideTimerRef.current)
      }
    }

    function handleActivity() {
      revealHint()
    }

    window.addEventListener('mousemove', handleActivity, { passive: true })
    window.addEventListener('pointerdown', handleActivity, { passive: true })
    window.addEventListener('touchstart', handleActivity, { passive: true })
    window.addEventListener('keydown', handleActivity)

    return () => {
      window.clearTimeout(hideTimerRef.current)
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('pointerdown', handleActivity)
      window.removeEventListener('touchstart', handleActivity)
      window.removeEventListener('keydown', handleActivity)
    }
  }, [isPresentationReady])

  return (
    <div
      className={`max-w-2xl text-sm leading-6 text-slate-200 transition duration-300 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <p className="font-semibold text-white">다음 진행: 스페이스바 또는 PageDown</p>
      <p className="mt-1 text-slate-300">
        {isPresentationReady
          ? 'animated 씬은 하이라이트 순서에 따라 진행되고, 마지막 단계가 끝나면 다음 씬으로 이동합니다.'
          : 'ZIP 파일을 열면 프레젠테이션 리모컨이나 키보드로 바로 진행할 수 있습니다.'}
      </p>
    </div>
  )
}

export default PlaybackHint
