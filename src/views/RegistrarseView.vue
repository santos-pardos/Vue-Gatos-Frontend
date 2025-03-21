<script setup lang="ts">
import { ref } from 'vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

const nombre = ref('');
const apellido = ref('');
const email = ref('');
const contraseña = ref('');
const confirmarContraseña = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const handleRegister = async () => {
  if (!nombre.value || !apellido.value || !email.value || !contraseña.value || !confirmarContraseña.value) {
    errorMessage.value = 'Todos los campos son obligatorios';
    return;
  }

  if (contraseña.value !== confirmarContraseña.value) {
    errorMessage.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    const response = await fetch('https://localhost:7278/api/Usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        contraseña: contraseña.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar usuario');
    }

    successMessage.value = 'Registro exitoso. Redirigiendo...';
    errorMessage.value = '';

    setTimeout(() => {
      window.location.href = '/iniciar-sesion'; // Redirigir al login después de registrar
    }, 2000);

  } catch (error: any) {
    errorMessage.value = error.message;
    successMessage.value = '';
  }
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
  isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
};
</script>

<template>
  <div class="register-form">
    <h2 class="register-form__title">Registrarse</h2>
    <form @submit.prevent="handleRegister" class="register-form__form">
      <div class="register-form__field">
        <label for="nombre" class="register-form__label">Nombre</label>
        <input type="text" v-model="nombre" id="nombre" class="register-form__input" required />
      </div>
      <div class="register-form__field">
        <label for="nombre" class="register-form__label">Apellidos</label>
        <input type="text" v-model="apellido" id="nombre" class="register-form__input" required />
      </div>
      <div class="register-form__field">
        <label for="email" class="register-form__label">Correo electrónico</label>
        <input type="email" v-model="email" id="email" class="register-form__input" required />
      </div>
      <div class="register-form__field">
        <label for="password" class="register-form__label">Contraseña</label>
        <div class="register-form__password-wrapper">
          <input :type="isPasswordVisible ? 'text' : 'password'" v-model="contraseña" id="contraseña"
            class="register-form__input" required />
          <button type="button" @click="togglePasswordVisibility" class="register-form__eye-icon">
            <span v-if="isPasswordVisible">👁️</span>
            <span v-else>👁️‍🗨️</span>
          </button>
        </div>
        <div class="register-form__field">
          <label for="confirmar-password" class="register-form__label">Confirmar Contraseña</label>
          <div class="register-form__password-wrapper">
            <input :type="isConfirmPasswordVisible ? 'text' : 'password'" v-model="confirmarContraseña"
              id="confirmar-password" class="register-form__input" required />
            <button type="button" @click="toggleConfirmPasswordVisibility" class="register-form__eye-icon">
              <span v-if="isConfirmPasswordVisible">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>
        </div>
      </div>
      <button type="submit" class="register-form__button register-form__button--primary">Registrarse</button>
    </form>
    <div v-if="errorMessage" class="register-form__error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="register-form__success-message">{{ successMessage }}</div>
  </div>
</template>

<style lang="scss" scoped>
.register-form {
  max-width: 400px;
  margin: $espacio-grande auto;
  margin-top: 70px;
  margin-bottom: 50px;
  padding: 1rem;
  border: $border-gris1;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: $sombra-contenedor;

  .register-form__title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .register-form__field {
    margin-bottom: 1.5rem;
  }

  .register-form__label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .register-form__input {
    width: 100%;
    padding: 0.75rem;
    border: $border-gris2;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  .register-form__button {
    width: 100%;
    padding: 0.5rem;
    background-color: $color-principal;
    color: $color-blanco;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $color-principal-oscuro;
    }

    &--primary {
      background-color: $color-principal;

      &:hover {
        background-color: $color-principal-oscuro;
      }
    }
  }

  .register-form__error-message {
    color: $color-rojo;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  .register-form__success-message {
    color: green;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  .register-form__password-wrapper {
    position: relative;

    .register-form__input {
      width: 100%;
      padding-right: 40px;
    }
  }

  .register-form__eye-icon {
    position: absolute;
    right: $espacio-mediano;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #007bff;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .register-form__title {
    color: black;
  }

  .register-form__label {
    color: black;
  }
}

@media (width <= 400px) {
  .register-form {
    margin-left: 15px;
    margin-right: 15px;
  }
}

@media (min-width: 1024px) {
    .register-form {
     margin-top: 120px;
    }
  }

</style>
