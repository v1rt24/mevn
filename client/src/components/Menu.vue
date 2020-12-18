<template>
  <nav>
    <div class="nav-wrapper blue">
      <span class="brand-logo">Сокращение ссылок</span>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link tag="li" exact-active-class="active" to="/create">
          <a>Создать</a>
        </router-link>

        <router-link tag="li" exact-active-class="active" to="/links">
          <a>Ссылки</a>
        </router-link>

        <li>
          <a href="#" @click.prevent="logout">Выйти</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Menu',
  methods: {
    ...mapActions('auth', {
      LOGOUT: 'logout',
    }),
    logout () {
      this.LOGOUT();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.nav-wrapper {
  padding: 0 30px;
}
</style>