<template>
  <div class="schedule">
    <v-timeline>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
    </v-timeline>
    <v-timeline>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
    </v-timeline>
    <v-timeline>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item class="text-right">timeline item</v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator"

@Component({
  name: "Schedule"
})

// TODO: Add DND

export default class Schedule extends Vue {

}
</script>

<style lang="scss">
.schedule {
  display: flex;
  justify-content: space-between;
}
</style>