<template>
  <v-container>
    <h2>Settings</h2>

    <template v-if="settings">
      <!-- TODO: Fix -->
      <v-checkbox
          @change="onToggleNightMode"
          :value="settings.nightMode"
          label="Night mode"
      ></v-checkbox>
    </template>
  </v-container>
</template>

<script lang="ts">
import Component from "vue-class-component"
import Vue from "vue"
import {
  namespace
} from "vuex-class"

import SettingsStoreModule from "@/store/modules/settings"

import SettingsInterface from "@/types/settings/SettingsInterface"

const settingsModule = namespace("Settings")

@Component({
  name: "Settings"
})

export default class Settings extends Vue {
  @settingsModule.State("settings") settings: SettingsInterface

  @settingsModule.Action("toggleNightMode") toggleNightMode: typeof SettingsStoreModule.prototype.toggleNightMode

  public onToggleNightMode(): void {
    this.toggleNightMode()
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  }
}
</script>