<template>
  <ion-page>
    <AppHeader titulo="Cadastro" />

    <ion-content class="ion-padding">

      <RegisterForm @register="realizarCadastro" />

      <ion-button expand="block" fill="clear" @click="voltarLogin">
        Voltar ao Login
      </ion-button>

      <ion-text color="danger" v-if="mensagem">
        <p>{{ mensagem }}</p>
      </ion-text>

      <ion-toast :is-open="mostrarToast" :message="mensagemToast" duration="2000" @didDismiss="
        mostrarToast = false
        " />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonToast
} from "@ionic/vue"

import AppHeader from "@/components/AppHeader.vue"
import RegisterForm from "@/components/RegisterForm.vue"

import {
  addUsuario,
  listUsuarios
} from "@/services/database"

const router = useRouter()

const mostrarToast = ref(false)
const mensagemToast = ref("")
const mensagem = ref("")

async function realizarCadastro(nome: string, email: string, senha: string) {
  mensagem.value = "";
  
  const { cadastrar } = useAuth();
  const resultado = await cadastrar(nome, email, senha);

  if (!resultado.sucesso) {
    mensagem.value = resultado.mensagem;
    mensagemToast.value = resultado.mensagem;
    mostrarToast.value = true;
    return;
  }

  mensagemToast.value = "Cadastro realizado com sucesso!";
  mostrarToast.value = true;

  setTimeout(() => {
    router.push("/login");
  }, 1500);
}

function voltarLogin() {
  router.push("/login")
}
</script>