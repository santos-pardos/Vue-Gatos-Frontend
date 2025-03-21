<script lang="ts">
import { defineComponent } from 'vue';

export default {
    name: 'AdminView'
}
</script>

<template>
    <div class="admin-vista">
        <h1 class="admin-vista__titulo">Panel de Administración</h1>

        <div class="admin-vista__tarjeta">
            <p class="admin-vista__descripcion">
                Bienvenido al panel de administración. Aquí puedes gestionar gatos, protectoras y usuarios.
            </p>
        </div>

        <div class="admin-vista__acciones">
            <router-link to="/admin/gestion-gatos" class="admin-vista__boton">
                <v-icon>mdi-cat</v-icon>
                <span>Gestión de Gatos</span>
            </router-link>

            <router-link to="/admin/gestion-protectoras" class="admin-vista__boton">
                <v-icon>mdi-home-heart</v-icon>
                <span>Gestión de Protectoras</span>
            </router-link>

            <router-link to="/admin/gestion-usuarios" class="admin-vista__boton">
                <v-icon>mdi-account-group</v-icon>
                <span>Gestión de Usuarios</span>
            </router-link>
        </div>

        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
.admin-vista {
    max-width: 900px;
    margin: 40px auto;
    margin-top: 60px;
    padding: $espacio-grande;
    text-align: center;

    &__titulo {
        font-size: 2rem;
        color: #333;
        margin-bottom: $espacio-grande;
        font-weight: bold;
    }

    &__tarjeta {
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: $espacio-extra-grande;
    }

    &__descripcion {
        font-size: 1rem;
        color: #666;
    }

    &__acciones {
        display: flex;
        justify-content: center;
        gap: $espacio-grande;
        margin-bottom: $espacio-extra-grande;
        flex-wrap: wrap;
    }

    &__boton {
        @include center-flex;
        gap: 8px;
        padding: 12px $espacio-mediano;
        text-decoration: none;
        color: $color-blanco;
        background-color: $color-principal;
        border-radius: 6px;
        transition: background-color 0.3s ease, transform 0.2s;
        font-size: 1rem;
        font-weight: bold;
        min-width: 220px;

        &:hover {
            background-color: $color-principal-oscuro;
            transform: scale(1.05);
        }

        v-icon {
            font-size: 1.5rem;
        }
    }
}
</style>
