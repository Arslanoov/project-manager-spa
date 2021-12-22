<template>
  <div class="project">
    <h2 class="project__title">Task</h2>

    <div class="project__header">
      <div class="project__current">
        <div class="project__full-date">Dec 22, 2021</div>
        <div class="project__name">Daily</div>
      </div>
      <button class="project__add-task">
        <img class="project__add-icon" src="~@/assets/images/icons/task/plus.svg" alt="">
        Add Task
      </button>
    </div>

    <Timeline class="project__timeline" :days-count="7" :start-date="new Date()" :active-index="0" />

    <TaskList class="project__tasks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Timeline from "@/components/common/timeline/Timeline.vue"
import TaskList from "@/components/common/task/list/TaskList.vue"

@Component({
  components: {
    TaskList,
    Timeline
  }
})

export default class DailyView extends Vue {

}
</script>

<style lang="scss" scoped>
.project {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1.5rem;
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