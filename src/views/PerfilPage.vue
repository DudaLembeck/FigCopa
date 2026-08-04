<template>
  <ion-page>
    <AppHeader
    titulo="Perfil"
    />

    <ion-content class="ion-padding">

      <ion-card>
        <ion-card-header>
          <ion-card-title>Usuário</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label>
              <h2>Nome</h2>
              <p>{{ usuarioLogado?.nome || "Não informado" }}</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <h2>E-mail</h2>
              <p>{{ usuarioLogado?.email || "Não informado" }}</p>
            </ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <ion-button
        expand="block"
        color="danger"
        @click="sair"
      >
        Sair
      </ion-button>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter }
from "vue-router"

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton
} from "@ionic/vue"

import {
  useAuth
} from "@/composables/useAuth"

const router = useRouter()

const {
  usuarioLogado,
  logout
} = useAuth()

function sair() {
  logout()
  router.push("/login")
}
</script>