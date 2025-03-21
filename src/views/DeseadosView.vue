<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usegatosStore } from '@/stores/gatos';
import { useAutenticacion } from '@/stores/Autentificacion';
import DeseadosGatoCard from '@/components/DeseadosGatoCard.vue';

// Obtener la store
const Autenticacion = useAutenticacion();
const gatosStore = usegatosStore();
const gatosDeseados = computed(() => gatosStore.gatosDeseados);

onMounted(async () => {
  await gatosStore.obtenerGatosDeseados();
  console.log('Gatos deseados al montar la vista:', gatosDeseados.value);
  Autenticacion.cargarUsuarioDesdeLocalStorage();
  
  if (Autenticacion.usuario) {
    gatosStore.obtenerGatosDeseados(Autenticacion.usuario.userId); // ✅ Ahora solo carga los gatos del usuario
  }
});
</script>

<template>
  <div class="deseados">
    <h1 class="deseados__titulo">Mis Gatos Deseados</h1>
    <p v-if="gatosDeseados.length === 0" class="deseados__mensaje">No tienes gatos en tu lista de deseados.</p>
    <div v-else class="deseados__lista">
      <DeseadosGatoCard v-for="gato in gatosDeseados" :key="gato.id_Gato" :gato="gato"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.deseados {
  max-width: 100%;
  margin: $espacio-grande auto;
  text-align: center;

  &__titulo {
    font-size: 2rem;
    margin-bottom: $espacio-grande;
    color:$color-principal;
  }

  &__lista {
    display: grid;
    grid-template-columns: 1fr;
    gap: $espacio-grande;
    justify-items: center;
  }

  .gato-card {
    width: 90%;
    max-width: 400px;
    height: 338px;
  }
}

@media (min-width: 600px) {
  .deseados__lista {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .deseados {
    max-width: 1200px;
    margin-top: 95px;
  }

  .deseados__lista {
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>
