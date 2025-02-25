<script setup lang="ts">
import { Task, TaskStatus } from '@/models/tasks.entity'
import TaskCheckbox from '../forms/TaskCheckbox.vue'
import StateSelect from '../forms/StateSelect.vue'
import EditIcon from '../ui/EditIcon.vue'
import { useTasksStore } from '@/stores/tasks.store'

const { updateTask } = useTasksStore()

type Props = {
  task: Task
}
const { task } = defineProps<Props>()

const emit = defineEmits(['editTask'])

const emitEditTask = () => emit('editTask')

const updateTaskStatus = (status: TaskStatus) => {
  updateTask(task.id!, { ...task, status: status as TaskStatus })
}
</script>

<template>
  <div class="rounded-xl w-100 p-4 bg-gray-800 border-gray-700">
    <div class="flex flex-col">
      <div class="flex justify-between">
        <p class="w-5/6 text-lg font-bold text-white break-all">
          {{ task.title }}
        </p>
        <div>
          <button
            class="rounded-full p-2 hover:bg-gray-600 text-lg font-bold text-white hover:cursor-pointer"
            @click="emitEditTask"
          >
            <EditIcon />
          </button>
        </div>
      </div>
      <p class="text-gray-300">
        {{ task.description }}
      </p>
      <div class="flex mt-2 justify-end">
        <StateSelect label="Status" v-model="task.status" @update:model-value="updateTaskStatus" />
      </div>
    </div>
  </div>
</template>
