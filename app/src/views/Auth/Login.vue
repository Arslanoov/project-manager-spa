<template>
  <v-container class="login-page" fill-height fluid>
    <v-row class="form-row" justify="center" align-self="center">
      <v-col
          xs="10"
          sm="9"
          md="4"
      >
        <h2 class="title text-center">Log In</h2>

        <v-alert
            v-if="authForm.error"
            class="alert"
            border="bottom"
            color="pink darken-1"
            dark
        >
          {{ authForm.error }}
        </v-alert>

        <v-form
            ref="form"
            lazy-validation
        >
          <v-text-field
              @input="setEmail"
              :counter="32"
              :rules="rules.email"
              :value="authForm.email"
              label="E-mail"
              class="email-field"
              type="email"
              required
          ></v-text-field>

          <v-text-field
              @input="setPassword"
              :counter="32"
              :rules="rules.password"
              :value="authForm.password"
              class="password-field"
              label="Password"
              type="password"
              required
          ></v-text-field>

          <div class="buttons">
            <v-btn
                @click="onSubmit"
                color="success"
                class="button mr-4"
            >
              Submit
            </v-btn>

            <v-btn
                @click="onReset"
                color="error"
                class="button mr-4"
            >
              Reset Form
            </v-btn>

            <v-btn
                @click="onResetValidation"
                color="warning"
                class="button"
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

import AuthForm from "@/types/user/forms/AuthForm"

import User from "@/store/modules/user"

const userModule = namespace("User")

@Component({
  name: "Login"
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

    this.login()
      .then(() => this.$router.push("/"))
  }
}
</script>

<style lang="scss">
.login-page {
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
