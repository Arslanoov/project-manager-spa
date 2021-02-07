<template>
  <v-navigation-drawer
      v-hotkey="keymap"
      @click.stop="toggleNavVisibility"
      @input="v => v || toggleNavVisibility()"
      :value="isShowNav"
      temporary
      absolute
  >
    <v-list
        nav
        dense
    >
      <v-list-item-group
          active-class="deep-purple--text text--accent-4"
      >
        <template v-if="isAuth">
          <v-list-item @click="onGoPage(routesNames.Home)">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <!-- TODO: Vertical align -->
          <template v-for="schedule in customSchedules">
            <v-list-item :key="schedule.id">
              <v-list-item-icon @click="onGoPage(routesNames.CustomSchedule, {
                  id: schedule.id
                })">
                <v-icon>mdi-calendar-today</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="onGoPage(routesNames.CustomSchedule, {
                  id: schedule.id
                })">{{ schedule.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action @click.prevent="onScheduleRemove(schedule.id)">
                <v-icon small>mdi-calendar-remove</v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>

          <AddCustomSchedule v-if="isOpenAddCustomScheduleForm" />
          <v-list-item @click="toggleScheduleForm">
            <v-list-item-icon>
              <v-icon>mdi-calendar-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Custom schedule</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onGoPage(routesNames.Settings)">
            <v-list-item-icon>
              <v-icon>mdi-book-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onExit">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item @click="onGoPage(routesNames.Login)">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onGoPage(routesNames.SignUp)">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"
import { namespace } from "vuex-class"

import { routesNames } from "@/router/names"

import AddCustomSchedule from "@/components/AddCustomSchedule.vue"

import UserStoreModule from "@/store/modules/user"
import NavStoreModule from "@/store/modules/nav"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"

const navModule = namespace("Nav")
const userModule = namespace("User")

@Component({
  name: "Nav",
  components: {
    AddCustomSchedule
  }
})

export default class Nav extends Vue {
  @navModule.State("isShowNav") isShowNav: boolean
  @navModule.State("customSchedules") customSchedules: Array<ScheduleInterface>
  @navModule.State("isOpenAddCustomScheduleForm") isOpenAddCustomScheduleForm: boolean

  @userModule.Getter("isAuth") isAuth: boolean

  @navModule.Mutation("toggleNavVisibility") toggleNavVisibility: typeof NavStoreModule.prototype.toggleNavVisibility
  @navModule.Mutation("toggleAddCustomScheduleForm") toggleScheduleForm:
      typeof NavStoreModule.prototype.toggleAddCustomScheduleForm

  @userModule.Action("logout") logout: typeof UserStoreModule.prototype.logout
  @navModule.Action("getCustomSchedules") getCustomSchedules: typeof NavStoreModule.prototype.getCustomSchedules
  @navModule.Action("removeCustomSchedule") removeCustomSchedule: typeof NavStoreModule.prototype.removeCustomSchedule

  public routesNames = routesNames

  public keymap = {
    'ctrl+u': this.toggleScheduleForm,
    'ctrl+e': this.onExit
  }

  @Watch("isAuth")
  onAuthStateChange(): void {
    this.init()
  }

  public mounted(): void {
    this.init()
  }

  public init(): void {
    if (this.isAuth) {
      this.getCustomSchedules()
    }
  }

  public onGoPage(name: routesNames, params: {[ key: string]: string } = {}): void {
    this.$router.push({
      name: routesNames[name],
      params
    }).catch(() => console.log(`Already in ${name} page`))
  }

  public onScheduleRemove(id: string): void {
    // TODO: Redirect on same page
    this.removeCustomSchedule(id)
  }

  public onExit(): void {
    this.logout()
      .then(() => this.onGoPage(routesNames.Login))
  }
}
</script>
