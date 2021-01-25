<template>
  <v-dialog :visible="false" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
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
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  md="12"
              >
                <v-text-field
                    label="Name"
                    required
                ></v-text-field>
              </v-col>

              <v-btn color="blue darken-1" text>Add Step</v-btn>
            </v-row>
          </v-container>
        </v-form>
        <v-btn color="blue darken-1" text>Cancel</v-btn>
        <v-btn color="blue darken-1" text>OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component({
  name: "AddStepDialog"
})

export default class AddStepDialog extends Vue {}
</script>
