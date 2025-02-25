import { describe, beforeEach, expect, it } from 'vitest'
import EditIcon from './EditIcon.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('EditIcon', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(EditIcon)
  })

  describe('render', () => {
    it('should render the edit icon', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
