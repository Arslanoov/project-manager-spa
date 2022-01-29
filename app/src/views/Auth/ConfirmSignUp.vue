<template>
  <auth-layout>
    <div class="container">
      <div class="confirm-sign-up">
        <form class="confirm-sign-up__form">
          <div v-if="confirmSignUpForm.error" class="confirm-sign-up__error">
            {{ confirmSignUpForm.error }}
          </div>

          <p class="confirm-sign-up__token">{{ $t('Token') }}: {{ token }}</p>

          <div class="confirm-sign-up__buttons">
            <FormButton
              @form-submit="onSubmit"
              :name="$t('Join')"
            />
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

import User from "@/store/modules/user"

import AuthLayout from "@/layouts/AuthLayout.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"
import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"

const userModule = namespace("User")

@Component({
  name: "ConfirmSignUp",
  components: {
    AuthLayout,
    AuthMethod,
    FormButton,
  }
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
      .then(() => this.$router.push({ name: routesNames.Board }))
  }

  public setToken(token: string): void {
    if (!token) {
      this.$router.push({ name: routesNames.Board })
    }

    this.setFormToken(token)
  }
}
</script>

<style lang="scss" scoped>
.confirm-sign-up {
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

  &__form,
  &__token {
    text-align: center;
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
    "Join": "Присоединиться"
  }
}
</i18n>
