<template>
  <v-list-item v-hotkey="keymap" @click="toggleLanguage">
    <v-list-item-icon>
      <v-icon>mdi-translate</v-icon>
    </v-list-item-icon>
    <v-list-item-title>{{ toggledLanguage }}</v-list-item-title>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { namespace } from "vuex-class"

import axios from "axios"

import { getToggledLanguage, getLanguageName } from "@/helpers/language"

import NavStoreModule from "@/store/modules/nav"

import AddCustomSchedule from "@/components/common/AddCustomSchedule.vue"

const navModule = namespace("Nav")

/**
 * @version 1.0.0 <br>
 */
@Component({
  name: "ChangeLanguage",
  components: {
    AddCustomSchedule
  }
})

export default class Nav extends Vue {
  @navModule.State("language") language: string

  @navModule.Action("changeLanguage") changeLanguage: typeof NavStoreModule.prototype.changeLanguage

  public keymap = {
    'ctrl+l': this.toggleLanguage
  }

  public toggleLanguage(): void {
    const toggledLanguage = getToggledLanguage(this.language)
    this.changeLanguage(toggledLanguage)
    this.$i18n.locale = getLanguageName(toggledLanguage)
    axios.defaults.params = {
      ...axios.defaults.params,
      language: getLanguageName(toggledLanguage)
    }
  }

  public get toggledLanguage(): string {
    return getToggledLanguage(this.language)
  }
}
</script>
