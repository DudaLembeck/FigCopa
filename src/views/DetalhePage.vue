<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tarefas" />
        </ion-buttons>
        <ion-title>Detalhes da Tarefa</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light" class="ion-padding">
      <div v-if="tarefa" class="detalhe-container">
        <h1>{{ tarefa.nome }}</h1>
        <p class="descricao">{{ tarefa.descricao }}</p>
        
        <ion-button 
          expand="block" 
          color="danger" 
          @click="confirmarExclusao"
          class="excluir-btn"
        >
          Excluir Tarefa
        </ion-button>
      </div>
      <div v-else class="nao-encontrada">
        <p>Tarefa não encontrada</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton, alertController } from '@ionic/vue';
import { Tarefas } from '@/composables/useTarefas';

const route = useRoute();
const router = useRouter();

const id = computed(() => Number(route.params.id));

const tarefa = computed(() => {
  return Tarefas.value.find(t => t.id === id.value);
});

const confirmarExclusao = async () => {
  const alert = await alertController.create({
    header: 'Excluir tarefa?',
    message: 'Esta ação não pode ser desfeita.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Excluir',
        role: 'destructive',
        handler: () => {
          const index = Tarefas.value.findIndex(t => t.id === id.value);
          if (index > -1) {
            Tarefas.value.splice(index, 1);
          }
          router.back();
        }
      }
    ]
  });

  await alert.present();
};
</script>

<style scoped>
.detalhe-container {
  padding: 20px;
}

.detalhe-container h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--ion-color-dark);
  margin-bottom: 16px;
}

.descricao {
  font-size: 1.1rem;
  color: var(--ion-color-step-600);
  line-height: 1.6;
  margin-bottom: 32px;
}

.excluir-btn {
  margin-top: 20px;
}

.nao-encontrada {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--ion-color-medium);
}
</style>
