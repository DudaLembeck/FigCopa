<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="primary">
                <ion-title>Início</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content color="light" class="ion-padding">
            <div class="home-container">
                <div class="welcome-section">
                    <h1>Olá! 👋</h1>
                    <p>Como você quer começar hoje?</p>
                </div>

                <div class="actions-section">
                    <ion-button 
                        router-link="/tabs/tarefas" 
                        expand="block" 
                        shape="round" 
                        class="main-button"
                    >
                        Ver Minha Lista
                    </ion-button>

                    <ion-button 
                        router-link="/Login" 
                        expand="block" 
                        fill="outline" 
                        shape="round" 
                        class="secondary-button"
                    >
                        Login
                    </ion-button>

                    <ion-button 
                        router-link="/Cadastro" 
                        fill="clear" 
                        size="small"
                        class="link-button"
                    >
                        Não tem conta? Cadastre-se
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
</script>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    max-width: 450px;
    margin: 0 auto;
    padding: 20px;
}

.welcome-section {
    text-align: center;
    margin-bottom: 50px;
}

.welcome-section h1 {
    font-size: 3rem;
    font-weight: 800;
    color: var(--ion-color-dark);
}

.actions-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.main-button {
    height: 56px;
    font-weight: 700;
}

.secondary-button {
    height: 56px;
    font-weight: 600;
}

.link-button {
    --color: var(--ion-color-medium);
    margin-top: 8px;
}
</style>

