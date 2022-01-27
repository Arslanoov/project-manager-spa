<template>
  <main-layout>
    <template #header>
      <Header title="Board" />
    </template>
    <template #default>
      <div class="project">
        <div class="project__header">
          <div class="project__current">
            <div v-if="currentDate" class="project__full-date">
              {{ months[currentDate.month] }}
              {{ currentDate.day }},
              {{ currentDate.year }}
            </div>
            <div class="project__name">Daily</div>
          </div>
          <button @click="onTaskAdd" class="project__add-task">
            <img class="project__add-icon" src="~@/assets/images/icons/task/plus.svg" alt="">
            Add Task
          </button>
        </div>

        <Timeline
          @date-change="onDateChange"
          :days-count="7"
          :default-index="currentDate.index"
          :start-date="new Date()"
          class="project__timeline"
        />

        <TaskList
          v-if="currentProject"
          :project-id="currentProject.id"
          :items="currentProject.tasks"
          class="project__tasks"
        />
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

import ProjectInterface from "@/types/project/project"
import { DateSimpleType } from "@/types/common/date"

import TaskStoreModule from "@/store/modules/task"

import { routesNames } from "@/router/names"

import MainLayout from "@/layouts/MainLayout.vue"
import Header from "@/modules/Header.vue"
import Timeline from "@/components/common/timeline/Timeline.vue"
import TaskList from "@/components/common/task/list/TaskList.vue"

const taskModule = namespace("Task")

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

@Component({
  components: {
    Header,
    MainLayout,
    TaskList,
    Timeline
  }
})

export default class DailyView extends Vue {
  @taskModule.State("currentProject") currentProject: ProjectInterface
  @taskModule.State("dailyProjectDate") currentDate: DateSimpleType

  @taskModule.Action("fetchDailyProject") fetchDailyProject: typeof TaskStoreModule.prototype.fetchDailyProject

  public months = MONTHS

  public mounted(): void {
    this.fetchDailyProject(this.currentDate)
  }

  public onDateChange(date: DateSimpleType): void {
    this.fetchDailyProject(date)
  }

  public onTaskAdd(): void {
    this.$router.push({
      name: routesNames.TaskCreate,
      params: {
        projectId: this.currentProject.id
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.project {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: -1rem;
    margin-bottom: 1rem;
  }

  &__timeline {
    margin-bottom: 2.5rem;
  }

  &__name {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 3.3rem;

    color: #0B204C;
  }

  &__full-date {
    font-size: 1.4rem;
    line-height: 2.1rem;

    border: 0;
    outline: 0;

    color: #0B204C;
    opacity: .7;
  }

  &__add {
    &-icon {
      width: 1.2rem;
      height: 1.2rem;

      margin-right: 1rem;
      margin-bottom: 0.2rem;
    }

    &-task {
      display: flex;
      align-items: center;

      padding: 1.2rem 1.5rem;

      font-size: 1.3rem;
      font-weight: 700;

      border: 0;
      border-radius: 1rem;

      background-color: #F26950;
      color: #fff;
    }
  }
}
</style>