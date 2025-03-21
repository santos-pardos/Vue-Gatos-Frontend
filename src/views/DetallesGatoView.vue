<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import DetallesGatoCard from "@/components/DetallesGatoCard.vue";
import { usegatosStore } from "@/stores/gatos";
import { useprotectorasStore } from "@/stores/protectoras";

const route = useRoute();
const gatosStore = usegatosStore();
const protectorasStore = useprotectorasStore();

const gato = ref();
const protectora = ref();
const cargando = ref(true);

const obtenerGato = async () => {
  const id = Number(route.params.id);

  if (gatosStore.gatos.length === 0) {
    await gatosStore.fetchGato();
  }

  gato.value = gatosStore.gatos.find((g) => g.id_Gato === id);

  if (gato.value) {
    if (protectorasStore.protectoras.length === 0) {
      await protectorasStore.fetchProtectora();
    }
    protectora.value = protectorasStore.protectoras.find(
      (p) => p.id_Protectora === gato.value.id_Protectora
    );
  }

  cargando.value = false;
};

onMounted(() => {
  obtenerGato();
});

watch(() => route.params.id, obtenerGato);
</script>

<template>
  <v-container>
    <h1 v-if="gato" class="titulo-detalles">Soy {{ gato.nombre_Gato }} ¡Conóceme! 🐾</h1>
    <v-row justify="center">
      <v-col cols="11" md="9" class="ContainerDetallesGatos">
        <DetallesGatoCard v-if="gato" :gato="gato" :protectora="protectora" />
        <v-alert v-else-if="cargando" type="info">Cargando...</v-alert>
        <v-alert v-else type="error">No se encontró el gato.</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.ContainerDetallesGatos {
  display: flex;
  justify-content: center;
  padding: 0;
}

.titulo-detalles {
  margin-bottom: 20px;
  text-align: center;
  color: $color-principal;
}

.v-col-12 {
  flex: 0 0 125%;
  max-width: 125%;
}

@media (min-width: 1010px) {
  .v-container {
    margin-top: 105px;
  }
}
</style>
