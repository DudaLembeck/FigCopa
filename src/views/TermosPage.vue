<template>
  <ion-page>
    <AppHeader
    titulo="Termos de Uso"
    />

    <ion-content class="ion-padding">

      <ion-card>
        <ion-card-header>
          <ion-card-title>Termos de Uso</ion-card-title>
        </ion-card-header>

        <ion-card-content>
        <ion-text color="primary">
           <ion-text>
    <h2>1. Objetivo do aplicativo</h2>
    <p>
      O <strong>Álbum da Copa</strong> é um aplicativo de entretenimento
      que permite aos usuários colecionar figurinhas virtuais de jogadores,
      acompanhar o progresso do álbum e desbloquear conquistas.
    </p>

    <h2>2. Cadastro</h2>
    <p>
      Para utilizar algumas funcionalidades, é necessário criar uma conta
      informando nome, login e senha.
    </p>

    <h2>3. Uso do aplicativo</h2>
    <p>O usuário concorda em:</p>

    <ul>
      <li>Utilizar o aplicativo de forma responsável;</li>
      <li>Não tentar alterar ou prejudicar o funcionamento do sistema;</li>
      <li>Não utilizar o aplicativo para fins ilegais.</li>
    </ul>

    <h2>4. Dados armazenados</h2>
    <p>
      O aplicativo armazena apenas informações necessárias para seu funcionamento,
      como dados de cadastro, figurinhas coletadas e conquistas desbloqueadas.
    </p>

    <h2>5. Direitos autorais</h2>
    <p>
      Imagens, nomes de jogadores e seleções possuem finalidade exclusivamente
      educativa e demonstrativa dentro deste projeto.
    </p>

    <h2>6. Disponibilidade</h2>
    <p>
      O funcionamento do aplicativo pode sofrer interrupções para manutenção
      ou atualizações.
    </p>

    <h2>7. Alterações</h2>
    <p>
      Estes Termos de Uso podem ser atualizados a qualquer momento.
    </p>

    <h2>8. Aceite</h2>
    <p>
      Ao utilizar o aplicativo, o usuário declara que leu e concorda
      com os presentes Termos de Uso.
    </p>

  </ion-text>

          <ion-card-content>

 

  </ion-card-content>
        </ion-text>
        </ion-card-content>
      </ion-card>

      <ion-button
  expand="block"
  color="danger"
  @click="voltar"
>
  Voltar
</ion-button>

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
  IonCardContent,
  IonText,
  IonButton
} from "@ionic/vue"

import { useRouter } from "vue-router"

const router = useRouter()

function voltar() {
  router.back()
}
</script>