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

            <div class="sign-up__already-signed-up" @click="onLogin">Уже есть аккаунт? Войти</div>
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
      // TODO: i18n
      (v: string) => !!v || "Login is required",
      (v: string) => (v && v.length > 4) || "Login must be more than 4 characters",
      (v: string) => (v && v.length < 32) || "Login must be less than 32 characters"
    ],
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
  
  &__already-signed-up {
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
    "Sign Up": "Sign Up",
    "Login": "Login",
    "Password": "Password",
    "Submit": "Submit",
    "Reset Form": "Reset Form",
    "Reset Validation": "Reset Validation"
  },
  "ru": {
    "Sign Up": "Регистрация",
    "Login": "Логин",
    "Password": "Пароль",
    "Submit": "Отправить письмо на почту",
    "Reset Form": "Очистить",
    "Reset Validation": "Очистить ошибки валидации"
  }
}
</i18n>
