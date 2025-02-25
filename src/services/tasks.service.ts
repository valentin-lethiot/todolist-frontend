import type { CreateTaskInput } from './inputs/CreateTask.input'
import type { UpdateTaskInput } from './inputs/UpdateTask.input'

export const tasksService = {
  async getTasks() {
    const response = await fetch('http://localhost:3000/tasks').then((response) => response.json())

    if (response.code !== 200) return []
    return response.data
  },

  async createTask(createTaskInput: CreateTaskInput) {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(createTaskInput),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())

    if (response.code !== 201) return ''
    return response.data
  },

  async updateTask(taskId: string, updateTaskInput: UpdateTaskInput) {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updateTaskInput),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())

    if (response.code !== 200) return ''
    return response.data
  },

  async deleteTask(taskId: string) {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    }).then((response) => response.json())

    if (response.code !== 201) return ''
    return response.data
  },
}
