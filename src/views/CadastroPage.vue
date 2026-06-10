<template>
  
  <ion-page>
    <ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button default-href="/login"></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
    <ion-content class="ion-padding label-container">
      <div class="login-container">
        <h2>Criar Conta</h2>
        
        <ion-item fill="outline" mode="md" class="custom-input" >
          <ion-input 
            label="Nome" 
            label-placement="floating" 
            type="text" 
            placeholder="Digite seu nome completo"
            v-model="CampoNome"
          ></ion-input>
        </ion-item>

        <ion-item fill="outline" mode="md" class="custom-input">
          <ion-input 
            label="E-mail" 
            label-placement="floating" 
            type="email" 
            placeholder="email@exemplo.com"
            v-model="CampoEmail"
          ></ion-input>
        </ion-item>

        <ion-item fill="outline" mode="md" class="custom-input">
          <ion-input 
            label="Senha" 
            label-placement="floating" 
            type="password" 
            placeholder="Digite sua senha"
            v-model="CampoSenha"
          ></ion-input>
        </ion-item>

        <ion-button expand="block" class="submit-btn" @click="Clicou">
          Enviar
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonInput, IonButtons, IonBackButton, IonButton, IonToolbar, IonHeader } from '@ionic/vue';
import { cadastrar } from '@/composables/useUsers';
import { ref } from 'vue';

const CampoNome = ref('');
const CampoSenha = ref('');
const CampoEmail = ref('');

function Clicou() {
  cadastrar(
    CampoNome.value,
    CampoSenha.value,
    CampoEmail.value
  );

  CampoNome.value = '';
  CampoSenha.value = '';
  CampoEmail.value = '';
}
</script>

<style scoped>
.label-container {
  display: flex;
  align-items: center;
  justify-content: center;
}


h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #ffffff;
  font-weight: 600;
}

/* Espaçamento entre os inputs */
.custom-input {
  margin-bottom: 18px;
  --border-radius: 8px;
  --highlight-color-focused: #3880ff; /* Cor da borda ao focar */
}

/* Estilização do botão */
.submit-btn {
  margin-top: 24px;
  --border-radius: 8px;
  font-weight: 500;
}
</style>