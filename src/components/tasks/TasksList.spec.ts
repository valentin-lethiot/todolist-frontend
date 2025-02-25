import { describe, beforeEach, expect, it } from 'vitest'
import TasksList from './TasksList.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { Task, TaskStatus } from '@/models/tasks.entity'
import TaskCard from './TaskCard.vue'
import { createPinia, setActivePinia } from 'pinia'
import { setupI18n } from '@/helpers/i18n.helper'

describe('TasksList', () => {
  let wrapper: VueWrapper

  const tasksMock = [
    new Task('Task 1', 'Description 1', TaskStatus.TODO, '1'),
    new Task('Task 2', 'Description 2', TaskStatus.DOING, '2'),
  ]

  const defaultProps = {
    tasks: tasksMock,
  }

  const i18n = setupI18n('fr-FR')

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(TasksList, {
      props: defaultProps,
      global: {
        plugins: [i18n],
      },
    })
  })

  describe('render', () => {
    it('should render the tasks list', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    it('should emit cardClicked with task id when TaskCard emits editTask', async () => {
      await wrapper.findComponent(TaskCard).vm.$emit('editTask')

      expect(wrapper.emitted('cardClicked')).toBeTruthy()
      expect(wrapper.emitted('cardClicked')![0]).toEqual(['1'])
    })
  })
})
