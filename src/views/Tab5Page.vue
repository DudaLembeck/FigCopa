<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 5</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 5</ion-title>
        </ion-toolbar>
      </ion-header>
      <ContatoForm />
    </ion-content>
  </ion-page>
</template>
 
<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ContatoForm from '@/components/ContatoForm.vue';
</script>