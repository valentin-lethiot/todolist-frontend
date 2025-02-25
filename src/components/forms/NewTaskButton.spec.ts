import { describe } from 'node:test'
import { beforeEach, expect, test } from 'vitest'
import NewTaskButton from './NewTaskButton.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('NewTaskButton', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(NewTaskButton)
  })

  describe('render', () => {
    test('should render the button', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
