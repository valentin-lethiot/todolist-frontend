import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Task, TaskStatus } from '@/models/tasks.entity'
import { tasksService } from '@/services/tasks.service'
import type { CreateTaskInput } from '@/services/inputs/CreateTask.input'
import type { UpdateTaskInput } from '@/services/inputs/UpdateTask.input'

export const useTasksStore = defineStore('tasks', () => {
  const _tasks = ref<Task[]>([])

  const tasks = computed(() => {
    return _tasks.value
  })

  const getTaskById = (taskId: string) => _tasks.value.find((task) => task.id === taskId) || null

  const fetchAllTasks = async () => {
    const response = await tasksService.getTasks()
    _tasks.value = response.map(
      (task: Task) => new Task(task.title, task.description, task.status, task.id),
    )
  }

  const createTask = async (task: CreateTaskInput) => {
    const idCreated = await tasksService.createTask(task)
    if (idCreated === '') return
    _tasks.value.push(new Task(task.title, task.description, TaskStatus.TODO, idCreated))
  }

  const deleteTask = async (taskId: string) => {
    const response = await tasksService.deleteTask(taskId)
    if (response === '') return
    _tasks.value = _tasks.value.filter((task) => task.id !== taskId)
  }

  const updateTask = async (taskId: string, taskToUpdate: UpdateTaskInput) => {
    const response = await tasksService.updateTask(taskId, taskToUpdate)
    if (response === '') return

    _tasks.value = _tasks.value.map((task) =>
      task.id === taskId
        ? new Task(
            taskToUpdate.title,
            taskToUpdate.description,
            taskToUpdate.status as TaskStatus,
            taskId,
          )
        : task,
    )
  }

  return { tasks, fetchAllTasks, createTask, getTaskById, deleteTask, updateTask }
})
