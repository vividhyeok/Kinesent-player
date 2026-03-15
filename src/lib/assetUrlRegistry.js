export function createAssetUrlRegistry() {
  const objectUrls = new Map()

  function revokeUrl(path, objectUrl) {
    if (!objectUrl) {
      return
    }

    URL.revokeObjectURL(objectUrl)
    objectUrls.delete(path)
  }

  return {
    register(path, blob) {
      const existingObjectUrl = objectUrls.get(path)

      if (existingObjectUrl) {
        revokeUrl(path, existingObjectUrl)
      }

      const objectUrl = URL.createObjectURL(blob)
      objectUrls.set(path, objectUrl)
      return objectUrl
    },

    get(path) {
      return objectUrls.get(path) ?? null
    },

    has(path) {
      return objectUrls.has(path)
    },

    revoke(path) {
      revokeUrl(path, objectUrls.get(path))
    },

    revokeAll() {
      objectUrls.forEach((objectUrl, path) => {
        revokeUrl(path, objectUrl)
      })
    },

    size() {
      return objectUrls.size
    },
  }
}
