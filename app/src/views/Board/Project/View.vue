<template>
  <div class="project">
    <h2 class="project__title">Task</h2>

    <div class="project__header">
      <div class="project__name">Name</div>
      <button class="project__add-task">
        <img class="project__add-icon" src="~@/assets/images/icons/task/plus.svg" alt="">
        Add Task
      </button>
    </div>

    <TaskList class="project__tasks" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import TaskList from "@/components/common/task/list/TaskList.vue"

@Component({
  components: {
    TaskList
  }
})

export default class CustomView extends Vue {

}
</script>

<style lang="scss" scoped>
.project {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 1.5rem 0;
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