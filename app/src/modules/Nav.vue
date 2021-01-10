<template>
  <nav class="nav">
    <template v-if="isAuth">
      <v-btn
          @click="onGoSchedule"
          text
      >
        <span class="mr-2">Schedule</span>
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
import { Component, Vue } from "vue-property-decorator"

import { USER_STORE_PREFIX } from "@/store/modules/user"

import { routesNames } from "@/router"

@Component({
  name: "Nav",
  computed: {
    isAuth(): boolean {
      return this.$store.getters["User/isAuth"]
    }
  }
})

export default class Nav extends Vue {
  public onGoSchedule(): void {
    this.$router.push({
      name: routesNames.Schedule
    }).catch(() => console.log("Already in schedule page"))
  }

  public onExit(): void {
    this.$store.dispatch(USER_STORE_PREFIX + "logout")
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