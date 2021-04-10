<template>
  <div class="schedule" v-hotkey="haveHotKeys ? keymap : {}">
    <h2 v-if="schedule.date">{{ getScheduleDateString(schedule, {
      today: $t("Today"),
      tomorrow: $t("Tomorrow"),
      yesterday: $t("Yesterday")
    }) }}</h2>
    <v-timeline
        :key="schedule.id"
        clipped
        dense
    >
      <v-timeline-item
          :color="importantLevels[taskForm.importantLevel]"
          class="white--text mb-12"
          fill-dot
      >
        <template v-slot:icon>
          <div class="schedule__level" @click="toggleImportantLevel">
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
            :label="$t(`Leave a comment...`)"
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
              {{ $t("Post") }}
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
              <span class="headline">{{ $t("Add Task") }}</span>
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
                        :label="$t(`Name`)"
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
                      :items="translatedImportantLevelsList"
                      :value="$t(taskForm.importantLevel)"
                      :label="$t(`Important Level`)"
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
                        :label="$t(`Description`)"
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
                {{ $t("Close") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-timeline-item>

      <v-slide-x-transition group>
        <template v-for="task in schedule.tasks">
          <v-timeline-item
              v-if="(task.status !== `Complete` && task.stepsCount === task.finishedSteps) || !settings.hideFinishedTasks"
              :color="removedColor ? '' : importantLevels[task.importantLevel]"
              :key="task.id"
              fill-dot
          >
            <template v-slot:icon>
              <div class="schedule__level" @click="toggleTaskStatus({
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

            <v-card class="task">
              <v-card-title class="task__name">
                {{ task.name }}
              </v-card-title>
              <v-card-text :class="settings.nightMode ? 'black' : 'white'" class="task__description text--primary">
                <p>{{ task.description }}</p>
                <div class="text-right">
                  <TaskDialog :schedule="schedule" :task="task" />
                  <div class="task__button">
                    <v-btn
                        @click="removeTask({
                          task,
                          schedule
                        })"
                        :disabled="isLoading"
                        class="mx-0"
                        outlined
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </template>
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
import AlertStoreModule from "@/store/modules/alert"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"

import TaskDialog from "@/components/dialogs/TaskDialog.vue"

import translatedImportantLevels from "@/locales/importantLevels"
import { translatedType } from "@/locales/importantLevels"

import { getScheduleDateString } from "@/helpers/date"
import SettingsInterface from "@/types/settings/SettingsInterface"

const scheduleModule = namespace("Schedule")
const settingsModule = namespace("Settings")
const alertModule = namespace("Alert")

/**
 * Schedule timeline
 * @see Vuetify timeline https://vuetifyjs.com/en/components/timelines/
 * @version 1.0.0
 */
@Component({
  name: "Schedule",
  components: {
    TaskDialog
  }
})

export default class Schedule extends Vue {
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
   * Have hot keys
   * Hot keys list: <br>
   * ctrl+f - Open add task form <br>
   * ctrl+c - Close add task form <br>
   * ctrl+i - Change current task important level <br>
   * ctrl+s - Submit add task form
   * ctrl+y - Hide finished tasks
   */
  @Prop({ required: true }) readonly haveHotKeys: boolean

  @scheduleModule.State("taskForms") taskForms: Array<TaskForm>
  @scheduleModule.State("importantLevelsList") importantLevelsList: Array<string>
  @scheduleModule.State("openedAddTaskFormScheduleId") openedAddTaskFormScheduleId: string | null
  @settingsModule.State("settings") settings: SettingsInterface

  @scheduleModule.Mutation("fillTaskForm") fillTaskForm: typeof ScheduleStoreModule.prototype.fillTaskForm
  @scheduleModule.Mutation("addTaskForm") addTaskForm: typeof ScheduleStoreModule.prototype.addTaskForm
  @scheduleModule.Mutation("toggleAddTaskForm") toggleTaskForm: typeof ScheduleStoreModule.prototype.toggleAddTaskForm
  @alertModule.Mutation("setMessage") setMessage: typeof AlertStoreModule.prototype.setMessage

  @scheduleModule.Action("toggleTaskStatus") toggleTaskStatus: typeof ScheduleStoreModule.prototype.toggleTaskStatus
  @scheduleModule.Action("addTask") addTask: typeof ScheduleStoreModule.prototype.addTask
  @scheduleModule.Action("removeTask") removeTask: typeof ScheduleStoreModule.prototype.removeTask

  public getScheduleDateString = getScheduleDateString

  public keymap = {
    'ctrl+f': this.onToggleAddTaskFormKeyup(true),
    'ctrl+c': this.onToggleAddTaskFormKeyup(false),
    'ctrl+i': this.toggleImportantLevel,
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

  public changeImportantLevel(level: string): void {
    const translated = translatedImportantLevels[level as translatedType]
    this.fillTaskForm({
      ...this.taskForm,
      importantLevel: this.$i18n.locale === "en" ? level : translated
    })
  }

  public toggleImportantLevel(): void {
    this.importantLevelIndex++
    this.fillTaskForm({
      ...this.taskForm,
      importantLevel: importantLevelsList[this.importantLevelIndex % importantLevelsList.length]
    })
  }

  public onSubmit(): void {
    this.isLoading = true
    this.addTask(this.schedule.id)
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
      .finally(() => this.isLoading = false)
  }

  public taskIcon(task: TaskInterface): string {
    if (task.stepsCount && task.finishedSteps === task.stepsCount) return "mdi-check-all"
    if (task.status === "Complete") return "mdi-check-bold"
    return "mdi-check"
  }

  public get translatedImportantLevelsList(): Array<string> {
    return this.importantLevelsList.map(item => this.$t(item) as string)
  }
}
</script>

<style lang="scss" scoped>
.schedule {
  &__level {
    @include pointer-on-hover();
  }
}

.task {
  &__description {
    padding-top: 7px;
  }

  &__button {
    display: inline-block;

    margin-top: 5px;
    margin-right: 10px;
  }
}
</style>

<i18n>
{
  "en": {
    "Post": "Post",
    "Today": "Today",
    "Tomorrow": "Tomorrow",
    "Yesterday": "Yesterday",
    "Leave a comment...": "Leave a comment...",
    "Add Task": "Add Task",
    "Important Level": "Important Level",
    "Name": "Name",
    "Description": "Description",
    "Close": "Close",
    "Not Important": "Not Important",
    "Important": "Important",
    "Very Important": "Very Important"
  },
  "ru": {
    "Post": "Создать",
    "Today": "Сегодня",
    "Tomorrow": "Завтра",
    "Yesterday": "Вчера",
    "Leave a comment...": "Опишите задачу",
    "Add Task": "Добавление задачи",
    "Important Level": "Приоритет",
    "Name": "Название",
    "Description": "Описание",
    "Close": "Закрыть",
    "Not Important": "Низкий",
    "Important": "Высокий",
    "Very Important": "Высочайший"
  }
}
</i18n>
