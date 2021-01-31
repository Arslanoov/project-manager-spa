<template>
  <header class="header">
    <v-app-bar
        color="deep-purple accent-4"
        app
        dark
        dense
    >
      <v-app-bar-nav-icon @click="toggleNavVisibility"></v-app-bar-nav-icon>

      <div class="d-flex align-center logo" @click="onGoHome">
        <h1 class="title">To Do</h1>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>
    <Nav />
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

import Nav from "@/modules/Nav.vue"

import NavStoreModule from "@/store/modules/nav"

import { routesNames } from "@/router"

const navModule = namespace("Nav")

@Component({
  name: "Header",
  components: {
    Nav
  }
})

export default class Header extends Vue {
  @navModule.Mutation("toggleNavVisibility") toggleNavVisibility: typeof NavStoreModule.prototype.toggleNavVisibility

  public onGoHome(): void {
    this.$router.push({
      name: routesNames.Home
    }).catch(() => console.log("Already in home"))
  }
}
</script>

<style lang="scss">
.logo {
  &:hover {
    cursor: pointer;
  }
}
</style>
