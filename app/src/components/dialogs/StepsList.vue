<template>
  <v-dialog
      :value="task.id === currentTaskId"
      transition="dialog-bottom-transition"
      fullscreen
      hide-overlay
  >
    <template v-slot:activator="{ on, attrs }">
      <!--   TODO: Add color condition   -->
      <v-btn
          v-bind="attrs"
          @click="e => fetchTasksAndOpen(on.click, e)"
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
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              @click="dialog = false"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list
          three-line
          subheader
      >
        <v-subheader>User Controls</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Content filtering</v-list-item-title>
            <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
          three-line
          subheader
      >
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="notifications"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="sound"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="widgets"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Auto-add widgets</v-list-item-title>
            <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { namespace } from "vuex-class"

import { Prop } from "vue-property-decorator"

import StepInterface from "@/types/schedule/task/StepInterface"

import TaskStoreModule from "@/store/modules/task"
import TaskInterface from "@/types/schedule/task/TaskInterface"

const taskModule = namespace("Task")

@Component({
  name: "StepsList"
})

export default class StepsList extends Vue {
  @Prop({ required: true }) readonly task: TaskInterface

  @taskModule.State("currentTaskId") currentTaskId: string | null
  @taskModule.State("isOpenedStepsDialog") isOpenedStepsDialog: boolean
  @taskModule.State("currentTaskSteps") steps:  Array<StepInterface>

  @taskModule.Action("closeDialog") closeDialog: typeof TaskStoreModule.prototype.closeDialog
  @taskModule.Action("fetchTaskSteps") fetchTaskSteps: typeof TaskStoreModule.prototype.fetchTaskSteps

  dialog = false
  notifications = false
  sound = true
  widgets = false

  public fetchTasksAndOpen(callback: Function, e: Event) {
    this.fetchTaskSteps(this.task.id)
      .then(() => callback(e))
  }
}
</script>

<style lang="scss">
.steps-list {

}
</style>