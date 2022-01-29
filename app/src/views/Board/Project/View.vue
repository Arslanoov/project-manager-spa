<template>
  <main-layout>
    <template #header>
      <Header :title="$t('Board')" />
    </template>
     <template #default>
       <div v-if="project" class="project">
         <h2 class="project__title">{{ project.isCustom ? project.name : $t('Personal') }}</h2>

         <div class="project__header">
           <div class="project__name">{{ $t('Name') }}</div>
           <button @click="onTaskAdd" class="project__add-task">
             <img class="project__add-icon" src="~@/assets/images/icons/task/plus.svg" alt="">
             {{ $t('Add Task') }}
           </button>
         </div>

         <TaskList :items="project.tasks" :project-id="project.id" class="project__tasks" />
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

  @taskModule.Mutation("clearCurrentProject") clearProject: typeof TaskStoreModule.prototype.clearCurrentProject

  @taskModule.Action("fetchProject") fetchProject: typeof TaskStoreModule.prototype.fetchProject

  public created() {
    this.fetchProject({
      projectId: this.$route.params.id,
      isPersonal: this.isPersonal
    })
  }

  public destroyed(): void {
    this.clearProject()
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
  margin-top: -2rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1.5rem;
  }

  &__name {
    font-size: 2.2rem;
    font-weight: $extra-bold;
    line-height: 3.3rem;

    color: $downriver;
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

      border: none;
      border-radius: 1rem;

      background-color: $burnt-sienna;
      color: $white;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "Board": "Board",
    "Personal": "Personal",
    "Add Task": "Add Task",
    "Name": "Name"
  },
  "ru": {
    "Board": "Доска",
    "Personal": "Личный",
    "Add Task": "Добавить задачу",
    "Name": "Имя"
  }
}
</i18n>