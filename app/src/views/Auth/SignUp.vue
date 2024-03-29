<template>
  <auth-layout>
    <div class="container">
      <div class="sign-up">
        <form class="sign-up__form">
          <div v-if="signUpForm.error" class="sign-up__error">
            {{ signUpForm.error }}
          </div>

          <FormGroup
            @change="setLogin"
            @update-error-state="setHasErrors"
            :clear-count="clearCount"
            :value="signUpForm.login"
            :rules="rules.login"
            name="Login"
            id="login"
            type="text"
          />
          
          <FormGroup
            @change="setEmail"
            @update-error-state="setHasErrors"
            :clear-count="clearCount"
            :value="signUpForm.email"
            :rules="rules.email"
            name="E-mail"
            id="email"
            type="email"
          />

          <FormGroup
            @change="setPassword"
            @update-error-state="setHasErrors"
            :clear-count="clearCount"
            :value="signUpForm.password"
            :rules="rules.password"
            :name="$t(`Password`)"
            id="password"
            type="password"
          />

          <div class="sign-up__buttons">
            <FormButton
              @form-submit="onSubmit"
              :name="$t('Submit')"
              :disabled="!valid"
            />

            <FormButton
              @form-submit="onReset"
              :name="$t('Reset Form')"
            />

            <div class="sign-up__already-signed-up" @click="onLogin">{{ $t(`have-account`) }}</div>
          </div>
        </form>
      </div>
    </div>
  </auth-layout>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { namespace } from "vuex-class"

import { routesNames } from "@/router/names"

import User from "@/store/modules/user"

import SignUpForm from "@/types/user/forms/SignUpForm"

import AuthLayout from "@/layouts/AuthLayout.vue"
import FormGroup from "@/components/base/form/group/FormGroup.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"
import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"

const userModule = namespace("User")

@Component({
  name: "SignUp",
  components: {
    AuthLayout,
    AuthMethod,
    FormButton,
    FormGroup
  }
})

export default class SignUp extends Vue {
  @userModule.State("signUpForm") signUpForm: SignUpForm

  @userModule.Mutation("setSignUpFormLogin") setLogin: typeof User.prototype.setSignUpFormLogin
  @userModule.Mutation("setSignUpFormEmail") setEmail: typeof User.prototype.setSignUpFormEmail
  @userModule.Mutation("setSignUpFormPassword") setPassword: typeof User.prototype.setSignUpFormPassword
  @userModule.Mutation("clearSignUpFormError") clearFormError: typeof User.prototype.clearSignUpFormError
  @userModule.Mutation("clearSignUpForm") clearForm: typeof User.prototype.clearSignUpForm

  @userModule.Action("signUp") signUp: typeof User.prototype.signUp

  $refs!: {
    form: HTMLFormElement
  }

  public valid = true
  public clearCount = 0

  public rules = {
    login: [
      (v: string) => !!v || this.$t('login-required'),
      (v: string) => (v && v.length > 4) || this.$t('login-length'),
      (v: string) => (v && v.length < 32) || this.$t('login-length')
    ],
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
    this.signUp()
      .then(() => {
        this.clearForm()
        this.clearFormError()
        this.$router.push({ name: routesNames.AuthHome })
      })
  }

  public onLogin(): void {
    this.$router.push({ name: routesNames.LoginEmail })
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
  grid-column: col-start 1 / col-end 12;

  display: flex;
  flex-direction: column;
  align-items: center;

  @include desktop-sm {
    grid-column: col-start 4 / col-end 9;
  }

  &__error {
    color: $error-color;
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
  
  &__already-signed-up {
    font-weight: $bold;

    color: $indigo;

    @include pointer-on-hover();
  }
}
</style>

<i18n>
{
  "en": {
    "Sign Up": "Sign Up",
    "Login": "Login",
    "Password": "Password",
    "Submit": "Submit",
    "Reset Form": "Reset Form",
    "Reset Validation": "Reset Validation",
    "have-account": "Already have an account? Sign in",
    "login-required": "Login is required",
    "email-required": "E-mail is required",
    "password-required": "Password is required",
    "login-length": "Login must be between 4 and 32 characters long",
    "email-length": "E-mail must be between 5 and 32 characters long",
    "email-valid": "E-mail must be valid",
    "password-length": "Password must be between 6 and 32 characters long"
  },
  "ru": {
    "Sign Up": "Регистрация",
    "Login": "Логин",
    "Password": "Пароль",
    "Submit": "Отправить письмо на почту",
    "Reset Form": "Очистить",
    "Reset Validation": "Очистить ошибки валидации",
    "have-account": "Уже есть аккаунт? Войти",
    "login-required": "Логин обязателен",
    "email-required": "E-mail обязателен",
    "password-required": "Пароль обязателен",
    "login-length": "Длина логина должна составлять от 4 до 32 символов",
    "email-length": "Длина E-mail должна составлять от 5 до 32 символов",
    "email-valid": "Некорректный E-mail",
    "password-length": "Длина пароля должна составлять от 7 до 32 символов"
  }
}
</i18n>
