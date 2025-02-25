<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import Input from '../forms/Input.vue'
import TextArea from '../forms/TextArea.vue'
import { computed, reactive, ref } from 'vue'
import { useTasksStore } from '@/stores/tasks.store'
import type { Task } from '@/models/tasks.entity'

const { createTask, deleteTask } = useTasksStore()

type Props = {
  isOpen: boolean
  taskOpen: Task | null
}
const props = defineProps<Props>()

const emit = defineEmits(['close'])

const taskToUpdate = reactive({
  id: () => props.taskOpen?.id || '',
  title: () => props.taskOpen?.title || '',
  description: () => props.taskOpen?.description || '',
  state: () => props.taskOpen?.status || '',
})

const isLoading = ref(false)

const isUpdateButtonDisabled = computed(() => {
  return !taskToUpdate.title && !taskToUpdate.description
})

const validateForm = async () => {
  if (isUpdateButtonDisabled.value) return

  isLoading.value = true
  // await createTask({ ...taskToUpdate })
  isLoading.value = false
  emitClose()
}

const deleteTaskClicked = async () => {
  isLoading.value = true
  await deleteTask(taskToUpdate.id())
  isLoading.value = false
  emitClose()
}

const emitClose = () => emit('close')
</script>

<template>
  <BaseModal v-show="isOpen" :is-loading="isLoading">
    <div class="flex flex-col w-full h-full">
      <div class="h-1/8 text-xl font-bold flex justify-between items-start">
        <p>Modifier une tâche</p>
        <button
          @click="emitClose"
          class="rounded-full px-2 bg-gray-700 hover:bg-gray-600 text-lg font-bold text-white hover:cursor-pointer"
        >
          X
        </button>
      </div>

      <div class="h-8/8 flex flex-col gap-4">
        <Input label="Titre" v-model="taskToUpdate.title" />
        <TextArea label="Description" v-model="taskToUpdate.description" />
      </div>

      <div class="h-1/8 w-full flex gap-4 items-center justify-end">
        <button
          @click="deleteTaskClicked"
          class="bg-red-700 hover:bg-red-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer"
        >
          Supprimer
        </button>
        <button
          class="bg-green-700 hover:bg-green-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer"
          :disabled="isUpdateButtonDisabled"
          @click="validateForm"
        >
          Modifier
        </button>
      </div>
    </div>
  </BaseModal>
</template>
