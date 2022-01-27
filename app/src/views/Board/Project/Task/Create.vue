<template>
  <main-layout>
    <template #header>
      <Header title="Task Create" />
    </template>
    <template #default>
      <div class="task-create">
        <form class="task-create__form form">
          <FormGroup
            @change="changeCreateFormName"
            :value="form.name"
            class="form__group"
            name="name"
            id="name"
          />
          <FormRadioGroup
            @change="changeCreateFormLevel"
            :selected="form.importantLevel"
            :values="levelValues"
            class="form__group"
            name="description"
            id="description"
          />
          <FormButton @form-submit="onSubmit" :name="$t('new-task')" />
        </form>
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"

import MainLayout from "@/layouts/MainLayout.vue"
import Header from "@/modules/Header.vue"
import FormGroup from "@/components/base/form/group/FormGroup.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"

import { CreateTaskForm } from "@/types/task/form"

import TaskStoreModule from "@/store/modules/task"
import FormRadioGroup from "@/components/base/form/radio-group/FormRadioGroup.vue"

const taskModule = namespace("Task")

@Component({
  components: {
    FormRadioGroup,
    MainLayout,
    Header,
    FormButton,
    FormGroup
  }
})

export default class CreateTask extends Vue {
  @taskModule.State("createForm") form: CreateTaskForm

  @taskModule.Mutation("changeCreateFormName") changeCreateFormName:
      typeof TaskStoreModule.prototype.changeCreateFormName
  @taskModule.Mutation("changeCreateFormLevel") changeCreateFormLevel:
      typeof TaskStoreModule.prototype.changeCreateFormLevel
  @taskModule.Mutation("changeCreateFormDescription") changeCreateFormDescription:
      typeof TaskStoreModule.prototype.changeCreateFormDescription

  @taskModule.Action("createTask") createTask: typeof TaskStoreModule.prototype.createTask

  public levelValues = ['Not Important', 'Important', 'Very Important']

  public async onSubmit(): Promise<void> {
    try {
      await this.createTask()
      await this.$router.back()
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__group {
    margin-bottom: 2rem;
  }
}
</style>

<i18n>
{
  "en": {
    "new-task": "Create New Task"
  },
  "ru": {
    "new-task": "Create New Task"
  }
}
</i18n>