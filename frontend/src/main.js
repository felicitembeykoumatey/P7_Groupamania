HEAD
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

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

