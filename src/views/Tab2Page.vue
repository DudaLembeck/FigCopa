<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>FigCopa</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      

        <StickerCard
  v-for="figura in figuras"
  :key="figura.id"
  :figura="figura"
/>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import StickerCard from '@/components/StickerCard.vue'
import { useAlbum } from '@/composables/useAlbum'


const { figuras } = useAlbum()


</script>
