<script setup lang="ts">
import { usegatosStore } from '@/stores/gatos'
import GatoCard from '@/components/GatoCard.vue'
import FiltrosGato from '@/components/FiltrosGato.vue'
import { computed, ref } from 'vue'

const store = usegatosStore()

store.fetchGato()

const edadMin = ref(1)
const edadMax = ref(15)
const razaSeleccionada = ref('')

// Función para actualizar los filtros desde el componente hijo
const actualizarFiltros = (filtros) => {
  edadMin.value = filtros.edadMin
  edadMax.value = filtros.edadMax
  razaSeleccionada.value = filtros.razaSeleccionada
}

// Gatos filtrados como propiedad computada
const gatosFiltrados = computed(() => {
  return store.gatos.filter(gato => {
    // Filtrar por edad
    const edadEnRango = gato.edad >= edadMin.value && gato.edad <= edadMax.value
    
    // Filtrar por raza (si hay una seleccionada)
    const razaCoincide = razaSeleccionada.value === '' || gato.raza === razaSeleccionada.value
    
    return edadEnRango && razaCoincide
  })
})
</script>

<template>
  <v-container fluid>
    <!-- Componente de filtros desplegable horizontal -->
    <v-row>
      <v-col cols="12">
        <FiltrosGato @actualizar-filtros="actualizarFiltros" />
      </v-col>
    </v-row>
    
    <!-- Contenido principal con los gatos filtrados -->
    <v-row class="justify-center">
      <!-- Mensaje si no hay gatos que coincidan con los filtros -->
      <v-col v-if="gatosFiltrados.length === 0" cols="12" class="NoFiltroContenedor">
        <v-alert
          text="Todavía no tenemos gatos que cumplan estas condiciones."
          class="NoFiltro"
        ></v-alert>
      </v-col>
      
      <!-- Mostrar los gatos filtrados -->
      <v-col v-for="gato in gatosFiltrados" :key="gato.id_Gato" cols="12" sm="6" md="4" lg="3">
        <GatoCard :gato="gato" style="object-fit: cover;"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.v-row + .v-row {
  margin-top: 8px;
}

.NoFiltroContenedor {
  display: flex;
  justify-content: center;
}

.NoFiltro {
  background-color: $color-principal;
  max-width: 500px;
  display: flex;
  justify-content: center;
  color:$color-blanco;
}

:deep(.v-btn.primary),
:deep(.v-alert.info) {
  background-color: $color-principal !important;
  border-color: $color-principal !important;
}

</style>