<template>
  <v-list-item class="add-custom-schedule">
    <v-form
        @submit.prevent="onSubmit"
        @keyup.enter="onSubmit"
        hide-details="auto"
        ref="form"
        lazy-validation
    >
      <v-text-field
          @blur="onBlur"
          @input="setCustomScheduleFormName"
          :rules="rules.name"
          :label="$t(`Schedule name`)"
          :value="form.name"
          height="15px"
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
import AlertStoreModule from "@/store/modules/alert"

const navModule = namespace("Nav")
const alertModule = namespace("Alert")

/**
 * Add custom schedule form
 * @version 1.0.0
 */
@Component({
  name: "AddCustomSchedule"
})

export default class AddCustomSchedule extends Vue {
  @navModule.State("addCustomScheduleForm") form: CustomScheduleFormInterface

  @navModule.Mutation("setCustomScheduleFormName") setCustomScheduleFormName: typeof NavStoreModule.prototype.setCustomScheduleFormName
 @navModule.Mutation("toggleAddCustomScheduleForm") toggleScheduleForm:
      typeof NavStoreModule.prototype.toggleAddCustomScheduleForm
  @navModule.Action("createCustomSchedule") createCustomSchedule: typeof NavStoreModule.prototype.createCustomSchedule
  @alertModule.Mutation("setMessage") setMessage: typeof AlertStoreModule.prototype.setMessage

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
      .then(() => {
        this.$refs.form.reset()
        this.toggleScheduleForm()
      })
      .catch(error => this.setMessage({
        message: error.data.error,
        type: "error"
      }))
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

<i18n>
{
  "en": {
    "Schedule name": "Schedule name"
  },
  "ru": {
    "Schedule name": "Название"
  }
}
</i18n>
