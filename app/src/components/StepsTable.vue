<template>
  <!-- TODO: Add selected value -->
  <v-data-table
      @toggle-select-all="onSelectAll"
      @item-selected="onSelect"
      :single-select="false"
      :headers="headers"
      :items="steps"
      sort-by="calories"
      class="elevation-1 steps-table"
      show-select
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

        <AddStepDialog />
        <RemoveStepDialog />
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
import { namespace } from "vuex-class"

import StepInterface, { StepRow } from "@/types/schedule/task/StepInterface"

import AddStepDialog from "@/components/dialogs/AddStepDialog.vue"
import RemoveStepDialog from "@/components/dialogs/RemoveStepDialog.vue"

import TaskStoreModule from "@/store/modules/task"

const taskModule = namespace("Task")

@Component({
  name: "StepsTable",
  components: {
    AddStepDialog,
    RemoveStepDialog
  }
})

export default class StepsList extends Vue {
  @Prop({ required: true }) readonly steps: Array<StepInterface>

  @taskModule.Action("changeStepStatus") changeStepStatus: typeof TaskStoreModule.prototype.changeStepStatus

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

  public onSelect(data: StepRow) {
    // TODO: Add status enum?
    this.changeStepStatus({
      id: data.item.id,
      newStatus: data.value ? "Complete" : "Not Complete"
    })
  }

  // TODO: Implement
  public onSelectAll(data: StepRow) {
    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
.steps-table {

}
</style>
