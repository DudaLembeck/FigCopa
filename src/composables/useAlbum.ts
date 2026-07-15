import { ref } from 'vue';
import { listarFigurinhas, atualizarStatusFigurinha, toggleFavorite, listarFigurinhasFavoritas, listarUltimasFigurinhasColetadas } from '@/services/database';

export interface Figura {
  id: number
  nome: string
  img: string
  coletada: number 
  favorite: number
  collected_at: string | null
  tipo: string
}

const figuras = ref<Figura[]>([]);

export function useAlbum() {

  async function carregarFigurinhas() {
    const resultado = await listarFigurinhas();
    figuras.value = resultado as Figura[];
  }

  async function alterarStatus(id: number, coletada: boolean) {
    const novoStatus = coletada ? 1 : 0;

    await atualizarStatusFigurinha(id, novoStatus);
    await carregarFigurinhas();
  }

  async function alternarFavorito(id: number, favorite: boolean) {
    const novoStatus = favorite ? 1 : 0;
    await toggleFavorite(id, novoStatus);
    await carregarFigurinhas();
  }

  async function carregarFigurinhasFavoritas() {
    const resultado = await listarFigurinhasFavoritas();
    figuras.value = resultado as Figura[];
  }

  return {
    figuras,
    carregarFigurinhas,
    alterarStatus,
    alternarFavorito,
    carregarFigurinhasFavoritas,
    listarUltimasFigurinhasColetadas
  }
}
