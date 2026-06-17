
<template>
  <ion-page>
    <ion-header><ion-toolbar><ion-title>Login</ion-title></ion-toolbar></ion-header>
    <ion-content class="ion-padding">
        <h2>Recuperar Senha</h2>
      <ion-item class="custom-input" >
        <ion-input 
        label="E-mail"
        label-placement="floating" 
        v-model="email"
        ></ion-input>
      </ion-item>
      
      <ion-button expand="block" @click="enviar()">Enviar</ion-button>
     <ion-alert
        :is-open="mostrarPopup"
        header="E-mail enviado!"
        :buttons="[
            {
            text: 'OK',
            handler: () => {
                router.push('/login')
            }
            }
        ]"
        @didDismiss="mostrarPopup = false"
        />
     
    </ion-content>
   
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonAlert } from '@ionic/vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const email = ref('');
const mostrarPopup = ref(false);

function enviar() {
  if (email.value === '' ) {
    alert('Preencha o campo de E-mail!');
    return;
  }else {
         mostrarPopup.value = true;
  }


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
