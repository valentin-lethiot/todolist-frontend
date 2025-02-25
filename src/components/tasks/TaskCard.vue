<script setup lang="ts">
import { Task } from '@/models/tasks.entity'
import TaskCheckbox from '../forms/TaskCheckbox.vue'

type Props = {
  task: Task
}
defineProps<Props>()
</script>

<template>
  <div
    class="rounded-xl w-100 p-4 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:cursor-pointer"
  >
    <div class="flex justify-between items-center">
      <TaskCheckbox class="w-1/6" />
      <p class="w-5/6 text-lg font-bold text-white">
        {{ task.title }}
      </p>
    </div>
  </div>
</template>
