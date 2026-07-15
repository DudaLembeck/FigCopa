<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        {{ figura.nome }}
        <ion-icon
          v-if="figura.favorite === 1"
          :icon="star"
          color="warning"
          style="margin-left: 5px;"
        ></ion-icon>
      </ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-img :src="figura.img"></ion-img>

      <ion-label>
        Status:
        <ion-badge :color="figura.coletada === 1 ? 'success' : 'medium'">
          {{ figura.coletada === 1 ? 'Coletada' : 'Pendente' }}
        </ion-badge>
      </ion-label>

      <ion-label v-if="figura.collected_at">
        Coletada em: {{ new Date(figura.collected_at).toLocaleDateString() }}
      </ion-label>

      <ion-button
        expand="block"
        :color="figura.coletada === 1 ? 'medium' : 'success'"
        @click="alternarStatus"
      >
        {{ figura.coletada === 1 ? 'Marcar como pendente' : 'Marcar como coletada' }}
      </ion-button>

      <ion-button
        expand="block"
        fill="outline"
        :color="figura.favorite === 1 ? 'warning' : 'medium'"
        @click="toggleFavoriteStatus"
      >
        <ion-icon slot="start" :icon="figura.favorite === 1 ? star : starOutline"></ion-icon>
        {{ figura.favorite === 1 ? 'Remover dos favoritos' : 'Adicionar aos favoritos' }}
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonLabel,
  IonBadge,
  IonButton
} from '@ionic/vue'

import { Figura, useAlbum } from '@/composables/useAlbum'
import { star, starOutline } from 'ionicons/icons';

const props = defineProps<{
  figura: Figura
}>()

const { alterarStatus, alternarFavorito } = useAlbum()

async function alternarStatus() {
  await alterarStatus(props.figura.id, props.figura.coletada !== 1)
}

async function toggleFavoriteStatus() {
  await alternarFavorito(props.figura.id, props.figura.favorite !== 1)
}
</script>
