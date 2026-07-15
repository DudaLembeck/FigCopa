import {
  ref,
  computed,
  onMounted
} from "vue"

import {
  listJogadores,
  toggleFigurinha
} from "@/services/database"

import {
  usuarioLogado
} from "@/composables/useAuth"

export function useAlbum() {

  const stickers = ref<any[]>([])

  const pesquisa = ref("")

  const filtro = ref("todas")

  async function carregarAlbum() {

    if (!usuarioLogado.value) {
      return
    }

    stickers.value =
      await listJogadores(
        usuarioLogado.value.id
      )

  }

  async function marcarColetada(id: number) {
    if (!usuarioLogado.value) return;

    const figurinha = stickers.value.find(sticker => sticker.id === id);
    if (!figurinha) return;

    await toggleFigurinha(usuarioLogado.value.id, id);
    
    // Atualiza o estado local
    figurinha.coletada = figurinha.coletada ? 0 : 1;
  }

  const stickersFiltradas = computed(() => {

    let resultado = stickers.value

    if (pesquisa.value) {

      resultado = resultado.filter(sticker =>

        sticker.nome
          .toLowerCase()
          .includes(
            pesquisa.value.toLowerCase()
          ) ||

        sticker.selecao
          .toLowerCase()
          .includes(
            pesquisa.value.toLowerCase()
          )

      )

    }

    if (filtro.value === "coletadas") {

      resultado =
        resultado.filter(
          sticker => sticker.coletada
        )

    }

    if (filtro.value === "pendentes") {

      resultado =
        resultado.filter(
          sticker => !sticker.coletada
        )

    }

    return resultado

  })

  const totalFigurinhas = computed(() =>
    stickers.value.length
  )

  const totalColetadas = computed(() =>
    stickers.value.filter(
      sticker => Boolean(sticker.coletada)
    ).length
  )

  onMounted(() => {
    carregarAlbum()
  })

  return {
    pesquisa,
    filtro,
    marcarColetada,
    stickersFiltradas,
    totalFigurinhas,
    totalColetadas,
    carregarAlbum
  }

}