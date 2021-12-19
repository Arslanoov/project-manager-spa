<template>
  <div class="login">
    <h2 class="login__title text-center">{{ $t("Log In") }}</h2>

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

import FormGroup from "@/components/base/form/group/FormGroup.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"

const userModule = namespace("User")

@Component({
  name: "Login",
  components: {
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
  &__alert {
    margin: 20px 0;
  }

  &__row {
    margin-top: -64px;
  }

  &__button {
    margin-top: 20px;
  }
}
</style>

<i18n>
{
  "en": {
    "Password": "Password",
    "Submit": "Submit",
    "Reset Form": "Reset Form",
    "Log In": "Log In"
  },
  "ru": {
    "Password": "Пароль",
    "Submit": "Войти",
    "Reset Form": "Очистить",
    "Log In": "Войти"
  }
}
</i18n>
