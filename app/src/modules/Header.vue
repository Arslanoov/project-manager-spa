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
        <h1 class="title">{{ $t("Task Manager") }}</h1>
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

import { routesNames } from "@/router/names"

const navModule = namespace("Nav")

/**
 * @version 1.0.0
 */
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
      name: routesNames.TodoHome
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

<i18n>
{
  "en": {
    "Task Manager": "Task Manager"
  },
  "ru": {
    "Task Manager": "Менеджер задач"
  }
}
</i18n>
