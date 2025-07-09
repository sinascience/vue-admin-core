<script setup lang="ts"></script>

<template>
  <div class="flex h-screen w-full bg-slate-100 dark:bg-slate-900">
    <aside class="flex w-64 flex-col bg-white p-4 dark:bg-slate-800">
      <div class="mb-8 flex h-16 items-center justify-center">
        <p class="font-bold text-xl">Venturo</p>
      </div>
      <nav class="flex flex-col gap-2">
        <a href="#" class="rounded-md bg-slate-200 px-4 py-2 font-semibold dark:bg-slate-700"
          >Dashboard</a
        >
        <a href="#" class="rounded-md px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-700"
          >Analytics</a
        >
        <a href="#" class="rounded-md px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-700"
          >Posts</a
        >
      </nav>
    </aside>

    <div class="flex flex-1 flex-col">
      <header
        class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-800"
      >
        <p>Header Content</p>
        <p>User Menu</p>
      </header>
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
