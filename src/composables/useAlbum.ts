import { ref } from 'vue';
import { listarFigurinhas, atualizarStatusFigurinha } from '@/services/database';

export interface Figura {
  id: number
  nome: string
  img: string
  coletada: number 
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

  return {
    figuras,
    carregarFigurinhas,
    alterarStatus
  }
}
