import axios, { AxiosResponse } from "axios"

import { API_PREFIX } from "@/services/api/v1/const"

import { StepForm } from "@/types/schedule/task/StepInterface"

export default class TaskService {
  public addStep(form: StepForm): Promise<AxiosResponse> {
    return axios.post(`${API_PREFIX}/todo/task/step/create`, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      task_id: form.taskId,
      name: form.name
    })
  }
}
