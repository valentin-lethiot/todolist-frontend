import type { CreateTaskInput } from './inputs/CreateTask.input'

export const tasksService = {
  async getTasks() {
    const response = await fetch('http://localhost:3000/tasks').then((response) => response.json())

    console.log(response)
    if (response.code !== 200) return []
    return response.data
  },

  async createTask(createTaskInput: CreateTaskInput) {
    console.log(createTaskInput)
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(createTaskInput),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())

    console.log(response)
    if (response.code !== 201) return ''
    return response.data
  },
}
