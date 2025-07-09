<script setup lang="ts">
import IconNotFound from '@/components/icons/IconNotFound.vue'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex h-full flex-auto flex-col items-center justify-center p-6 sm:p-10">
    <IconNotFound class="w-full max-w-3xl h-auto" />
    <h1 class="text-4xl font-bold tracking-tight mt-8">Ooops... 404!</h1>
    <p class="text-lg text-muted-foreground mt-2">The page you requested could not be found.</p>
    <Button as-child class="mt-8">
      <RouterLink to="/dashboard">Back to Dashboard</RouterLink>
    </Button>
  </div>
</template>
