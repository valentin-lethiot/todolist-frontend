import { describe, beforeEach, expect, it } from 'vitest'
import DeletionConfirmationModal from './DeletionConfirmationModal.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('DeletionConfirmationModal', () => {
  let wrapper: VueWrapper

  const defaultProps = {
    isOpen: true,
  }

  beforeEach(() => {
    wrapper = mount(DeletionConfirmationModal, {
      props: defaultProps,
    })
  })

  describe('render', () => {
    it('should render the modal', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    it('should emit close when clicking cancel button', async () => {
      await wrapper.find('#cancelButton').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('should emit confirm when clicking delete button', async () => {
      await wrapper.find('#confirmButton').trigger('click')
      expect(wrapper.emitted('confirm')).toBeTruthy()
    })
  })
})
