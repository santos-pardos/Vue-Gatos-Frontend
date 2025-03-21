<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useAutenticacion } from '@/stores/Autentificacion';

const Autenticacion = useAutenticacion();
const { usuario, esAdmin } = storeToRefs(Autenticacion);
const mostrarMenu = ref(false);
const isHovering = ref(false);
const offsets = ref([0, 0, 0]);
const menuContainer = ref<HTMLElement | null>(null);
const userIcon = ref<HTMLElement | null>(null);

onMounted(() => {
  Autenticacion.cargarUsuarioDesdeLocalStorage();
  console.log("Usuario cargado en el Header:", usuario.value);

  const canvas = document.getElementById('pawCanvas') as HTMLCanvasElement;
  if (canvas) {
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      drawPaw(ctx);
      canvas.addEventListener('mouseenter', () => {
        isHovering.value = true;
        animateRaise(ctx);
      });
      canvas.addEventListener('mouseleave', () => {
        isHovering.value = false;
        resetPaw(ctx);
      });
    }
  }

  document.addEventListener('click', closeMenu);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu);
});

const toggleMenu = () => {
  mostrarMenu.value = !mostrarMenu.value;
};

const closeMenu = (event: Event) => {
  if (
    mostrarMenu.value &&
    menuContainer.value &&
    !menuContainer.value.contains(event.target as Node) &&
    userIcon.value &&
    !userIcon.value.contains(event.target as Node)
  ) {
    mostrarMenu.value = false;
  }
};

function drawPaw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, 200, 200);

  ctx.beginPath();
  ctx.arc(100, 120, 40, 0, Math.PI * 2);
  ctx.fillStyle = "#FF5500";
  ctx.strokeStyle = "#3B2F2F";
  ctx.lineWidth = 5;
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(100, 132, 27, 0, Math.PI * 2);
  ctx.fillStyle = "whitesmoke";
  ctx.fill();

  drawCircle(ctx, 60, 70 + offsets.value[0], 20);
  drawCircle(ctx, 100, 60 + offsets.value[1], 22);
  drawCircle(ctx, 140, 70 + offsets.value[2], 20);
}

function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#FF5500";
  ctx.strokeStyle = "#3B2F2F";
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.stroke();
}

function animateRaise(ctx: CanvasRenderingContext2D) {
  const maxOffset = -30;
  let index = 0;

  function raiseStep() {
    if (!isHovering.value) return;

    if (index < 3) {
      offsets.value[index] = maxOffset;
      index++;
      drawPaw(ctx);
      setTimeout(raiseStep, 200);
    } else {
      setTimeout(() => resetPaw(ctx), 600);
    }
  }

  raiseStep();
}

function resetPaw(ctx: CanvasRenderingContext2D) {
  offsets.value = [0, 0, 0];
  drawPaw(ctx);
}
</script>

<template>
  <main>
    <header>
      <RouterLink to="/">
        <canvas id="pawCanvas"></canvas>
      </RouterLink>
      <div class="text">
        <nav>
          <RouterLink to="/gato">Gatos</RouterLink>
          <RouterLink to="/protectoras">Protectoras</RouterLink>
        </nav>
        <div class="usuario">
          <template v-if="!usuario">
            <RouterLink to="/iniciar-sesion">Iniciar Sesion‎ ‎ ‎</RouterLink>
            <RouterLink to="/registrarse">Registrarse</RouterLink>
          </template>
          <template v-else>
            <div class="usuario-menu">
              <svg @click="toggleMenu" ref="userIcon" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="#FF5500" stroke="#3B2F2F" stroke-width="2" class="circulo-usuario" />
                <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#3B2F2F" stroke-width="2" class="cuerpo-usuario" />
              </svg>
              <div v-if="mostrarMenu" ref="menuContainer" class="datos-usuario">
                <p>Hola {{ usuario.nombre }}</p>
                <RouterLink to="/perfil" class="boton-1"><span>Mi Perfil</span></RouterLink>
                <RouterLink to="/deseados" class="boton-2"><span>❤️ Deseados</span></RouterLink>
                <RouterLink v-if="esAdmin" to="/admin" class="admin-boton">Panel de Admin</RouterLink>
                <RouterLink to="/"><button class="logout-btn" @click="Autenticacion.cerrarSesion">Cerrar sesión</button></RouterLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </header>
  </main>
</template>

<style scoped lang="scss">
header {
  font-family: $fuente-titulos;
  @include center-flex;
  padding: $espacio-mediano 15px;
  width: 100%;
}

.text {
  width: 200px;
}

nav {
  display: flex;
  flex-direction: column;
  width: 150px;
  justify-content: center;
}

canvas {
  display: block;
  width: 80px;
  height: 80px;
}

.usuario-menu {
  position: relative;
  display: inline-block;

  .datos-usuario {
    position: absolute;
    left: -60px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: $border-gris1;
    border-radius: $espacio-pequeno;
    box-shadow: $sombra-contenedor;
    background: $color-blanco;
    padding: $espacio-mediano;
    z-index: 3;

    & .boton-1 {
      background-color: $color-principal;
      color: $color-blanco;
      margin: 15px 0;
      padding: $espacio-mediano 15px;
      border-radius: $espacio-mediano;
    }

    & .boton-2 {
      background-color: $color-principal;
      color: $color-blanco;
      margin-bottom: $espacio-mediano;
      padding: $espacio-mediano 15px;
      border-radius: $espacio-mediano;
    }
  }
}

.logout-btn {
  margin-top: $espacio-pequeno;
  background: $color-rojo;
  color: $color-blanco;
  border: none;
  padding: $espacio-pequeno $espacio-mediano;
  cursor: pointer;
  border-radius: $espacio-pequeno;
}

@media (prefers-color-scheme: dark) {
  .datos-usuario {
    color: black;
  }
  .usuario-menu circle {
    stroke: #ddd; /* Hace que el contorno sea blanco en modo oscuro */
  }
  .usuario-menu path {
    stroke: #ddd; /* Hace que el contorno sea blanco en modo oscuro */
  }
}

@media (min-width: 788px) {
  header {
    justify-content: flex-start;
    padding: 15px $espacio-extra-grande;
  }

  .text {
    display: flex;
    width: 610px;
  }

  nav {
    flex-grow: 1;
    width: 170px;
    gap: $espacio-pequeno;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .usuario {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
  }
}

@media (min-width: 1010px) {
  header {
    padding: 15px 150px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .text {
    width: 1310px;
  }

  svg {
    width: 70px;
    height: 70px;
  }

  nav {
    gap: $espacio-grande;
    align-items: center;
  }

  .usuario {
    gap: $espacio-grande;
  }
}
</style>
