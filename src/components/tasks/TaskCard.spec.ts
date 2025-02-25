import { describe, beforeEach, expect, test } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskCard from './TaskCard.vue'
import { Task, TaskStatus } from '@/models/tasks.entity'
import { createPinia, setActivePinia } from 'pinia'

describe('TaskCard', () => {
  let wrapper: VueWrapper

  const mockTask = new Task('Test Task', 'Test Description', TaskStatus.TODO, '1')

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
      },
    })
  })

  describe('render', () => {
    describe('desktop', () => {
      test('should render', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })
    })
  })

  describe('actions', () => {
    test('should emit editTask event when edit button is clicked', async () => {
      await wrapper.find('#editButton').trigger('click')
      expect(wrapper.emitted('editTask')).toBeTruthy()
    })

    test('should update task status when state is changed', async () => {
      const stateSelect = wrapper.findComponent({ name: 'StateSelect' })
      await stateSelect.vm.$emit('update:modelValue', TaskStatus.DOING)
    })
  })
})
