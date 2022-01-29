<template>
  <main-layout>
    <template #header>
      <Header :title="$t('Settings')" :with-background="false" />
    </template>
    <template #default>
      <div v-if="settings" class="settings">
        <div class="settings__group setting">
          <div class="setting__top">
            <img
              src="~@/assets/images/icons/settings/settings.svg"
              class="setting__icon"
              alt=""
            >
            <h4 class="setting__title">{{ $t('Tasks') }}</h4>
          </div>
          <div class="setting__list">
            <div @click="toggleHideTasks" class="setting__list-item">
              <template v-if="settings.hideFinishedTasks">
                {{ $t('Hide finished tasks') }}
              </template>
              <template v-else>
                {{ $t('Show finished tasks') }}
              </template>
            </div>
          </div>
        </div>

        <div class="settings__group setting">
          <div class="setting__top">
            <img
              src="~@/assets/images/icons/settings/settings.svg"
              class="setting__icon"
              alt=""
            >
            <h4 class="setting__title">{{ $t('General') }}</h4>
          </div>
          <div class="setting__list">
            <div @click="toggleLanguage" class="setting__list-item">
              {{ $t('Change language') }}: {{ toggledLanguage }}
            </div>
            <div @click="onLogout" class="setting__list-item">{{ $t('Logout') }}</div>
          </div>
        </div>
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts">
import Component from "vue-class-component"
import Vue from "vue"
import {
  namespace
} from "vuex-class"

import axios from "axios"

import SettingsStoreModule from "@/store/modules/settings"
import UserStoreModule from "@/store/modules/user"

import SettingsInterface from "@/types/settings/SettingsInterface"

import { routesNames } from "@/router/names"

import { getToggledLanguage, getLanguageName } from "@/helpers/language"

import MainLayout from "@/layouts/MainLayout.vue"
import Header from "@/modules/Header.vue"

const settingsModule = namespace("Settings")
const userModule = namespace("User")

@Component({
  components: {
    MainLayout,
    Header
  }
})

export default class Settings extends Vue {
  @settingsModule.State("settings") settings: SettingsInterface
  @settingsModule.State("language") language: string

  @settingsModule.Action("toggleHideTasks") toggleHideTasks: typeof SettingsStoreModule.prototype.toggleHideTasks
  @settingsModule.Action("changeLanguage") changeLanguage: typeof SettingsStoreModule.prototype.changeLanguage

  @userModule.Action("logout") logout: typeof UserStoreModule.prototype.logout

  public onLogout(): void {
    this.logout()
    this.$router.push({
      name: routesNames.AuthHome
    })
  }

  public toggleLanguage(): void {
    const toggledLanguage = getToggledLanguage(this.language)
    this.changeLanguage(toggledLanguage)
    this.$root.$i18n.locale = getLanguageName(toggledLanguage)
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

<style lang="scss" scoped>
.settings {
  &__group {
    &:not(:last-of-type) {
      margin-bottom: 5rem;
    }
  }
}

.setting {
  &__top {
    display: flex;
    align-items: center;

    gap: 1.5rem;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: $semi-bold;
  }

  &__icon {
    width: 2rem;
  }

  &__list {
    color: $bali-hai;

    &-item {
      @include pointer-on-hover();

      margin-top: 1rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "Settings": "Settings",
    "Tasks": "Tasks",
    "General": "General",
    "Change language": "Change language",
    "Hide finished tasks": "Hide finished tasks",
    "Show finished tasks": "Show finished tasks",
    "Logout": "Logout"
  },
  "ru": {
    "Settings": "Настройки",
    "Tasks": "Задачи",
    "General": "Общие",
    "Change language": "Поменять язык",
    "Hide finished tasks": "Скрывать завершенные задачи",
    "Show finished tasks": "Показывать завершенные задачи",
    "Logout": "Выйти"
  }
}
</i18n>
