import { describe, beforeEach, expect, it, vi } from 'vitest'
import UpdateTaskModal from './UpdateTaskModal.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { Task, TaskStatus } from '@/models/tasks.entity'

describe('UpdateTaskModal', () => {
  let wrapper: VueWrapper

  const taskMock = new Task('Test Task', 'Test Description', TaskStatus.TODO, '1')

  const defaultProps = {
    isOpen: true,
    taskOpen: taskMock,
  }

  beforeEach(() => {
    setActivePinia(createPinia())

    wrapper = mount(UpdateTaskModal, {
      props: defaultProps,
    })
  })

  describe('render', () => {
    it('should render the modal', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    it('should emit close when clicking close button', async () => {
      await wrapper.find('#closeCross').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  describe('validation button', () => {
    it('should be disabled when form is empty', async () => {
      await wrapper.find('input').setValue('')
      await wrapper.find('textarea').setValue('')

      const updateButton = wrapper.find('#validateButton')
      expect(updateButton.attributes('disabled')).toBeDefined()
    })
  })

  it('should be enabled when form is filled', async () => {
    await wrapper.find('input').setValue('Task Title')
    await wrapper.find('textarea').setValue('Task Description')

    const updateButton = wrapper.find('#validateButton')
    expect(updateButton.attributes('disabled')).toBeUndefined()
  })
})
