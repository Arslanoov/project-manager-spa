<template>
  <v-container class="daily-schedule-page">
    <v-btn
        @click="loadLaterSchedule"
        :disabled="isLoading"
        color="blue darken-1"
        text
    >
      Load later schedule
    </v-btn>
    <div v-for="schedule in schedules" :key="schedule.id" class="schedule-wrapper">
      <Schedule :schedule="schedule"/>
    </div>
    <v-btn
        @click="loadEarlierSchedule"
        :disabled="isLoading"
        color="blue darken-1"
        text
    >
      Load earlier schedule
    </v-btn>
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

import Schedule from "@/components/Schedule.vue"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"

@Component({
  name: "DailySchedule",
  components: {
    Schedule
  }
})

export default class DailySchedule extends Vue {
  @scheduleModule.State("schedules") schedules: Array<ScheduleInterface>

  @scheduleModule.Action("getTodaySchedule") getTodaySchedule: typeof ScheduleStoreModule.prototype.getTodaySchedule
  @scheduleModule.Action("getPrevSchedule") getPrevSchedule: typeof ScheduleStoreModule.prototype.getPrevSchedule
  @scheduleModule.Action("getNextSchedule") getNextSchedule: typeof ScheduleStoreModule.prototype.getNextSchedule

  public isLoading = false

  public mounted(): void {
    this.getTodaySchedule()
  }

  public loadEarlierSchedule(): void {
    this.isLoading = true
    this.getPrevSchedule()
      .then(() => this.isLoading = false)
  }

  public loadLaterSchedule(): void {
    this.isLoading = true
    this.getNextSchedule()
      .finally(() => this.isLoading = false)
  }
}
</script>

<style lang="scss">
.daily-schedule-page {
}
</style>
