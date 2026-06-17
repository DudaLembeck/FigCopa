<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        {{ figura.jogador }}
      </ion-card-title>

      <ion-card-subtitle>
        {{ figura.posicao }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>  
      <ion-label>
        Status:
        {{ figura.status }}
      </ion-label>
      <ion-img :src="figura.img"></ion-img>

    

    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonLabel
} from '@ionic/vue'

import { Figura } from '@/composables/useAlbum'

defineProps<{
  figura: Figura
}>()

</script>