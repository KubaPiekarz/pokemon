import { createApp } from 'vue';
import App from './App.vue';
import { router, store } from './router/index.js';
import VueCookies from 'vue-cookies'
import './styles/styles.css';

createApp(App)
  .use(router)
  .use(store)
	.use(VueCookies)
  .mount('#app');
