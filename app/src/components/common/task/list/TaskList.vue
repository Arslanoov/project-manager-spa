<template>
  <div class="task-list">
    <div @click="watchProject('id1')" class="task-list__item">
      <TaskCard />
    </div>
    <div @click="watchProject('id1')" class="task-list__item">
      <TaskCard />
    </div>
    <div @click="watchProject('id1')" class="task-list__item">
      <TaskCard />
    </div>
    <div @click="watchProject('id1')" class="task-list__item">
      <TaskCard />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { routesNames } from "@/router/names"

import TaskCard from "@/components/common/task/card/TaskCard.vue"

@Component({
  components: {
    TaskCard
  }
})

export default class TaskList extends Vue {
  public watchProject(id: string) {
    this.$router.push({
      name: routesNames.TaskView,
      params: {
        projectId: 'id',
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