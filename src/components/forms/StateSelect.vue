<script setup lang="ts">
import { TaskStatus } from '@/models/tasks.entity'
import { computed } from 'vue'

type Props = {
  modelValue: string
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const emitNewValue = (event: any) => {
  emit('update:modelValue', event.target.value)
}

const backgroundColor = computed(() => {
  switch (props.modelValue) {
    case TaskStatus.TODO:
      return 'bg-red-600'
    case TaskStatus.DOING:
      return 'bg-orange-600'
    case TaskStatus.DONE:
      return 'bg-green-600'
    default:
      return 'bg-red-600'
  }
})
</script>

<template>
  <select
    :value="modelValue"
    :class="['border text-sm rounded-lg p-1 border-gray-60 text-white', backgroundColor]"
    @change="emitNewValue"
  >
    <option :value="TaskStatus.TODO" selected class="bg-red-500">A faire</option>
    <option :value="TaskStatus.DOING" class="bg-orange-500">En cours</option>
    <option :value="TaskStatus.DONE" class="bg-green-500">Terminé</option>
  </select>
</template>
