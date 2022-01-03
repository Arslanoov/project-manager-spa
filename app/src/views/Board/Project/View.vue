<template>
  <main-layout>
    <template #header>
      <Header :title="project.isCustom ? project.name : 'Personal'" :project-id="project.id" />
    </template>
     <template #default>
       <div class="project">
         <h2 class="project__title">Task</h2>

         <div class="project__header">
           <div class="project__name">Name</div>
           <button @click="onTaskAdd" class="project__add-task">
             <img class="project__add-icon" src="~@/assets/images/icons/task/plus.svg" alt="">
             Add Task
           </button>
         </div>

         <TaskList :items="project.tasks" class="project__tasks" />
       </div>
     </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

import { routesNames } from "@/router/names"

import MainLayout from "@/layouts/MainLayout.vue"
import TaskList from "@/components/common/task/list/TaskList.vue"
import Header from "@/modules/Header.vue"

import TaskStoreModule from "@/store/modules/task"

import ProjectInterface from "@/types/project/project"

const taskModule = namespace("Task")

@Component({
  components: {
    Header,
    MainLayout,
    TaskList
  }
})

export default class CustomView extends Vue {
  @taskModule.State("currentProject") project: ProjectInterface | null

  @taskModule.Action("fetchProject") fetchProject: typeof TaskStoreModule.prototype.fetchProject

  public created() {
    this.fetchProject({
      projectId: this.$route.params.id,
      isPersonal: this.isPersonal
    })
  }

  public get isPersonal(): boolean {
    return this.$route.params.id === "personal"
  }

  public onTaskAdd() {
    this.$router.push({
      name: routesNames.TaskCreate,
      params: {
        projectId: this.$route.params.id
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