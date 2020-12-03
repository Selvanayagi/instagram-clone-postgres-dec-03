// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

import'bootstrap/dist/css/bootstrap.min.css';


import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

// import App from './components/App.vue';
import App from './App.vue'

import router from './router'
import VueClazyLoad from 'vue-clazy-load';


Vue.use(VueClazyLoad);
import VueCarousel from 'vue-carousel';
 
Vue.use(VueCarousel);
Vue.config.productionTip = false;
Vue.use(VueCompositionApi);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
