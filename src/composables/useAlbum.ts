import { ref } from 'vue'
import data from '@/data/data.json'

export interface Figura {
  id: number
  jogador: string
  posicao: string
  img: string
  status: string
}

const figuras = ref<Figura[]>(data.figuras)

export function useAlbum() {
  return {
    figuras
  }
}