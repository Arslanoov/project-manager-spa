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
  padding: 2rem;
}
</style>