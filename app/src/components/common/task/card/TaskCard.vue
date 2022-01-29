<template>
  <div class="card">
    <div
      :class="{
        'card__status_green': item.importantLevel === 'Not Important',
        'card__status_yellow': item.importantLevel === 'Important',
        'card__status_red': item.importantLevel === 'Very Important',
      }"
      class="card__status"
    >
      {{ $t(item.status) }}
    </div>
    <div class="card__line" />
    <div class="card__content">
      <div class="card__content">
        <div
          :class="{
            'card__level_green': item.importantLevel === 'Not Important',
            'card__level_yellow': item.importantLevel === 'Important',
            'card__level_red': item.importantLevel === 'Very Important',
          }"
          class="card__level"
        />
        <div class="card__text">
          <h4 class="card__title">{{ item.name }}</h4>
          <p class="card__description">{{ item.description }}</p>
        </div>
      </div>
    </div>
    <div class="card__bottom">
      <div class="card__steps">
        <img class="card__icon" src="~@/assets/images/icons/task/total.svg" alt="">
        {{ item.stepsCount }} {{ $t('Steps') }}
      </div>
      <div class="card__steps-finished">
        <img class="card__icon" src="~@/assets/images/icons/task/completed.svg" alt="">
        {{ item.finishedSteps }} {{ $t('Finished') }}
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

  color: $downriver;
  background-color: $white;

  &__status {
    margin-bottom: .5rem;

    text-transform: uppercase;

    &_green {
      color: $not-important;
    }

    &_yellow {
      color: $important;
    }

    &_red {
      color: $very-important;
    }
  }

  &__line {
    width: 100%;

    margin-bottom: 1rem;

    background-color: $downriver;
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
    min-height: 4.5rem;

    &_green {
      background-color: $not-important;
    }

    &_yellow {
      background-color: $important;
    }

    &_red {
      background-color: $very-important;
    }
  }

  &__title {
    font-size: 2rem;
    font-weight: $bold;
    line-height: 3rem;

    color: $downriver;
  }

  &__description {
    color: $cadet-blue;
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

  &__checkbox {
    flex-shrink: 0;

    width: 2.4rem;
    height: 2.4rem;

    margin-right: 1.4rem;

    border-radius: .8rem;

    border: .1rem solid $cadet-blue;

    @include pointer-on-hover();

    &_checked {
      display: flex;
      justify-content: center;
      align-items: center;

      border-color: $checked;
      background-color: $checked;
    }

    &-hidden {
      display: none;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "Steps": "Settings",
    "Finished": "Finished",
    "Not Complete": "Not Complete",
    "Complete": "Complete"
  },
  "ru": {
    "Steps": "Шагов",
    "Finished": "Выполнено",
    "Not Complete": "Не выполнено",
    "Complete": "Выполнено"
  }
}
</i18n>