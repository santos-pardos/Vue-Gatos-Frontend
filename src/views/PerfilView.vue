<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAutenticacion } from '@/stores/Autentificacion';

const autenticacion = useAutenticacion();
const { usuario } = storeToRefs(autenticacion);
const router = useRouter();
const nuevaContraseña = ref('');
const repetirContraseña = ref('');
const mensaje = ref('');

onMounted(() => {
  autenticacion.cargarUsuarioDesdeLocalStorage();
  console.log("Usuario en el perfil:", usuario.value);
});

const cambiarContraseña = async () => {
  if (!nuevaContraseña.value || !repetirContraseña.value) {
    mensaje.value = 'Introduce y repite la nueva contraseña';
    return;
  }
  if (nuevaContraseña.value !== repetirContraseña.value) {
    mensaje.value = 'Las contraseñas no coinciden';
    return;
  }
  try {
    const response = await fetch(`https://localhost:7278/api/Usuario/${usuario.value?.userId}/cambiar-contraseña`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nuevaContraseña: nuevaContraseña.value
      })
    });

    if (!response.ok) throw new Error('Error al cambiar la contraseña');
    mensaje.value = 'Contraseña actualizada con éxito';
    nuevaContraseña.value = '';
    repetirContraseña.value = '';
  } catch (error) {
    mensaje.value = 'Error al cambiar la contraseña';
    console.error(error);
  }
};

const cerrarSesion = () => {
  autenticacion.cerrarSesion();
  router.push('/');
};
</script>

<template>
  <div class="perfil">
    <h1 class="perfil__titulo">Mi Perfil</h1>
    <p class="perfil__dato"><strong>Nombre:</strong> {{ usuario.nombre }}</p>
    <p class="perfil__dato"><strong>Apellido:</strong> {{ usuario.apellido }}</p>
    <p class="perfil__dato"><strong>Email:</strong> {{ usuario.email }}</p>

    <div class="perfil__cambiar-contrasena">
      <h2 class="perfil__subtitulo">Cambiar Contraseña</h2>
      <input class="perfil__input" v-model="nuevaContraseña" type="password" placeholder="Nueva contraseña" />
      <input class="perfil__input" v-model="repetirContraseña" type="password" placeholder="Repite la contraseña" />
      <button class="perfil__boton" @click="cambiarContraseña">Actualizar</button>
      <p class="perfil__mensaje" v-if="mensaje">{{ mensaje }}</p>
    </div>

    <button class="perfil__boton perfil__boton--rojo" @click="cerrarSesion">Cerrar Sesión</button>
  </div>
</template>

<style scoped lang="scss">
.perfil {
  width: 90%;
  max-width: 400px;
  margin: $espacio-grande auto;
  margin-top: 40px;
  padding: $espacio-grande;
  border: $border-gris1;
  border-radius: $espacio-mediano;
  background-color: #fff;
  box-shadow: 0 4px $espacio-mediano rgba(0, 0, 0, 0.1);

  &__titulo,
  &__subtitulo {
    text-align: center;
    margin-bottom: 15px;
    color: $color-principal;
  }

  &__dato {
    margin-bottom: $espacio-mediano;
  }

  &__cambiar-contrasena {
    margin-top: $espacio-grande;
    text-align: center;
  }

  &__input {
    width: 100%;
    padding: $espacio-mediano;
    margin-top: $espacio-mediano;
    border: $border-gris2;
    border-radius: 6px;
  }

  &__boton {
    width: 100%;
    padding: $espacio-mediano;
    margin-top: $espacio-mediano;
    background-color: #007bff;
    color: $color-blanco;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;

    &--rojo {
      background-color: $color-rojo;
      margin-top: $espacio-grande;
      font-size: 18px;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .perfil{
    color:black;
  }
}

@media (min-width: 768px) {
  .perfil {
    max-width: 600px;
    padding: $espacio-extra-grande;
  }

  .perfil__boton {
    padding: 12px;
    font-size: 18px;
  }
}

</style>
