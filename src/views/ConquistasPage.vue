<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Conquistas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Conquistas</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card class="resumo-card">
        <ion-card-content>
          <div class="resumo-linha">
            <span>{{ desbloqueadas.length }} de {{ conquistas.length }} desbloqueadas</span>
            <span>{{ progressoGeral }}%</span>
          </div>
          <ion-progress-bar :value="progressoGeral / 100" color="tertiary"></ion-progress-bar>
        </ion-card-content>
      </ion-card>

      <div v-for="grupo in grupos" :key="grupo.categoria" class="grupo">
        <h2 class="grupo-titulo">{{ grupo.titulo }}</h2>

        <ion-grid>
          <ion-row>
            <ion-col
              size-xs="12"
              size-sm="6"
              size-md="4"
              v-for="conquista in grupo.itens"
              :key="conquista.id"
            >
              <ion-card :class="['badge-card', { desbloqueada: conquista.desbloqueada === 1 }]">
                <ion-card-content>
                  <div class="badge-icone">
                    <ion-icon
                      :icon="conquista.desbloqueada === 1 ? getIcon(conquista.icone) : lockClosed"
                      :color="conquista.desbloqueada === 1 ? 'tertiary' : 'medium'"
                    ></ion-icon>
                  </div>

                  <ion-card-title class="badge-titulo">{{ conquista.titulo }}</ion-card-title>
                  <p class="badge-descricao">{{ conquista.descricao }}</p>

                  <ion-badge v-if="conquista.desbloqueada === 1" color="success">
                    Desbloqueada
                  </ion-badge>
                  <ion-badge v-else color="medium">
                    {{ conquista.valorAtual }} / {{ conquista.meta }}
                  </ion-badge>

                  <ion-progress-bar
                    class="badge-progresso"
                    :value="Math.min(conquista.valorAtual / conquista.meta, 1)"
                    :color="conquista.desbloqueada === 1 ? 'success' : 'medium'"
                  ></ion-progress-bar>

                  <p v-if="conquista.desbloqueada_em" class="badge-data">
                    Desbloqueada em {{ new Date(conquista.desbloqueada_em).toLocaleDateString() }}
                  </p>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
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
  IonCardContent,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonBadge,
  IonProgressBar
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import {
  ribbon,
  albums,
  fileTrayFull,
  trophy,
  diamond,
  sparkles,
  pieChart,
  checkmarkDone,
  lockClosed
} from 'ionicons/icons';
import { listarConquistas, recalcularConquistas, Conquista } from '@/services/database';

const conquistas = ref<Conquista[]>([]);

const iconMap: Record<string, any> = {
  ribbon,
  albums,
  'file-tray-full': fileTrayFull,
  trophy,
  diamond,
  sparkles,
  'pie-chart': pieChart,
  'checkmark-done': checkmarkDone
};

function getIcon(nome: string) {
  return iconMap[nome] ?? ribbon;
}

const desbloqueadas = computed(() => conquistas.value.filter(c => c.desbloqueada === 1));

const progressoGeral = computed(() => {
  if (conquistas.value.length === 0) return 0;
  return Math.round((desbloqueadas.value.length / conquistas.value.length) * 100);
});

const categoriasInfo: Record<string, string> = {
  total: 'Figurinhas Coletadas',
  raras: 'Figurinhas Raras',
  brilhantes: 'Figurinhas Brilhantes',
  percentual: 'Progresso do Álbum',
  colecao: 'Coleções Específicas'
};

const grupos = computed(() => {
  const ordem = ['total', 'raras', 'brilhantes', 'percentual', 'colecao'];
  return ordem
    .map(categoria => ({
      categoria,
      titulo: categoriasInfo[categoria],
      itens: conquistas.value.filter(c => c.categoria === categoria)
    }))
    .filter(grupo => grupo.itens.length > 0);
});

onMounted(async () => {
  await recalcularConquistas();
  conquistas.value = await listarConquistas();
});
</script>

<style scoped>
.resumo-card {
  margin: 0 0 16px 0;
}

.resumo-linha {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
}

.grupo {
  margin-bottom: 24px;
}

.grupo-titulo {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 4px 8px 4px;
}

.badge-card {
  height: 100%;
  text-align: center;
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.badge-card.desbloqueada {
  opacity: 1;
}

.badge-icone {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.badge-titulo {
  font-size: 1rem;
  margin-bottom: 4px;
}

.badge-descricao {
  font-size: 0.85rem;
  color: var(--ion-color-medium);
  min-height: 36px;
}

.badge-progresso {
  margin-top: 10px;
}

.badge-data {
  font-size: 0.75rem;
  color: var(--ion-color-medium);
  margin-top: 6px;
  margin-bottom: 0;
}
</style>
