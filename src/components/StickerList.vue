<template>
  <ion-grid>

    <ion-row>

      <ion-col
        v-for="sticker in stickers"
        :key="sticker.id"
        size="12"
        size-md="6"
        size-lg="4"
      >

        <StickerCard
          :sticker="sticker"
          @toggle="toggleSticker"
        />

      </ion-col>

    </ion-row>

  </ion-grid>
</template>

<script setup lang="ts">
import {
  IonCol,
  IonGrid,
  IonRow
} from "@ionic/vue"

import StickerCard from "./StickerCard.vue"

interface Sticker {
  id: number
  nome: string
  selecao: string
  foto: string
  coletada: boolean
  raridade: string
}

defineProps<{
  stickers: Sticker[]
}>()

const emit = defineEmits<{
  toggle: [id: number]
}>()

function toggleSticker(id: number) {
  emit(
    "toggle",
    id
  )
}
</script>