<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import Input from '../forms/Input.vue'
import TextArea from '../forms/TextArea.vue'
import { computed, reactive, ref, watch } from 'vue'
import { useTasksStore } from '@/stores/tasks.store'
import type { Task } from '@/models/tasks.entity'
import type { UpdateTaskInput } from '@/services/inputs/UpdateTask.input'
import DeletionConfirmationModal from './DeletionConfirmationModal.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { updateTask, deleteTask } = useTasksStore()

type Props = {
  isOpen: boolean
  taskOpen: Task | null
}
const { isOpen, taskOpen } = defineProps<Props>()

const emit = defineEmits(['close'])

const isLoading = ref(false)

const taskToUpdate = reactive({
  id: '',
  title: '',
  description: '',
  status: '',
})

watch(
  () => taskOpen,
  (newValue) => {
    taskToUpdate.id = newValue?.id || ''
    taskToUpdate.title = newValue?.title || ''
    taskToUpdate.description = newValue?.description || ''
    taskToUpdate.status = newValue?.status || ''
  },
)

const isUpdateButtonDisabled = computed(() => {
  return !taskToUpdate.title || !taskToUpdate.description
})

const validateForm = async () => {
  if (isUpdateButtonDisabled.value) return

  isLoading.value = true

  const input: UpdateTaskInput = {
    title: taskToUpdate.title,
    description: taskToUpdate.description,
    status: taskToUpdate.status,
  }
  await updateTask(taskToUpdate.id, input)

  isLoading.value = false
  emitClose()
}

const deleteTaskConfirmed = async () => {
  isLoading.value = true
  closeConfirmationModal()
  await deleteTask(taskToUpdate.id)
  isLoading.value = false
  emitClose()
}

const emitClose = () => emit('close')

const isConfirmationModalOpen = ref(false)
const showConfirmationModal = () => (isConfirmationModalOpen.value = true)
const closeConfirmationModal = () => (isConfirmationModalOpen.value = false)
</script>

<template>
  <BaseModal v-show="isOpen" :is-loading="isLoading">
    <div class="flex flex-col gap-4 w-full h-full">
      <div class="h-1/8 text-xl font-bold flex justify-between items-start">
        <p>{{ t('updateTask') }}</p>
        <button
          id="closeCross"
          @click="emitClose"
          class="rounded-full px-2 bg-gray-700 hover:bg-gray-600 text-lg font-bold text-white hover:cursor-pointer"
        >
          X
        </button>
      </div>

      <div class="h-6/8 flex flex-col gap-4">
        <Input :label="t('form.title')" v-model="taskToUpdate.title" />
        <TextArea :label="t('form.description')" v-model="taskToUpdate.description" />
      </div>

      <div class="h-1/8 w-full flex gap-4 items-center justify-end">
        <button
          id="deleteButton"
          @click="showConfirmationModal"
          class="bg-red-700 hover:bg-red-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer"
        >
          {{ t('actions.delete') }}
        </button>
        <button
          id="validateButton"
          class="bg-green-700 hover:bg-green-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer disabled:bg-green-600/20 hover:disabled:cursor-not-allowed"
          :disabled="isUpdateButtonDisabled"
          @click="validateForm"
        >
          {{ t('actions.update') }}
        </button>
      </div>
    </div>

    <DeletionConfirmationModal
      :is-open="isConfirmationModalOpen"
      @close="closeConfirmationModal"
      @confirm="deleteTaskConfirmed"
    />
  </BaseModal>
</template>
