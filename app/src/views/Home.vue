<template>
  <div class="home">
    <Schedule />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Schedule from "@/components/Schedule.vue"

@Component({
  components: {
    Schedule
  }
})

export default class Home extends Vue {}
</script>
