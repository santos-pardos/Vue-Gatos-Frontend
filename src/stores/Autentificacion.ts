import { defineStore } from 'pinia';

export const useAutenticacion = defineStore('Autenticacion', {
    state: () => ({
        usuario: null as any,
    }),
    getters: {
        esAutenticado: (state) => !!state.usuario,
        esAdmin: (state) => state.usuario?.userId === 5,
    },
    actions: {
        iniciarSesion(datosUsuario: any) {
            this.usuario = datosUsuario;
        },
        cerrarSesion() {
            this.usuario = null;
            localStorage.removeItem('user');
        },
        cargarUsuarioDesdeLocalStorage() {
            const usuario = localStorage.getItem('user');
            if (usuario) {
                this.usuario = JSON.parse(usuario);
            }
        },
    },
});
