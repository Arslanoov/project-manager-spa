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
import { Component, Vue } from "vue-property-decorator"

import { routesNames } from "@/router"

import { USER_STORE_PREFIX } from "@/store/modules/user"

@Component({
  name: "ConfirmSignUp"
})

export default class SignUp extends Vue {
  public token = this.$route.params.token as string|null

  public confirmSignUpForm = this.$store.state.User.confirmSignUpForm

  public mounted(): void {
    this.setToken(this.token)
  }

  public onSubmit(): void {
    this.$store.dispatch(USER_STORE_PREFIX + "confirmSignUp")
      .then(() => this.$router.push({ name: routesNames.Home }))
  }

  public setToken(token: string|null): void {
    if (!token) {
      this.$router.push({ name: routesNames.Home })
    }

    this.$store.commit(USER_STORE_PREFIX + "setConfirmSignUpFormToken", token)
  }
}
</script>

<style lang="scss">
.confirm-sign-up-page {
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