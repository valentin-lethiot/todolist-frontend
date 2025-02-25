import { describe, expect, test } from 'vitest'
import { Task, TaskStatus } from './tasks.entity'

describe('task entity', () => {
  test('should create a task entity', () => {
    const task = new Task('task title', 'task description', TaskStatus.DONE, 'task id')
    expect(task.title).toBe('task title')
    expect(task.description).toBe('task description')
    expect(task.id).toBe('task id')
    expect(task.status).toBe(TaskStatus.DONE)
  })

  describe('set status', () => {
    test('should change the status of a task', () => {
      const task = new Task('task title', 'task description', TaskStatus.DONE, 'task id')
      task.setStatus(TaskStatus.TODO)
      expect(task.status).toBe(TaskStatus.TODO)
    })
  })
})
