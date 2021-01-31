<template>
  <nav class="nav">
    <template v-if="isAuth">
      <v-btn
          @click="onGoSchedule"
          text
      >
        <span class="mr-2">Daily schedule</span>
      </v-btn>
      <v-btn
          @click="onExit"
          text
      >
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </template>
    <template v-else>
      <v-btn
          @click="onLogin"
          text
      >
        <span class="mr-2">Login</span>
      </v-btn>

      <v-btn
          @click="onSignUp"
          text
      >
        <span class="mr-2">Sign Up</span>
      </v-btn>
    </template>
  </nav>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {
  namespace
} from "vuex-class"

import { routesNames } from "@/router"

import User from "@/store/modules/user"

const userModule = namespace("User")

@Component({
  name: "Nav"
})

export default class Nav extends Vue {
  @userModule.Getter("isAuth") isAuth: boolean

  @userModule.Action("logout") logout: typeof User.prototype.logout

  public onGoSchedule(): void {
    this.$router.push({
      name: routesNames.DailySchedule
    }).catch(() => console.log("Already in schedule page"))
  }

  public onExit(): void {
    this.logout()
      .then(() => this.$router.push({
        name: routesNames.Home
      })).catch(() => console.log("Already in home page"))
  }

  public onLogin(): void {
    this.$router.push({
      name: routesNames.Login
    }).catch(() => console.log("Already in auth page"))
  }

  public onSignUp(): void {
    this.$router.push({
      name: routesNames.SignUp
    }).catch(() => console.log("Already in sign up page"))
  }
}
</script>
