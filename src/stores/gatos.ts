import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type GatoDto from './dtos/gato.dto'
import type DeseadoDto from './dtos/deseados.dto'

export const usegatosStore = defineStore('gatos', () => {
    let gatos = ref<GatoDto[]>([])
    let gatosFiltrados = ref<GatoDto[]>([])
    let gatosDeseados = ref<DeseadoDto[]>([]);

    // Estados para los filtros
    const filtros = ref({
        edadMin: 1,
        edadMax: 15,
        raza: ''
    })

    function cargarGatosDeseadosDesdeStorage() {
        const gatosDeseadosGuardados = JSON.parse(localStorage.getItem('gatosDeseados') || '[]');
        if (gatosDeseadosGuardados.length > 0) {
            gatosDeseados.value = gatosDeseadosGuardados;
        } else {
            obtenerGatosDeseados(); // Si no hay datos locales, carga desde API
        }
    }

    // Almacenar gatosDeseados en LocalStorage
    function guardarGatosDeseadosEnStorage() {
        localStorage.setItem('gatosDeseados', JSON.stringify(gatosDeseados.value));
    }

    /* function createGato(gato: GatoDto) {
         //fetch(POST)
         //body: JSON.stringify()
         gatos.value.push(gato)
     }*/

    async function fetchGato() {
        try {
            const response = await fetch("https://localhost:7278/api/Gato");

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data: GatoDto[] = await response.json();
            gatos.value = data;
            aplicarFiltros() // Aplicar filtros después de cargar los datos
            console.log('Gatos obtenidos:', data);
        } catch (error) {
            console.error('Error al obtener los gatos:', error);
        }
    }

    // Función para actualizar los filtros
    function actualizarFiltros(nuevosFiltros) {
        filtros.value = { ...filtros.value, ...nuevosFiltros }
        aplicarFiltros()
    }

    // Función para aplicar los filtros actuales a la lista de gatos
    function aplicarFiltros() {
        gatosFiltrados.value = gatos.value.filter(gato => {
            // Filtrar por edad
            const edadEnRango = gato.edad >= filtros.value.edadMin &&
                gato.edad <= filtros.value.edadMax

            // Filtrar por raza (si hay una seleccionada)
            const razaCoincide = filtros.value.raza === '' ||
                gato.raza === filtros.value.raza

            return edadEnRango && razaCoincide
        })
    }

    async function obtenerGatosDeseados(id_Usuario: number) {
        try {
            const response = await fetch(`https://localhost:7278/api/Deseado/usuario/${id_Usuario}`);
            if (!response.ok) {
                throw new Error('Error al obtener los gatos deseados');
            }
            const data = await response.json();

            // Obtener la información completa de cada gato incluyendo `id_Deseado`
            const gatosCompletos = await Promise.all(
                data.map(async (deseado: any) => {
                    const gatoResponse = await fetch(`https://localhost:7278/api/Gato/${deseado.id_Gato}`);
                    if (!gatoResponse.ok) {
                        throw new Error(`Error al obtener el gato con id ${deseado.id_Gato}`);
                    }
                    const gato = await gatoResponse.json();

                    return { ...gato, id_Deseado: deseado.id_Deseado }; // ✅ Guardamos `id_Deseado`
                })
            );

            gatosDeseados.value = gatosCompletos; // ✅ Ahora sí incluye `id_Deseado`
            guardarGatosDeseadosEnStorage(); // Guarda en LocalStorage
        } catch (error) {
            console.error('Error al obtener los gatos deseados:', error);
        }
    }


    async function agregarGatoADeseados(idUsuario: number, id_Gato: number) {
        try {
            const response = await fetch('https://localhost:7278/api/Deseado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_Usuario: idUsuario,
                    id_Gato: id_Gato,
                    fecha_Deseado: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Error al agregar el gato a deseados');
            }

            const nuevoDeseado = await response.json(); // Obtener el ID generado

            if (!nuevoDeseado.id_Deseado) {
                throw new Error("La API no devolvió un ID de deseado válido");
            }

            gatosDeseados.value.push({ ...nuevoDeseado, id_Deseado: nuevoDeseado.id_Deseado });
            guardarGatosDeseadosEnStorage();
            console.log('Gato agregado a deseados:', nuevoDeseado);

            return nuevoDeseado; // Devolver el nuevo ID de deseado

        } catch (error) {
            console.error('Error en agregarGatoADeseados:', error);
            throw error; // Lanza el error para manejarlo en el componente
        }
    }


    // Eliminar un gato de los deseados usando el idDeseado
    async function eliminarGatoDeDeseados(idDeseado: number) {
        try {
            const response = await fetch(`https://localhost:7278/api/Deseado/${idDeseado}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el gato de deseados');
            }

            // Filtrar correctamente usando id_Deseado
            gatosDeseados.value = gatosDeseados.value.filter(gato => gato.id_Deseado !== idDeseado);
            guardarGatosDeseadosEnStorage();
            console.log(`Gato con ID deseado ${idDeseado} eliminado de deseados.`);
        } catch (error) {
            console.error('Error en eliminarGatoDeDeseados:', error);
        }
    }

    async function createGato(nuevoGato: GatoDto) {
        try {
            const response = await fetch("https://localhost:7278/api/Gato", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre_Gato: nuevoGato.nombre_Gato,
                    raza: nuevoGato.raza,
                    edad: nuevoGato.edad,
                    sexo: nuevoGato.sexo,
                    esterilizado: nuevoGato.esterilizado,
                    descripcion_Gato: nuevoGato.descripcion_Gato,
                    imagen_Gato: nuevoGato.imagen_Gato,
                    id_Protectora: nuevoGato.id_Protectora
                })
            });

            if (!response.ok) {
                throw new Error("Error al agregar el gato");
            }

            const gatoCreado = await response.json();
            gatos.value.push(gatoCreado);
            console.log("Gato agregado exitosamente:", gatoCreado);
            aplicarFiltros() // Volver a aplicar los filtros cuando se agregue un gato

        } catch (error) {
            console.error("Error al agregar el gato:", error);
        }
    }

    async function deleteGato(id_Gato: number) {
        try {
            const response = await fetch(`https://localhost:7278/api/Gato/${id_Gato}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el gato");
            }

            gatos.value = gatos.value.filter(g => g.id_Gato !== id_Gato);
            console.log(`Gato con ID ${id_Gato} eliminado correctamente.`);
        } catch (error) {
            console.error("Error al eliminar el gato:", error);
        }
    }

    async function updateGato(gato: GatoDto) {
        try {
            console.log("Enviando datos para actualizar:", gato);

            const response = await fetch(`https://localhost:7278/api/Gato/${gato.id_Gato}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gato)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error en la API:", errorText);
                throw new Error("Error al actualizar el usuario");
            }

            gatos.value = gatos.value.map(g => (g.id_Gato === gato.id_Gato ? gato : g));
            console.log("Gato actualizado correctamente:", gato);
            aplicarFiltros()
        } catch (error) {
            console.error("Error al actualizar el gato:", error);
        }
    }

    return {
        gatos,
        gatosFiltrados,
        filtros,
        gatosDeseados,
        createGato,
        deleteGato,
        updateGato,
        fetchGato,
        actualizarFiltros,
        aplicarFiltros,
        obtenerGatosDeseados,
        agregarGatoADeseados,
        eliminarGatoDeDeseados,
        cargarGatosDeseadosDesdeStorage
    }
})