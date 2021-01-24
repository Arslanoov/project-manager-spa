<template>
  <v-dialog
      @click.stop="closeDialog"
      :value="isOpenedStepsDialog && task.id === currentTaskId"
      transition="dialog-bottom-transition"
      fullscreen
      hide-overlay
  >
    <template v-slot:activator="{ on, attrs }">
      <!--   TODO: Add color condition   -->
      <v-btn
          v-bind="attrs"
          @click="fetchTaskSteps(task.id)"
          class="mx-0"
          outlined
      >
        Show steps
        <template v-if="task.stepsCount > 0">
          ({{ task.stepsCount }} / {{ task.finishedSteps }})
        </template>
      </v-btn>
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
        <StepsTable :steps="steps" />
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
import TaskInterface from "@/types/schedule/task/TaskInterface"
import StepInterface from "@/types/schedule/task/StepInterface"

import StepsTable from "@/components/StepsTable.vue"

const taskModule = namespace("Task")

@Component({
  name: "TaskDialog",
  components: {
    StepsTable
  }
})

export default class StepsList extends Vue {
  @Prop({ required: true }) readonly task: TaskInterface

  @taskModule.State("currentTaskId") currentTaskId: string | null
  @taskModule.State("isOpenedStepsDialog") isOpenedStepsDialog: boolean

  @taskModule.Action("closeDialog") closeDialog: typeof TaskStoreModule.prototype.closeDialog
  @taskModule.Action("fetchTaskSteps") fetchTaskSteps: typeof TaskStoreModule.prototype.fetchTaskSteps

  @taskModule.Getter("currentTaskOrderedSteps") steps: Array<StepInterface>
}
</script>

<style lang="scss" scoped>

</style>
