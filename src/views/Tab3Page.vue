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
          <ion-card-subtitle>Figurinhas Coletadas:</ion-card-subtitle>
            <ion-card
        v-for="figura in figurasColetadas"
        :key="figura.id"
      >
        <ion-card-header>
          <ion-card-title>
            {{ figura.jogador }}
          </ion-card-title>

          <ion-card-subtitle>
            {{ figura.posicao }}
          </ion-card-subtitle>

          
          <ion-text> Status:</ion-text>
           <ion-label color="primary"> {{ figura.status }}  </ion-label>
       
           
        </ion-card-header>

        <ion-card-content>
          <ion-img :src="figura.img"></ion-img>
        </ion-card-content>
      </ion-card>
        </ion-card-header>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import data from '@/data/data.json'

const figurasColetadas = data.figuras.filter(
  figura => figura.status === "Coletada"
);
</script>
