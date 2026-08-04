<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/Login" />
                </ion-buttons>
                <ion-title>Recuperar Senha</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content color="light" class="ion-padding">
            <div class="reset-container">
                
                <div class="header-sessao">
                    <h2>Recuperar Senha</h2>
                    <p>Digite seu e-mail para receber um link de recuperação.</p>
                </div>

                <form class="formulario" @submit.prevent>
                    <ion-item lines="none" class="input-item">
                        <ion-input 
                            label="E-mail" 
                            label-placement="floating" 
                            type="email"
                            placeholder="seu@email.com"
                            v-model="CampoEmail"
                            class="custom-input"
                        ></ion-input>
                    </ion-item>

                    <div v-if="mensagemErro" class="mensagem-erro">
                        {{ mensagemErro }}
                    </div>

                    <div v-if="mensagemSucesso" class="mensagem-sucesso">
                        {{ mensagemSucesso }}
                    </div>

                    <ion-button expand="block" shape="round" class="botao-enviar" @click="enviarRecuperacao">
                        Enviar Link de Recuperação
                    </ion-button>

                    <ion-button 
                        expand="block" 
                        fill="clear" 
                        router-link="/Login"
                        class="botao-voltar"
                    >
                        Voltar ao Login
                    </ion-button>
                </form>

            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { recuperarSenha } from '@/composables/useUsers';
import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonInput, 
    IonButton,
    IonButtons,
    IonBackButton
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const CampoEmail = ref('')
const mensagemErro = ref('')
const mensagemSucesso = ref('')

function enviarRecuperacao(){
    mensagemErro.value = ''
    mensagemSucesso.value = ''
    
    const resultado = recuperarSenha(CampoEmail.value)
    
    if (resultado.sucesso) {
        mensagemSucesso.value = resultado.mensagem
        CampoEmail.value = ''
        setTimeout(() => {
            router.push('/Login')
        }, 2000)
    } else {
        mensagemErro.value = resultado.mensagem
    }
}
</script>

<style scoped>
.reset-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 32px 8px;
}

.header-sessao h2 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #000000;
    margin-bottom: 8px;
}

.header-sessao p {
    font-size: 1.1rem;
    color: #444444;
    margin-bottom: 40px;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.input-item {
    --background: #ffffff;
    --color: #000000;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 4px;
}

.custom-input {
    color: #000000 !important;
    --color: #000000 !important;
    --placeholder-color: #666666;
}

.botao-enviar {
    height: 56px;
    font-weight: 700;
    --box-shadow: 0 8px 16px rgba(var(--ion-color-primary-rgb), 0.2);
}

.botao-voltar {
    margin-top: 8px;
    --color: var(--ion-color-primary);
}

.mensagem-erro {
    background-color: #ffebee;
    border: 1px solid #f44336;
    color: #c62828;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 12px;
}

.mensagem-sucesso {
    background-color: #e8f5e9;
    border: 1px solid #4caf50;
    color: #2e7d32;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 12px;
}
</style>
