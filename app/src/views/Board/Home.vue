<template>
  <main-layout>
    <template #default>
      <div class="board">
        <h2 class="board__title">{{ $t('Board') }}</h2>
        <div class="board__projects">
          <router-link to="/board/project/daily" class="project">
            <div class="project__icon">
              <img src="~@/assets/images/icons/board/daily.svg" class="project__icon-img" alt="" />
            </div>
            <h4 class="project__title">{{ $t('Daily') }}</h4>
          </router-link>

          <router-link
              v-for="project in projects"
              :key="project.id"
              :to="`/board/project/${project.isCustom ? project.id : 'personal'}`"
              class="project"
          >
            <div class="project__icon">
              <img v-if="project.isCustom" src="~@/assets/images/icons/board/custom.svg" class="project__icon-img" alt="" />
              <img v-else src="~@/assets/images/icons/board/personal.svg" class="project__icon-img" alt="" />
            </div>
            <h4 class="project__title">{{ $t(project.name) }}</h4>
            <div class="project__tasks">{{ project.tasksCount }} {{ $t('Task') }}</div>
          </router-link>

          <div @click="createProject" class="project">
            <div class="project__icon">
              <img src="~@/assets/images/icons/board/new.svg" class="project__icon-img" alt="" />
            </div>
            <h4 class="project__title">{{ $t('Create Project') }}</h4>
          </div>

          <div @click="onGoSettings" class="project">
            <div class="project__icon">
              <img
                src="~@/assets/images/icons/settings/settings.svg"
                class="project__icon-img project__icon-img_small" alt=""
              />
            </div>
            <h4 class="project__title">{{ $t('Settings') }}</h4>
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

  public createProject() {
    this.$router.push({
      name: routesNames.ProjectCreate
    })
  }

  public onGoSettings() {
    this.$router.push({
      name: routesNames.Settings
    })
  }
}
</script>

<style lang="scss" scoped>
.board {
  &__title {
    margin-bottom: 3rem;

    font-size: 2.4rem;
    font-weight: $bold;

    color: $downriver;
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

    background-color: $white;

    text-decoration: none;

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

      background: $selago;

      &-img {
        width: 4rem;
        height: 4rem;

        &_small {
          width: 3rem;
          height: 3rem;
        }
      }
    }

    &__title,
    &__tasks {
      font-size: 1.6rem;
    }

    &__title {
      margin-bottom: .8rem;

      text-align: center;
      font-weight: $regular;

      color: $downriver;
    }

    &__tasks {
      color: $cadet-blue;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "Board": "Board",
    "Daily": "Daily",
    "Personal": "Personal",
    "Create Project": "Create Project",
    "Settings": "Settings",
    "Task": "Task"
  },
  "ru": {
    "Board": "Доска",
    "Daily": "Ежедневник",
    "Personal": "Личный",
    "Create Project": "Создать проект",
    "Settings": "Настройки",
    "Task": "Задач"
  }
}
</i18n>