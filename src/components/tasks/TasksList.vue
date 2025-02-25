<script setup lang="ts">
import { Task } from '@/models/tasks.entity'
import TaskCard from '@/components/tasks/TaskCard.vue'

type Props = {
  tasks: Task[]
}
defineProps<Props>()
</script>

<template>
  <div v-for="task in tasks" :key="task.id" class="flex flex-col my-1">
    <TaskCard :task="task" />
  </div>
</template>
