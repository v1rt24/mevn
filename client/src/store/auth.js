import { setLocalStorage, clearLocalStorage } from '../utils/localStorage.util';

export default {
  namespaced: true,
  state: {
    auth: false,
    token: null,
    user: null,
  },
  getters: {
    getAuth: state => state.auth,
    getToken: state => state.token,
    user: state => state.user,
  },
  mutations: {
    setAuth (state, token) {
      state.auth = token;
    },
    setUser (state, user) {
      state.user = user;
    },
    setToken (state, token) {
      state.token = token;
    },
  },
  actions: {
    async authRegHandler ({commit}, {nameBut, email, password}) {
      try {
        const urlPath = nameBut === 'login'
          ? '/api/auth/login'
          : '/api/auth/register';

        const res = await fetch(urlPath, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password}),
        });

        const data = await res.json();

        if (!res.ok) {
          await Promise.reject(data || 'Что-то пошло не так');
        }

        commit('setAuth', true);
        commit('setToken', data.token);
        commit('setUser', data);

        setLocalStorage('token', data.token);

        return data;
      }
      catch (error) {
        throw error;
      }
    },
    async reloadAuth ({commit}, token) {
      commit('setAuth', true);
      commit('setToken', token);
    },
    logout ({commit}) {
      clearLocalStorage('token');
      commit('setAuth', false);
      commit('setUser', null);
      commit('setToken', null);
    },
  },
};