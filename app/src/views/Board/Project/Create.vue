<template>
  <main-layout>
    <template #header>
      <Header :title="$t('Project Create')" />
    </template>
    <template #default>
      <div class="project-create">
        <form class="project-create__form form">
          <FormGroup
            @change="changeCreateFormName"
            :value="form.name"
            class="form__group"
            name="name"
            id="name"
          />
          <FormButton @form-submit="onSubmit" :name="$t('new-project')" />
        </form>
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { namespace } from "vuex-class"

import { routesNames } from "@/router/names"

import MainLayout from "@/layouts/MainLayout.vue"
import Header from "@/modules/Header.vue"
import FormGroup from "@/components/base/form/group/FormGroup.vue"
import FormButton from "@/components/base/form/button/FormButton.vue"

import { CreateProjectForm } from "@/types/project/createProject"

import ProjectStoreModule from "@/store/modules/project"

const projectModule = namespace("Project")

@Component({
  components: {
    MainLayout,
    Header,
    FormButton,
    FormGroup
  }
})

export default class CreateProject extends Vue {
  @projectModule.State("createForm") form: CreateProjectForm

  @projectModule.Mutation("changeCreateFormName") changeCreateFormName:
      typeof ProjectStoreModule.prototype.changeCreateFormName
  @projectModule.Mutation("clearCreateForm") clearCreateForm:
    typeof ProjectStoreModule.prototype.clearCreateForm

  @projectModule.Action("createProject") createProject:
      typeof ProjectStoreModule.prototype.createProject

  public async onSubmit(): Promise<void> {
    try {
      await this.createProject()
      this.clearCreateForm()
      this.$router.push({
        name: routesNames.Board
      })
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
    "new-project": "Create New Project",
    "Project Create": "Project Create"
  },
  "ru": {
    "new-project": "Создать",
    "Project Create": "Создание проекта"
  }
}
</i18n>