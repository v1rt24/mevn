<template>
  <div class="col s8 offset-s2">
    <div class="row">
      <div class="input-field col s12">
        <input id="link" type="text" v-model="link" @keydown.enter="pressHandler">
        <label for="link">Вставьте ссылку</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Create',
  data: () => ({
    link: '',
  }),
  methods: {
    ...mapActions('link', {
      LINK: 'link',
    }),
    async pressHandler () {
      try {
        const res = await this.LINK({
          link: this.link,
          token: this.TOKEN,
        });
        this.$router.push({
          name: 'Detail',
          params: {
            id: res.link._id,
          },
        });
      }
      catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters('auth', {
      TOKEN: 'getToken',
    }),
  },
};
</script>

<style scoped>

</style>