import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import StateSelect from './StateSelect.vue'
import { TaskStatus } from '@/models/tasks.entity'

describe('StateSelect', () => {
  let wrapper: VueWrapper

  const defaultProps = {
    modelValue: TaskStatus.TODO,
  }

  beforeEach(() => {
    wrapper = mount(StateSelect, {
      props: defaultProps,
    })
  })

  describe('renders', () => {
    it('should renders with TODO status', () => {
      wrapper = mount(StateSelect, {
        props: {
          modelValue: TaskStatus.TODO,
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders properly with DOING status', () => {
      wrapper = mount(StateSelect, {
        props: {
          modelValue: TaskStatus.DOING,
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders properly with DONE status', () => {
      wrapper = mount(StateSelect, {
        props: {
          modelValue: TaskStatus.DONE,
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('emits update:modelValue event when selection changes', async () => {
    await wrapper.find('select').setValue(TaskStatus.DOING)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([TaskStatus.DOING])
  })
})
