<script setup lang="ts">
import BaseInput from '@/components/forms/Input.vue'
import NewTaskButton from '@/components/forms/NewTaskButton.vue'
import FullPageLoader from '@/components/loaders/FullPageLoader.vue'
import CreateTaskModal from '@/components/modals/CreateTaskModal.vue'
import UpdateTaskModal from '@/components/modals/UpdateTaskModal.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import TasksList from '@/components/tasks/TasksList.vue'
import Header from '@/components/ui/Header.vue'
import type { Task } from '@/models/tasks.entity'
import { useTasksStore } from '@/stores/tasks.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const { fetchAllTasks, getTaskById } = tasksStore

const isLoading = ref(false)

const isCreateTaskModalOpen = ref(false)
const openCreateTaskModal = () => {
  isCreateTaskModalOpen.value = true
}
const closeCreateTaskModal = () => {
  isCreateTaskModalOpen.value = false
}

const isUpdateTaskModalOpen = ref(false)
const taskOpen = ref<Task | null>(null)
const openUpdateTaskModal = (taskId: string) => {
  taskOpen.value = tasksStore.getTaskById(taskId)
  isUpdateTaskModalOpen.value = true
}
const closeUpdateTaskModal = () => {
  taskOpen.value = null
  isUpdateTaskModalOpen.value = false
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

    <div v-else class="w-screen h-screen overflow-hidden">
      <div class="flex flex-col items-center justify-center p-8 h-full">
        <Header class="h-1/10" />

        <div class="h-9/10 overflow-y-auto">
          <TasksList :tasks="tasks" @cardClicked="openUpdateTaskModal" />
        </div>

        <NewTaskButton @click="openCreateTaskModal" />

        <CreateTaskModal :is-open="isCreateTaskModalOpen" @close="closeCreateTaskModal" />
        <UpdateTaskModal
          :task-open="taskOpen"
          :is-open="isUpdateTaskModalOpen"
          @close="closeUpdateTaskModal"
        />
      </div>
    </div>
  </main>
</template>
