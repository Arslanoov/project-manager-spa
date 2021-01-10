<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <div class="d-flex align-center logo" @click="onGoHome">
      <v-img
          alt="TODO"
          class="shrink mr-2"
          contain
          src="~@/assets/logo.svg"
          transition="scale-transition"
          width="40"
      />

      <h1 class="title">TODO</h1>
    </div>

    <v-spacer></v-spacer>

    <Nav />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Nav from "@/modules/Nav.vue"

import { routesNames } from "@/router"

@Component({
  name: "Header",
  components: {
    Nav
  }
})

export default class Header extends Vue {
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