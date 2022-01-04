<template>
  <div class="card">
    <div class="card__status">{{ item.status }}</div>
    <div class="card__line" />
    <div class="card__content">
      <div class="card__content">
        <div class="card__level" />
        <div class="card__text">
          <h4 class="card__title">{{ item.name }}</h4>
          <p class="card__description">{{ item.description }}</p>
        </div>
      </div>
    </div>
    <div class="card__bottom">
      <div class="card__steps">
        <img class="card__icon" src="~@/assets/images/icons/task/total.svg" alt="">
        {{ item.stepsCount }} Steps
      </div>
      <div class="card__steps-finished">
        <img class="card__icon" src="~@/assets/images/icons/task/completed.svg" alt="">
        {{ item.finishedSteps }} Finished
      </div>
      <div
        @click="e => toggleStatus(e, item.id)"
        :class="item.status === 'Complete' ? 'card__checkbox_checked' : ''"
        class="card__checkbox"
      >
        <img
          v-if="item.status === 'Complete'"
          src="~@/assets/images/icons/task/check.svg"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { namespace } from "vuex-class"

import TaskInterface from "@/types/task/task"

// TODO: Move store use

import TaskStoreModule from "@/store/modules/task"

const taskModule = namespace("Task")

@Component({})

export default class TaskCard extends Vue {
  @Prop([Object]) readonly item: TaskInterface

  @taskModule.Action("toggleTaskStatus") toggleTaskStatus: typeof TaskStoreModule.prototype.toggleTaskStatus

  public toggleStatus(e: Event, id: string): void {
    e.stopPropagation()
    this.toggleTaskStatus(id)
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 2rem;

  font-size: 1.4rem;
  border-radius: 1.5rem;

  color: #0B204C;
  background-color: #fff;

  &__status {
    margin-bottom: .5rem;

    text-transform: uppercase;

    color: #2CC09C;
  }

  &__line {
    width: 100%;

    margin-bottom: 1rem;

    background-color: #0B204C;
    opacity: .1;
  }

  &__content {
    display: flex;
    gap: 1rem;

    margin-bottom: 1rem;
  }

  &__level {
    flex-shrink: 0;

    width: .3rem;
    // TODO: Fix, add 100% height
    min-height: 4.5rem;

    // red - #F26950
    // green - #2CC09C
    // yellow? - #C4DE2C

    background-color: #2CC09C;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 3rem;

    color: #0B204C;
  }

  &__description {
    color: #B2BAC9;
  }

  &__steps,
  &__steps-finished {
    display: flex;
    align-items: center;
  }

  &__bottom {
    display: flex;
    align-items: center;

    gap: 3rem;
  }

  &__icon {
    margin-right: .5rem;
  }

  // TODO: Separate component
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
}
</style>