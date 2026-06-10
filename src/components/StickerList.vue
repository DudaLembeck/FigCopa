<template>

<StickerCard
v-for="figura in figuras"
:key="figura.id"
:figura="figura"
@alterar="alterarStatus"
/>

</template>

<script setup lang="ts">

import StickerCard from './StickerCard.vue'

defineProps({
    figuras:Array
})

defineProps(['alterarStatus'])

</script>