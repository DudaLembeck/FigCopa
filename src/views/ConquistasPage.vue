<template>
  <ion-page>
    <AppHeader titulo="Minhas Conquistas" />

    <ion-content class="ion-padding">
      <div class="progress-section">
        <h3>Progresso Geral</h3>
        <ion-progress-bar :value="progressoGeral" color="primary"></ion-progress-bar>
        <p class="ion-text-center">{{ Math.round(progressoGeral * 100) }}% do álbum completo</p>
      </div>

      <ion-grid>
        <ion-row>
          <ion-col v-for="conquista in conquistas" :key="conquista.id" size="12" size-md="6">
            <ion-card :class="{'conquista-bloqueada': !conquista.desbloqueada, 'conquista-desbloqueada': conquista.desbloqueada}">
              <ion-card-header>
                <div class="header-flex">
                  <ion-icon :icon="getIcon(conquista.icone)" :color="conquista.desbloqueada ? 'warning' : 'medium'" class="conquista-icon"></ion-icon>
                  <div>
                    <ion-card-title>{{ conquista.nome }}</ion-card-title>
                    <ion-badge :color="conquista.desbloqueada ? 'success' : 'medium'">
                      {{ conquista.desbloqueada ? 'Desbloqueada' : 'Bloqueada' }}
                    </ion-badge>
                  </div>
                </div>
              </ion-card-header>

              <ion-card-content>
                <p>{{ conquista.descricao }}</p>
                <p v-if="conquista.desbloqueada" class="data-desbloqueio">
                  Desbloqueada em: {{ conquista.data_desbloqueio }}
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonIcon,
  IonBadge, IonProgressBar
} from '@ionic/vue';
import * as icons from 'ionicons/icons';
import AppHeader from '@/components/AppHeader.vue';
import { listConquistasUsuario, listJogadores } from '@/services/database';
import { usuarioLogado } from '@/composables/useAuth';

const conquistas = ref<any[]>([]);
const progressoGeral = ref(0);

async function carregarDados() {
  if (!usuarioLogado.value) return;

  // Carrega conquistas
  conquistas.value = await listConquistasUsuario(usuarioLogado.value.id);

  // Calcula progresso para a barra
  const jogadores = await listJogadores(usuarioLogado.value.id);
  const total = jogadores.length;
  const coletadas = jogadores.filter(j => j.coletada === 1).length;
  progressoGeral.value = total > 0 ? coletadas / total : 0;
}

function getIcon(name: string) {
  return (icons as any)[name.replace(/-([a-z])/g, (g: any) => g[1].toUpperCase())] || icons.trophyOutline;
}

onMounted(() => {
  carregarDados();
});
</script>

<style scoped>
.progress-section {
  margin-bottom: 24px;
  padding: 16px;
  background: var(--ion-color-light);
  border-radius: 12px;
}

.header-flex {
  display: flex;
  align-items: center;
  gap: 16px;
}

.conquista-icon {
  font-size: 48px;
}

.conquista-bloqueada {
  opacity: 0.6;
  filter: grayscale(100%);
}

.conquista-desbloqueada {
  border: 2px solid var(--ion-color-warning);
  box-shadow: 0 4px 15px rgba(255, 196, 9, 0.2);
}

.data-desbloqueio {
  margin-top: 8px;
  font-size: 0.8em;
  font-style: italic;
  color: var(--ion-color-success);
}

h3 {
  margin-top: 0;
  font-weight: bold;
}
</style>
