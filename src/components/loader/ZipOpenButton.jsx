import { useRef } from 'react'
import { ZIP_FILE_ACCEPT } from '../../lib/constants.js'
import { isZipFileCandidate } from '../../lib/zipReader.js'

function ZipOpenButton({
  className = '',
  disabled = false,
  label = 'ZIP 파일 선택',
  onFileReject,
  onFileSelect,
}) {
  const inputRef = useRef(null)

  function handleChange(event) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (!isZipFileCandidate(file)) {
      onFileReject?.('.zip 파일만 불러올 수 있습니다.')
      return
    }

    onFileSelect(file)
  }

  return (
    <>
      <input
        ref={inputRef}
        accept={ZIP_FILE_ACCEPT}
        className="sr-only"
        disabled={disabled}
        onChange={handleChange}
        type="file"
      />
      <button
        className={`inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/12 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500 ${className}`}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        {label}
      </button>
    </>
  )
}

export default ZipOpenButton
