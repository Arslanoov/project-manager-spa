<template>
  <v-container class="confirm" fill-height fluid>
    <v-row class="form-row" justify="center" align-self="center">
      <v-col
          xs="10"
          sm="9"
          md="4"
      >
        <h2 class="confirm__title text-center">{{ $t("Confirm Sign Up") }}</h2>

        <v-alert
            v-if="confirmSignUpForm.error"
            class="confirm__alert"
            border="bottom"
            color="pink darken-1"
            dark
        >
          {{ confirmSignUpForm.error }}
        </v-alert>

        <p class="confirm__token">{{ $t("Token") }}: {{ token }}</p>

        <div class="confirm__buttons">
          <v-btn
              color="success"
              class="confirm__button"
              @click="onSubmit"
          >
            {{ $t("Join") }}
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
      .then(() => this.$router.push({ name: routesNames.TodoHome }))
  }

  public setToken(token: string): void {
    if (!token) {
      this.$router.push({ name: routesNames.TodoHome })
    }

    this.setFormToken(token)
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  margin-top: -64px;

  &__alert {
    margin: 20px 0;
    text-align: center;
  }

  &__token {
    text-align: center;
  }

  &__buttons {
    text-align: center;
  }
}
</style>

<i18n>
{
  "en": {
    "Confirm Sign Up": "Confirm Sign Up",
    "Token": "Token",
    "Join": "Join"
  },
  "ru": {
    "Confirm Sign Up": "Подтверждение регистрации",
    "Token": "Токен",
    "Join": "Добро пожаловать"
  }
}
</i18n>
