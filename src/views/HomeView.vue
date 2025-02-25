<script setup lang="ts">
import BaseInput from '@/components/forms/Input.vue'
import NewTaskButton from '@/components/forms/NewTaskButton.vue'
import FullPageLoader from '@/components/loaders/FullPageLoader.vue'
import CreateTaskModal from '@/components/modals/CreateTaskModal.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import TasksList from '@/components/tasks/TasksList.vue'
import Header from '@/components/ui/Header.vue'
import { useTasksStore } from '@/stores/tasks.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const { fetchAllTasks } = tasksStore

const isLoading = ref(false)

const isCreateTaskModalOpen = ref(false)
const openCreateTaskModal = () => {
  isCreateTaskModalOpen.value = true
}
const closeCreateTaskModal = () => {
  isCreateTaskModalOpen.value = false
}

onMounted(async () => {
  isLoading.value = true
  await fetchAllTasks()
  isLoading.value = false
})
</script>

<template>
  <main>
    <FullPageLoader v-if="isLoading" />

    <div v-else class="flex flex-col items-center justify-center p-8">
      <Header />

      <TasksList :tasks="tasks" />

      <NewTaskButton @click="openCreateTaskModal" />

      <CreateTaskModal :is-open="isCreateTaskModalOpen" @close="closeCreateTaskModal" />
    </div>
  </main>
</template>
