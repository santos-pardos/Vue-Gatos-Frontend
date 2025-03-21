<template>
  <div class="faq-page-wrapper my-4">
    <v-container class="px-4">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="8">
          <v-sheet rounded="lg" elevation="1" class="pa-0 mb-4">
            <div class="faq-title text-center py-3">Preguntas Frecuentes (FAQ)</div>
            <v-divider></v-divider>
            
            <div class="px-2 py-1">
              <v-expansion-panels
                variant="accordion"
                multiple
                class="bg-transparent"
              >
                <v-expansion-panel
                  v-for="(categoria, i) in faq"
                  :key="i"
                  class="mb-1 rounded border-0 bg-transparent"
                  elevation="0"
                >
                  <v-expansion-panel-title class="py-1 px-2 rounded category-title" color="white">
                    {{ categoria.titulo }}
                  </v-expansion-panel-title>
                  
                  <v-expansion-panel-text class="px-2 pt-1 pb-2">
                    <div
                      v-for="(pregunta, j) in categoria.preguntas"
                      :key="j"
                      class="faq-item py-1"
                    >
                      <div class="faq-question mb-1">{{ pregunta.pregunta }}</div>
                      <div class="faq-answer">{{ pregunta.respuesta }}</div>
                      <v-divider v-if="j < categoria.preguntas.length - 1" class="my-1"></v-divider>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.faq-page-wrapper {
  background-color: transparent;
  padding-top: 0;

  @media (min-width: 1024px) {
    padding-top: 110px; /* Adjust this value based on your header height */
  }
}

.faq-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;

  @media (max-width: 479px) {
    font-size: 1.1rem;
  }
}

.category-title {
  font-size: 0.9rem !important;
  font-weight: 500 !important;
  background-color: $color-blanco !important;
  color: #333 !important;
  border: 1px solid #e0e0e0;

  @media (max-width: 479px) {
    font-size: 0.85rem !important;
  }
}

.faq-question {
  font-size: 0.875rem;
  font-weight: 600;
  color: #424242;
  line-height: 1.2;

  @media (max-width: 479px) {
    font-size: 0.8125rem;
  }
}

.faq-answer {
  font-size: 0.8125rem;
  color: #616161;
  line-height: 1.3;
  padding-left: 4px;
  padding-right: 4px;

  @media (max-width: 479px) {
    font-size: 0.75rem;
    padding-left: 2px;
    padding-right: 2px;
  }
}

@media (max-width: 479px) {
  :deep(.v-expansion-panel-title) {
    min-height: 36px !important;
    padding: 4px 8px !important;
  }

  :deep(.v-expansion-panel-text__wrapper) {
    padding: 0 8px 6px !important;
  }
}

/* Ensure expansion panels don't touch the edges and are $color-blanco */
:deep(.v-expansion-panel) {
  background-color: $color-blanco !important;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-expansion-panel-title__overlay) {
  background-color: rgba(255, 255, 255, 0.05) !important;
}

:deep(.v-expansion-panel--active) {
  margin: 0 !important;
}

:deep(.v-expansion-panels) {
  box-shadow: none !important;
}

:deep(.v-expansion-panel-title) {
  background-color: $color-blanco !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
}

:deep(.v-expansion-panel-text) {
  padding-left: 8px !important;
  padding-right: 8px !important;
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const faq = ref([
  {
    titulo: "Sobre la plataforma",
    preguntas: [
      { pregunta: "¿Qué es esta página?", respuesta: "Es una plataforma que reúne a todas las protectoras de Zaragoza para facilitar la adopción responsable de gatos." },
      { pregunta: "¿Cómo funciona la web?", respuesta: "Puedes ver los gatos en adopción, conocer más sobre ellos y contactar con la protectora responsable para iniciar el proceso de adopción." },
      { pregunta: "¿La web pertenece a una protectora específica?", respuesta: "No, la plataforma centraliza información de varias protectoras de Zaragoza para que sea más fácil encontrar gatos en adopción." },
    ],
  },
  {
    titulo: "Sobre el proceso de adopción",
    preguntas: [
      { pregunta: "¿Cómo puedo adoptar un gato?", respuesta: "Selecciona el gato que te interesa, contacta con la protectora correspondiente y sigue los pasos que ellos te indiquen." },
      { pregunta: "¿Cuánto cuesta adoptar un gato?", respuesta: "Depende de cada protectora. Algunas piden una donación para cubrir gastos veterinarios como vacunas, desparasitación y esterilización." },
      { pregunta: "¿Cuáles son los requisitos para adoptar?", respuesta: "Cada protectora tiene sus requisitos, pero generalmente incluyen ser mayor de edad, tener un entorno adecuado para el gato y comprometerse a su bienestar." },
      { pregunta: "¿Puedo adoptar si vivo fuera de Zaragoza?", respuesta: "Algunas protectoras permiten adopciones fuera de la ciudad, pero puede haber requisitos adicionales como una visita previa al hogar." },
      { pregunta: "¿Puedo adoptar si ya tengo otros animales?", respuesta: "Sí, pero la protectora evaluará si el gato es compatible con otros animales en el hogar." },
    ],
  },
  {
    titulo: "Sobre los gatos",
    preguntas: [
      { pregunta: "¿Los gatos están vacunados y esterilizados?", respuesta: "La mayoría de las protectoras entregan a los gatos vacunados, desparasitados y esterilizados (o con compromiso de esterilización si son muy jóvenes)." },
      { pregunta: "¿Puedo conocer al gato antes de adoptarlo?", respuesta: "Sí, la protectora te indicará cómo y dónde conocer al gato en persona." },
      { pregunta: "¿Qué pasa si el gato no se adapta a mi hogar?", respuesta: "Las protectoras suelen ofrecer asesoramiento y un periodo de adaptación. En caso extremo, podrían aceptar la devolución del gato para buscarle otra familia." },
      { pregunta: "¿Hay gatos sociables y otros más independientes?", respuesta: "Sí, cada gato tiene una personalidad única. Puedes preguntar a la protectora por el temperamento del gato antes de adoptarlo." },
    ],
  },
  {
    titulo: "Sobre la web y su uso",
    preguntas: [
      { pregunta: "¿Cómo puedo contactar con una protectora?", respuesta: "En la ficha de cada gato encontrarás un botón para contactar con la protectora correspondiente." },
      { pregunta: "¿Por qué algunos gatos desaparecen de la lista?", respuesta: "Porque han sido adoptados o ya no están disponibles." },
      { pregunta: "¿Puedo hacerme voluntario en una protectora?", respuesta: "Sí, muchas protectoras buscan voluntarios. Contacta directamente con ellas para más información." },
      { pregunta: "¿Puedo hacer una donación a la web o a las protectoras?", respuesta: "La web no gestiona donaciones, pero cada protectora puede aceptar ayuda económica o en especie (alimento, arena, etc.)." },
      { pregunta: "¿Cómo puedo reportar un problema en la web?", respuesta: "Si encuentras un error o tienes sugerencias, puedes enviarnos un email a info@adopcioneszaragoza.com." },
    ],
  },
]);
</script>