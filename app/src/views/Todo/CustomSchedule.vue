<template>
  <v-container class="custom-schedule-page" v-if="customSchedule">
      <h2>{{ customSchedule.name }}</h2>
      <Schedule :key="`custom-${customSchedule.id}`" :schedule="customSchedule" :have-hot-keys="true" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"
import {
  namespace
} from "vuex-class"

import ScheduleStoreModule from "@/store/modules/schedule"
import AlertStoreModule from "@/store/modules/alert"

const scheduleModule = namespace("Schedule")
const alertModule = namespace("Alert")

import { routesNames } from "@/router/names"

import Schedule from "@/components/common/Schedule.vue"
import ScheduleInterface from "@/types/schedule/ScheduleInterface"

@Component({
  name: "CustomSchedule",
  components: {
    Schedule
  }
})

export default class CustomSchedule extends Vue {
  @Watch("$route.params")
  onIdChange(): void {
    this.init()
  }

  @scheduleModule.State("schedules") schedules: Array<ScheduleInterface>

  @scheduleModule.Mutation("clearSchedulesAndForms") clearSchedulesAndForms:
      typeof ScheduleStoreModule.prototype.clearSchedulesAndForms

  @alertModule.Mutation("setMessage") setMessage: typeof AlertStoreModule.prototype.setMessage

  @scheduleModule.Action("getCustomSchedule") getCustomSchedule: typeof ScheduleStoreModule.prototype.getCustomSchedule

  public isLoading = false

  public mounted(): void {
    this.init()
  }

  public destroyed(): void {
    this.clearSchedulesAndForms()
  }

  public init(): void {
    if (!this.$route.params.id) {
      this.redirectToNotFoundPage()
    }

    this.getCustomSchedule(this.$route.params.id as string)
      .catch(error => {
        this.setMessage({
          message: error.data.error,
          type: "error"
        })

        if (404 === error.response.status) {
          this.redirectToNotFoundPage()
        }
      })
  }

  public get customSchedule(): ScheduleInterface | undefined {
    return this.schedules.find(schedule => schedule.id === this.$route.params.id && schedule.isCustom)
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
