export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async link ({commit}, {link, token}) {
      try {
        const res = await fetch('/api/link/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({from: link}),
        });
        // console.log(res);
        return await res.json();
      }
      catch (error) {
        throw error;
      }
    },
    async getLinkById ({}, {id, token}) {
      try {
        const res = await fetch(`/api/link/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          await Promise.reject(data.message);
        }

        return data;
      }
      catch (error) {
        throw error;
      }
    },
    async getLinks ({}, token) {
      try {
        const res = await fetch('/api/link', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          await Promise.reject(data.message);
        }

        return data;
      }
      catch (error) {
        throw error;
      }
    },
  },
};