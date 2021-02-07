<template>
  <v-app>
    <MainLayout />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {
  namespace
} from "vuex-class"

import MainLayout from "@/layouts/MainLayout.vue"

import SettingsStoreModule from "@/store/modules/settings"

const settingsModule = namespace("Settings")

@Component({
  name: "App",
  components: {
    MainLayout
  }
})

export default class App extends Vue {
  @settingsModule.Action("fetchSettings") fetchSettings: typeof SettingsStoreModule.prototype.fetchSettings

  public mounted(): void {
    this.fetchSettings()
  }
}
</script>
