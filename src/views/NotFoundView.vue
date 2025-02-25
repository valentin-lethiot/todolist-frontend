<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen">
    <div class="flex flex-col h-full gap-8 items-center justify-center">
      <div class="text-center text-white">
        <h1 class="text-6xl font-bold">WOW</h1>
        <p class="text-2xl">Bah alors ? On est perdu ?</p>
      </div>
      <div>
        <RouterLink
          to="/"
          class="bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-bold p-2 text-white hover:cursor-pointer"
        >
          Rentrer à la maison
        </RouterLink>
      </div>
    </div>
  </div>
</template>
