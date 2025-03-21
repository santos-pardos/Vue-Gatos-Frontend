import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css'; // Asegura que los iconos estén disponibles

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // Usa los iconos de Material Design
    },
});
export default vuetify;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
