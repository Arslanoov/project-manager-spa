<template>
  <v-container class="sign-up" fill-height fluid>
    <v-row class="sign-up__row" justify="center" align-self="center">
      <v-col
          xs="10"
          sm="9"
          md="4"
      >
        <h2 class="sign-up__title text-center">{{ $t("Sign Up") }}</h2>

        <v-alert
            v-if="signUpForm.error"
            class="sign-up__alert"
            border="bottom"
            color="pink darken-1"
            dark
        >
          {{ signUpForm.error }}
        </v-alert>

        <v-form
            ref="form"
            lazy-validation
        >
          <v-text-field
              @input="setLogin"
              :counter="32"
              :rules="rules.login"
              :value="signUpForm.login"
              :label="$t(`Login`)"
              type="text"
              required
          ></v-text-field>

          <v-text-field
              @input="setEmail"
              :counter="32"
              :rules="rules.email"
              :value="signUpForm.email"
              label="E-mail"
              type="email"
              required
          ></v-text-field>

          <v-text-field
              @input="setPassword"
              :counter="32"
              :rules="rules.password"
              :value="signUpForm.password"
              :label="$t(`Password`)"
              type="password"
              required
          ></v-text-field>

          <div class="sign-up__buttons">
            <v-btn
                @click="onSubmit"
                color="success"
                class="sign-up__button mr-4"
            >
              {{ $t("Submit") }}
            </v-btn>

            <v-btn
                @click="onReset"
                color="error"
                class="sign-up__button mr-4"
            >
              {{ $t("Reset Form") }}
            </v-btn>

            <v-btn
                @click="onResetValidation"
                color="warning"
                class="sign-up__button"
            >
              {{ $t("Reset Validation") }}
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {
  namespace
} from "vuex-class"

import { routesNames } from "@/router/names"

import User from "@/store/modules/user"
import SignUpForm from "@/types/user/forms/SignUpForm"

const userModule = namespace("User")

@Component({
  name: "SignUp"
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

  public rules = {
    login: [
      (v: string) => !!v || "Login is required",
      (v: string) => (v && v.length > 4) || "Login must be more than 4 characters",
      (v: string) => (v && v.length < 32) || "Login must be less than 32 characters"
    ],
    email: [
      (v: string) => !!v || "E-mail is required",
      (v: string) => (v && v.length > 5) || "E-mail must be more than 5 characters",
      (v: string) => (v && v.length < 32) || "E-mail must be less than 32 characters",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: [
      (v: string) => !!v || "Password is required",
      (v: string) => (v && v.length > 6) || "Password must be more than 6 characters",
      (v: string) => (v && v.length < 32) || "Password must be less than 32 characters"
    ]
  }

  public onReset(): void {
    this.$refs.form.reset()
    this.clearForm()
  }

  public onResetValidation(): void {
    this.$refs.form.resetValidation()
    this.clearFormError()
  }

  public onSubmit(): void {
    this.$refs.form.validate()

    this.signUp()
      .then(() => this.$router.push({ name: routesNames.AuthHome }))
  }
}
</script>

<style lang="scss" scoped>
.sign-up {
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
