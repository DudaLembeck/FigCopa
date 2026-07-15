<template>
  <ion-page>
    <AppHeader
      titulo="Sobre o Aplicativo"
    />

    <ion-content
      class="ion-padding"
    >

      <ion-card>
        <ion-card-header>
          <ion-card-title>Álbum da Copa</ion-card-title>
          <ion-card-subtitle>Versão 1.0.0</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <p>Aplicativo desenvolvido para gerenciamento de figurinhas da Copa do Mundo, permitindo marcar figurinhas coletadas, pesquisar jogadores e acompanhar o álbum.</p>
        </ion-card-content>
      </ion-card>

      <ion-list>

        <ion-item
          button
          href="https://github.com/mario2230/Termos-de-Uso/tree/main"
          target="_blank"
        >
          <ion-icon
            :icon="documentTextOutline"
            slot="start"
          />

          <ion-label>
            Termos de Uso
          </ion-label>
        </ion-item>

        <ion-item
          button
          href="https://github.com/mario2230/Politica-de-privacidade"
          target="_blank"
        >
          <ion-icon
            :icon="shieldCheckmarkOutline"
            slot="start"
          />

          <ion-label>
            Política de Privacidade
          </ion-label>
        </ion-item>

      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from "@ionic/vue"

import {
  documentTextOutline,
  shieldCheckmarkOutline
} from "ionicons/icons"

import AppHeader
from "@/components/AppHeader.vue"
</script>