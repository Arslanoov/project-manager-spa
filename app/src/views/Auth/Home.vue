<template>
  <div class="container">
    <div class="home">
      <Logo class="home__logo" />

      <h2 class="home__message">{{ $t("message") }}</h2>
      <p class="home__submessage">{{ $t("submessage") }}</p>

      <div class="home__methods">
        <AuthMethod name="E-mail" link="/auth/login/email" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Logo from "@/components/base/logo/Logo.vue"
import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"

@Component({
  name: "Home",
  components: {
    Logo,
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

  &__logo {
    margin-top: 20%;
    margin-bottom: 15%;
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

  &__methods {
    width: 100%;

    margin-top: 35%;
    margin-bottom: 15%;
  }
}
</style>

<i18n>
{
  "en": {
    "message": "Manage your projects & tasks easily",
    "submessage": "Easy way to manage daily task and office management."
  },
  "ru": {
    "message": "Manage your projects & tasks easily",
    "submessage": "Easy way to manage daily task and office management."
  }
}
</i18n>
