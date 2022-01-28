<template>
  <auth-layout>
    <div class="container">
      <div class="login">
        <form class="login__form">
          <div v-if="authForm.error" class="login__error">
            {{ authForm.error }}
          </div>

          <FormGroup
              @change="setEmail"
              @update-error-state="setHasErrors"
              :clear-count="clearCount"
              :value="authForm.email"
              :rules="rules.email"
              name="E-mail"
              id="email"
              type="email"
          />

          <FormGroup
              @change="setPassword"
              @update-error-state="setHasErrors"
              :clear-count="clearCount"
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
            />

            <FormButton
                @form-submit="onReset"
                :name="$t('Reset Form')"
            />

            <div class="login__not-signed-up" @click="onRegister">{{ $t('not-signed-up') }}</div>
          </div>
        </form>
      </div>
    </div>
  </auth-layout>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {
  namespace
} from "vuex-class"

import { routesNames } from "@/router/names"

import AuthForm from "@/types/user/forms/AuthForm"

import User from "@/store/modules/user"

import AuthLayout from "@/layouts/AuthLayout.vue"
import FormGroup from "@/components/base/form/group/FormGroup.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"
import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"

const userModule = namespace("User")

@Component({
  name: "Login",
  components: {
    AuthLayout,
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

  public valid = true
  public clearCount = 0

  public rules = {
    email: [
      (v: string) => !!v || this.$t('email-required'),
      (v: string) => /.+@.+\..+/.test(v) || this.$t('email-valid'),
      (v: string) => (v && v.length > 5) || this.$t('email-length'),
      (v: string) => (v && v.length < 32) || this.$t('email-length')
    ],
    password: [
      (v: string) => !!v || this.$t('password-required'),
      (v: string) => (v && v.length > 6) || this.$t('password-length'),
      (v: string) => (v && v.length < 32) || this.$t('password-length')
    ]
  }

  public setHasErrors(hasErrors: boolean): void {
    this.valid = !hasErrors
  }

  public onReset(): void {
    this.clearForm()
    this.clearFormError()
    this.setHasErrors(false)
    this.clearCount++
  }

  public onSubmit(): void {
    this.login()
      .then(() => {
        this.clearForm()
        this.clearFormError()
        this.$router.push({
          name: routesNames.Board
        })
      })
  }

  public onRegister(): void {
    this.$router.push({ name: routesNames.SignUp })
  }
}
</script>

<style lang="scss" scoped>
.login {
  grid-column: col-start 1 / col-end 12;

  display: flex;
  flex-direction: column;
  align-items: center;

  @include desktop-sm {
    grid-column: col-start 4 / col-end 9;
  }

  &__error {
    color: #F26950;
  }

  &__form {
    width: 100%;

    & > * {
      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 3rem;

    @include mobile {
      margin-top: 8rem;
    }

    & > * {
      margin-bottom: 1rem;
    }
  }

  &__not-signed-up {
    font-weight: 700;

    color: #5A55CA;

    &:hover {
      cursor: pointer;
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
    "Log In": "Log In",
    "not-signed-up": "Not Signed Up?",
    "email-required": "E-mail is required",
    "password-required": "Password is required",
    "email-length": "E-mail must be between 5 and 32 characters long",
    "email-valid": "E-mail must be valid",
    "password-length": "Password must be between 6 and 32 characters long"
  },
  "ru": {
    "manage": "Управлять своими проектами & задачами просто",
    "Password": "Пароль",
    "Submit": "Войти",
    "Reset Form": "Очистить",
    "Log In": "Войти",
    "not-signed-up": "Еще не зарегистрированы?",
    "email-required": "E-mail обязателен",
    "password-required": "Пароль обязателен",
    "email-length": "Длина E-mail должна составлять от 5 до 32 символов",
    "email-valid": "Некорректный E-mail",
    "password-length": "Длина пароля должна составлять от 7 до 32 символов"
  }
}
</i18n>
