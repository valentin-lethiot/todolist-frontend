import { describe, beforeEach, expect, it } from 'vitest'
import Header from './Header.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('Header', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Header)
  })

  describe('render', () => {
    it('should render the header', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
