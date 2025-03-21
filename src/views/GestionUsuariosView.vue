<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useusuariosStore } from "@/stores/usuarios.ts";

const usuariosStore = useusuariosStore();
const mostrarModal = ref(false);
const usuarioEditado = ref({ id_Usuario: 0, nombre: "", apellido:"", email: "", contraseña: "" });
const busqueda = ref("");

onMounted(() => {
    usuariosStore.fetchUsuarios();
});

const editarUsuario = (usuario: any) => {
    usuarioEditado.value = { ...usuario };
    mostrarModal.value = true;
};

const guardarEdicion = async () => {
    await usuariosStore.updateUsuario(usuarioEditado.value);
    cerrarModal();
};

const cerrarModal = () => {
    mostrarModal.value = false;
};

const eliminarUsuario = async (id_Usuario: number | undefined) => {
    console.log("Intentando eliminar usuario con ID:", id_Usuario);

    if (!id_Usuario) {
        alert("Error: ID de usuario inválido.");
        return;
    }

    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        await usuariosStore.deleteUsuario(id_Usuario);
    }
};

const usuariosFiltrados = computed(() => {
    return usuariosStore.usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    );
});
</script>

<template>
    <div class="admin-usuarios">
        <h2 class="admin-usuarios__titulo">Gestión de Usuarios</h2>

        <input v-model="busqueda" class="admin-usuarios__buscador" placeholder="Buscar usuario por nombre">

        <div class="admin-usuarios__lista">
            <h3 class="admin-usuarios__subtitulo">Lista de Usuarios</h3>
            <div class="admin-usuarios__grid">
                <div v-for="usuario in usuariosFiltrados" :key="usuario.id_Usuario" class="admin-usuarios__item">
                    <div class="admin-usuarios__info">
                        <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
                        <p><strong>Apellido</strong> {{ usuario.apellido }} </p>
                        <p><strong>Email:</strong> {{ usuario.email }}</p>
                        <p><strong>Contraseña</strong> {{ usuario.apellido }}</p>
                    </div>
                    <div class="admin-usuarios__acciones">
                        <button @click="editarUsuario(usuario)" class="admin-usuarios__boton--editar">Editar</button>
                        <button @click="eliminarUsuario(usuario.id_Usuario)" class="admin-usuarios__boton--eliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        <v-dialog v-model="mostrarModal" max-width="500px">
            <v-card>
                <v-card-title>Editar Usuario</v-card-title>
                <v-card-text>
                    <input v-model="usuarioEditado.nombre" placeholder="Nombre" style="margin-right: 10px; padding-left: 5px">
                    <input v-model="usuarioEditado.apellido" placeholder="Apellido" style="padding-left: 5px;">
                    <input v-model="usuarioEditado.email" placeholder="Email" style="margin-right: 10px; padding-left: 5px" >
                    <input v-model="usuarioEditado.contraseña" placeholder="Contraseña" style="padding-left: 5px;">
                </v-card-text>
                <v-card-actions>
                    <v-btn color="grey" @click="cerrarModal">Cancelar</v-btn>
                    <v-btn color="green" @click="guardarEdicion">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped lang="scss">
.admin-usuarios {
    padding: $espacio-grande;
    max-width: 800px;
    margin: auto;
    text-align: center;

    &__titulo {
        font-size: 2rem;
        color: #333;
        margin-bottom: $espacio-grande;
    }

    &__buscador {
        width: 100%;
        padding: $espacio-mediano;
        margin-bottom: $espacio-grande;
        border: 1px solid #ccc;
        border-radius: $espacio-pequeno;
        font-size: 1rem;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        padding: $espacio-mediano;
    }

    &__item {
        padding: 15px;
        border-radius: 8px;
        box-shadow: $sombra-contenedor;
    }

    &__acciones {
        margin-top: $espacio-mediano;
        display: flex;
        justify-content: space-between;
    }

    &__boton--editar {
        background: $color-principal;
        color: $color-blanco;
        padding: 8px;
        border: none;
        border-radius: $espacio-pequeno;
        cursor: pointer;

        &:hover {
            background: $color-principal-oscuro;
        }
    }

    &__boton--eliminar {
        background: $color-rojo;
        color: $color-blanco;
        padding: 8px;
        border: none;
        border-radius: $espacio-pequeno;
        cursor: pointer;

        &:hover {
            background: darkred;
        }
    }
}
</style>