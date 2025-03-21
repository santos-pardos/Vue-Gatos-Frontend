<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <Header />

  <RouterView />

  <Footer />
</template>

<style scoped lang="scss">

.v-container {
  font-family: $fuente-textos;
}

@media (min-width: 1010px) {

  .v-container {
    margin-top: 105px;
  }
  
}
</style> 