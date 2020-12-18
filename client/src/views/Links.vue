<template>
  <loading v-if="loading"/>
  <div class="row" v-else>
    <h2>Ссылки</h2>

    <table v-if="links.length">
      <thead>
      <tr>
        <th>#</th>
        <th>Оригинальная</th>
        <th>Сокращённая</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="(link, idx) of links"
          :key="link._id"
      >
        <td>{{ ++idx }}</td>
        <td>{{ link.from }}</td>
        <td>{{ link.to }}</td>
        <td>
          <router-link :to="`/detail/${link._id}`">
            Открыть
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-else>Пока ссылок нет</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Links',
  data: () => ({
    loading: true,
    links: [],
  }),
  methods: {
    ...mapActions('link', {
      GET_LINKS: 'getLinks',
    }),
  },
  computed: {
    ...mapGetters('auth', {
      TOKEN: 'getToken',
    }),
  },
  async mounted () {
    try {
      const res = await this.GET_LINKS(this.TOKEN);
      this.loading = false;
      this.links = res;
    }
    catch (error) {
      this.loading = false;
      this.$error(error);
    }
  },
};
</script>

<style scoped>

</style>