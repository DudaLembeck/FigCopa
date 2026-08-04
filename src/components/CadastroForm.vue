<template>
  <ion-list>
    <ion-item>
      <ion-label>Cadastro</ion-label>
    </ion-item>

    <ion-item>
      <ion-label position="stacked">Nome</ion-label>
      <ion-input v-model="form.nome" required />
    </ion-item>
    <ion-note color="danger" v-if="errors.nome">{{ errors.nome }}</ion-note>

    <ion-item>
      <ion-label position="stacked">Email</ion-label>
      <ion-input type="email" v-model="form.email" required />
    </ion-item>
    <ion-note color="danger" v-if="errors.email">{{ errors.email }}</ion-note>

    <ion-item>
      <ion-label position="stacked">Senha</ion-label>
      <ion-input type="password" v-model="form.senha" />
    </ion-item>
        <ion-note color="danger" v-if="errors.senha">{{ errors.senha }}</ion-note>

    <ion-button expand="block" type="button" @click="salvarUsuario">Salvar</ion-button>

    <ion-toast :is-open="toast.show" :message="toast.message" duration="2000" @ionDismiss="toast.show = false" />
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonNote, IonButton, IonToast } from '@ionic/vue'
import { reactive } from 'vue'
import { addUsuario } from '@/services/database'

const form = reactive({
  nome: '',
  email: '',
  senha: ''
})

const toast = reactive({
  show: false,
  message: ''
})

const errors = reactive({
  nome: '',
  email: '',
  senha: ''
})

function clearErrors() {
  errors.nome = ''
  errors.email = ''
  errors.senha = ''
}

async function salvarUsuario() {
  clearErrors()


  if (!form.nome || !form.email || !form.senha) {
    if (!form.nome) {
      errors.nome = 'Nome é obrigatório.'
    }

    if (!form.email) {
      errors.email = 'Email é obrigatório.'
    } 

    
    if (!form.senha) {
      errors.senha = 'Senha é obrigatória.'
    } 

    toast.show = true
    toast.message = 'Preencha os campos obrigatórios.'
    return
  } 

  await addUsuario(form.nome, form.email, form.senha)

  form.nome = ''
  form.email = ''
  form.senha = ''
  toast.show = true
  toast.message = 'Login salvo com sucesso.'
  window.dispatchEvent(new CustomEvent('login-salvo'))
}
</script>