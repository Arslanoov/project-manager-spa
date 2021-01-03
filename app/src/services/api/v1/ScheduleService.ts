import axios, { AxiosResponse } from "axios"

import { API_PREFIX } from "@/services/api/v1/const"

export default class ScheduleService {
  public getTodaySchedule(): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/today`)
  }

  public getNextSchedule(id: string): Promise<AxiosResponse> {
    return axios.get(`${API_PREFIX}/todo/daily/next/${id}`)
  }
}