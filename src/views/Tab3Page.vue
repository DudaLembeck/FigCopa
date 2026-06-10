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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,  IonCard, IonCardHeader, IonCardTitle ,IonCardContent } from '@ionic/vue';
import data from '@/data/data.json'
import StickerCard from '@/components/StickerCard.vue'

const figurasColetadas = data.figuras.filter(
  figura => figura.status === "Coletada"
);

const figurasPendentes = data.figuras.filter(
  figura => figura.status === "Pendente"
);
</script>
