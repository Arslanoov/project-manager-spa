<template>
  <div class="schedule">
    <v-timeline
        :key="schedule.id"
        :dense="$vuetify.breakpoint.smAndDown"
        class="schedule">
      <v-timeline-item
          :color="importantLevels[taskForm.importantLevel]"
          class="white--text mb-12"
          fill-dot
          large
      >
        <template v-slot:icon>
          <div class="new-task-level" @click="changeImportantLevel">
            <v-icon
                color="white"
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
                class="mx-0"
                color="white"
                depressed
            >
              Post
            </v-btn>
            <v-btn
                @click="toggleTaskForm"
                class="mx-0"
                color="white"
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
        <v-dialog @input="v => v || toggleTaskForm()" :value="isOpenAddTaskForm" max-width="500px">
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
                  @click="toggleTaskForm"
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
            v-for="(task, index) in schedule.tasks"
            :key="task.id"
            :class="{'text-right': index % 2 === 0}"
            :color="removedColor ? '' : importantLevels[task.importantLevel]"
            :icon="(task.finishedSteps === task.stepsCount && task.stepsCount) ? 'mdi-check-all' :
                  (task.status === 'Complete' ? 'mdi-check-bold' : (
                      task.status === 'Not Complete' ? 'mdi-check' : ''
                  ))"
            fill-dot
            large
        >
          <v-card>
            <v-card-title class="title">
              {{ task.name }}
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>{{ task.description }}</p>
              <TaskDialog :task="task" />
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

import { ImportantLevelColor } from "@/types/schedule/task/TaskInterface"
import { importantLevelsList } from "@/types/schedule/task/TaskInterface"
import { TaskForm } from "@/types/schedule/task/TaskInterface"

import randomIcon from "@/helpers/schedule/randomIcon"

import ScheduleStoreModule from "@/store/modules/schedule"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"

import TaskDialog from "@/components/dialogs/TaskDialog.vue"

const scheduleModule = namespace("Schedule")

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
  @Prop({ required: true }) readonly index: number

  @scheduleModule.State("taskForms") taskForms: Array<TaskForm>
  @scheduleModule.State("importantLevelsList") importantLevelsList: Array<string>
  @scheduleModule.State("isOpenAddTaskForm") isOpenAddTaskForm: boolean

  @scheduleModule.Mutation("fillTaskForm") fillTaskForm: typeof ScheduleStoreModule.prototype.fillTaskForm
  @scheduleModule.Mutation("addTaskForm") addTaskForm: typeof ScheduleStoreModule.prototype.addTaskForm
  @scheduleModule.Mutation("toggleAddTaskForm") toggleTaskForm: typeof ScheduleStoreModule.prototype.toggleAddTaskForm

  @scheduleModule.Action("addTask") addTask: typeof ScheduleStoreModule.prototype.addTask

  public get taskForm(): TaskForm {
    return this.taskForms[this.index] ?? this.clearTaskForm
  }

  public importantLevels = ImportantLevelColor

  public randomIcon = randomIcon

  public importantLevelIndex = 1

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
    this.addTask(this.schedule.id)
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
}
</style>
