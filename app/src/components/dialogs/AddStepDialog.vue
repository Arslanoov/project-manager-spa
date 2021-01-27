<template>
  <v-dialog
      @click.stop="toggleAddStepDialog"
      @input="v => v || toggleAddStepDialog()"
      :single-select="true"
      :value="isOpenedAddStepDialog"
      max-width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          @click="toggleAddStepDialog"
          v-bind="attrs"
          class="mx-0"
          outlined
      >
        Add Step
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">Add Step</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-form
            @submit.prevent="onSubmit"
            ref="form"
            lazy-validation
        >
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  md="12"
              >
                <v-text-field
                    @input="setName"
                    :rules="rules.name"
                    :value="currentStepForm.name"
                    label="Name"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-btn @click="toggleAddStepDialog" color="blue darken-1" text>Cancel</v-btn>
        <v-btn @click="onSubmit" color="blue darken-1" text>Add Step</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { namespace } from "vuex-class"

import TaskStoreModule from "@/store/modules/task"
import { StepForm } from "@/types/schedule/task/StepInterface"

const taskModule = namespace("Task")

@Component({
  name: "AddStepDialog"
})

export default class AddStepDialog extends Vue {
  @taskModule.State("isOpenedAddStepDialog") isOpenedAddStepDialog: boolean
  @taskModule.State("currentStepForm") currentStepForm: StepForm

  @taskModule.Mutation("toggleAddStepDialog") toggleAddStepDialog: typeof TaskStoreModule.prototype.toggleAddStepDialog
  @taskModule.Mutation("setAddStepFormName") setName: typeof TaskStoreModule.prototype.setAddStepFormName
  @taskModule.Mutation("clearCurrentStepForm") clearForm: typeof TaskStoreModule.prototype.clearCurrentStepForm

  @taskModule.Action("addStep") addStep: typeof TaskStoreModule.prototype.addStep

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
    this.addStep()
      .then(() => {
        this.toggleAddStepDialog()
      })
  }
}
</script>
