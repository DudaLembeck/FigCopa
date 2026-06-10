export interface Figura {
  id: number
  jogador: string
  posicao: string
  img: string
  status: string
}


import data from '@/data/data.json'

export function ContarFig(): number {
    return data.figuras.length
}

export function ContarColetadas(): number {
  return data.figuras.filter(
    figura => figura.status === 'Coletada'
  ).length
}