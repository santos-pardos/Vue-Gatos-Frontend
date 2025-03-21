<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useprotectorasStore } from "@/stores/protectoras.ts";

const protectorasStore = useprotectorasStore();
const mostrarModal = ref(false);
const protectoraEditada = ref({ id_Protectora: 0, nombre_Protectora: "", direccion: "", email: "", telefono: 0, horario_Atención: "", imagen_Protectora: "" });

const nuevaProtectora = ref({
    id_Protectora: 0,
    nombre_Protectora: "",
    direccion: "",
    email: "",
    telefono: 0,
    horario_Atención: "",
    imagen_Protectora: ""
});

onMounted(() => {
    protectorasStore.fetchProtectora();
});

const crearProtectora = async () => {
    try {
        await protectorasStore.createProtectora(nuevaProtectora.value);
        alert("Protectora agregada exitosamente");
        nuevaProtectora.value = { id_Protectora: 0, nombre_Protectora: "", direccion: "", email: "", telefono: 0, horario_Atención: "", imagen_Protectora: "" };
    } catch (error) {
        console.error("Error al agregar la protectora:", error);
    }
};

const eliminarProtectora = async (id_Protectora: number) => {
    console.log("Intentando eliminar gato con ID:", id_Protectora);
    
    if (confirm("¿Estás seguro de que deseas eliminar esta protectora?")) {
        await protectorasStore.deleteProtectora(id_Protectora);
    }
};

const editarProtectora = (protectora: any) => {
    protectoraEditada.value = { ...protectora };
    mostrarModal.value = true;
};

const guardarEdicion = async () => {
    await protectorasStore.updateProtectora(protectoraEditada.value);
    cerrarModal();
};

const cerrarModal = () => {
    mostrarModal.value = false;
};

</script>

<template>
    <div class="admin-protectoras">
        <h2 class="admin-protectoras__titulo">Gestión de Protectoras</h2>

        <div class="admin-protectoras__formulario">
            <h3 class="admin-protectoras__subtitulo">Agregar Nueva Protectora</h3>
            <form @submit.prevent="crearProtectora" class="admin-protectoras__form">
                <input v-model="nuevaProtectora.nombre_Protectora" placeholder="Nombre de la protectora" required>
                <input v-model="nuevaProtectora.direccion" placeholder="Dirección" required>
                <input v-model="nuevaProtectora.email" type="email" placeholder="Email" required>
                <input v-model="nuevaProtectora.telefono" type="text" placeholder="Teléfono" required>
                <button type="submit" class="admin-protectoras__boton">Agregar Protectora</button>
            </form>
        </div>

        <div class="admin-protectoras__lista">
            <h3 class="admin-protectoras__subtitulo">Lista de Protectoras</h3>
            <div class="admin-protectoras__grid">
                <div v-for="protectora in protectorasStore.protectoras" :key="protectora.id_Protectora" class="admin-protectoras__item">
                    <img :src="protectora.imagen_Protectora" alt="Imagen de la protectora" class="admin-protectoras__imagen">
                    <div class="admin-protectoras__info">
                        <p><strong>Nombre:</strong> {{ protectora.nombre_Protectora }}</p>
                        <p><strong>Dirección:</strong> {{ protectora.direccion }}</p>
                        <p><strong>Email:</strong> {{ protectora.email }}</p>
                        <p><strong>Teléfono:</strong> {{ protectora.telefono }}</p>
                    </div>
                    <div class="admin-protectoras__acciones">
                        <button @click="editarProtectora(protectora)" class="admin-protectoras__boton--editar">Editar</button>
                        <button @click="eliminarProtectora(protectora.id_Protectora)"class="admin-protectoras__boton--eliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        <v-dialog v-model="mostrarModal" max-width="500px">
            <v-card>
                <v-card-title>Editar Protectora</v-card-title>
                <v-card-text>
                    <form @submit.prevent="guardarEdicion" class="admin-protectoras__form">
                        <input v-model="protectoraEditada.nombre_Protectora" placeholder="Nombre de la protectora"
                            required>
                        <input v-model="protectoraEditada.direccion" placeholder="Dirección" required>
                        <input v-model="protectoraEditada.email" type="email" placeholder="Email" required>
                        <input v-model="protectoraEditada.telefono" type="text" placeholder="Teléfono" required>
                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="grey" @click="cerrarModal" class="admin-protectoras__boton">Cancelar</v-btn>
                    <v-btn color="green" @click="guardarEdicion" class="admin-protectoras__boton">Guardar Cambios</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped lang="scss">
.admin-protectoras {
    padding: $espacio-grande;
    max-width: 800px;
    margin: auto;
    text-align: center;

    &__titulo {
        font-size: 2rem;
        color: #333;
        margin-bottom: $espacio-grande;
    }

    &__formulario {
        padding: $espacio-grande;
        border-radius: $espacio-mediano;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: $espacio-extra-grande;
    }

    &__subtitulo {
        font-size: 1.5rem;
        margin-bottom: 15px;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: $espacio-mediano;

        input {
            padding: $espacio-mediano;
            border: $border-gris2;
            border-radius: $espacio-pequeno;
        }

        button {
            background: $color-principal;
            color: white;
            padding: $espacio-mediano;
            border: none;
            border-radius: $espacio-pequeno;
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
                background: $color-principal-oscuro;
            }
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
        padding: $espacio-mediano;
    }

    &__item {
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: $sombra-contenedor;
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__imagen {
        width: 100%;
        max-width: 200px;
        height: 150px;
        border-radius: $espacio-pequeno;
        object-fit: cover;
        margin-bottom: $espacio-mediano;
    }

    &__info {
        width: 100%;
        text-align: center;
    }

    &__acciones {
        margin-top: $espacio-mediano;
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    &__boton--editar {
        background: $color-principal;
        color: $color-blanco;
        padding: 8px;
        border: none;
        border-radius: $espacio-pequeno;
        cursor: pointer;
        margin-top: $espacio-mediano;

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
        margin-top: $espacio-mediano;

        &:hover {
            background: darkred;
        }
    }
}

.v-card-text {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
</style>