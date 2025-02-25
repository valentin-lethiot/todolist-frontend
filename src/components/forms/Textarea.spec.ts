import { describe, beforeEach, expect, test } from 'vitest'
import TextArea from './TextArea.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('TextArea', () => {
  let wrapper: VueWrapper

  const defaultProps = {
    label: 'label',
    modelValue: '',
  }

  beforeEach(() => {
    wrapper = mount(TextArea, {
      props: defaultProps,
    })
  })

  describe('render', () => {
    test('should render the textarea', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('events', () => {
    test('should emit update:modelValue event when textarea changes', async () => {
      const textarea = wrapper.find('textarea')
      await textarea.setValue('new value')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
    })
  })

  describe('props', () => {
    test('should display the label', () => {
      const label = wrapper.find('label')
      expect(label.text()).toBe('label')
    })

    test('should bind the modelValue to textarea value', () => {
      const textarea = wrapper.find('textarea')
      expect(textarea.element.value).toBe('')

      wrapper = mount(TextArea, {
        props: {
          ...defaultProps,
          modelValue: 'test value',
        },
      })

      expect(wrapper.find('textarea').element.value).toBe('test value')
    })
  })
})
