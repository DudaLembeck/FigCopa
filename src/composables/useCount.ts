import { computed } from 'vue'
import { useAlbum } from '@/composables/useAlbum'

export function ContarFig() {
  const { figuras } = useAlbum()
  return computed(() => figuras.value.length)
}

export function ContarColetadas() {
  const { figuras } = useAlbum()
  return computed(() => figuras.value.filter(f => f.coletada === 1).length)
}
