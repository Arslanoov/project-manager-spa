<template>
  <auth-layout>
    <div class="container">
      <div class="home">
        <h2 class="home__message">{{ $t('message') }}</h2>
        <p class="home__submessage">{{ $t('submessage') }}</p>

        <div class="home__methods">
          <AuthMethod class="home__method" :action="$t('Sign In')" name="E-mail" link="/auth/login/email" />
          <AuthMethod class="home__method" :action="$t('Sign Up')" name="E-mail" link="/auth/sign-up" />
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import AuthLayout from "@/layouts/AuthLayout.vue"
import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"

@Component({
  name: "Home",
  components: {
    AuthLayout,
    AuthMethod
  }
})

export default class Login extends Vue {
}
</script>

<style lang="scss" scoped>
.home {
  grid-column: col-start 1 / col-end 12;

  display: flex;
  flex-direction: column;
  align-items: center;

  @include desktop-sm {
    grid-column: col-start 3 / col-end 10;
  }

  &__logo {
    margin-top: 4rem;
    margin-bottom: 3.5rem;

    @include mobile {
      margin-top: 6rem;
      margin-bottom: 4.5rem;
    }
  }

  &__message,
  &__submessage {
    text-align: center;

    color: #0B204C;
  }

  &__message {
    margin-bottom: 2.4rem;

    font-weight: 600;
    font-size: 3.5rem;
    line-height: 4.5rem;

    text-shadow: 0 .4rem .4rem rgba(0, 0, 0, .25);
  }

  &__submessage {
    font-size: 1.6rem;
  }

  &__methods {
    width: 100%;

    margin: 2rem 0;

    @include mobile {
      margin-top: 13rem;
    }
  }

  &__method {
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "message": "Manage your projects & tasks easily",
    "submessage": "Easy way to manage daily task and office management.",
    "Sign In": "Sign In",
    "Sign Up": "Sign Up"
  },
  "ru": {
    "message": "Управляйте своими проектами & задачами",
    "submessage": "Простой способ управлять ежедневными задачами и офисом.",
    "Sign In": "Войти",
    "Sign Up": "Зарегистрироваться"
  }
}
</i18n>
