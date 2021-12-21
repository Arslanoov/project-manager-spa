<template>
  <div class="project">
    <h2 class="project__title">Task</h2>

    <Timeline :days-count="7" :start-date="new Date()" :active-index="0" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Timeline from "@/components/common/timeline/Timeline.vue"

@Component({
  components: {
    Timeline
  }
})

export default class DailyView extends Vue {

}
</script>

<style lang="scss" scoped>

</style>