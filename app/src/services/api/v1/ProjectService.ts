/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse } from "axios"

import { API_PREFIX } from "@/services/api/v1/const"

import ProjectInterface from "@/types/project/project"
import { GetPersonalProjectResponse, GetProjectsResponse } from "@/types/project/response"

export default class ProjectService {
  public getPersonalProject(): GetPersonalProjectResponse {
    return axios.get(`${API_PREFIX}/todo/main`)
  }

  public getCustomProjects(): GetProjectsResponse {
    return axios.get(`${API_PREFIX}/todo/custom/list`)
  }

  public addCustomProject(name: string): Promise<ProjectInterface> {
    return axios.post(`${API_PREFIX}/todo/custom/create`, {
      name
    })
  }

  public removeCustomProject(id: string): Promise<void> {
    return axios.delete(`${API_PREFIX}/todo/custom/remove`, {
      data: {
        id
      }
    })
  }

  public getCustomProject(id: string): Promise<AxiosResponse<ProjectInterface>> {
    return axios.get(`${API_PREFIX}/todo/custom/get/${id}`)
  }

  public getProjectByDate(day: number, month: number, year: number): Promise<AxiosResponse<ProjectInterface>> {
    return axios.get(`${API_PREFIX}/todo/daily/get-by-date/${day}/${month}/${year}`)
  }
}
