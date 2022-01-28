<template>
  <router-view v-hotkey="keymap" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {
  namespace
} from "vuex-class"

import SettingsInterface from "@/types/settings/SettingsInterface"

import SettingsStoreModule from "@/store/modules/settings"

const settingsModule = namespace("Settings")

@Component({
  name: "App"
})

export default class App extends Vue {
  @settingsModule.State("settings") settings: SettingsInterface

  @settingsModule.Action("toggleHideTasks") toggleHideTasks: typeof SettingsStoreModule.prototype.toggleHideTasks
  @settingsModule.Action("fetchSettings") fetchSettings: typeof SettingsStoreModule.prototype.fetchSettings

  public get layout() {
    return this.$route.meta.layout ? `${this.$route.meta.layout}-layout` : "main-layout"
  }

  public keymap = {
    'ctrl+h': this.toggleHideTasks
  }

  public mounted(): void {
    this.fetchSettings()
  }
}
</script>
