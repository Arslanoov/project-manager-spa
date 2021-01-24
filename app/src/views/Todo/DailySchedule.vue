<template>
  <v-container class="daily-schedule-page">
    <div v-for="(schedule, index) in schedules" :key="schedule.id" class="schedule-wrapper">
      <Schedule :schedule="schedule" :index="index" />
    </div>
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

  public mounted(): void {
    this.getTodaySchedule()
  }
}
</script>

<style lang="scss">
.daily-schedule-page {
}
</style>
