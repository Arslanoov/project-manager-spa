<template>
  <div class="card">
    <div class="card__status">{{ task.status }}</div>
    <div class="card__line" />
    <div class="card__content">
      <div class="card__level" />
      <div class="card__text">
        <h4 class="card__title">{{ task.name }}</h4>
        <p class="card__description">{{ task.description }}</p>
      </div>
    </div>
    <div class="card__bottom">
      <div class="card__steps">
        <img class="card__icon" src="~@/assets/images/icons/task/total.svg" alt="">
        {{ task.stepsCount }} Steps
      </div>
      <div class="card__steps-finished">
        <img class="card__icon" src="~@/assets/images/icons/task/completed.svg" alt="">
        {{ task.finishedSteps }} Finished
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})

export default class TaskCard extends Vue {
  public task = {
    id: "313131",
    name: "1 Web UI Design Project",
    description: "Website UI Design for $500",
    importantLevel: "Very Important",
    status: "Not Complete",
    stepsCount: 23,
    finishedSteps: 2
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

    margin-bottom: 2rem;
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
}
</style>