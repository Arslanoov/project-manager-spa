<template>
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
        <v-toolbar-title>{{ $t("Steps") }}</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>

        <v-spacer></v-spacer>

        <AddStepDialog :schedule="schedule" :task="task" />
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
          @click="onRemoveStep(item)"
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

import StepInterface, { StepRow, StepRows } from "@/types/schedule/task/StepInterface"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import TaskInterface from "@/types/schedule/task/TaskInterface"

import AddStepDialog from "@/components/dialogs/AddStepDialog.vue"

import TaskStoreModule from "@/store/modules/task"
import ScheduleStoreModule from "@/store/modules/schedule"
import AlertStoreModule from "@/store/modules/alert"

const scheduleModule = namespace("Schedule")
const taskModule = namespace("Task")
const alertModule = namespace("Alert")

/**
 * Steps table
 * @version 1.0.0
 */
@Component({
  name: "StepsTable",
  components: {
    AddStepDialog
  }
})

export default class StepsList extends Vue {
  /**
   * Schedule Interface <br>
   * id: string, <br>
   * name?: string, <br>
   * date: DateInterface, <br>
   * tasksCount: number, <br>
   * tasks: Array<TaskInterface>, <br>
   * isMain?: boolean, <br>
   * isCustom?: boolean <br>
   */
  @Prop({ required: true }) readonly schedule: ScheduleInterface
  /**
   * TaskInterface
   * id: string,
   * name: string,
   * description: string,
   * importantLevel: string,
   * status: string,
   * stepsCount: number,
   * finishedSteps: number
   */
  @Prop({ required: true }) readonly task: TaskInterface
  /**
   * Array of StepInterface
   * StepInterface
   * id: number,
   * name: string,
   * sort_order: string,
   * status: string
   */
  @Prop({ required: true }) readonly steps: Array<StepInterface>

  @scheduleModule.Mutation("removeTaskStep") removeTaskStep: typeof ScheduleStoreModule.prototype.removeTaskStep
  @scheduleModule.Mutation("setTaskStepStatus") setTaskStepStatus:
      typeof ScheduleStoreModule.prototype.setTaskStepStatus
  @alertModule.Mutation("setMessage") setMessage: typeof AlertStoreModule.prototype.setMessage

  @taskModule.Action("changeStepStatus") changeStepStatus: typeof TaskStoreModule.prototype.changeStepStatus
  @taskModule.Action("changeStepsStatus") changeStepsStatus: typeof TaskStoreModule.prototype.changeStepsStatus
  @taskModule.Action("removeStep") removeStep: typeof TaskStoreModule.prototype.removeStep

  @taskModule.Getter("selectedSteps") selectedSteps: Array<number>

  public headers = [
    {
      text: this.$t("Name"),
      align: "start",
      sortable: true,
      value: "name"
    },
    {
      text: this.$t("Status"),
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
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))

    this.setTaskStepStatus({
      scheduleId: this.schedule.id,
      taskId: this.task.id,
      step: data.item,
      status: data.value ? "Complete" : "Not Complete"
    })
  }

  public onSelectAll(steps: StepRows): void {
    this.changeStepsStatus({
      ids: steps.items.map(step => step.id),
      newStatus: steps.value ? "Complete" : "Not Complete"
    })
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))

    steps.items.forEach(step => {
      this.setTaskStepStatus({
        scheduleId: this.schedule.id,
        taskId: this.task.id,
        step,
        status: steps.value ? "Complete" : "Not Complete"
      })
    })
  }

  public onRemoveStep(step: StepInterface): void {
    this.removeStep(step.id)
      .then(() => this.removeTaskStep({
        scheduleId: this.schedule.id,
        taskId: this.task.id,
        step: step
      }))
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
  }
}
</script>

<i18n>
{
  "en": {
    "Steps": "Steps",
    "Name": "Name",
    "Status": "Status"
  },
  "ru": {
    "Steps": "Шаги",
    "Name": "Имя",
    "Status": "Статус"
  }
}
</i18n>
