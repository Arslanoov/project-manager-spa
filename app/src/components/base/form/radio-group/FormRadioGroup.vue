<template>
  <div class="form-radio-group">
    <div class="form-radio-group__items">
      <label v-for="value in values" :key="value" class="form-radio-group__item">
        <span
          :class="selected === value && 'form-radio-group__label_checked'"
          class="form-radio-group__label"
        >
          <input
            @change="onChange"
            :name="name"
            :value="value"
            :checked="selected === value"
            class="form-radio-group__radio"
            type="radio"
          >
        </span>
        {{ value }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})

export default class FormRadioGroup extends Vue {
  @Prop([String]) readonly id: string | undefined
  @Prop([String]) readonly name: string | undefined
  @Prop([String]) readonly selected: string | undefined
  @Prop([Array]) readonly values: string[] | number[]

  public onChange(e: Event) {
    const value = (e.target as HTMLInputElement).value ?? ''
    this.$emit('change', value)
  }
}
</script>

<style lang="scss" scoped>
.form-radio-group {
  display: flex;
  flex-direction: column;

  &__items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & > * {
      margin-bottom: .5rem;

      &:not(:last-of-type) {
        margin-right: 2rem;
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;

    @include pointer-on-hover();
  }

  &__label {
    width: 2.2rem;
    height: 2.2rem;

    margin-right: .7rem;

    border: .1rem solid $cadet-blue;
    border-radius: 2rem;

    background-color: $white;

    &_checked {
      position: relative;

      &::after {
        content: "";

        position: absolute;
        top: 50%;
        left: 50%;

        width: 1.4rem;
        height: 1.4rem;

        background-color: $indigo;
        border-radius: 1.5rem;

        transform: translateX(-50%) translateY(-50%);
      }
    }
  }

  &__radio {
    display: none;
  }

  &__error {
    color: $error-color;

    word-break: break-word;
  }
}
</style>