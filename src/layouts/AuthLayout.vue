<script setup lang="ts"></script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div class="flex w-full max-w-md flex-col items-center justify-center p-8 lg:max-w-lg">
      <div class="w-full">
        <RouterView />
      </div>
    </div>

    <div
      class="hidden flex-1 items-center justify-center bg-slate-900 p-12 text-white lg:flex h-full"
    >
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Welcome to our community
        </h1>
        <p class="mt-4 text-lg text-slate-300">
          Fuse helps developers to build organized and well coded dashboards full of beautiful and
          rich modules.
        </p>
      </div>
    </div>
  </div>
</template>
