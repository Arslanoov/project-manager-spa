<template>
  <div class="task-list">
    <TaskCard @click="watchProject('id1')" class="task-list__item" />
    <TaskCard @click="watchProject('id2')" class="task-list__item" />
    <TaskCard @click="watchProject('id3')" class="task-list__item" />
    <TaskCard @click="watchProject('id4')" class="task-list__item" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import TaskCard from "@/components/common/task/card/TaskCard.vue"

@Component({
  components: {
    TaskCard
  }
})

export default class TaskList extends Vue {
  public watchProject(id: string) {
    this.$router.push(`/board/project/${id}`)
  }
}
</script>

<style lang="scss" scoped>
.task-list {
  &__item {
    &:not(:last-of-type) {
      margin-bottom: 1.5rem;
    }
  }
}
</style>