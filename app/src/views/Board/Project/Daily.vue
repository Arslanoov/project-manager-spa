<template>
  <div class="project">
    <h2 class="project__title">Task</h2>

    <Timeline :days-count="7" :start-date="new Date()" :active-index="0" />

    <TaskCard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Timeline from "@/components/common/timeline/Timeline.vue"
import TaskCard from "@/components/common/task/card/TaskCard.vue"

@Component({
  components: {
    TaskCard,
    Timeline
  }
})

export default class DailyView extends Vue {

}
</script>

<style lang="scss" scoped>

</style>