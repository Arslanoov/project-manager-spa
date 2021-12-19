<template>
  <div class="login">
    <div class="login__logo">
      <img class="login__logo-image" src="~@/assets/images/logo.svg" alt="Logo">
      <h1 class="login__logo-title">{{ appName }}</h1>
    </div>

    <h2 class="login__message">{{ $t("message") }}</h2>
    <p class="login__submessage">{{ $t("submessage") }}</p>

    <AuthMethod name="E-mail" link="/auth/login/email" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"

@Component({
  name: "Home",
  components: {
    AuthMethod
  }
})

export default class Login extends Vue {
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  &__logo {
    display: flex;
    align-items: center;

    margin-top: 20%;
    margin-bottom: 15%;

    gap: 2rem;

    &-image {
      width: 6.5rem;
    }

    &-title {
      font-size: 3.5rem;
      font-weight: 500;

      color: #0A204B;
    }
  }

  &__message,
  &__submessage {
    text-align: center;

    color: #0B204C;
  }

  &__message {
    margin-bottom: 5%;

    font-weight: 600;
    font-size: 3.5rem;
    line-height: 4.5rem;

    text-shadow: 0 .4rem .4rem rgba(0, 0, 0, .25);
  }

  &__submessage {
    font-size: 1.6rem;
  }
}
</style>

<i18n>
{
  "en": {
    "message": "Manage your projects & tasks easily",
    "submessage": "Easy way to manage daily task and office management.",
    "Password": "Password",
    "Submit": "Submit",
    "Reset Form": "Reset Form",
    "Log In": "Log In"
  },
  "ru": {
    "message": "Manage your projects & tasks easily",
    "submessage": "Easy way to manage daily task and office management.",
    "Password": "Пароль",
    "Submit": "Войти",
    "Reset Form": "Очистить",
    "Log In": "Войти"
  }
}
</i18n>
