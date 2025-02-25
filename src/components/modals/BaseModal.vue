<script setup lang="ts">
import Loader from '@/components/loaders/Loader.vue'

type Props = {
  isLoading: boolean
}
defineProps<Props>()
</script>

<template>
  <div id="create-task-modal" class="absolute w-screen h-screen top-0 bg-gray-900/40 z-50 p-4">
    <div class="w-full h-full flex flex-col justify-center items-center">
      <div class="bg-gray-800 rounded-lg p-4 shadow-xl w-full h-1/2">
        <div v-if="isLoading" class="flex justify-center items-center h-full w-full">
          <Loader />
        </div>

        <slot v-else />
      </div>
    </div>
  </div>
</template>
