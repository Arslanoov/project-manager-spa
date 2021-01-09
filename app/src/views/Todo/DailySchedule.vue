<template>
  <v-container class="daily-schedule-page">
    <Schedule />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Schedule from "@/components/Schedule.vue"

@Component({
  name: "DailySchedule",
  components: {
    Schedule
  }
})

export default class DailySchedule extends Vue {

}
</script>

<style lang="scss">
.daily-schedule-page {
}
</style>