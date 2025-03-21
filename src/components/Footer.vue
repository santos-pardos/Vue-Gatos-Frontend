<script setup lang="ts">

</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Contacto -->
      <div class="footer__section">
        <b>📞 Teléfono: 123456789</b>
        <b style="width: 230px;">✉️ <a href="mailto:reto@retocsv.es" class="footer-link">reto@retocsv.es</a></b>
      </div>

      <!-- Información General -->
      <div class="footer__section">
        <p>
          Esta plataforma reúne a todas las protectoras de Zaragoza para facilitar la adopción responsable de animales.
        </p>
      </div>

      <!-- Enlaces -->
      <div class="footer__section">
        <v-btn to="/faq" variant="text">❓ <b>Preguntas Frecuentes</b></v-btn>
      </div>
    </div>

    <div class="footer__credits">
      <p>Desarrollado con ❤️ </p>
      <p>© {{ new Date().getFullYear() }} Adopciones Zaragoza - Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  padding: $espacio-mediano 0; /* Se reduce la altura */
  text-align: center;

  .footer__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: $espacio-pequeno;

    .footer__section {
      width: 100%;
      padding: $espacio-pequeno 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .footer__credits {
      font-size: 12px;
      opacity: 0.8;
      margin-top: $espacio-pequeno;
    }
  }

  .footer-link {
    text-decoration: none;
    color: #f7a277;
    font-weight: bold;

    &:hover {
      color: #fb7c3c;
    }
  }

  /* Estilos para pantallas más grandes */
  @media (min-width: 768px) {
    .footer__container {
      flex-direction: row;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer__section {
      width: auto;
      text-align: left;
      padding: 0 15px;
    }

    .footer__credits {
      text-align: center;
    }
  }
}

</style>
