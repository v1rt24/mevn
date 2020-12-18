<template>
  <div>
    <Menu
        v-if="AUTH"
    />
    <div class="container">
      <transition name="page" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Menu from '@/components/Menu';

export default {
  name: 'App',
  computed: {
    ...mapGetters('auth', {
      AUTH: 'getAuth',
    }),
  },
  components: {Menu},
};
</script>

<style>
.page-enter,
.page-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: .3s;
}
</style>