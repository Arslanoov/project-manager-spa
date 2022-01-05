<template>
  <button
    @click="onSubmit"
    :disabled="disabled"
    class="form-button"
    type="submit"
  >{{ name }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})

export default class FormButton extends Vue {
  @Prop([String]) readonly name: string | undefined
  @Prop([Boolean]) readonly disabled: boolean | undefined

  onSubmit(e: Event) {
    e.preventDefault()
    this.$emit('form-submit')
  }
}
</script>

<style lang="scss" scoped>
.form-button {
  width: 100%;
  max-width: 32.5rem;
  height: 4.3rem;

  font-size: 1.5rem;

  border: 0;
  outline: 0;

  box-shadow: 0 .3rem 1rem rgba(86, 125, 244, .05);
  border-radius: 1rem;

  background: #5A55CA;
  color: #fff;
}
</style>