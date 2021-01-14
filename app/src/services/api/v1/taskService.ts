import axios, { AxiosResponse } from "axios"

import { API_PREFIX } from "@/services/api/v1/const"

export default class TaskService {
  public getTaskSteps(taskId: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/task/${taskId}/steps`)
  }
}