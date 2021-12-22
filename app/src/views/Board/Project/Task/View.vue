<template>
  <main-layout>
    <template #header>
      <Header title="Task name" />
    </template>
    <template #default>
      <div class="task">
        <div class="task__header">
          <div class="task__title">Task</div>
          <div class="task__add-step">
            <img class="task__add-step-icon" src="~@/assets/images/icons/task/plus_blue.svg" alt="">
          </div>
        </div>

        <div class="task__steps">
          <div class="task__step step">
            <div class="step__checkbox"></div>
            <div class="step__title">Title 1</div>
          </div>
          <div class="task__step step">
            <div class="step__checkbox step__checkbox_checked">
              <img src="~@/assets/images/icons/task/check.svg" alt="">
            </div>
            <div class="step__title">Title 2</div>
          </div>
        </div>
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import MainLayout from "@/layouts/MainLayout.vue"
import Header from "@/modules/Header.vue"

@Component({
  components: {
    MainLayout,
    Header
  }
})

export default class TaskView extends Vue {

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

  &__steps {

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

  &__title {
    font-size: 1.4rem;
    line-height: 2rem;

    color: #0B204C;
  }
}
</style>