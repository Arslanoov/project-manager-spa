import axios, { AxiosResponse } from "axios"

import { API_PREFIX } from "@/services/api/v1/const"

import ProjectInterface from "@/types/project/project"
import { GetProjectsResponse } from "@/types/project/response"

import { TaskForm } from "@/types/schedule/task/TaskInterface"

export default class ProjectService {
  public getPersonalProject(): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/main`)
  }

  public getCustomProjects(): Promise<AxiosResponse<GetProjectsResponse>> {
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

  public getCustomProject(id: string): Promise<ProjectInterface> {
    return axios.get(`${API_PREFIX}/todo/custom/get/${id}`)
  }

  public getTodayProject(): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/today`)
  }

  public getPrevProject(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/previous/${id}`)
  }

  public getPrevWeekProject(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/previous-week/${id}`)
  }

  public getNextProject(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/next/${id}`)
  }

  public getNextWeekProject(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/next-week/${id}`)
  }

  public addTask(form: TaskForm): Promise<AxiosResponse> {
    return axios.post(`${API_PREFIX}/todo/task/create`, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      schedule_id: form.scheduleId,
      name: form.name,
      description: form.description,
      level: form.importantLevel
    })
  }

  public changeTaskStatus(taskId: string, status: string): Promise<AxiosResponse> {
    return axios.patch(`${API_PREFIX}/todo/task/change-status`, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      task_id: taskId,
      status
    })
  }

  public removeTask(taskId: string): Promise<AxiosResponse> {
    return axios.delete(`${API_PREFIX}/todo/task/remove`, {
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        task_id: taskId
      }
    })
  }
}
