<script setup lang="ts">
import { Task, TaskStatus } from '@/models/tasks.entity'
import StateSelect from '../forms/StateSelect.vue'
import EditIcon from '../ui/EditIcon.vue'
import { useTasksStore } from '@/stores/tasks.store'
import { useI18n } from 'vue-i18n'

const { updateTask } = useTasksStore()
const { t } = useI18n()

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
  <div class="rounded-xl w-full p-4 bg-gray-800 border-gray-700">
    <div class="flex flex-col">
      <div class="flex justify-between">
        <p class="w-full md:w-5/6 text-md md:text-lg font-bold text-white break-all">
          {{ task.title }}
        </p>
        <div class="hidden md:w-1/6 md:flex md:justify-end md:items-start">
          <button
            id="editIcon"
            class="rounded-full p-2 hover:bg-gray-600 text-md md:text-lg font-bold text-white hover:cursor-pointer"
            @click="emitEditTask"
          >
            <EditIcon />
          </button>
        </div>
      </div>
      <p class="text-gray-300">
        {{ task.description }}
      </p>
      <div class="flex mt-4 justify-between md:justify-end">
        <button
          id="editButton"
          class="md:hidden rounded p-1.5 bg-gray-900 hover:bg-gray-600 text-sm font-bold text-white hover:cursor-pointer"
          @click="emitEditTask"
        >
          {{ t('actions.update') }}
        </button>

        <StateSelect label="Status" v-model="task.status" @update:model-value="updateTaskStatus" />
      </div>
    </div>
  </div>
</template>
