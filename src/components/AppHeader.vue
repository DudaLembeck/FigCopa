<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        {{ titulo }}
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
defineProps<{
  titulo: string
}>()
</script>