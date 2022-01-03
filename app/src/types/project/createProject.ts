export type CreateProjectForm = {
  name: string
}

export const emptyCreateProjectForm = (): CreateProjectForm => ({
  name: ""
})