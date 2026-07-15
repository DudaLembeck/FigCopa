<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Histórico de Coletas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Histórico de Coletas</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="figura in ultimasFigurinhas" :key="figura.id">
          <ion-label>
            <h2>{{ figura.nome }}</h2>
            <p v-if="figura.collected_at">Coletada em: {{ new Date(figura.collected_at).toLocaleString() }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-chip v-if="ultimasFigurinhas.length === 0" color="medium" expand="block">
        <ion-label>Nenhuma figurinha coletada recentemente.</ion-label>
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
  IonList,
  IonItem,
  IonLabel,
  IonChip
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useAlbum, Figura } from '@/composables/useAlbum';

const { listarUltimasFigurinhasColetadas } = useAlbum();
const ultimasFigurinhas = ref<Figura[]>([]);

onMounted(async () => {
  ultimasFigurinhas.value = await listarUltimasFigurinhasColetadas();
});
</script>
