<template>
  <ion-card class="auth-card">
    <ion-card-header>
      <ion-card-title>Criar Conta</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <div class="form-group">
        <ion-input
          label="Nome completo"
          label-placement="floating"
          v-model="nome"
        />
      </div>

      <div class="form-group">
        <ion-input
          label="E-mail"
          label-placement="floating"
          type="email"
          v-model="email"
        />
      </div>

      <div class="form-group">
        <ion-input
          label="Senha"
          label-placement="floating"
          type="password"
          v-model="senha"
        />
      </div>

      <ion-button expand="block" class="ion-margin-top" @click="fazerCadastro">
        Cadastrar
      </ion-button>

      <ion-text color="danger" v-if="erro" class="form-error">
        <p>{{ erro }}</p>
      </ion-text>

      <ion-text color="success" v-if="sucesso" class="form-success">
        <p>{{ sucesso }}</p>
      </ion-text>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonText
} from "@ionic/vue"

import { useAuth } from "@/composables/useAuth"

const router = useRouter()

const { cadastrar } = useAuth()

const nome = ref("")
const email = ref("")
const senha = ref("")

const erro = ref("")
const sucesso = ref("")

async function fazerCadastro() {

  erro.value = ""
  sucesso.value = ""

  if (
    !nome.value ||
    !email.value ||
    !senha.value
  ) {
    erro.value = "Preencha todos os campos."
    return
  }

  const resultado = await cadastrar(
    nome.value,
    email.value.trim().toLocaleLowerCase(),
    senha.value
  )

  if (!resultado.sucesso) {
    erro.value = resultado.mensagem
    return
  }

  sucesso.value = resultado.mensagem

  nome.value = ""
  email.value = ""
  senha.value = ""

  setTimeout(() => {
    router.push("/login")
  }, 1000)
}
</script>