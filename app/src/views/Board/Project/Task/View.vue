<template>
  <main-layout>
    <template #header>
      <Header :title="task.projectName" />
    </template>
    <template #default>
      <div class="task">
        <div class="task__center">
          <div
            :class="{
            'task__level_red': task.importantLevel === 'Very Important',
            'task__level_yellow': task.importantLevel === 'Important',
            'task__level_green': task.importantLevel === 'Not Important'
          }"
            class="task__level"
          />
        </div>

        <div class="task__info">
          <h2 class="task__name">{{ task.name }}</h2>
          <p class="task__description">{{ task.description }}</p>
        </div>

        <div class="task__header">
          <div class="task__title">Steps</div>
          <div @click="toggleInput" class="task__add-step">
            <img class="task__add-step-icon" src="~@/assets/images/icons/task/plus_blue.svg" alt="">
          </div>
        </div>

        <div class="task__steps">
          <div v-if="isInputOpened" class="task__step step">
            <div class="step__checkbox"></div>
            <input
              @keyup.enter="createStep"
              @input="e => changeStepFormName(e.target.value)"
              :value="createForm.name"
              placeholder="Step name..."
              type="text"
              class="step__input"
            >
          </div>
          <div v-for="step in task.steps" :key="step.id" class="task__step step">
            <div
              @click="toggleStepStatus(step.id)"
              :class="step.status === 'Complete' ? 'step__checkbox_checked' : ''"
              class="step__checkbox"
            >
              <img
                v-if="step.status === 'Complete'"
                src="~@/assets/images/icons/task/check.svg"
                alt=""
              >
            </div>
            <div class="step__title">{{ step.name }}</div>
          </div>
        </div>
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

import TaskInterface from "@/types/task/task"
import { CreateStepForm } from "@/types/step/form"

import MainLayout from "@/layouts/MainLayout.vue"
import Header from "@/modules/Header.vue"

import TaskStoreModule from "@/store/modules/task"

const taskModule = namespace("Task")

@Component({
  components: {
    MainLayout,
    Header
  }
})

export default class TaskView extends Vue {
  @taskModule.State("currentTask") task: TaskInterface
  @taskModule.State("createStepForm") createForm: CreateStepForm

  @taskModule.Mutation("changeTask") changeTask: typeof TaskStoreModule.prototype.changeTask
  @taskModule.Mutation("clearTask") clearTask: typeof TaskStoreModule.prototype.clearTask
  @taskModule.Mutation("changeCreateStepFormName") changeStepFormName:
    typeof TaskStoreModule.prototype.changeCreateStepFormName

  @taskModule.Action("fetchCurrentTask") fetchCurrentTask: typeof TaskStoreModule.prototype.fetchCurrentTask
  @taskModule.Action("createStep") createStep: typeof TaskStoreModule.prototype.createStep
  @taskModule.Action("toggleStepStatus") toggleStepStatus: typeof TaskStoreModule.prototype.toggleStepStatus

  public isInputOpened = false

  public toggleInput(): void {
    this.isInputOpened = !this.isInputOpened
  }

  public created(): void {
    this.fetchCurrentTask(this.$route.params.id)
  }

  public beforeDestroyed(): void {
    this.clearTask()
  }
}
</script>

<style lang="scss" scoped>
.task {
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 1rem;
  }

  &__center {
    display: flex;
    justify-content: center;
  }

  &__level {
    width: 10rem;
    height: .3rem;

    margin-top: -2rem;
    margin-bottom: 1rem;

    z-index: 1;

    &_red {
      background-color: #F26950;
    }

    &_yellow {
      background-color: #dec62c;
    }

    &_green {
      background-color: #2CC09C;
    }
  }

  &__name {
    font-size: 2.4rem;

    color: #0B204C;
  }

  &__description {
    font-size: 1.4rem;
    line-height: 2rem;

    color: #919BB3;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 1.8rem;
    line-height: 2.7rem;
    font-weight: 600;

    color: #0B204C;
  }

  &__add-step {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.8rem;
    height: 2.8rem;

    background: rgba(#5A55CA, .1);

    border-radius: .7rem;

    &-icon {
      width: 1rem;
      height: 1rem;
    }
  }

  &__step {
    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }
}

.step {
  display: flex;
  align-items: center;

  padding: 1.6rem;

  background-color: #fff;

  border-radius: 1.4rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  /* TODO: Separate component */
  &__checkbox {
    flex-shrink: 0;

    width: 2.4rem;
    height: 2.4rem;

    margin-right: 1.4rem;

    border-radius: .8rem;

    border: .1rem solid #B2BAC9;

    @include pointer-on-hover();

    &_checked {
      display: flex;
      justify-content: center;
      align-items: center;

      border-color: #2CC09C;
      background-color: #2CC09C;
    }

    &-hidden {
      display: none;
    }
  }

  &__input {
    width: 100%;

    background: transparent;
    border: none;
    outline: none;
  }

  &__title {
    font-size: 1.4rem;
    line-height: 2rem;

    color: #0B204C;
  }
}
</style>