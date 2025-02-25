import { describe, beforeEach, expect, it } from 'vitest'
import BaseModal from './BaseModal.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('BaseModal', () => {
  let wrapper: VueWrapper

  const defaultProps = {
    isLoading: false,
  }

  beforeEach(() => {
    wrapper = mount(BaseModal, {
      props: defaultProps,
      slots: {
        default: '<div>Modal Content</div>',
      },
    })
  })

  describe('render', () => {
    it('should render the modal', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render when isLoading is true', async () => {
      await wrapper.setProps({ isLoading: true })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
