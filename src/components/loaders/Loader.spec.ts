import { describe, beforeEach, expect, test } from 'vitest'
import Loader from './Loader.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('Loader', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Loader)
  })

  describe('render', () => {
    test('should render the loader', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
