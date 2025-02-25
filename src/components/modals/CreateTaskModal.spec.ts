import { describe, beforeEach, expect, it } from 'vitest'
import CreateTaskModal from './CreateTaskModal.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

describe('CreateTaskModal', () => {
  let wrapper: VueWrapper

  const defaultProps = {
    isOpen: true,
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(CreateTaskModal, { props: defaultProps })
  })

  describe('render', () => {
    it('should render the modal', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('closing modal', () => {
    it('should emit close when clicking close button', async () => {
      await wrapper.find('#closeCross').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('should emit close when clicking cancel button', async () => {
      await wrapper.find('#cancelButton').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })

  describe('validation button', () => {
    it('should be disabled when form is empty', () => {
      const createButton = wrapper.find('#validateButton')
      expect(createButton.attributes('disabled')).toBeDefined()
    })

    it('should be enabled when form is filled', async () => {
      await wrapper.find('input').setValue('Task Title')
      await wrapper.find('textarea').setValue('Task Description')

      const createButton = wrapper.find('#validateButton')
      expect(createButton.attributes('disabled')).toBeUndefined()
    })
  })
})
