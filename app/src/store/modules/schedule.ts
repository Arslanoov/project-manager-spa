import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators"

import ScheduleInterface from "@/types/schedule/ScheduleInterface"
import ScheduleService from "@/services/api/v1/ScheduleService"

import TaskInterface, { TaskForm } from "@/types/schedule/task/TaskInterface"
import StepInterface from "@/types/schedule/task/StepInterface"

const service: ScheduleService = new ScheduleService()

@Module({
  namespaced: true
  // Add for tests name: "schedule"
  // TODO: Fix
})

class Schedule extends VuexModule {
  public schedules: Array<ScheduleInterface> = []
  public taskForms: Array<TaskForm> = []
  public importantLevelsList: Array<string> = [
    "Very Important",
    "Important",
    "Not Important"
  ]
  public isOpenAddTaskForm = false
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
  public addNextSchedule(schedule: ScheduleInterface): void {
    this.schedules.unshift(schedule)
  }

  @Mutation
  public addTaskForm(form: TaskForm): void {
    this.taskForms.push(form)
  }

  @Mutation
  public clearTaskForm(scheduleId: string): void {
    const index: number = this.taskForms.findIndex(form => form.scheduleId === scheduleId)
    if (index !== -1) {
      this.taskForms = this.taskForms.map((taskForm: TaskForm, formIndex: number) => {
        return index === formIndex ? {
          ...taskForm,
          scheduleId,
          name: undefined,
          description: undefined
        } : taskForm
      })
    }
  }

  @Mutation
  public toggleAddTaskForm(): void {
    this.isOpenAddTaskForm = !this.isOpenAddTaskForm
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
  public changeTaskStatus(payload: {
    scheduleIndex: number,
    taskIndex: number,
    status: string
  }): void {
    this.schedules[payload.scheduleIndex].tasks[payload.taskIndex].status = payload.status
  }

  @Mutation
  public addTaskStep(payload: {
    scheduleId: string,
    taskId: string
  }): void {
    const index: number = this.schedules.findIndex(schedule => schedule.id === payload.scheduleId)
    if (index !== -1) {
      const taskIndex: number = this.schedules[index].tasks.findIndex(task => task.id === payload.taskId)
      if (taskIndex !== -1) {
        this.schedules[index].tasks[taskIndex].stepsCount += 1
      }
    }
  }

  @Mutation
  public removeTaskStep(payload: {
    scheduleId: string,
    taskId: string,
    step: StepInterface
  }): void {
    const index: number = this.schedules.findIndex(schedule => schedule.id === payload.scheduleId)
    if (index !== -1) {
      const taskIndex: number = this.schedules[index].tasks.findIndex(task => task.id === payload.taskId)
      if (taskIndex !== -1) {
        this.schedules[index].tasks[taskIndex].stepsCount -= 1
        if (payload.step.status === "Complete") {
          this.schedules[index].tasks[taskIndex].finishedSteps -= 1
        }
      }
    }
  }

  @Mutation
  public setTaskStepStatus(payload: {
    scheduleId: string,
    taskId: string,
    step: StepInterface,
    status: string
  }): void {
    const index: number = this.schedules.findIndex(schedule => schedule.id === payload.scheduleId)
    if (index !== -1) {
      const taskIndex: number = this.schedules[index].tasks.findIndex(task => task.id === payload.taskId)
      if (taskIndex !== -1) {
        if (payload.status === "Complete") {
          this.schedules[index].tasks[taskIndex].finishedSteps += 1
        } else {
          this.schedules[index].tasks[taskIndex].finishedSteps -= 1
        }
      }
    }
  }

  @Mutation
  public addTaskToSchedule(payload: {
    scheduleId: string,
    task: TaskInterface
  }): void {
    const schedule = this.schedules.find(schedule => schedule.id === payload.scheduleId)
    if (schedule) {
      schedule.tasks.unshift({
        id: payload.task.id,
        name: payload.task.name ?? "",
        description: payload.task.description ?? "Empty Description",
        importantLevel: payload.task.importantLevel ?? "Important",
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
    const schedule = this.schedules.find(schedule => schedule.id === payload.scheduleId)
    if (schedule) {
      schedule.tasks = schedule.tasks.filter(task => task.id !== payload.taskId)
    }
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

      const firstSchedule: ScheduleInterface = this.schedules[0]

      service.getNextSchedule(firstSchedule.id)
        .then(response => {
          const schedule: ScheduleInterface = response.data
          this.context.commit("addNextSchedule", schedule)
          resolve(schedule)
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }

  @Action({ rawError: true })
  public getPrevSchedule(): Promise<ScheduleInterface> {
    return new Promise((resolve, reject) => {
      if (this.schedules.length === 0) {
        reject(new Error("Empty schedules list"))
      }

      const latestSchedule: ScheduleInterface = this.schedules[this.schedules.length - 1]

      service.getPrevSchedule(latestSchedule.id)
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
        reject(new Error("Schedule not found"))
      }

      // TODO: Finish

      const taskForm: TaskForm | undefined = this.taskForms.find(form => form.scheduleId === (schedule as ScheduleInterface).id)
      if (taskForm) {
        service.addTask(taskForm)
          .then(response => {
            const task: TaskInterface = response.data
            this.context.commit("addTaskToSchedule", {
              scheduleId: taskForm.scheduleId,
              task
            })
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

  @Action({ rawError: true })
  public removeTask(payload: {
    schedule: ScheduleInterface,
    task: TaskInterface
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      service.removeTask(payload.task.id)
        .then(() => {
          this.context.commit("removeTaskFromSchedule", {
            scheduleId: payload.schedule.id,
            taskId: payload.task.id
          })
          resolve()
        })
        .catch(error => {
          console.log(error)
          reject(error.response)
        })
    })
  }

  @Action({ rawError: true })
  public toggleTaskStatus(payload: {
    task: TaskInterface,
    schedule: ScheduleInterface
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.schedules.findIndex(item => item.id === payload.schedule.id)
      if (index !== -1) {
        const taskIndex = this.schedules[index].tasks.findIndex(item => item.id === payload.task.id)
        if (taskIndex !== -1) {
          const newStatus = this.schedules[index].tasks[taskIndex].status
            === "Complete" ? "Not Complete" : "Complete"
          service.changeTaskStatus(payload.task.id, newStatus)
            .then(() => {
              this.context.commit("changeTaskStatus", {
                scheduleIndex: index,
                taskIndex: taskIndex,
                status: newStatus
              })
              resolve()
            })
            .catch(error => {
              console.log(error)
              reject(error.response)
            })
        }
      }
    })
  }
}

export default Schedule
