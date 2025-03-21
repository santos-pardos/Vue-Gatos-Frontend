import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type ProtectoraDto from './dtos/protectoras.dto'

export const useprotectorasStore = defineStore('protectoras', () => {
    const protectoras = ref(new Array<ProtectoraDto>())


    async function fetchProtectora() {
        try {
            const response = await fetch("https://localhost:7278/api/Protectora");

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data: ProtectoraDto[] = await response.json();
            protectoras.value = data;
            console.log('Protectoras obtenidas:', data);
        } catch (error) {
            console.error('Error al obtener los gatos:', error);
        }
    }

    async function createProtectora(nuevaProtectora: ProtectoraDto) {
        console.log("Datos enviados a la API:", nuevaProtectora);
        try {
            const response = await fetch("https://localhost:7278/api/Protectora", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaProtectora),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error en la API:", errorText);
                throw new Error("Error al agregar la protectora");
            }

            const protectoraCreada = await response.json();
            protectoras.value.push(protectoraCreada);
            console.log("Protectora agregada:", protectoraCreada);
        } catch (error) {

            console.error("Error al agregar protectora:", error);
        }
    }

    async function deleteProtectora(id_Protectora: number) {
        if (!id_Protectora) return;

        try {
            const response = await fetch(`https://localhost:7278/api/Protectora/${id_Protectora}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar la protectora");

            protectoras.value = protectoras.value.filter(p => p.id_Protectora !== id_Protectora);
            console.log(`Protectora con ID ${id_Protectora} eliminada.`);
        } catch (error) {
            console.error("Error al eliminar protectora:", error);
        }
    }

    async function updateProtectora(protectora: ProtectoraDto) {
        try {
            console.log("Enviando datos para actualizar:", protectora);

            const response = await fetch(`https://localhost:7278/api/Protectora/${protectora.id_Protectora}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(protectora),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error en la API:", errorText);
                throw new Error("Error al actualizar la protectora");
            }

            protectoras.value = protectoras.value.map(p => (p.id_Protectora === protectora.id_Protectora ? protectora : p));
            console.log("Protectora actualizada correctamente:", protectora);
        } catch (error) {
            console.error("Error al actualizar protectora:", error);
        }
    }

    // REST
    // create, delete, updated....

    return {
        protectoras,
        fetchProtectora,
        createProtectora,
        deleteProtectora,
        updateProtectora,
    }
})