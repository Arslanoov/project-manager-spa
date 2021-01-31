<template>
  <v-navigation-drawer
      @click.stop="toggleNavVisibility"
      @input="v => v || toggleNavVisibility()"
      :value="isShowNav"
      temporary
      absolute
  >
    <v-list
        nav
        dense
    >
      <v-list-item-group
          active-class="deep-purple--text text--accent-4"
      >
        <template v-if="isAuth">
          <v-list-item @click="onGoPage(routesNames.Home)">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onExit">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item @click="onGoPage(routesNames.Login)">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onGoPage(routesNames.SignUp)">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { namespace } from "vuex-class"

import { routesNames } from "@/router/names"

import User from "@/store/modules/user"

import NavStoreModule from "@/store/modules/nav"

const navModule = namespace("Nav")
const userModule = namespace("User")

@Component({
  name: "Nav"
})

export default class Nav extends Vue {
  @navModule.State("isShowNav") isShowNav: boolean

  @userModule.Getter("isAuth") isAuth: boolean

  @navModule.Mutation("toggleNavVisibility") toggleNavVisibility: typeof NavStoreModule.prototype.toggleNavVisibility

  @userModule.Action("logout") logout: typeof User.prototype.logout

  public routesNames = routesNames

  public onGoPage(name: routesNames): void {
    this.$router.push({
      name: routesNames[name]
    }).catch(() => console.log(`Already in ${name} page`))
  }

  public onExit(): void {
    this.logout()
      .then(() => this.onGoPage(routesNames.Login))
  }
}
</script>
