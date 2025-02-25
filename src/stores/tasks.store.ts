import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Task, TaskStatus } from '@/models/tasks.entity'
import { tasksService } from '@/services/tasks.service'
import type { CreateTaskInput } from '@/services/inputs/CreateTask.input'

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
    const response = await tasksService.createTask(task)
    if (response === '') return
    _tasks.value.push(new Task(task.title, task.description, TaskStatus.TODO, response.id))
  }

  const deleteTask = async (taskId: string) => {
    const response = await tasksService.deleteTask(taskId)
    if (response === '') return
    _tasks.value = _tasks.value.filter((task) => task.id !== taskId)
  }

  return { tasks, fetchAllTasks, createTask, getTaskById, deleteTask }
})
