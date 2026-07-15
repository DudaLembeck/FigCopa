<template>
  <ion-page>
    <AppHeader titulo="Login" />
    <ion-content class="ion-padding">
      <LoginForm />
      <ion-button expand="block" fill="clear" @click="irCadastro">
        Criar conta
      </ion-button>
      <ion-button expand="block" fill="clear" @click="esqueciSenha">
        Esqueci minha senha
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import AppHeader from '@/components/AppHeader.vue'
import LoginForm from '@/components/LoginForm.vue'

const router = useRouter()
function irCadastro() { router.push('/cadastro') }
function esqueciSenha() { router.push('/resetpass') }
</script>