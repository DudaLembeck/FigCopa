
<template>
  <ion-page>
    <ion-header><ion-toolbar><ion-title>Login</ion-title></ion-toolbar></ion-header>
    <ion-content class="ion-padding">
        <h2>Login</h2>
      <ion-item class="custom-input" >
        <ion-input 
        label="E-mail"
        label-placement="floating" 
        v-model="email"
        ></ion-input>
      </ion-item>
      <ion-item class="custom-input" >
        <ion-input 
        type="password" 
        label="Senha"
        label-placement="floating" 
        v-model="senha"
        ></ion-input>
      </ion-item>
      
      <ion-button expand="block" @click="entrar()">Entrar</ion-button>
        <h4>Não possui uma conta?</h4>
        <RouterLink to="/cadastro">Cadastrar-se</RouterLink><br><br>
         <RouterLink to="/recuperar">Recuperar Senha</RouterLink>
     
    </ion-content>
   
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/vue'
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();


const email = ref('');
const senha = ref('');

function entrar() {
  if (email.value === '' || senha.value === '') {
    alert('Preencha todos os campos!');
    return;
  }

  localStorage.setItem('logado', 'true');
  router.push('/tabs/tab1');
}
</script>


<style scoped>

.custom-input {
  margin-bottom: 18px;
  --border-radius: 8px;
  --highlight-color-focused: #3880ff; 
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #ffffff;
  font-weight: 600;
}

h4 {
  color: #d8d8d8;
  font-size: 15px;
  margin-top: 2;
  margin-bottom: 0;
}


</style>
