<template>
  <v-container class="daily-schedule-page">
    <div v-for="schedule in schedules" :key="schedule.id" class="schedule-wrapper">
      <Schedule :schedule="schedule" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Schedule from "@/components/Schedule.vue"

import { SCHEDULE_STORE_PREFIX } from "@/store/modules/schedule"

@Component({
  name: "DailySchedule",
  components: {
    Schedule
  },
  computed: {
    schedules(): Array<Schedule> {
      return this.$store.state.Schedule.schedules
    }
  }
})

export default class DailySchedule extends Vue {
  public mounted(): void {
    this.$store.dispatch(SCHEDULE_STORE_PREFIX + "getTodaySchedule")
  }
}
</script>

<style lang="scss">
.daily-schedule-page {
}
</style>