<script setup lang="ts">
import UserMenu from '@/components/layout/UserMenu.vue'
</script>

<template>
  <div class="flex h-screen w-full flex-col bg-slate-100 dark:bg-slate-900">
    <header
      class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-800"
    >
      <div class="flex items-center gap-8">
        <p class="font-bold text-xl">Venturo</p>
        <nav class="flex gap-4">
          <a href="#" class="font-semibold">Dashboard</a>
          <a href="#">Analytics</a>
          <a href="#">Posts</a>
        </nav>
      </div>
      <div>
        <UserMenu />
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-6">
      <slot />
    </main>
  </div>
</template>
