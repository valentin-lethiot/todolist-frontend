<script setup lang="ts"></script>

<template>
  <select v-model="$i18n.locale" class="absolute right-2 top-2">
    <option
      class="text-black"
      v-for="locale in $i18n.availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
    >
      {{ locale }}
    </option>
  </select>
</template>
