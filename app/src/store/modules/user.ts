import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import axios from "axios"

import UserInterface from "@/types/user/UserInterface"
import AuthForm from "@/types/user/forms/AuthForm"
import SignUpForm from "@/types/user/forms/SignUpForm"
import ConfirmSignUpForm from "@/types/user/forms/ConfirmSignUpForm"

import UserService from "@/services/api/v1/UserService"

const service: UserService = new UserService()

@Module({
  namespaced: true
  // Add for tests name: "user"
  // TODO: Fix
})

class User extends VuexModule {
  user: UserInterface|null = JSON.parse(localStorage.getItem('user') as string)
  refreshToken: string|null = ""

  authForm: AuthForm = {
    email: null,
    password: null,
    error: null
  }

  signUpForm: SignUpForm = {
    login: null,
    email: null,
    password: null,
    error: null
  }

  confirmSignUpForm: ConfirmSignUpForm = {
    token: null,
    error: null
  }

  @Mutation
  public setUser(user: UserInterface): void {
    this.user = user
  }

  @Mutation
  public setRefreshToken(token: string): void {
    this.refreshToken = token
  }

  @Mutation
  public deleteUser(): void {
    this.user = null
    this.refreshToken = null
  }

  // Auth Form

  @Mutation
  public setAuthFormEmail(email: string): void {
    this.authForm.email = email
  }

  @Mutation
  public setAuthFormPassword(password: string): void {
    this.authForm.password = password
  }

  @Mutation
  public setAuthFormError(error: string): void {
    this.authForm.error = error
  }

  @Mutation
  public clearAuthFormError(): void {
    this.authForm.error = null
  }

  @Mutation
  public clearAuthForm(): void {
    this.authForm = {
      email: null,
      password: null,
      error: null
    }
  }

  // Sign Up Form

  @Mutation
  public setSignUpFormLogin(login: string): void {
    this.signUpForm.login = login
  }

  @Mutation
  public setSignUpFormEmail(email: string): void {
    this.signUpForm.email = email
  }

  @Mutation
  public setSignUpFormPassword(password: string): void {
    this.signUpForm.password = password
  }

  @Mutation
  public setSignUpFormError(error: string): void {
    this.signUpForm.error = error
  }

  @Mutation
  public clearSignUpFormError(): void {
    this.signUpForm.error = null
  }

  @Mutation
  public clearSignUpForm(): void {
    this.signUpForm = {
      login: null,
      email: null,
      password: null,
      error: null
    }
  }

  // Confirm Sign Up Form

  @Mutation
  public setConfirmSignUpFormToken(token: string): void {
    this.confirmSignUpForm.token = token
  }

  @Mutation
  public setConfirmSignUpFormError(error: string): void {
    this.confirmSignUpForm.error = error
  }

  @Mutation
  public clearConfirmSignUpFormError(): void {
    this.confirmSignUpForm.error = null
  }

  @Action({ rawError: true })
  public async login(): Promise<{user: UserInterface}> {
    return new Promise((resolve, reject) => {
      this.context.commit("deleteUser")

      service.auth(this.authForm.email, this.authForm.password)
        .then(response => {
          const user = response.data
          localStorage.setItem("user", JSON.stringify(user))
          this.context.commit("clearAuthForm")
          this.context.commit("setUser", user)
          axios.defaults.headers.common["Authorization"] = this.context.getters.bearerToken
          resolve(user)
        })
        .catch(error => {
          console.log(error)
          this.context.commit("deleteUser")
          this.context.commit("setAuthFormError", error.response.data.error)
          localStorage.removeItem("user")
          reject(error)
        })
    })
  }

  @Action({ rawError: true })
  public logout(): Promise<{}> {
    return new Promise((resolve, reject) => {
      try {
        this.context.commit("deleteUser")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common["Authorization"]
        resolve({})
      } catch (e) {
        reject(e)
      }
    })
  }

  @Action({ rawError: true })
  public async refresh(): Promise<void> {
    if (this.user) {
      delete axios.defaults.headers.common["Authorization"]
      const user = await service.refresh(this.refreshToken)
      localStorage.setItem("user", JSON.stringify(user))
      axios.defaults.headers.common["Authorization"] = this.bearerToken
      this.context.commit("setUser", user)
      return
    }

    throw new Error("User not found")
  }

  @Action({ rawError: true })
  public async signUp(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.context.commit("clearSignUpFormError")

      service.signUp(this.signUpForm.login, this.signUpForm.email, this.signUpForm.password)
        .then(response => resolve(response.data))
        .catch(error => {
          console.log(error)
          this.context.commit("setSignUpFormError", error.response.data.error)
          reject(error.response)
        })
    })
  }

  @Action({ rawError: true })
  public async confirmSignUp(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.context.commit("clearConfirmSignUpFormError")
      service.confirmSignUp(this.confirmSignUpForm.token)
        .then(response => resolve(response.data))
        .catch(error => {
          console.log(error)
          this.context.commit("setConfirmSignUpFormError", error.response.data.error)
          reject(error.response)
        })
    })
  }

  get bearerToken(): string {
    return this.user ? "Bearer " + this.user.access_token : ""
  }

  get isAuth(): boolean {
    return !!this.user
  }
}

export default User
