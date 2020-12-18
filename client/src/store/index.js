import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/auth';
import link from '@/store/link';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    link,
  },
});
