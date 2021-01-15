import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import ScheduleService from "@/services/api/v1/ScheduleService"

import TaskInterface, { TaskForm } from "@/types/schedule/task/TaskInterface"

const service: ScheduleService = new ScheduleService()

@Module({
  namespaced: true,
  // Add for tests name: "schedule"
  // TODO: Fix
})

class Schedule extends VuexModule {
  public schedules: Array<ScheduleInterface> = []
  public taskForms: Array<TaskForm> = []
  // TODO: Add
  public error: string | undefined = undefined

  @Mutation
  public setTodaySchedule(schedule: ScheduleInterface): void {
    this.schedules = [schedule]
  }

  @Mutation
  public addSchedule(schedule: ScheduleInterface): void {
    this.schedules.push(schedule)
  }

  @Mutation
  public addTaskForm(form: TaskForm): void {
    this.taskForms.push(form)
  }

  @Mutation
  public clearTaskForm(scheduleId: string): void {
    const index: number = this.taskForms.findIndex(form => form.scheduleId === scheduleId)
    if (index) {
      this.taskForms[index] = {
        scheduleId,
        name: undefined,
        description: undefined,
        importantLevel: undefined
      }
    }
  }

  // TODO: FULL CHANGE
  @Mutation
  public fillTaskForm(form: TaskForm): void {
    const index: number = this.taskForms.findIndex(form => form.scheduleId === form.scheduleId)

    this.taskForms = this.taskForms.map((taskForm: TaskForm, formIndex: number) => {
      return index === formIndex ? {
        ...this.taskForms[index],
        ...form
      } : taskForm
    })
  }

  @Mutation
  public addTaskToSchedule(task: TaskForm): void {
    const index: number = this.schedules.findIndex(schedule => schedule.id === task.scheduleId)
    if (index) {
      this.schedules[index].tasks.push({
        id: "new",
        name: task.name ?? "",
        description: task.description ?? "Empty Description",
        importantLevel: task.importantLevel ?? "Important",
        status: "Not Complete",
        stepsCount: 0,
        finishedSteps: 0
      })
    }
  }

  @Mutation
  public removeTaskFromSchedule(payload: {
    scheduleId: string,
    taskId: string
  }): void {
    const scheduleIndex: number = this.schedules.findIndex(schedule => schedule.id === payload.scheduleId)
    if (scheduleIndex) {
      const taskIndex: number = this.schedules[scheduleIndex].tasks.findIndex(task => task.id === payload.taskId)
      if (taskIndex) {
        this.schedules[scheduleIndex].tasks.splice(taskIndex, 1)
      }
    }
  }

  // TODO: Add tests
  @Mutation
  public fullFillTaskToSchedule(payload: {
    task: TaskInterface,
    scheduleId: string
  }): void {
    const index: number = this.schedules.findIndex(schedule => schedule.id === payload.scheduleId)
    this.schedules[index].tasks.push(payload.task)
  }

  @Action({ rawError: true })
  public getTodaySchedule(): Promise<ScheduleInterface> {
    return new Promise((resolve, reject) => {
      service.getTodaySchedule()
        .then(response => {
          const schedule: ScheduleInterface = response.data
          this.context.commit("setTodaySchedule", schedule)
          resolve(schedule)
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }

  @Action({ rawError: true })
  public getNextSchedule(): Promise<ScheduleInterface> {
    return new Promise((resolve, reject) => {
      if (this.schedules.length === 0) {
        reject(new Error("Empty schedules list"))
      }

      const latestSchedule: ScheduleInterface = this.schedules[this.schedules.length - 1]

      service.getNextSchedule(latestSchedule.id)
        .then(response => {
          const schedule: ScheduleInterface = response.data
          this.context.commit("addSchedule", schedule)
          resolve(schedule)
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }

  @Action({ rawError: true })
  public addTask(scheduleId: string): Promise<TaskInterface> {
    return new Promise((resolve, reject) => {
      const schedule: ScheduleInterface | unknown = this.schedules.find(schedule => schedule.id === scheduleId)
      if (!schedule) {
        reject(new Error("Schedule not found."))
      }

      // TODO: Finish

      const taskForm: TaskForm | undefined = this.taskForms.find(form => form.scheduleId === (schedule as ScheduleInterface).id)
      if (taskForm) {
        this.context.commit("addTaskToSchedule", taskForm)

        service.addTask(taskForm)
          .then(response => {
            const task: TaskInterface = response.data
            this.context.commit("addTaskToSchedule", task)
            this.context.commit("clearTaskForm", taskForm.scheduleId)
            resolve(task)
          })
          .catch(error => {
            console.log(error)
            this.context.commit("removeTaskFromSchedule", {
              scheduleId: (schedule as ScheduleInterface).id,
              taskId: "new"
            })
            reject(error.response)
          })

        // TODO: Add rejects
      }
    })
  }
}

export default Schedule