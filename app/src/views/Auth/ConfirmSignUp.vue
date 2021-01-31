<template>
  <v-container class="confirm-sign-up-page" fill-height fluid>
    <v-row class="form-row" justify="center" align-self="center">
      <v-col
          xs="10"
          sm="9"
          md="4"
      >
        <h2 class="title text-center">Confirm Sign Up</h2>

        <v-alert
            v-if="confirmSignUpForm.error"
            class="alert"
            border="bottom"
            color="pink darken-1"
            dark
        >
          {{ confirmSignUpForm.error }}
        </v-alert>

        <p class="token">Token: {{ token }}</p>

        <div class="buttons">
          <v-btn
              color="success"
              class="button"
              @click="onSubmit"
          >
            Join
          </v-btn>
        </div>
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

const userModule = namespace("User")

@Component({
  name: "ConfirmSignUp"
})

export default class SignUp extends Vue {
  @userModule.State("confirmSignUpForm") confirmSignUpForm: typeof User.prototype.confirmSignUpForm

  @userModule.Mutation("setConfirmSignUpFormToken") setFormToken: typeof User.prototype.setConfirmSignUpFormToken

  @userModule.Action("confirmSignUp") confirmSignUp: typeof User.prototype.confirmSignUp

  public token = this.$route.params.token ?? "" as string

  public mounted(): void {
    this.setToken(this.token)
  }

  public onSubmit(): void {
    this.confirmSignUp()
      .then(() => this.$router.push({ name: routesNames.Home }))
  }

  public setToken(token: string): void {
    if (!token) {
      this.$router.push({ name: routesNames.Home })
    }

    this.setFormToken(token)
  }
}
</script>

<style lang="scss">
.confirm-sign-up-page {
  margin-top: -64px;

  .alert {
    margin: 20px 0;
    text-align: center;
  }

  .token {
    text-align: center;
  }

  .buttons {
    text-align: center;
  }
}
</style>
