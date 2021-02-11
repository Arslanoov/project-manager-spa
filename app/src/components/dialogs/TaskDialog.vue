<template>
  <v-dialog
      @click.stop="closeDialog"
      @input="v => v || closeDialog()"
      :retain-focus="false"
      :value="isOpenedStepsDialog && task.id === currentTaskId"
      :key="schedule.id"
      transition="dialog-bottom-transition"
      class="task-dialog"
      fullscreen
      hide-overlay
  >
    <template v-slot:activator="{ on, attrs }">
      <!--   TODO: Add color condition   -->
      <div class="button">
        <v-btn
            @click="onFetchTaskSteps(task.id)"
            v-bind="attrs"
            class="mx-0"
            outlined
        >
          Show steps
          <template v-if="task.stepsCount > 0">
            ({{ task.finishedSteps }} / {{ task.stepsCount }})
          </template>
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-toolbar
          color="primary"
          dark
      >
        <v-btn
            @click="closeDialog"
            icon
            dark
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
          >
            {{ task.name }}
            <template v-if="task.stepsCount">
              ({{ task.finishedSteps }} / {{ task.stepsCount }})
            </template>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list
          three-line
          subheader
      >
        <StepsTable :schedule="schedule" :task="task" :steps="steps" />
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { namespace } from "vuex-class"

import { Prop } from "vue-property-decorator"

import TaskStoreModule from "@/store/modules/task"
import AlertStoreModule from "@/store/modules/alert"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import TaskInterface from "@/types/schedule/task/TaskInterface"
import StepInterface from "@/types/schedule/task/StepInterface"

import StepsTable from "@/components/common/StepsTable.vue"

const taskModule = namespace("Task")
const alertModule = namespace("Alert")

/**
 * @version 1.0.0
 */
@Component({
  name: "TaskDialog",
  components: {
    StepsTable
  }
})

/**
 * Show task dialog
 * @version 1.0.0
 */
export default class StepsList extends Vue {
  /**
   * Schedule Interface <br>
   * id: string, <br>
   * name?: string, <br>
   * date: DateInterface, <br>
   * tasksCount: number, <br>
   * tasks: Array<TaskInterface>, <br>
   * isMain?: boolean, <br>
   * isCustom?: boolean
   */
  @Prop({ required: true }) readonly schedule: ScheduleInterface
  /**
   * TaskInterface <br>
   * id: string, <br>
   * name: string, <br>
   * description: string, <br>
   * importantLevel: string, <br>
   * status: string, <br>
   * stepsCount: number, <br>
   * finishedSteps: number
   */
  @Prop({ required: true }) readonly task: TaskInterface

  @taskModule.State("currentTaskId") currentTaskId: string | null
  @taskModule.State("isOpenedStepsDialog") isOpenedStepsDialog: boolean

  @alertModule.Mutation("setMessage") setMessage: typeof AlertStoreModule.prototype.setMessage

  @taskModule.Action("closeDialog") closeDialog: typeof TaskStoreModule.prototype.closeDialog
  @taskModule.Action("fetchTaskSteps") fetchTaskSteps: typeof TaskStoreModule.prototype.fetchTaskSteps

  @taskModule.Getter("currentTaskOrderedSteps") steps: Array<StepInterface>

  public onFetchTaskSteps(taskId: string): void {
    this.fetchTaskSteps(taskId)
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
  }
}
</script>

<style lang="scss" scoped>
/* TODO: Merge */
.button {
  display: inline-block;

  margin-top: 5px;
  margin-right: 10px;
}
</style>
