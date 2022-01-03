/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse } from "axios"

import { CreateTaskForm } from "@/types/task/createTask"

import { API_PREFIX } from "@/services/api/v1/const"

export default class TaskService {
  public getTaskSteps(taskId: string): Promise<AxiosResponse> {
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
}