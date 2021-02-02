<template>
  <v-container class="custom-schedule-page" v-if="customSchedule">
      <h2>{{ customSchedule.name }}</h2>
      <Schedule :schedule="customSchedule"/>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import {
  namespace
} from "vuex-class"

import ScheduleStoreModule from "@/store/modules/schedule"

const scheduleModule = namespace("Schedule")

import { routesNames } from "@/router/names"

import Schedule from "@/components/Schedule.vue"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"

@Component({
  name: "CustomSchedule",
  components: {
    Schedule
  }
})

export default class CustomSchedule extends Vue {
  @scheduleModule.State("schedules") schedules: Array<ScheduleInterface>

  @scheduleModule.Action("getCustomSchedule") getCustomSchedule: typeof ScheduleStoreModule.prototype.getCustomSchedule

  public isLoading = false
  public id: string | undefined = this.$route.query.id as string | undefined

  public mounted(): void {
    if (!this.id) {
      this.redirectToNotFoundPage()
    }

    this.getCustomSchedule(this.id as string)
      .catch(error => {
        if (404 === error.response.status) {
          this.redirectToNotFoundPage()
        }
      })
  }

  public get customSchedule(): ScheduleInterface | undefined {
    return this.schedules.find(schedule => schedule.id === this.id && schedule.isCustom)
  }

  private redirectToNotFoundPage(): void {
    this.$router.push({
      name: routesNames.NotFound
    })
  }
}
</script>

<style lang="scss">
.custom-schedule-page {
}
</style>
