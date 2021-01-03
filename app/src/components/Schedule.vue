<template>
  <v-virtual-scroll
      height="100"
      item-height="20"
  >
    <template v-slot:default="{ item }">
      <v-timeline>
        <v-timeline-item>timeline item</v-timeline-item>
        <v-timeline-item class="text-right">
          timeline item
        </v-timeline-item>
        <v-timeline-item>timeline item</v-timeline-item>
      </v-timeline>
    </template>
  </v-virtual-scroll>
</template>

<script>
import { Vue, Component } from "vue-property-decorator"

@Component({})

export default class Schedule extends Vue {

}
</script>

<style lang="scss"></style>