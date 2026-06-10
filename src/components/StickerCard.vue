<template>

<ion-card>

    <ion-card-header>

        <ion-card-title>
            {{ figura.jogador }}
        </ion-card-title>

        <ion-card-subtitle>
            {{ figura.posicao }}
        </ion-card-subtitle>

    </ion-card-header>

    <ion-card-content>

        <ion-img :src="figura.img"></ion-img>

        <ion-label>

            Status:
            {{ figura.status ? 'Coletada' : 'Pendente'}}

        </ion-label>

        <ion-button
        expand="block"
        @click="$emit('alterar',figura.id)"
        >

            Alterar Status

        </ion-button>

    </ion-card-content>

</ion-card>

</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonInput, IonButtons, IonBackButton, IonButton, IonToolbar, IonHeader } from '@ionic/vue';

defineProps({
    figura:Object
})

defineEmits(['alterar'])

</script>