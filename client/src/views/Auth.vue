<template>
  <div class="row">
    <h3 class="center" style="margin-bottom: 30px;">Сократи ссылку</h3>

    <loading v-if="loading"/>

    <div class="col s6 offset-s3">
      <div class="card blue darken-1">
        <div class="card-content white-text">
          <span class="card-title">Авторизация</span>

          <div>
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" v-model="email">
                <label for="email">Email</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input id="password" type="password" v-model="password">
                <label for="password">Пароль</label>
              </div>
            </div>
          </div>
        </div>
        <div class="card-action">
          <button class="waves-effect waves-light btn amber darken-3" @click="authRegHandler('login')">Войти</button>
          <button class="waves-effect waves-light btn blue lighten-1" @click="authRegHandler('reg')">Регистрация</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Auth',
  data: () => ({
    loading: false,
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions('auth', {
      REG_AUTH: 'authRegHandler',
    }),
    async authRegHandler (nameBut) {
      const dataForm = {
        nameBut,
        email: this.email,
        password: this.password,
      };

      try {
        this.loading = true;
        const res = await this.REG_AUTH(dataForm);
        this.loading = false;
        this.$message('Вы вошли в систему');
        this.$router.push({
          name: 'Create',
        });
      }
      catch (error) {
        this.loading = false;
        this.$error(error.message);
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.card-action > button {
  margin-right: 5px;
}

.input-field > label,
input[type=email]:not(.browser-default):focus:not([readonly]) + label,
input[type=password]:not(.browser-default):focus:not([readonly]) + label {
  color: white;
}

input[type=email]:not(.browser-default),
input[type=password]:not(.browser-default),
input[type=password]:not(.browser-default):focus:not([readonly]) {
  color: #fff;
  border-bottom: 1px solid #fff;
}

input[type=email]:not(.browser-default):focus:not([readonly]) {
  border-bottom: 1px solid #fff;
  box-shadow: 0 1px 0 0 #8a8a8a;
}
</style>