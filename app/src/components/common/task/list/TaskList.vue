<template>
  <div class="task-list">
    <div
      v-for="item in items"
      @click="watchTask(item.id)"
      :key="item.id"
      class="task-list__item"
    >
      <TaskCard :item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import { routesNames } from "@/router/names"

import TaskInterface from "@/types/task/task"

import TaskCard from "@/components/common/task/card/TaskCard.vue"

@Component({
  components: {
    TaskCard
  }
})

export default class TaskList extends Vue {
  @Prop([String]) readonly projectId: string
  @Prop([Array]) readonly items: TaskInterface[]

  public watchTask(id: string) {
    this.$router.push({
      name: routesNames.TaskView,
      params: {
        projectId: this.projectId,
        id,
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.task-list {
  &__item {
    @include pointer-on-hover();

    &:not(:last-of-type) {
      margin-bottom: 1.5rem;
    }
  }
}
</style>