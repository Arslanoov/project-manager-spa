/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse } from "axios"

import { CreateTaskForm } from "@/types/task/form"

import { API_PREFIX } from "@/services/api/v1/const"
import TaskInterface from "@/types/task/task"

export default class TaskService {
  public getTaskSteps(taskId: string): Promise<AxiosResponse<TaskInterface>> {
    return axios.get(`${API_PREFIX}/todo/task/${taskId}/steps`)
  }

  public addTask(form: CreateTaskForm): Promise<AxiosResponse> {
    return axios.post(`${API_PREFIX}/todo/task/create`, {
      schedule_id: form.projectId,
      name: form.name,
      description: form.description,
      level: form.importantLevel
    })
  }

  public changeTaskStatus(taskId: string, status: string): Promise<AxiosResponse> {
    return axios.patch(`${API_PREFIX}/todo/task/change-status`, {
      task_id: taskId,
      status
    })
  }

  public removeTask(taskId: string): Promise<AxiosResponse> {
    return axios.delete(`${API_PREFIX}/todo/task/remove`, {
      data: {
        task_id: taskId
      }
    })
  }
}