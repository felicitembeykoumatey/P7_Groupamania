import { createApp } from "vue";
import App from './App.vue';
import router from './router'
window.axios = require('axios');
import store from './store'
//import axios from 'axios'
   // Vue.use(axios)



createApp(App)
.use(store)
    .use(router)

    .mount("#app");