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
      <h1>TODAS AS FIGURINHAS</h1>

        <StickerCard
          v-for="figura in figuras"
          :key="figura.id"
          :figura="figura"
        />

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import StickerCard from '@/components/StickerCard.vue'
import { useAlbum } from '@/composables/useAlbum'


const { figuras, carregarFigurinhas } = useAlbum()

onMounted(async () => {
  await carregarFigurinhas()
})

</script>
<style scoped>

.custom-input {
  margin-bottom: 18px;
  --border-radius: 8px;
  --highlight-color-focused: #3880ff; 
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #ffffff;
  font-weight: 600;
}


</style>
