<template>
  <v-list-item class="add-custom-schedule">
    <v-form
        @submit.prevent="onSubmit"
        @keyup.enter="onSubmit"
        ref="form"
        lazy-validation
    >
      <v-text-field
          @blur="onBlur"
          @input="setCustomScheduleFormName"
          :rules="rules.name"
          :value="form.name"
          label="Schedule name"
          required
          rounded
      ></v-text-field>
    </v-form>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { namespace } from "vuex-class"

import { CustomScheduleFormInterface } from "@/types/schedule/ScheduleInterface"

import NavStoreModule from "@/store/modules/nav"

const navModule = namespace("Nav")

@Component({
  name: "AddCustomSchedule"
})

export default class AddCustomSchedule extends Vue {
  @navModule.State("addCustomScheduleForm") form: CustomScheduleFormInterface

  @navModule.Mutation("setCustomScheduleFormName") setCustomScheduleFormName: typeof NavStoreModule.prototype.setCustomScheduleFormName

  @navModule.Action("createCustomSchedule") createCustomSchedule: typeof NavStoreModule.prototype.createCustomSchedule

  $refs!: {
    form: HTMLFormElement
  }

  public rules = {
    name: [
      (v: string) => !!v || "Name is required",
      (v: string) => (v && v.length < 32) || "Name must be less than 32 characters"
    ]
  }

  public onSubmit(): void {
    this.$refs.form.validate()
    this.createCustomSchedule()
      .then(() => this.$refs.form.reset())
  }

  public onBlur(): void {
    this.$refs.form.reset()
    this.$refs.form.resetValidation()
    this.setCustomScheduleFormName("")
  }
}
</script>

<style lang="scss">
/* TODO: Change, temp solution */
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 !important;

  .v-label {
    font-size: 12px !important;
  }
}
</style>
