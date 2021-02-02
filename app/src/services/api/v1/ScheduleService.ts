import axios, { AxiosResponse } from "axios"

import { API_PREFIX } from "@/services/api/v1/const"

import { TaskForm } from "@/types/schedule/task/TaskInterface"

export default class ScheduleService {
  public getMainSchedule(): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/main`)
  }

  public getCustomSchedules(): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/custom/list`)
  }

  public getCustomSchedule(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/custom/get/${id}`)
  }

  public getTodaySchedule(): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/today`)
  }

  public getPrevSchedule(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/previous/${id}`)
  }

  public getPrevWeekSchedule(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/previous-week/${id}`)
  }

  public getNextSchedule(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/next/${id}`)
  }

  public getNextWeekSchedule(id: string): Promise<AxiosResponse> {
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
