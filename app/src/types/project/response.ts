import { AxiosResponse } from "axios"

import ProjectInterface from "@/types/project/project"

export type GetProjectsResponse = Promise<AxiosResponse<{
  schedules: ProjectInterface[]
}>>

export type GetPersonalProjectResponse = Promise<AxiosResponse<ProjectInterface>>