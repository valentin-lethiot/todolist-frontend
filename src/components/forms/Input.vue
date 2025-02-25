<script setup lang="ts">
type Props = {
  label: string
  modelValue: string
}
defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const emitNewValue = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div>
    <label class="block mb-1 text-md font-medium text-white">{{ label }}</label>
    <input
      :value="modelValue"
      type="text"
      class="bg-gray-50 border text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white"
      required
      @input="emitNewValue"
    />
  </div>
</template>
