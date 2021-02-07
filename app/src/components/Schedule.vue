<template>
  <div class="schedule" v-hotkey="haveHotKeys ? keymap : {}">
    <h2 v-if="schedule.date">{{ getScheduleDateString(schedule) }}</h2>
    <v-timeline
        :key="schedule.id"
        class="schedule"
        clipped
        dense
    >
      <v-timeline-item
          :color="importantLevels[taskForm.importantLevel]"
          class="white--text mb-12"
          fill-dot
      >
        <template v-slot:icon>
          <div class="new-task-level" @click="changeImportantLevel">
            <v-icon
                :color="settings.nightMode ? 'black' : 'white'"
            >
              mdi-check
            </v-icon>
          </div>
        </template>
        <v-text-field
            @input="setTaskFormName"
            @keydown.enter="onSubmit"
            :value="taskForm.name"
            label="Leave a comment..."
            flat
            solo
        >
          <template v-slot:append>
            <v-btn
                @click="onSubmit"
                :disabled="isLoading"
                class="mx-0"
                :color="settings.nightMode ? 'black' : 'white'"
                depressed
            >
              Post
            </v-btn>
            <v-btn
                @click="onToggleAddTaskForm(true)"
                :disabled="isLoading"
                class="mx-0"
                :color="settings.nightMode ? 'black' : 'white'"
                depressed
            >
              <v-icon
                  color="purple darken-2"
              >
                mdi-message-text
              </v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-dialog
            :value="openedAddTaskFormScheduleId === schedule.id"
            :retain-focus="false"
            :key="schedule.id"
            max-width="500px"
            @input="v => v || onToggleAddTaskForm(false)"
            @click.stop="onToggleAddTaskForm(false)"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Add Task</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                  >
                    <v-text-field
                        @input="setTaskFormName"
                        :value="taskForm.name"
                        label="Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                  >
                    <v-select
                      @change="changeImportantLevel"
                      :items="importantLevelsList"
                      :value="taskForm.importantLevel"
                      label="Important Level"
                  ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                  >
                    <v-textarea
                        @change="setTaskFormDescription"
                        :value="taskForm.description"
                        label="Description"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  @click="onToggleAddTaskForm(false)"
                  :disabled="isLoading"
                  color="blue darken-1"
                  text
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-timeline-item>

      <v-slide-x-transition group>
        <v-timeline-item
            v-for="task in schedule.tasks"
            :color="removedColor ? '' : importantLevels[task.importantLevel]"
            :key="task.id"
            class="task"
            fill-dot
        >
          <template v-slot:icon>
            <div class="new-task-level" @click="toggleTaskStatus({
              task,
              schedule
            })">
              <v-icon
                  :color="settings.nightMode ? 'black' : 'white'"
              >
                {{ taskIcon(task) }}
              </v-icon>
            </div>
          </template>

          <v-card>
            <v-card-title class="title">
              {{ task.name }}
            </v-card-title>
            <v-card-text :class="settings.nightMode ? 'black' : 'white'" class="text--primary card-description">
              <p>{{ task.description }}</p>
              <div class="text-right">
                <TaskDialog :schedule="schedule" :task="task" />
                <div class="button">
                  <v-btn
                      @click="removeTask({
                        task,
                        schedule
                      })"
                      :disabled="isLoading"
                      class="mx-0"
                      outlined
                  >
                    Delete
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"
import {
  namespace
} from "vuex-class"

import TaskInterface, { ImportantLevelColor } from "@/types/schedule/task/TaskInterface"
import { importantLevelsList } from "@/types/schedule/task/TaskInterface"
import { TaskForm } from "@/types/schedule/task/TaskInterface"

import ScheduleStoreModule from "@/store/modules/schedule"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"

import TaskDialog from "@/components/dialogs/TaskDialog.vue"

import { getScheduleDateString } from "@/helpers/date"
import SettingsInterface from "@/types/settings/SettingsInterface"

const scheduleModule = namespace("Schedule")
const settingsModule = namespace("Settings")

