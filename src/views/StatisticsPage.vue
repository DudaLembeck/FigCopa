<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Estatísticas do Álbum</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Estatísticas</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Visão Geral</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>Total de Figurinhas Cadastradas:</ion-label>
            <ion-badge color="primary">{{ statistics.totalFigurinhas }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Total de Figurinhas Coletadas:</ion-label>
            <ion-badge color="success">{{ statistics.figurinhasColetadas }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Total de Figurinhas Faltantes:</ion-label>
            <ion-badge color="danger">{{ statistics.figurinhasFaltantes }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Figurinhas Raras Coletadas:</ion-label>
            <ion-badge color="warning">{{ statistics.figurinhasRarasColetadas }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Figurinhas Brilhantes Coletadas:</ion-label>
            <ion-badge color="tertiary">{{ statistics.figurinhasBrilhantesColetadas }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Percentual de Conclusão:</ion-label>
            <ion-badge color="secondary">{{ statistics.percentualConclusao.toFixed(2) }}%</ion-badge>
          </ion-item>
          <ion-progress-bar :value="statistics.percentualConclusao / 100"></ion-progress-bar>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Ranking do Colecionador</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>Pontuação Total:</ion-label>
            <ion-badge color="dark">{{ rankingScore }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Nível Atual:</ion-label>
            <ion-badge :color="levelColor">{{ collectorLevel }}</ion-badge>
          </ion-item>
          <ion-progress-bar :value="progressToNextLevel"></ion-progress-bar>
          <ion-label class="ion-padding-top">Próximo nível: {{ nextLevelText }}</ion-label>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonProgressBar
} from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { getStatistics, getRankingScore } from '@/services/database';

interface Statistics {
  totalFigurinhas: number;
  figurinhasColetadas: number;
  figurinhasFaltantes: number;
  figurinhasRarasColetadas: number;
  figurinhasBrilhantesColetadas: number;
  percentualConclusao: number;
}

const statistics = ref<Statistics>({
  totalFigurinhas: 0,
  figurinhasColetadas: 0,
  figurinhasFaltantes: 0,
  figurinhasRarasColetadas: 0,
  figurinhasBrilhantesColetadas: 0,
  percentualConclusao: 0
});

const rankingScore = ref(0);

const collectorLevel = computed(() => {
  if (rankingScore.value <= 100) return 'Bronze';
  if (rankingScore.value <= 250) return 'Prata';
  if (rankingScore.value <= 500) return 'Ouro';
  return 'Diamante';
});

const levelColor = computed(() => {
  if (collectorLevel.value === 'Bronze') return 'brown';
  if (collectorLevel.value === 'Prata') return 'medium';
  if (collectorLevel.value === 'Ouro') return 'warning';
  return 'primary';
});

const progressToNextLevel = computed(() => {
  let currentLevelMax = 0;
  let nextLevelMin = 0;

  if (collectorLevel.value === 'Bronze') {
    currentLevelMax = 100;
    nextLevelMin = 101;
  } else if (collectorLevel.value === 'Prata') {
    currentLevelMax = 250;
    nextLevelMin = 251;
  } else if (collectorLevel.value === 'Ouro') {
    currentLevelMax = 500;
    nextLevelMin = 501;
  } else {
    return 1; // Already Diamond
  }

  if (rankingScore.value >= currentLevelMax) return 1; // Should not happen if logic is correct

  const progress = (rankingScore.value - (nextLevelMin - 100)) / (currentLevelMax - (nextLevelMin - 100));
  return progress > 0 ? progress : 0;
});

const nextLevelText = computed(() => {
  if (collectorLevel.value === 'Bronze') return `Prata (${101 - rankingScore.value} pontos para o próximo nível)`;
  if (collectorLevel.value === 'Prata') return `Ouro (${251 - rankingScore.value} pontos para o próximo nível)`;
  if (collectorLevel.value === 'Ouro') return `Diamante (${501 - rankingScore.value} pontos para o próximo nível)`;
  return 'Nível Máximo Atingido!';
});

onMounted(async () => {
  statistics.value = await getStatistics();
  rankingScore.value = await getRankingScore();
});
</script>

<style scoped>
ion-card {
  margin: 20px;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

ion-badge {
  min-width: 40px;
  text-align: center;
}
</style>
