<template>
  <v-container class="daily-schedule">
    <v-row v-if="mainSchedule && dailySchedules.length > 0">
      <v-col
          v-if="mainSchedule"
          xs="12"
          sm="12"
          md="6"
      >
        <h2>{{ $t("Common tasks") }}</h2>
        <Schedule :schedule="mainSchedule" :have-hot-keys="true" />
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
          {{ $t("Load later schedule") }}
        </v-btn>
        <v-btn
            @click="skipToTheLaterWeek"
            :disabled="isLoading"
            color="blue darken-1"
            text
        >
          {{ $t("Skip to the later week") }}
        </v-btn>
        <div v-for="schedule in dailySchedules" :key="schedule.id" class="schedule-wrapper">
          <Schedule :schedule="schedule" :have-hot-keys="false" />
        </div>
        <v-btn
            @click="loadEarlierSchedule"
            :disabled="isLoading"
            color="blue darken-1"
            text
        >
          {{ $t("Load earlier schedule") }}
        </v-btn>
        <v-btn
            @click="skipToThePrevWeek"
            :disabled="isLoading"
            color="blue darken-1"
            text
        >
          {{ $t("Skip to the earlier week") }}
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
import AlertStoreModule from "@/store/modules/alert"

const scheduleModule = namespace("Schedule")
const alertModule = namespace("Alert")

import Schedule from "@/components/common/Schedule.vue"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"

@Component({
  name: "DailySchedule",
  components: {
    Schedule
  }
})

export default class Home extends Vue {
  @alertModule.Mutation("setMessage") setMessage: typeof AlertStoreModule.prototype.setMessage
  
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

    window.onbeforeunload = () => this.clearSchedulesAndForms()
    window.onunload = () => this.clearSchedulesAndForms()
  }

  public destroyed(): void {
    this.clearSchedulesAndForms()
  }

  public loadEarlierSchedule(): void {
    this.isLoading = true
    this.getPrevSchedule()
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
      .then(() => this.isLoading = false)
  }

  public loadLaterSchedule(): void {
    this.isLoading = true
    this.getNextSchedule()
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
      .finally(() => this.isLoading = false)
  }

  public skipToTheLaterWeek(): void {
    this.isLoading = true
    this.getPrevScheduleWeek()
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
      .finally(() => this.isLoading = false)
  }

  public skipToThePrevWeek(): void {
    this.isLoading = true
    this.getNextScheduleWeek()
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
      .finally(() => this.isLoading = false)
  }
}
</script>

<i18n>
{
  "en": {
    "Common tasks": "Common tasks",
    "Load later schedule": "Load later schedule",
    "Skip to the later week": "Skip to the later week",
    "Load earlier schedule": "Load earlier schedule",
    "Skip to the earlier week": "Skip to the earlier week"
  },
  "ru": {
    "Common tasks": "Общие задачи",
    "Load later schedule": "Следующий список",
    "Skip to the later week": "Пропустить неделю",
    "Load earlier schedule": "Предыдущий список",
    "Skip to the earlier week": "Предыдущая неделя"
  }
}
</i18n>
