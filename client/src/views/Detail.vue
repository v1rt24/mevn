<template>
  <loading v-if="loading"/>
  <div class="row" v-else>
    <h2 class="center">Ваша ссылка</h2>

    <div>Ваша ссылка: <a :href="link.to" target="_blank">{{ link.to }}</a></div>
    <div>Откуда: <a :href="link.from" target="_blank">{{ link.from }}</a></div>
    <div>Количество кликов по ссылке: <strong>{{ link.clicks }}</strong></div>
    <div>Дата создания: <strong>{{ new Date(link.date).toLocaleDateString() }}</strong></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Detail',
  data: () => ({
    loading: true,
    link: null,
  }),
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions('link', {
      GET_LINK_BY_ID: 'getLinkById',
    }),
  },
  computed: {
    ...mapGetters('auth', {
      TOKEN: 'getToken',
    }),
  },
  async mounted () {
    try {
      const res = await this.GET_LINK_BY_ID({
        id: this.id,
        token: this.TOKEN,
      });
      this.loading = false;
      this.link = res;
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