<template>
  <ion-page>
    <AppHeader
    titulo="Resetar Senha"
    />
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Reset Sua senha ( indisponivel)</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-text>Reset Sua senha ( indisponivel)</ion-text>
      <ion-button @click="voltarfunc">Voltar</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useRouter } from "vue-router"

const router = useRouter()

function voltarfunc() {
    router.push("/login")
}
</script>
