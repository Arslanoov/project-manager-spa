<template>
  <div class="login">
    <div class="login__logo">
      <img class="login__logo-image" src="~@/assets/images/logo.svg" alt="Logo">
      <h1 class="login__logo-title">{{ appName }}</h1>
    </div>

    <div v-if="authForm.error">
      {{ authForm.error }}
    </div>

    <form>
      <FormGroup
        @change="setEmail"
        @update-error-state="setIsValid"
        :value="authForm.email"
        :rules="rules.email"
        name="E-mail"
        id="email"
        type="email"
      />

      <!-- TODO: Counter -->

      <FormGroup
        @change="setPassword"
        @update-error-state="setIsValid"
        :value="authForm.password"
        :rules="rules.password"
        :name="$t(`Password`)"
        id="password"
        type="password"
      />

      <div class="login__buttons">
        <FormButton
            @form-submit="onSubmit"
            :name="$t('Submit')"
            :disabled="!valid"
            type="success"
        />

        <FormButton
            @form-submit="onReset"
            :name="$t('Reset Form')"
            type="error"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {
  namespace
} from "vuex-class"

import AuthForm from "@/types/user/forms/AuthForm"

import User from "@/store/modules/user"

import { APP_NAME } from "@/const/app"

import FormGroup from "@/components/base/form/group/FormGroup.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"
import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"

const userModule = namespace("User")

@Component({
  name: "Login",
  components: {
    AuthMethod,
    FormButton,
    FormGroup
  }
})

export default class Login extends Vue {
  @userModule.State("authForm") authForm: AuthForm

  @userModule.Mutation("setAuthFormEmail") setEmail: typeof User.prototype.setAuthFormEmail
  @userModule.Mutation("setAuthFormPassword") setPassword: typeof User.prototype.setAuthFormPassword
  @userModule.Mutation("clearAuthFormError") clearFormError: typeof User.prototype.clearAuthFormError
  @userModule.Mutation("clearAuthForm") clearForm: typeof User.prototype.clearAuthForm

  @userModule.Action("login") login: typeof User.prototype.login

  $refs!: {
    form: HTMLFormElement
  }

  public valid = true
  public appName = APP_NAME

  public rules = {
    email: [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      // TODO: Change validation errors
      (v: string) => (v && v.length > 5) || "E-mail must be more than 5 characters",
      (v: string) => (v && v.length < 32) || "E-mail must be less than 32 characters"
    ],
    password: [
      (v: string) => !!v || "Password is required",
      (v: string) => (v && v.length > 6) || "Password must be more than 6 characters",
      (v: string) => (v && v.length < 32) || "Password must be less than 32 characters"
    ]
  }

  public setIsValid(isValid: boolean): void {
    this.valid = isValid
  }

  public onReset(): void {
    this.clearForm()
    this.clearFormError()
  }

  public onSubmit(): void {
    this.login()
      .then(() => {
        this.clearForm()
        this.clearFormError()
        this.$router.push("/")
      })
  }
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

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "manage": "Manage your projects & tasks easily",
    "Password": "Password",
    "Submit": "Submit",
    "Reset Form": "Reset Form",
    "Log In": "Log In"
  },
  "ru": {
    "manage": "Manage your projects & tasks easily",
    "Password": "Пароль",
    "Submit": "Войти",
    "Reset Form": "Очистить",
    "Log In": "Войти"
  }
}
</i18n>
