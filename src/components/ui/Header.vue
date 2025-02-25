<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <header class="flex flex-col">
    <h1 class="text-xl font-bold text-center md:text-3xl">{{ t('header') }}</h1>
    <hr class="my-2 md:my-6 h-0.5 w-40 w-full bg-white rounded-lg" />
  </header>
</template>
