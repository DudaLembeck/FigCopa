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
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Meu Álbum</ion-card-title>
         </ion-card-header>
         <ion-card-content>

       <ion-card-title > Figurinhas Coletadas: </ion-card-title>

        <StickerCard
          v-for="figura in figurasColetadas"
          :key="figura.id"
          :figura="figura"
        />

        <ion-card-title> Figurinhas Pendentes:</ion-card-title>

        <StickerCard
          v-for="figura in figurasPendentes"
          :key="figura.id"
          :figura="figura"
        />
         </ion-card-content>
       </ion-card>

        </ion-content>
         </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,  IonCard, IonCardHeader, IonCardTitle ,IonCardContent } from '@ionic/vue';
import StickerCard from '@/components/StickerCard.vue'
import { useAlbum } from '@/composables/useAlbum'

const { figuras, carregarFigurinhas } = useAlbum()

onMounted(async () => {
  await carregarFigurinhas()
})

const figurasColetadas = computed(() =>
  figuras.value.filter(figura => figura.coletada === 1)
);

const figurasPendentes = computed(() =>
  figuras.value.filter(figura => figura.coletada !== 1)
);
</script>
