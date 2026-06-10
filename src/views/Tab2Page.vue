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

      

   <ion-card
        v-for="figura in figuras"
        :key="figura.id"
      >
        <ion-card-header>
          <ion-card-title>
            {{ figura.jogador }}
          </ion-card-title>

          <ion-card-subtitle>
            {{ figura.posicao }}
          </ion-card-subtitle>

          
           <!-- <ion-text> Status:</ion-text>
           <ion-label color="primary"> {{ figura.status }}  </ion-label>
         -->
           
        </ion-card-header>

        <ion-card-content>
          <ion-img :src="figura.img"></ion-img>
        </ion-card-content>
      </ion-card>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, /* IonText*/  IonHeader,IonImg, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle,/*IonLabel*/ } from '@ionic/vue';
import data from '@/data/data.json'
const figuras = data.figuras
</script>
