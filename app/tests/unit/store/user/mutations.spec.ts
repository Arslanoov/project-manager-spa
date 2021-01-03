import Vuex from "vuex"

import { getModule } from "vuex-module-decorators"
import { createLocalVue } from "@vue/test-utils"

import User from "@/store/modules/user"
import UserInterface from "@/types/user/UserInterface"

const Vue = createLocalVue()
Vue.use(Vuex)

const factory = () => {
  const store = new Vuex.Store({
    modules: {
      user: User
    }
  })

  return getModule(User, store)
}

const userStore = factory()

describe("User Store", () => {
  it("sets refresh token", () => {
    const token: string = "token"

    userStore.setRefreshToken(token)

    expect(userStore.refreshToken).toEqual(token)
  })

  it("sets user", () => {
    const userObject: UserInterface = {
      access_token: "some_access_token",
      token_type: "password",
      expires_in: 3600,
      scope: "scope"
    }

    userStore.setUser(userObject)

    expect(userStore.user).toEqual(userObject)
  })

  it("sets auth form fields", () => {
    const email = "some@gmail.com"
    const password = "123456"
    const error = "Access denied"

    userStore.setAuthFormEmail(email)
    userStore.setAuthFormPassword(password)
    userStore.setAuthFormError(error)

    expect(userStore.authForm).toEqual({
      email,
      password,
      error
    })

    userStore.clearAuthFormError()

    expect(userStore.authForm.error).toBeNull()
  })

  it("sets sign up form fields", () => {
    const login = "some login"
    const email = "some@gmail.com"
    const password = "123456"
    const error = "Access denied"

    userStore.setSignUpFormLogin(login)
    userStore.setSignUpFormEmail(email)
    userStore.setSignUpFormPassword(password)
    userStore.setSignUpFormError(error)

    expect(userStore.signUpForm).toEqual({
      login,
      email,
      password,
      error
    })

    userStore.clearSignUpFormError()

    expect(userStore.signUpForm.error).toBeNull()
  })

  it("sets confirm sign up form fields", () => {
    const token = "token"
    const error = "Access denied"

    userStore.setConfirmSignUpFormToken(token)
    userStore.setConfirmSignUpFormError(error)

    expect(userStore.confirmSignUpForm).toEqual({
      token,
      error
    })

    userStore.clearConfirmSignUpFormError()

    expect(userStore.confirmSignUpForm.error).toBeNull()
  })
})