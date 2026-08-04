<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="album" href="/pages/album">
          <ion-icon aria-hidden="true" :icon="bookOutline" />
          <ion-label>Álbum</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="conquistas" href="/pages/conquistas">
          <ion-icon aria-hidden="true" :icon="trophyOutline" />
          <ion-label>Conquistas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="sobre" href="/pages/termos">
          <ion-icon aria-hidden="true" :icon="informationCircleOutline" />
          <ion-label>Sobre</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="perfil" href="/pages/perfil">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { bookOutline, personOutline, informationCircleOutline, trophyOutline } from 'ionicons/icons';
</script>
