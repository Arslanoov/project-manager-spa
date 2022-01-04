<template>
  <main-layout>
    <template #header>
      <Header title="Task name" />
    </template>
    <template #default>
      <div class="task">
        <div class="task__header">
          <div class="task__title">Task</div>
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
              type="text"
              class="step__input"
            >
          </div>
          <div v-for="step in steps" :key="step.id" class="task__step step">
            <div
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

import MainLayout from "@/layouts/MainLayout.vue"

import StepInterface from "@/types/step/step"
import { CreateStepForm } from "@/types/step/form"

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
  @taskModule.State("currentTaskSteps") steps: StepInterface[]
  @taskModule.State("createStepForm") createForm: CreateStepForm

  @taskModule.Mutation("changeTask") changeTask: typeof TaskStoreModule.prototype.changeTask
  @taskModule.Mutation("clearTask") clearTask: typeof TaskStoreModule.prototype.clearTask
  @taskModule.Mutation("clearTaskSteps") clearSteps: typeof TaskStoreModule.prototype.clearTaskSteps
  @taskModule.Mutation("changeCreateStepFormName") changeStepFormName:
    typeof TaskStoreModule.prototype.changeCreateStepFormName

  @taskModule.Action("fetchCurrentTaskSteps") fetchSteps: typeof TaskStoreModule.prototype.fetchCurrentTaskSteps
  @taskModule.Action("createStep") createStep: typeof TaskStoreModule.prototype.createStep

  public isInputOpened = false

  public toggleInput(): void {
    this.isInputOpened = !this.isInputOpened
  }

  public created(): void {
    this.changeTask(this.$route.params.id)
    this.fetchSteps()
  }
}
</script>

<style lang="scss" scoped>
.task {
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