<template>
  <main-layout>
    <template #header>
      <Header :title="$t('Task Create')" />
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
  @taskModule.Mutation("clearCreateForm") clearCreateForm:
      typeof TaskStoreModule.prototype.clearCreateForm

  @taskModule.Action("createTask") createTask: typeof TaskStoreModule.prototype.createTask

  public levelValues = [
    this.$t('Not Important'),
    this.$t('Important'),
    this.$t('Very Important')
  ]

  public async onSubmit(): Promise<void> {
    try {
      await this.createTask()
      this.$router.back()
      this.clearCreateForm()
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
    "Task Create": "Task Create",
    "new-task": "Create New Task",
    "Not Important": "Not Important",
    "Important": "Important",
    "Very Important": "Very Important"
  },
  "ru": {
    "Task Create": "Создать задачу",
    "new-task": "Создать задачу",
    "Not Important": "Не важно",
    "Important": "Важно",
    "Very Important": "Срочно"
  }
}
</i18n>