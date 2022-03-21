import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
const app=createApp(App);

Vue.config.productionTip = false
app.use(router);
app.use(VueAxios, axios) 
app.mount('#app')