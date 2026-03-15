import JSZip from 'jszip'
import {
  MANIFEST_FILE_NAME,
  ZIP_FILE_EXTENSION,
  ZIP_MIME_TYPES,
} from './constants.js'

const MIME_BY_EXTENSION = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
}

export function normalizeZipPath(path) {
  return String(path ?? '')
    .replace(/\\/g, '/')
    .replace(/^\.?\//, '')
    .replace(/\/+/g, '/')
    .trim()
}

export function getFileExtension(path) {
  const normalizedPath = normalizeZipPath(path)
  const fileName = normalizedPath.split('/').pop() ?? ''
  const lastDotIndex = fileName.lastIndexOf('.')

  if (lastDotIndex < 0) {
    return ''
  }

  return fileName.slice(lastDotIndex).toLowerCase()
}

export function guessMimeTypeFromPath(path) {
  return MIME_BY_EXTENSION[getFileExtension(path)] ?? 'application/octet-stream'
}

export function isZipFileCandidate(file) {
  if (!(file instanceof File)) {
    return false
  }

  const normalizedName = file.name.toLowerCase()

  return (
    normalizedName.endsWith(ZIP_FILE_EXTENSION) ||
    ZIP_MIME_TYPES.has(file.type.toLowerCase())
  )
}

export async function openZipArchive(file) {
  const zip = await JSZip.loadAsync(file)
  const entries = new Map()

  zip.forEach((relativePath, zipEntry) => {
    if (zipEntry.dir) {
      return
    }

    entries.set(normalizeZipPath(relativePath), zipEntry)
  })

  return {
    zip,
    entries,
    manifestEntry: entries.get(MANIFEST_FILE_NAME) ?? null,
  }
}

export function getArchiveEntry(entries, path) {
  return entries.get(normalizeZipPath(path)) ?? null
}

export async function readZipText(entry, onProgress) {
  return entry.async('string', (metadata) => {
    onProgress?.(metadata.percent)
  })
}

export async function readZipBlob(entry, mimeType, onProgress) {
  const blob = await entry.async('blob', (metadata) => {
    onProgress?.(metadata.percent)
  })

  return new Blob([blob], { type: mimeType || blob.type || 'application/octet-stream' })
}
