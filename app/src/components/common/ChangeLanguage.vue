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

import { getToggledLanguage, getLanguageName } from "@/helpers/language"

import NavStoreModule from "@/store/modules/nav"

const navModule = namespace("Nav")

import AddCustomSchedule from "@/components/common/AddCustomSchedule.vue"

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

<<<<<<< HEAD
  public keymap = {
    'ctrl+l': this.toggleLanguage
  }

=======
>>>>>>> d29e7af185aec26fe30571aa90d91d37aba4b5df
  public toggleLanguage(): void {
    const toggledLanguage = getToggledLanguage(this.language)
    this.changeLanguage(toggledLanguage)
    this.$i18n.locale = getLanguageName(toggledLanguage)
  }

  public get toggledLanguage(): string {
    return getToggledLanguage(this.language)
  }
}
</script>

<style lang="scss" scoped>

</style>

