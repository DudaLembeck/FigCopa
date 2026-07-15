<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Figurinhas Favoritas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Figurinhas Favoritas</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <ion-row>
          <ion-col
            size-xs="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            v-for="figura in figuras"
            :key="figura.id"
          >
            <StickerCard :figura="figura" />
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-chip v-if="figuras.length === 0" color="medium" expand="block">
        <ion-label>Nenhuma figurinha favorita encontrada.</ion-label>
      </ion-chip>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel
} from '@ionic/vue';
import { onMounted } from 'vue';
import StickerCard from '@/components/StickerCard.vue';
import { useAlbum } from '@/composables/useAlbum';

const { figuras, carregarFigurinhasFavoritas } = useAlbum();

onMounted(() => {
  carregarFigurinhasFavoritas();
});
</script>
