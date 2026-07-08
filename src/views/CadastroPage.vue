<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cadastro</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cadastro</ion-title>
        </ion-toolbar>
      </ion-header>
      <CadastroForm />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import CadastroForm from '@/components/CadastroForm.vue';

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