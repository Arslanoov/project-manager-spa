<template>
  <v-container>
    <h2>{{ $t("Settings") }}</h2>

    <template v-if="settings">
      <v-checkbox
          @change="onToggleNightMode"
          :value="settings.nightMode"
          :label="$t(`Night mode`)"
      ></v-checkbox>

      <v-checkbox
        @change="toggleHideTasks"
        :value="settings.hideFinishedTasks"
        :label="$t(`Hide finished tasks`)"
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
  @settingsModule.Action("toggleHideTasks") toggleHideTasks: typeof SettingsStoreModule.prototype.toggleHideTasks

  public onToggleNightMode(): void {
    this.toggleNightMode()
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  }
}
</script>

<i18n>
{
  "en": {
    "Settings": "Settings",
    "Night mode": "Night mode",
    "Hide finished tasks": "Hide finished tasks"
  },
  "ru": {
    "Settings": "Настройки",
    "Night mode": "Темный режим",
    "Hide finished tasks": "Скрывать завершенные задачи"
  }
}
</i18n>
