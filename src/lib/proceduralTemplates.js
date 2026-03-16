import Array3DTemplate from '../components/procedural-templates/Array3DTemplate.jsx'
import LinkedList3DTemplate from '../components/procedural-templates/LinkedList3DTemplate.jsx'
import Queue3DTemplate from '../components/procedural-templates/Queue3DTemplate.jsx'
import Stack3DTemplate from '../components/procedural-templates/Stack3DTemplate.jsx'

const TEMPLATE_MAP = {
  stack3d: Stack3DTemplate,
  queue3d: Queue3DTemplate,
  linkedlist3d: LinkedList3DTemplate,
  array3d: Array3DTemplate,
}

export function getTemplate(name) {
  return TEMPLATE_MAP[name] ?? null
}
