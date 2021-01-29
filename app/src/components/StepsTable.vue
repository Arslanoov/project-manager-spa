<template>
  <!-- TODO: Add selected value -->
  <v-data-table
      @toggle-select-all="onSelectAll"
      @item-selected="onSelect"
      :single-select="false"
      :headers="headers"
      :value="selectedSteps"
      :items="steps"
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

    <template v-slot:item.actions="{ item }">
      <v-icon
          @click="removeStep(item.id)"
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

import StepInterface, {StepRow, StepRows} from "@/types/schedule/task/StepInterface"

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
  @taskModule.Action("changeStepsStatus") changeStepsStatus: typeof TaskStoreModule.prototype.changeStepsStatus
  @taskModule.Action("removeStep") removeStep: typeof TaskStoreModule.prototype.removeStep

  @taskModule.Getter("selectedSteps") selectedSteps: Array<number>

  public headers = [
    {
      text: "Name",
      align: "start",
      sortable: true,
      value: "name"
    },
    {
      text: "Status",
      align: "start",
      sortable: true,
      value: "status"
    },
    {
      text: "",
      value: "actions",
      sortable: false
    }
  ]

  public onSelect(data: StepRow): void {
    // TODO: Add status enum?
    this.changeStepStatus({
      id: data.item.id,
      newStatus: data.value ? "Complete" : "Not Complete"
    })
  }

  public onSelectAll(steps: StepRows): void {
    this.changeStepsStatus({
      ids: steps.items.map(step => step.id),
      newStatus: steps.value ? "Complete" : "Not Complete"
    })
  }
}
</script>

<style lang="scss" scoped>
.steps-table {

}
</style>
