<template>
  <div class="container">
    <div class="login">
      <Logo class="login__logo" />

      <form class="login__form">
        <div v-if="authForm.error" class="login__error">
          {{ authForm.error }}
        </div>

        <FormGroup
          @change="setEmail"
          @update-error-state="setIsValid"
          :value="authForm.email"
          :rules="rules.email"
          name="E-mail"
          id="email"
          type="email"
        />

        <FormGroup
          @change="setPassword"
          @update-error-state="setIsValid"
          :value="authForm.password"
          :rules="rules.password"
          :name="$t(`Password`)"
          id="password"
          type="password"
        />

        <div class="login__buttons">
          <FormButton
            @form-submit="onSubmit"
            :name="$t('Submit')"
            :disabled="!valid"
            type="success"
          />

          <FormButton
            @form-submit="onReset"
            :name="$t('Reset Form')"
            type="error"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {
  namespace
} from "vuex-class"

import AuthForm from "@/types/user/forms/AuthForm"

import User from "@/store/modules/user"

import FormGroup from "@/components/base/form/group/FormGroup.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"
import AuthMethod from "@/components/common/auth/method/AuthMethod.vue"
import Logo from "@/components/base/logo/Logo.vue"

const userModule = namespace("User")

@Component({
  name: "Login",
  components: {
    Logo,
    AuthMethod,
    FormButton,
    FormGroup
  }
})

export default class Login extends Vue {
  @userModule.State("authForm") authForm: AuthForm

  @userModule.Mutation("setAuthFormEmail") setEmail: typeof User.prototype.setAuthFormEmail
  @userModule.Mutation("setAuthFormPassword") setPassword: typeof User.prototype.setAuthFormPassword
  @userModule.Mutation("clearAuthFormError") clearFormError: typeof User.prototype.clearAuthFormError
  @userModule.Mutation("clearAuthForm") clearForm: typeof User.prototype.clearAuthForm

  @userModule.Action("login") login: typeof User.prototype.login

  public valid = true

  public rules = {
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

  public setIsValid(isValid: boolean): void {
    this.valid = isValid
  }

  public onReset(): void {
    this.clearForm()
    this.clearFormError()
  }

  public onSubmit(): void {
    this.login()
      .then(() => {
        this.clearForm()
        this.clearFormError()
        this.$router.push("/")
      })
  }
}
</script>

<style lang="scss" scoped>
.login {
  grid-column: col-start 1 / col-end 12;

  display: flex;
  flex-direction: column;
  align-items: center;

  @include desktop-sm {
    grid-column: col-start 4 / col-end 8;
  }

  &__logo {
    margin-top: 4rem;
    margin-bottom: 3.5rem;

    @include mobile {
      margin-top: 6rem;
      margin-bottom: 4.5rem;
    }
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
}
</style>

<i18n>
{
  "en": {
    "manage": "Manage your projects & tasks easily",
    "Password": "Password",
    "Submit": "Submit",
    "Reset Form": "Reset Form",
    "Log In": "Log In"
  },
  "ru": {
    "manage": "Manage your projects & tasks easily",
    "Password": "Пароль",
    "Submit": "Войти",
    "Reset Form": "Очистить",
    "Log In": "Войти"
  }
}
</i18n>
