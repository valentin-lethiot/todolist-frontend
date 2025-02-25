import { beforeEach, expect, it, describe } from 'vitest'
import Input from './Input.vue'
import { mount, shallowMount, VueWrapper } from '@vue/test-utils'

describe('Input', () => {
  let wrapper: VueWrapper

  const defaultProps = {
    label: 'label',
    modelValue: '',
  }

  beforeEach(() => {
    wrapper = mount(Input, {
      props: defaultProps,
    })
  })

  describe('render', () => {
    it('should render the input', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    it('should emit update:modelValue event when input changes', async () => {
      const input = wrapper.find('input')
      await input.setValue('new value')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
    })
  })

  describe('props', () => {
    it('should display the label', () => {
      const label = wrapper.find('label')
      expect(label.text()).toBe('label')
    })

    it('should bind the modelValue to input value', () => {
      const input = wrapper.find('input')
      expect(input.element.value).toBe('')

      wrapper = mount(Input, {
        props: {
          ...defaultProps,
          modelValue: 'test value',
        },
      })

      expect(wrapper.find('input').element.value).toBe('test value')
    })
  })
})
