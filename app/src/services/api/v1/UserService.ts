/* eslint-disable @typescript-eslint/camelcase */

import axios, { AxiosResponse } from "axios"
import qs from "qs"

import { API_PREFIX } from "./const"

export default class UserService {
  public async auth(username: string|null, password: string|null): Promise<AxiosResponse> {
    return axios.post(`${API_PREFIX}/oauth/auth`, qs.stringify({
      grant_type: 'password',
      username: username,
      password: password,
      client_id: 'app',
      client_secret: '',
      access_type: 'offline'
    }))
  }

  public async signUp(login: string|null, email: string|null, password: string|null): Promise<AxiosResponse> {
    return axios.post(`${API_PREFIX}/auth/sign-up/request`, {
      login,
      email,
      password
    })
  }

  public async confirmSignUp(token: string|null): Promise<AxiosResponse> {
    return axios.post(`${API_PREFIX}/auth/sign-up/confirm`, {
      token
    })
  }

  public async refresh(token: string|null): Promise<void> {
    await axios.post(`${API_PREFIX}/oauth/auth`, {
      grant_type: 'refresh_token',
      refresh_token: token,
      client_id: 'app',
      client_secret: ''
    })
      .then(response => response.data)
  }
}