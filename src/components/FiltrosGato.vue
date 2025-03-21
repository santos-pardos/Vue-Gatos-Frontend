<script setup lang="ts">
import { ref, watch } from 'vue'

// Definir el rango de edad
const edadMin = ref(1)
const edadMax = ref(15)
const rangoEdad = ref([1, 15])

// Sincronizar rangoEdad con edadMin y edadMax
watch(rangoEdad, (newVal) => {
  edadMin.value = newVal[0]
  edadMax.value = newVal[1]
})

// Definir las razas disponibles
const razasDisponibles = [
  'Pardo',
  'Gris', 
  'Tuxedo',
  'Blanco',
  'Naranja y negro',
  'Blanco y pardo',
  'Negro',
  'Siames'
]

// Estados para los filtros seleccionados
const razaSeleccionada = ref('')
const mostrarTodos = ref(true)

// Estados para los paneles expandibles
const panelEdad = ref(false)
const panelRaza = ref(false)

// Emitir eventos para el componente padre
const emit = defineEmits(['actualizar-filtros'])

// Función para aplicar filtros
const aplicarFiltros = () => {
  emit('actualizar-filtros', {
    edadMin: edadMin.value,
    edadMax: edadMax.value,
    razaSeleccionada: razaSeleccionada.value
  })
}

// Observar cambios en los filtros - Aplicar automáticamente cuando se selecciona "mostrar todos"
watch(mostrarTodos, (nuevoValor) => {
  if (nuevoValor === true) {
    razaSeleccionada.value = ''
    aplicarFiltros()
  }
})

// Función para mostrar todas las razas
const mostrarTodasRazas = () => {
  mostrarTodos.value = true
  razaSeleccionada.value = ''
  aplicarFiltros()
}
</script>

<template>
  <v-container fluid class="pa-0">
    <v-sheet rounded="lg" elevation="1" class="mb-4">
      <div class="filtros-title text-center py-2">¿Buscas algo concreto?</div>
      <v-divider></v-divider>
      
      <!-- Panel expandible para filtro por edad -->
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-title class="filtro-header">
            Filtrar por edad
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="px-0">
              <div class="d-flex align-center">
                <span class="mr-2 text-caption">{{ edadMin }} años</span>
                <v-range-slider
                  v-model="rangoEdad"
                  min="1"
                  max="15"
                  step="1"
                  color="#FF5500"
                  thumb-label="always"
                  density="compact"
                ></v-range-slider>
                <span class="ml-2 text-caption">{{ edadMax }} años</span>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      
      <v-divider></v-divider>
      
      <!-- Panel expandible para filtro por raza -->
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-title class="filtro-header">
            Filtrar por raza
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="px-0">
              <div class="filtro-label mt-1 mb-1">Raza del gato</div>
              <div class="d-flex align-center flex-wrap gap-2 ResponsiveBoton">
                <v-select
                  v-model="razaSeleccionada"
                  :items="razasDisponibles"
                  placeholder="Seleccionar raza"
                  clearable
                  variant="outlined"
                  density="compact"
                  class="flex-grow-1"
                  hide-details
                ></v-select>
                
                <v-btn
                  color="#FF5500"
                  size="small"
                  class="ml-2 white--text"
                  @click="mostrarTodasRazas"
                >
                  Mostrar todas las razas
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      
      <v-divider></v-divider>
      
      <!-- Botón para aplicar filtros -->
      <div class="px-2 py-2 text-center">
        <v-btn
          color="#FF5500"
          @click="aplicarFiltros"
          class="white--text"
          block
        >
          APLICAR FILTROS
        </v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="scss">
.filtros-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.pa-0 {
  z-index: -1;
}

.filtro-header {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
}

.filtro-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #424242;
}

/* Definir el color naranja personalizado */
.v-btn {
  &.naranja {
    background-color: $color-principal !important;
    color: $color-blanco !important;
    border: none !important;
  }
}

.v-slider {
  &.naranja {
    .v-slider-track__fill,
    .v-slider-thumb__surface {
      background-color: $color-principal !important;
      border-color: $color-principal !important;
    }
  }
}

/* Personalizar colores de los paneles de expansión */
.v-expansion-panel {
  :deep(.v-expansion-panel-title__overlay) {
    background-color: rgba(255, 85, 0, 0.05) !important;
  }

  :deep(.v-expansion-panel-title--active),
  :deep(.v-expansion-panel-title:hover) {
    color: $color-principal !important;
  }

  :deep(.v-expansion-panel-title__icon .v-icon) {
    color: $color-principal !important;
  }

  :deep(.v-expansion-panel) {
    box-shadow: none !important;
    background: transparent !important;
  }

  :deep(.v-expansion-panels) {
    box-shadow: none !important;
    background: transparent !important;
  }

  :deep(.v-sheet) {
    padding: 0 !important;
  }

  :deep(.v-expansion-panel-text__wrapper) {
    padding: 0 12px 16px 12px !important;
  }
}

/* Asegurar que los contenedores no tengan padding indeseado */
.v-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Estilos responsivos */
@media (max-width: 479px) {
  .filtros-title {
    font-size: 1rem;
  }
  
  .filtro-header {
    font-size: 0.85rem;
  }
  
  .filtro-label {
    font-size: 0.8125rem;
  }

  .ResponsiveBoton {
    gap: $espacio-mediano;
  }
}
</style>