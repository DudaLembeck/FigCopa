<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted} from 'vue';
import { initDatabase } from './services/database';
// import { dropDatabase } from './services/database';
import { useAlbum } from './composables/useAlbum';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

const { carregarFigurinhas } = useAlbum()

onMounted(async () =>{  
 // await dropDatabase()
  await initDatabase()
  await carregarFigurinhas()
})
</script>
