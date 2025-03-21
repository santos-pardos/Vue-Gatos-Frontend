<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usegatosStore } from "@/stores/gatos.ts";

const gatosStore = usegatosStore();
const mostrarModal = ref(false);
const usuarioEditado = ref({ id_Gato: 0, nombre_Gato: "", raza: "", edad: 0, sexo: "", esterilizado: false, descripcion_Gato: "", imagen_Gato: "", id_Protectora: 1 });

const nuevoGato = ref({
    id_Gato: 0,  // Se genera en la API, pero en el frontend puede ser un valor temporal
    nombre_Gato: "",
    raza: "",
    edad: 0,
    sexo: "",
    esterilizado: false,
    descripcion_Gato: "", 
    imagen_Gato: "",
    id_Protectora: 1 
});

onMounted(() => {
    gatosStore.fetchGato();
});

const crearGato = async () => {
    try {
        await gatosStore.createGato(nuevoGato.value);
        alert("Gato agregado exitosamente");
        // Limpiar formulario
        nuevoGato.value = { id_Gato: 0, nombre_Gato: "", raza: "", edad: 0, sexo: "", esterilizado: false, descripcion_Gato: "", imagen_Gato: "", id_Protectora: 1 };
    } catch (error) {
        console.error("Error al agregar el gato:", error);
    }
};

const eliminarGato = async (id_Gato: number) => {
    console.log("Intentando eliminar gato con ID:", id_Gato); // Verifica el ID antes de eliminar

    if (!id_Gato || id_Gato === 0) {
        alert("Error: ID de gato inválido.");
        return;
    }

    if (confirm("¿Estás seguro de que deseas eliminar este gato?")) {
        await gatosStore.deleteGato(id_Gato);
    }
};

const editarGato = (gato: any) => {
    usuarioEditado.value = { ...gato };
    mostrarModal.value = true;
};

const guardarEdicion = async () => {
    await gatosStore.updateGato(usuarioEditado.value);
    cerrarModal();
};

const cerrarModal = () => {
    mostrarModal.value = false;
};

</script>

<template>
    <div class="admin-gatos">
        <h2 class="admin-gatos__titulo">Gestión de Gatos</h2>

        <div class="admin-gatos__formulario">
            <h3 class="admin-gatos__subtitulo">Agregar Nuevo Gato</h3>
            <form @submit.prevent="crearGato" class="admin-gatos__form">
                <input v-model="nuevoGato.nombre_Gato" placeholder="Nombre del gato" required>
                <input v-model="nuevoGato.raza" placeholder="Raza" required>
                <input v-model.number="nuevoGato.edad" type="number" placeholder="Edad" required>
                <input v-model="nuevoGato.sexo" placeholder="Sexo" required>
                <label>
                    <input v-model="nuevoGato.esterilizado" type="checkbox"> Esterilizado
                </label>
                <input v-model="nuevoGato.descripcion_Gato" placeholder="Descripción" required>
                <input v-model="nuevoGato.imagen_Gato" placeholder="URL de imagen" required>
                <button type="submit" class="admin-gatos__boton">Agregar Gato</button>
            </form>
        </div>

        <div class="admin-gatos__lista">
            <h3 class="admin-gatos__subtitulo">Lista de Gatos</h3>
            <div class="admin-gatos__grid">
                <div v-for="gato in gatosStore.gatos" :key="gato.id_Gato" class="admin-gatos__item">
                    <img :src="gato.imagen_Gato" alt="Gato" class="admin-gatos__imagen">
                    <div class="admin-gatos__info">
                        <p><strong>Nombre:</strong> {{ gato.nombre_Gato }}</p>
                        <p><strong>Raza:</strong> {{ gato.raza }}</p>
                        <p><strong>Edad:</strong> {{ gato.edad }} años</p>
                        <p><strong>Sexo:</strong> {{ gato.sexo }}</p>
                    </div>
                    <div class="admin-gatos__acciones">
                        <button @click="editarGato(gato)" class="admin-gatos__boton--editar">Editar</button>
                        <button @click="eliminarGato(gato.id_Gato)" class="admin-gatos__boton--eliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        <v-dialog v-model="mostrarModal" max-width="500px">
            <v-card>
                <v-card-title>Editar Gato</v-card-title>
                <v-card-text>
                    <input v-model="usuarioEditado.nombre_Gato" placeholder="Nombre" style="margin-right: 10px;">
                    <input v-model="usuarioEditado.raza" placeholder="Raza">
                    <input v-model.number="usuarioEditado.edad" type="number" placeholder="Edad">
                    <input v-model="usuarioEditado.sexo" placeholder="Sexo"><br>
                    <label>
                        <input v-model="usuarioEditado.esterilizado" type="checkbox"> Esterilizado
                    </label>
                    <input v-model="usuarioEditado.descripcion_Gato" placeholder="Descripción" style="width: 272px; margin-left: 10px">
                    <input v-model="usuarioEditado.imagen_Gato" placeholder="URL de imagen">
                </v-card-text>
                <v-card-actions>
                    <v-btn color="grey"@click="cerrarModal" class="admin-gatos__boton">Cancelar</v-btn>
                    <v-btn color="green" @click="guardarEdicion" class="admin-gatos__boton">Guardar Cambios</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped lang="scss">
.admin-gatos {
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
            border: 1px solid $border-gris2;
            border-radius: $espacio-pequeno;
        }

        label {
            display: flex;
            align-items: center;
            gap: 8px;
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

    &__lista {
        margin-top: $espacio-grande;
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