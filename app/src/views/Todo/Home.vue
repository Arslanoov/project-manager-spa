<template>
  <v-container class="daily-schedule-page">
    <v-row v-if="mainSchedule && dailySchedules.length > 0">
      <v-col
          v-if="mainSchedule"
          xs="12"
          sm="12"
          md="6"
      >
        <h2>Common tasks</h2>
        <Schedule :schedule="mainSchedule"/>
      </v-col>

      <v-col
        xs="12"
        sm="12"
        md="6"
      >
        <v-btn
            @click="loadLaterSchedule"
            :disabled="isLoading"
            color="blue darken-1"
            text
        >
          Load later schedule
        </v-btn>
        <v-btn
            @click="skipToTheLaterWeek"
            :disabled="isLoading"
            color="blue darken-1"
            text
        >
          Skip to the later week
        </v-btn>
        <div v-for="schedule in dailySchedules" :key="schedule.id" class="schedule-wrapper">
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
        <v-btn
            @click="skipToThePrevWeek"
            :disabled="isLoading"
            color="blue darken-1"
            text
        >
          Skip to the earlier week
        </v-btn>
      </v-col>
    </v-row>
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

export default class Home extends Vue {
  @scheduleModule.Mutation("clearSchedulesAndForms") clearSchedulesAndForms:
      typeof ScheduleStoreModule.prototype.clearSchedulesAndForms

  @scheduleModule.Action("getMainSchedule") getMainSchedule: typeof ScheduleStoreModule.prototype.getMainSchedule
  @scheduleModule.Action("getTodaySchedule") getTodaySchedule: typeof ScheduleStoreModule.prototype.getTodaySchedule
  @scheduleModule.Action("getPrevSchedule") getPrevSchedule: typeof ScheduleStoreModule.prototype.getPrevSchedule
  @scheduleModule.Action("getNextSchedule") getNextSchedule: typeof ScheduleStoreModule.prototype.getNextSchedule

  @scheduleModule.Action("getPrevScheduleWeek") getPrevScheduleWeek:
      typeof ScheduleStoreModule.prototype.getPrevScheduleWeek
  @scheduleModule.Action("getNextScheduleWeek") getNextScheduleWeek:
      typeof ScheduleStoreModule.prototype.getNextScheduleWeek

  @scheduleModule.Getter("dailySchedules") dailySchedules: Array<ScheduleInterface>
  @scheduleModule.Getter("mainSchedule") mainSchedule: ScheduleInterface

  public isLoading = false

  public mounted(): void {
    this.getMainSchedule()
    this.getTodaySchedule()
  }

  public destroyed(): void {
    this.clearSchedulesAndForms()
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

  public skipToTheLaterWeek(): void {
    this.isLoading = true
    this.getPrevScheduleWeek()
      .finally(() => this.isLoading = false)
  }

  public skipToThePrevWeek(): void {
    this.isLoading = true
    this.getNextScheduleWeek()
      .finally(() => this.isLoading = false)
  }
}
</script>

<style lang="scss">
.daily-schedule-page {
}
</style>
