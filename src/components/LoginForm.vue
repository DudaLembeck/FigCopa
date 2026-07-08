<template>
  <ion-list>
    <ion-item>
      <ion-label>Cadastro</ion-label>
    </ion-item>

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

    <ion-button expand="block" type="button" @click="entrar">Entrar</ion-button>

    <ion-toast :is-open="toast.show" :message="toast.message" duration="2000" @ionDismiss="toast.show = false" />
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonNote, IonButton, IonToast } from '@ionic/vue'
import { reactive } from 'vue'
import { loginUsuario } from '@/services/database'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  senha: ''
})

const toast = reactive({
  show: false,
  message: ''
})

const errors = reactive({
  email: '',
  senha: ''
})



async function entrar() {
  if (!form.email || !form.senha) {
    alert('Preencha todos os campos!')
    return
  }

  const usuario = await loginUsuario(form.email, form.senha)

  if (!usuario) {
    alert('E-mail ou senha inválidos!')
    return
  }

  localStorage.setItem('logado', 'true')
  localStorage.setItem('usuario', JSON.stringify(usuario))

  router.push('/tabs/tab1')
}
</script>