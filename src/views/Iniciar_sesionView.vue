<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const contraseña = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isPasswordVisible = ref(false);

const handleLogin = async () => {
  try {
    const response = await fetch('https://localhost:7278/api/Usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        contraseña: contraseña.value
      })
    });

    const data = await response.json();

    if (!response.ok || !data) {
      throw new Error(data?.message || 'Correo electrónico o contraseña incorrectos');
    }

    localStorage.setItem('user', JSON.stringify(data));

    successMessage.value = 'Inicio de sesión exitoso. Redirigiendo...';
    errorMessage.value = '';

    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Ha ocurrido un error inesperado';
    }
    successMessage.value = '';
  }
};

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <div class="login-form">
    <h2 class="login-form__title">Iniciar sesión</h2>
    <form @submit.prevent="handleLogin" class="login-form__form">
      <div class="login-form__field">
        <label for="email" class="login-form__label">Correo electrónico</label>
        <input type="email" v-model="email" id="email" class="login-form__input" required />
      </div>
      <div class="login-form__field">
        <label for="password" class="login-form__label">Contraseña</label>
        <div class="login-form__password-wrapper">
          <input :type="isPasswordVisible ? 'text' : 'password'" v-model="contraseña" id="password"
            class="login-form__input" required />
          <button type="button" @click="togglePasswordVisibility" class="login-form__eye-icon">
            <span v-if="isPasswordVisible">👁️</span>
            <span v-else>👁️‍🗨️</span>
          </button>
        </div>
      </div>
      <button type="submit" class="login-form__button login-form__button--primary">Entrar</button>
    </form>
    <div v-if="errorMessage" class="login-form__error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="login-form__success-message">{{ successMessage }}</div>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  max-width: 400px;
  margin: $espacio-grande auto;
  margin-top: 70px;
  margin-bottom: 50px;
  padding: 1rem;
  border: $border-gris1;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: $sombra-contenedor;

  &__title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  &__field {
    margin-bottom: 1.5rem;
  }

  &__label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__input {
    width: 100%;
    padding: 0.75rem;
    border: $border-gris2;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  &__button {
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

  &__error-message {
    color: $color-rojo;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  &__success-message {
    color: green;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  &__password-wrapper {
    position: relative;

    .login-form__input {
      width: 100%;
      padding-right: 40px;
    }

    .login-form__eye-icon {
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
}

@media (prefers-color-scheme: dark) {
  .login-form__title {
    color: black;
  }

  .login-form__label {
    color: black;
  }
}

@media (width <= 400px) {
  .login-form {
    margin-left: 15px;
    margin-right: 15px;
  }
}

</style>
