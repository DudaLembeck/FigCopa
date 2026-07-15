<template>
  <ion-card class="sticker-card">

    <ion-img
      :src="sticker.foto"
      alt="Jogador"
    />

    <ion-card-header>
      <ion-card-title>{{ sticker.nome }}</ion-card-title>
      <ion-card-subtitle>{{ sticker.selecao }}</ion-card-subtitle>
      <ion-card-subtitle>{{ sticker.raridade }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>

      <ion-badge
        :color="sticker.coletada ? 'success' : 'danger'"
        :class="sticker.coletada ? 'sticker-status collected' : 'sticker-status pending'"
      >
        {{ sticker.coletada ? 'Coletada' : 'Pendente' }}
      </ion-badge>

      <ion-button
        expand="block"
        class="ion-margin-top"
        @click="toggleColetada"
      >
        {{
          sticker.coletada
            ? 'Remover da coleção'
            : 'Coletar figurinha'
        }}
      </ion-button>

    </ion-card-content>

  </ion-card>
</template>

<script setup lang="ts">
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg
} from "@ionic/vue"

const props = defineProps<{
  sticker: {
    id: number
    nome: string
    selecao: string
    foto: string
    coletada: boolean
    raridade: string
  }
}>()

const emit = defineEmits<{
  toggle: [id: number]
}>()

function toggleColetada() {
  emit(
    "toggle",
    props.sticker.id
  )
}
</script>