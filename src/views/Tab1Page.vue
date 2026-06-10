
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>FigCopa</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Total de Figurinhas:</ion-card-title>
          <p>{{ totalFigurinhas }}</p>
    
         <ion-card-title>Figurinhas Coletadas:</ion-card-title>
          <p>{{ totalColetadas }}</p>
        </ion-card-header>

      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue'

import { ContarFig } from '@/composables/useCount'
import { ContarColetadas } from '@/composables/useCount'

const totalFigurinhas = ContarFig()
const totalColetadas = ContarColetadas()
</script>
