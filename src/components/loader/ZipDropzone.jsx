import { useRef, useState } from 'react'
import { isZipFileCandidate } from '../../lib/zipReader.js'

function ZipDropzone({ children, disabled, onFileSelect, onFileReject }) {
  const dragDepthRef = useRef(0)
  const [isDragActive, setIsDragActive] = useState(false)

  function handleFile(file) {
    if (!file) {
      return
    }

    if (!isZipFileCandidate(file)) {
      onFileReject?.('.zip 파일만 불러올 수 있습니다.')
      return
    }

    onFileSelect(file)
  }

  function handleDragEnter(event) {
    if (disabled) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    dragDepthRef.current += 1
    setIsDragActive(true)
  }

  function handleDragOver(event) {
    if (disabled) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
  }

  function handleDragLeave(event) {
    if (disabled) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1)

    if (dragDepthRef.current === 0) {
      setIsDragActive(false)
    }
  }

  function handleDrop(event) {
    if (disabled) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    dragDepthRef.current = 0
    setIsDragActive(false)
    handleFile(event.dataTransfer.files?.[0])
  }

  return (
    <div
      className="relative"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}

      {isDragActive && !disabled ? (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md">
          <div className="rounded-[2rem] border border-cyan-300/40 bg-cyan-300/10 px-8 py-10 text-center shadow-2xl shadow-cyan-950/30">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              ZIP 드롭
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              ZIP 파일을 놓아 발표를 시작하세요
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              manifest.json과 assets 폴더가 포함된 발표 ZIP 파일만 지원합니다.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ZipDropzone
