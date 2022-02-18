import { createApp } from 'vue'
import App from './App.vue'
// Importation router 

import router from './router';
createApp(App).use(router).mount('#app') // On branche notre routeur aevc APP.use(router)
