<template>
  <div class="form-group">
    <label :for="id" class="form-group__label">{{ name }}</label>
    <input
      @input="onChange"
      :type="type"
      :value="value"
      :id="id"
      :name="name"
      class="form-group__input"
    >

    <div
      v-if="error"
      class="form-group__error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"

@Component({})

export default class FormGroup extends Vue {
  @Prop([String]) readonly name: string | undefined
  @Prop([String]) readonly id: string | undefined
  @Prop([String]) readonly value: string | undefined
  @Prop([Number]) readonly clearCount: number | undefined
  @Prop({
    default: 'text',
    type: String
  }) readonly type: string | undefined

  @Prop([Array]) readonly rules: [(v: string) => boolean | string]

  public error: string | null = null

  @Watch('clearCount')
  public onChildChanged(): void {
    this.error = null
  }

  public onChange(e: Event) {
    const value = (e.target as HTMLInputElement).value ?? ''
    this.$emit('change', value)

    for (let i = 0; i < this.rules.length; i++) {
      if (typeof this.rules[i](value) === 'string') {
        this.error = this.rules[i](value) as string
        this.$emit('update-error-state', true)
        return
      }
    }

    this.error = null
    this.$emit('update-error-state', false)
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: column;

  &__label {
    font-size: 1.4rem;
    text-transform: uppercase;

    color: rgba($port-gore, .5);
  }

  &__input {
    padding: .6rem 0;

    font-size: 1.8rem;

    caret-color: $indigo;

    outline: 0;
    border: 0;

    background: transparent;

    border-bottom: .1rem solid $downriver;
  }

  &__error {
    color: $error-color;

    word-break: break-word;
  }
}
</style>