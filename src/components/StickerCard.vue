<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        {{ figura.nome }}
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

      <ion-button
        expand="block"
        :color="figura.coletada === 1 ? 'medium' : 'success'"
        @click="alternarStatus"
      >
        {{ figura.coletada === 1 ? 'Marcar como pendente' : 'Marcar como coletada' }}
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

const props = defineProps<{
  figura: Figura
}>()

const { alterarStatus } = useAlbum()

async function alternarStatus() {
  await alterarStatus(props.figura.id, props.figura.coletada !== 1)
}
</script>
