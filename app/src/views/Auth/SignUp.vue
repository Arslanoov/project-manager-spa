<template>
  <v-container class="sign-up-page" fill-height fluid>
    <v-row class="form-row" justify="center" align-self="center">
      <v-col
          xs="10"
          sm="9"
          md="4"
      >
        <h2 class="title text-center">Sign Up</h2>

        <v-alert
            v-if="signUpForm.error"
            class="alert"
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
              :counter="32"
              :rules="rules.login"
              :value="signUpForm.login"
              @input="setLogin"
              label="Login"
              type="text"
              required
          ></v-text-field>

          <v-text-field
              :counter="32"
              :rules="rules.email"
              :value="signUpForm.email"
              @input="setEmail"
              label="E-mail"
              type="email"
              required
          ></v-text-field>

          <v-text-field
              :counter="32"
              :rules="rules.password"
              :value="signUpForm.password"
              @input="setPassword"
              label="Password"
              type="password"
              required
          ></v-text-field>

          <div class="buttons">
            <v-btn
                color="success"
                class="button mr-4"
                @click="onSubmit"
            >
              Submit
            </v-btn>

            <v-btn
                color="error"
                class="button mr-4"
                @click="onReset"
            >
              Reset Form
            </v-btn>

            <v-btn
                color="warning"
                class="button"
                @click="onResetValidation"
            >
              Reset Validation
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
      .then(() => this.$router.push({ name: routesNames.Login }))
  }
}
</script>

<style lang="scss">
.sign-up-page {
  .alert {
    margin: 20px 0;
  }

  .form-row {
    margin-top: -64px;
  }

  .buttons {
    .button {
      margin-top: 20px;
    }
  }
}
</style>
