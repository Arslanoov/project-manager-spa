<template>
  <main-layout>
    <template #default>
      <div class="board">
        <h2 class="board__title">Board</h2>
        <div class="board__projects">
          <div
              @click="goToProject(project.id)"
              v-for="project in projects"
              :key="project.id"
              class="board__project project"
          >
            <div class="project__icon">
              <img v-if="project.isCustom" src="~@/assets/images/icons/board/custom.svg" class="project__icon-img" alt="" />
              <img v-else src="~@/assets/images/icons/board/personal.svg" class="project__icon-img" alt="" />
            </div>
            <h4 class="project__title">{{ project.name }}</h4>
            <div class="project__tasks">{{ project.tasksCount }} Task</div>
          </div>
          <div @click="createProject" class="board__project project">
            <div class="project__icon">
              <img src="~@/assets/images/icons/board/new.svg" class="project__icon-img" alt="" />
            </div>
            <h4 class="project__title">Create Project</h4>
          </div>
        </div>
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

import { routesNames } from "@/router/names"

import ProjectInterface from "@/types/project/project"
import ProjectStoreModule from "@/store/modules/project"

import MainLayout from "@/layouts/MainLayout.vue"

const projectModule = namespace("Project")

@Component({
  components: {
    MainLayout
  }
})

export default class Board extends Vue {
  @projectModule.State("projectList") projects: Array<ProjectInterface>

  @projectModule.Action("fetchProjects") fetchProjects: typeof ProjectStoreModule.prototype.fetchProjects

  public created() {
    this.fetchProjects()
  }

  public goToProject(id: string) {
    this.$router.push({
      name: routesNames.CustomProject,
      params: {
        id,
      }
    })
  }

  public createProject() {
    this.$router.push({
      name: routesNames.ProjectCreate
    })
  }
}
</script>

<style lang="scss" scoped>
.board {
  &__title {
    margin-bottom: 3rem;

    font-size: 2.4rem;
    font-weight: 700;

    color: #0B204C;
  }

  &__projects {
    display: grid;
    grid-template-columns: minmax(min-content, 20rem);
    justify-content: center;
    gap: 2.4rem;

    @include mobile {
      grid-template-columns: repeat(2, minmax(5rem, 1fr));
    }

    @include tablet {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .project {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1.5rem 3.5rem;

    border-radius: 1.4rem;

    background-color: #fff;

    @include pointer-on-hover();

    @include mobile-lg {
      padding: 2.4rem 5rem;
    }

    @include tablet {
      width: 20rem;
      height: 20rem;
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 6rem;
      height: 6rem;

      margin-bottom: 1.6rem;

      border-radius: 1.4rem;

      background: #F0F4FD;

      &-img {
        width: 4rem;
        height: 4rem;
      }
    }

    &__title,
    &__tasks {
      font-size: 1.6rem;
    }

    &__title {
      margin-bottom: .8rem;

      text-align: center;
      font-weight: 400;

      color: #0B204C;
    }

    &__tasks {
      color: #B2BAC9;
    }
  }
}
</style>