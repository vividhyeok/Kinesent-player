export const APP_NAME = 'kinesent-player'

export const PLAYER_TITLE = '키네센트 플레이어'

export const MANIFEST_FILE_NAME = 'manifest.json'

export const ASSET_DIRECTORY_NAME = 'assets'

export const SCENE_TYPES = ['static', 'loop', 'animated']

export const SCENE_TYPE_SET = new Set(SCENE_TYPES)

export const ZIP_FILE_EXTENSION = '.zip'

export const ZIP_FILE_ACCEPT = '.zip,application/zip,application/x-zip-compressed'

export const ZIP_MIME_TYPES = new Set([
  'application/zip',
  'application/x-zip-compressed',
  'multipart/x-zip',
])

export const IMAGE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.bmp',
  '.svg',
])

export const LOOP_VIDEO_EXTENSIONS = new Set(['.mp4'])

export const ANIMATED_EXTENSIONS = new Set(['.svg'])

export const CANVAS_ASPECT_RATIO_WIDTH = 16

export const CANVAS_ASPECT_RATIO_HEIGHT = 9

export const PRELOAD_SCENE_RADIUS = 1

export const KEYBOARD_TRIGGER_CODES = new Set(['Space', 'PageDown'])

export const PLAYBACK_HINT_IDLE_MS = 2800

export const SAME_TRIGGER_ADVANCE_DELAY_MS = 180
