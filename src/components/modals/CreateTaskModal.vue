<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import Input from '../forms/Input.vue'
import TextArea from '../forms/TextArea.vue'
import { computed, reactive, ref } from 'vue'
import { useTasksStore } from '@/stores/tasks.store'

const { createTask } = useTasksStore()

type Props = {
  isOpen: boolean
}
defineProps<Props>()

const emit = defineEmits(['close'])

const taskToCreate = reactive({
  title: '',
  description: '',
})

const isLoading = ref(false)

const isCreateButtonDisabled = computed(() => {
  return !taskToCreate.title || !taskToCreate.description
})

const resetForm = () => {
  taskToCreate.title = ''
  taskToCreate.description = ''
}

const validateForm = async () => {
  if (isCreateButtonDisabled.value) return

  isLoading.value = true
  await createTask({ ...taskToCreate })
  isLoading.value = false

  resetForm()
  emitClose()
}

const emitClose = () => emit('close')
</script>

<template>
  <BaseModal v-show="isOpen" :is-loading="isLoading">
    <div class="flex flex-col gap-4 w-full h-full">
      <div class="h-1/8 text-xl font-bold flex justify-between items-start">
        <p>Créer une tâche</p>
        <button
          @click="emitClose"
          class="rounded-full px-2 bg-gray-700 hover:bg-gray-600 text-lg font-bold text-white hover:cursor-pointer"
        >
          X
        </button>
      </div>

      <div class="h-6/8 flex flex-col gap-4">
        <Input label="Titre" v-model="taskToCreate.title" />
        <TextArea label="Description" v-model="taskToCreate.description" />
      </div>

      <div class="h-1/8 w-full flex gap-4 items-center justify-end">
        <button
          @click="emitClose"
          class="bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer"
        >
          Annuler
        </button>
        <button
          class="bg-green-700 hover:bg-green-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer disabled:bg-green-600/20 hover:disabled:cursor-not-allowed"
          :disabled="isCreateButtonDisabled"
          @click="validateForm"
        >
          Créer
        </button>
      </div>
    </div>
  </BaseModal>
</template>
