<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  protectora: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <v-card class="protectora-card" max-width="500">
    <v-img class="protectora-card__image" :src="protectora.imagen_Protectora" cover></v-img>
    <v-card-title class="protectora-card__title">{{ protectora.nombre_Protectora }}</v-card-title>
    <v-card-subtitle class="protectora-card__subtitle">
      <strong>Dirección:</strong> {{ protectora.direccion }}
    </v-card-subtitle>
    <v-card-text class="protectora-card__content">
      <div class="protectora-card__email"><strong>Correo Electrónico:</strong> <br> {{ protectora.email }}</div>
      <div class="protectora-card__schedule">
        <strong>Página Web:</strong>
        <a :href="protectora.pagina_Web" target="_blank" rel="noopener noreferrer">
          {{ protectora.nombre_Protectora }}
        </a>
      </div>
    </v-card-text>
  </v-card>
</template>

  

<style scoped lang="scss">
.v-img__img--cover {
  object-fit: cover;
  max-height: 260px;
}

.protectora-card__image{
  max-height: 260px;
  min-height: 260px;
}
</style>