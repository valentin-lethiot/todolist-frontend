<script setup lang="ts">
type Props = {
  isOpen: boolean
}
const { isOpen } = defineProps<Props>()

const emit = defineEmits(['close', 'confirm'])

const emitClose = () => emit('close')
const emitConfirm = () => emit('confirm')
</script>

<template>
  <div v-show="isOpen" class="absolute w-screen h-screen top-0 left-0 bg-gray-900/40 z-60">
    <div class="w-full h-full flex flex-col justify-center items-center p-8">
      <div class="bg-gray-800 rounded-lg p-4 shadow-xl w-1/2">
        <div class="flex flex-col w-full h-full gap-4">
          <div class="h-1/2 text-xl font-bold flex justify-between items-start">
            <p>Voulez-vous vraiment supprimer cette tâche ?</p>
          </div>

          <div class="h-1/2 w-full flex gap-4 items-center justify-end">
            <button
              @click="emitClose"
              class="bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer"
            >
              Annuler
            </button>
            <button
              class="bg-red-700 hover:bg-red-600 rounded-lg text-lg font-bold p-2 text-white w-1/2 hover:cursor-pointer"
              @click="emitConfirm"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
