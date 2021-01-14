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
                large
            >
              mdi-star
            </v-icon>
          </div>
        </template>
        <v-text-field
            label="Leave a comment..."
            :value="taskForm.name"
            @input="setTaskFormName"
            @keydown.enter="onSubmit"
            hide-details
            flat
            solo
        >
          <template v-slot:append>
            <v-btn
                class="mx-0"
                depressed
                @click="onSubmit"
            >
              Post
            </v-btn>
          </template>
        </v-text-field>
      </v-timeline-item>

      <v-slide-x-transition group>
        <v-timeline-item
            v-for="(task, index) in schedule.tasks"
            :key="task.id"
            :class="{'text-right': index % 2 === 0}"
            :color="removedColor ? '' : importantLevels[task.importantLevel]"
            :icon="randomIcon()"
            fill-dot
            large
        >
          <v-card>
            <v-card-title class="title">
              {{ task.name }}
              <template v-if="task.status === 'Complete'">
                <i class="mdi-check"></i>
              </template>
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>{{ task.description }}</p>

              <StepsList :task="task" />
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

import StepsList from "@/components/dialogs/StepsList.vue"

const scheduleModule = namespace("Schedule")

@Component({
  name: "Schedule",
  components: {
    StepsList
  }
})

// TODO: Add DND
// TODO: Add remove color
export default class Schedule extends Vue {
  @Prop({ required: true }) readonly schedule: ScheduleInterface
  @Prop({ required: true }) readonly index: number

  @scheduleModule.State("taskForms") taskForms: Array<TaskForm>

  @scheduleModule.Mutation("fillTaskForm") fillTaskForm: typeof ScheduleStoreModule.prototype.fillTaskForm
  @scheduleModule.Mutation("addTaskForm") addTaskForm: typeof ScheduleStoreModule.prototype.addTaskForm

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

<style lang="scss">
.schedule {
  .new-task-level {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>