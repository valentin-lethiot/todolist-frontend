<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import Input from '../forms/Input.vue'
import TextArea from '../forms/TextArea.vue'
import { computed, reactive, ref } from 'vue'
import { useTasksStore } from '@/stores/tasks.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
        <p>{{ t('createTask') }}</p>
        <button
          id="closeCross"
          @click="emitClose"
          class="rounded-full px-2 bg-gray-700 hover:bg-gray-600 text-lg font-bold text-white hover:cursor-pointer"
        >
          X
        </button>
      </div>

      <div class="h-6/8 flex flex-col gap-4">
        <Input :label="t('form.title')" v-model="taskToCreate.title" />
        <TextArea :label="t('form.description')" v-model="taskToCreate.description" />
      </div>

      <div class="h-1/8 w-full flex gap-4 items-center justify-end">
        <button
          id="cancelButton"
          @click="emitClose"
          class="bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer"
        >
          {{ t('actions.cancel') }}
        </button>
        <button
          id="validateButton"
          class="bg-green-700 hover:bg-green-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer disabled:bg-green-600/20 hover:disabled:cursor-not-allowed"
          :disabled="isCreateButtonDisabled"
          @click="validateForm"
        >
          {{ t('actions.create') }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>
