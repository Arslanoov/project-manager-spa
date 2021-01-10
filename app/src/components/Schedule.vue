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
          <div class="new-task-level" @click="changeImportantLevel">new</div>
        </template>
        <v-text-field
            label="Leave a comment..."
            :value="taskForm.name"
            @input="setTaskFormName"
            @keydown.enter="addTask"
            hide-details
            flat
            solo
        >
          <template v-slot:append>
            <v-btn
                class="mx-0"
                depressed
                @click="addTask"
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

              <v-btn
                  :color="removedColor ? '' : importantLevels[task.importantLevel]"
                  class="mx-0"
                  outlined
              >
                Show steps
                <template v-if="task.stepsCount > 0">
                  ({{ task.stepsCount }} / {{ task.finishedSteps }})
                </template>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-slide-x-transition>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import { ImportantLevelColor } from "@/types/schedule/task/TaskInterface"
import randomIcon from "@/helpers/schedule/randomIcon"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import { TaskForm } from "@/types/schedule/task/TaskInterface"
import { importantLevelsList } from "@/types/schedule/task/TaskInterface"

import { SCHEDULE_STORE_PREFIX } from "@/store/modules/schedule"

@Component({
  name: "Schedule"
})

// TODO: Add DND
// TODO: Add remove color

export default class Schedule extends Vue {
  @Prop({ required: true }) readonly schedule: ScheduleInterface

  public importantLevels = ImportantLevelColor

  public randomIcon = randomIcon

  public taskForm = this.$store.state.Schedule.taskForms.filter((form: TaskForm) => form.scheduleId === this.schedule.id)

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
    this.$store.commit(SCHEDULE_STORE_PREFIX + "addTaskForm", this.clearTaskForm)
  }

  public setTaskFormName(value: string): void {
    this.$store.commit(SCHEDULE_STORE_PREFIX + "fillTaskForm", {
      name: value
    })
  }

  public changeImportantLevel(): void {
    this.importantLevelIndex++
    this.$store.commit(SCHEDULE_STORE_PREFIX + "fillTaskForm", {
      importantLevel: importantLevelsList[this.importantLevelIndex % importantLevelsList.length]
    })
  }

  public addTask(): void {
    this.$store.dispatch(SCHEDULE_STORE_PREFIX + "addTask", this.schedule.id)
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