<script setup lang="ts">
import { defineProps } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  gato: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <v-card class="gato-card" max-width="344">
    <v-card @click="$router.push(`/detalles-gato/${gato.id_Gato}`)">
      <v-img class="gato-card__imagen" :src="gato.imagen_Gato" height="200px"></v-img>
      <v-card-title>{{ gato.nombre_Gato }}</v-card-title>
      <v-card-subtitle>{{ gato.raza }}</v-card-subtitle>
      <v-card-text>
        <div><strong>Sexo:</strong> {{ gato.sexo }}</div>
        <div><strong>Edad:</strong> {{ gato.edad }} años</div>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  font-family: $fuente-textos;
}

.gato-card__imagen {
  :deep(.v-img__img--contain) {
    object-fit: cover;
  }
}

.gato-card__mensaje {
  text-align: center;
  color: green;
  margin-top: $espacio-mediano;
}

</style>