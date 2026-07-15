<script setup lang="ts">
import { IonCard, IonItem, IonLabel } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    id: Number,
    nome: String,
    descricao: String
})

const irParaDetalhe = () => {
  if (props.id) {
    router.push(`/tabs/tarefas/${props.id}`);
  }
};
</script>

<template>
    <ion-card class="tarefa-card" @click="irParaDetalhe">
        <ion-item lines="none">
            <ion-label>
                <h2 class="tarefa-titulo">{{ props.nome }}</h2>
                <p class="tarefa-descricao">{{ props.descricao }}</p>
            </ion-label>
        </ion-item>
    </ion-card>
</template>





<style scoped>
.tarefa-card {
    margin: 12px 16px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    background: var(--ion-item-background, #ffffff);
    cursor: pointer;
    transition: box-shadow 0.2s ease;
}

.tarefa-card:active {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.tarefa-titulo {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--ion-color-dark);
    margin-bottom: 4px;
}

.tarefa-descricao {
    font-size: 0.9rem;
    color: var(--ion-color-step-600, #666666);
    white-space: normal; /* Permite que o texto quebre linha se for grande */
}
</style>