import { describe, beforeEach, expect, test } from 'vitest'
import FullPageLoader from './FullPageLoader.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('FullPageLoader', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(FullPageLoader)
  })

  describe('render', () => {
    test('should render the full page loader', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
