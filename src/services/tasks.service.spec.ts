import { describe, beforeEach, expect, it, vi } from 'vitest'
import { tasksService } from './tasks.service'
import { Task, TaskStatus } from '@/models/tasks.entity'

describe('TasksService', () => {
  const mockTask = new Task('Test Task', 'Test Description', TaskStatus.TODO, '1')

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getTasks', () => {
    it('should return tasks array when successful', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 200, data: [mockTask] }),
      })

      const result = await tasksService.getTasks()
      expect(result).toEqual([mockTask])
    })

    it('should return empty array when failed', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 400, data: null }),
      })

      const result = await tasksService.getTasks()
      expect(result).toEqual([])
    })
  })

  describe('createTask', () => {
    const createTaskInput = {
      title: 'Test Task',
      description: 'Test Description',
    }

    it('should return task id when successful', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 201, data: '1' }),
      })

      const result = await tasksService.createTask(createTaskInput)
      expect(result).toBe('1')
    })

    it('should return empty string when failed', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 400, data: null }),
      })

      const result = await tasksService.createTask(createTaskInput)
      expect(result).toBe('')
    })
  })

  describe('updateTask', () => {
    const updateTaskInput = {
      title: 'Updated Task',
      description: 'Updated Description',
      status: TaskStatus.DOING,
    }

    it('should return task id when successful', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 200, data: '1' }),
      })

      const result = await tasksService.updateTask('1', updateTaskInput)
      expect(result).toBe('1')
    })

    it('should return empty string when failed', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 400, data: null }),
      })

      const result = await tasksService.updateTask('1', updateTaskInput)
      expect(result).toBe('')
    })
  })

  describe('deleteTask', () => {
    it('should return task id when successful', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 201, data: '1' }),
      })

      const result = await tasksService.deleteTask('1')
      expect(result).toBe('1')
    })

    it('should return empty string when failed', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ code: 400, data: null }),
      })

      const result = await tasksService.deleteTask('1')
      expect(result).toBe('')
    })
  })
})