@Component({
  name: "Schedule",
  components: {
    TaskDialog
  }
})

// TODO: Add DND
// TODO: Add remove color
export default class Schedule extends Vue {
  @Prop({ required: true }) readonly schedule: ScheduleInterface
  @Prop({ required: true }) readonly haveHotKeys: boolean

  @scheduleModule.State("taskForms") taskForms: Array<TaskForm>
  @scheduleModule.State("importantLevelsList") importantLevelsList: Array<string>
  @scheduleModule.State("openedAddTaskFormScheduleId") openedAddTaskFormScheduleId: string | null
  @settingsModule.State("settings") settings: SettingsInterface

  @scheduleModule.Mutation("fillTaskForm") fillTaskForm: typeof ScheduleStoreModule.prototype.fillTaskForm
  @scheduleModule.Mutation("addTaskForm") addTaskForm: typeof ScheduleStoreModule.prototype.addTaskForm
  @scheduleModule.Mutation("toggleAddTaskForm") toggleTaskForm: typeof ScheduleStoreModule.prototype.toggleAddTaskForm

  @scheduleModule.Action("toggleTaskStatus") toggleTaskStatus: typeof ScheduleStoreModule.prototype.toggleTaskStatus
  @scheduleModule.Action("addTask") addTask: typeof ScheduleStoreModule.prototype.addTask
  @scheduleModule.Action("removeTask") removeTask: typeof ScheduleStoreModule.prototype.removeTask

  public getScheduleDateString = getScheduleDateString

  public keymap = {
    'ctrl+f': this.onToggleAddTaskFormKeyup(true),
    'ctrl+c': this.onToggleAddTaskFormKeyup(false),
    'ctrl+i': this.changeImportantLevel,
    'ctrl+s': this.onSubmit
  }

  public get taskForm(): TaskForm {
    if (this.taskForms) {
      const taskForm: TaskForm | undefined = this.taskForms.find(form => form.scheduleId === this.schedule.id)
      if (taskForm) return taskForm
    }

    return this.clearTaskForm
  }

  public importantLevels = ImportantLevelColor
  public importantLevelIndex = 1
  public isLoading = false

  // TODO: local storage?
  public removedColor = false

  public clearTaskForm: TaskForm = {
    scheduleId: this.schedule.id,
    name: "",
    description: "",
    importantLevel: "Important"
  }

  public mounted(): void {
    this.addTaskForm(this.clearTaskForm)
  }

  public onToggleAddTaskForm(needToOpen: boolean): void {
    needToOpen ? this.toggleTaskForm(this.schedule.id) : this.toggleTaskForm(null)
  }

  public onToggleAddTaskFormKeyup(needToOpen: boolean): Function {
    return () => this.onToggleAddTaskForm(needToOpen)
  }

  public setTaskFormName(value: string): void {
    this.fillTaskForm({
      ...this.taskForm,
      name: value
    })
  }

  public setTaskFormDescription(value: string): void {
    this.fillTaskForm({
      ...this.taskForm,
      description: value
    })
  }

  public changeImportantLevel(): void {
    this.importantLevelIndex++
    this.fillTaskForm({
      ...this.taskForm,
      importantLevel: importantLevelsList[this.importantLevelIndex % importantLevelsList.length]
    })
  }

  public onSubmit(): void {
    this.isLoading = true
    this.addTask(this.schedule.id)
      .finally(() => this.isLoading = false)
  }

  public taskIcon(task: TaskInterface): string {
    if (task.stepsCount && task.finishedSteps === task.stepsCount) return "mdi-check-all"
    if (task.status === "Complete") return "mdi-check-bold"
    return "mdi-check"
  }
}
</script>

<style lang="scss" scoped>
.schedule {
  .new-task-level {
    &:hover {
      cursor: pointer;
    }
  }

  .task {
    .button {
      display: inline-block;

      margin-top: 5px;
      margin-right: 10px;
    }
  }

  .card {
    &-description {
      padding-top: 7px;
    }
  }
}
</style>
