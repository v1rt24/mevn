import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'material-design-icons-iconfont';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import LoadingFormBut from '@/components/LoadingFormBut';
import messagePlugins from './utils/message.plugin';

Vue.component('loading', LoadingFormBut);
Vue.use(messagePlugins);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  async mounted () {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      await store.dispatch('auth/reloadAuth', token);
    }
  },
}).$mount('#app');
