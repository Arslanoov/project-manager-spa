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
import { Component, Vue } from "vue-property-decorator"

import { routesNames } from "@/router"

import { USER_STORE_PREFIX } from "@/store/modules/user"

@Component({
  name: "SignUp"
})

export default class SignUp extends Vue {
  $refs!: {
    form: HTMLFormElement
  }

  public valid = true
  public signUpForm = this.$store.state.User.signUpForm

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
    this.$store.commit(USER_STORE_PREFIX + "clearSignUpForm")
  }

  public onResetValidation(): void {
    this.$refs.form.resetValidation()
    this.$store.commit(USER_STORE_PREFIX + "clearSignUpFormError")
  }

  public onSubmit(): void {
    this.$refs.form.validate()

    this.$store.dispatch(USER_STORE_PREFIX + "signUp")
      .then(() => this.$router.push({ name: routesNames.Login }))
  }

  public setLogin(value: string): void {
    this.$store.commit(USER_STORE_PREFIX + "setSignUpFormLogin", value)
  }

  public setEmail(value: string): void {
    this.$store.commit(USER_STORE_PREFIX + "setSignUpFormEmail", value)
  }

  public setPassword(value: string): void {
    this.$store.commit(USER_STORE_PREFIX + "setSignUpFormPassword", value)
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