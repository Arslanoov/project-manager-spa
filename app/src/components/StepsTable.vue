<template>
  <v-data-table
      :headers="headers"
      :items="steps"
      sort-by="calories"
      class="elevation-1 steps-table"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Steps</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>

        <v-spacer></v-spacer>

        <v-dialog :visible="false" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>Cancel</v-btn>
              <v-btn color="blue darken-1" text>OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="">
      <v-icon
          small
          class="mr-2"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

import StepInterface from "@/types/schedule/task/StepInterface"

@Component({
  name: "StepsTable"
})

export default class StepsList extends Vue {
  @Prop({ required: true }) readonly steps: Array<StepInterface>

  public headers = [
    {
      text: "Name",
      align: "start",
      sortable: false,
      value: "name"
    },
    {
      text: "Status",
      align: "start",
      sortable: false,
      value: "status"
    }
  ]
}
</script>

<style lang="scss" scoped>
.steps-table {
  height: calc(98vh - 56px);
}
</style>
