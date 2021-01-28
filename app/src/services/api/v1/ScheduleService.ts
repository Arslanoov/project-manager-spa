import axios, { AxiosResponse } from "axios"

import { API_PREFIX } from "@/services/api/v1/const"

import { TaskForm } from "@/types/schedule/task/TaskInterface"

export default class ScheduleService {
  public getTodaySchedule(): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/today`)
  }

  public getNextSchedule(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/next/${id}`)
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
}
