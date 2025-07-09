<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.user" class="flex flex-col items-center text-center p-4">
    <Avatar class="size-24 mb-4">
      <AvatarImage :src="authStore.displayAvatarUrl" alt="User Avatar" />
      <AvatarFallback class="text-3xl">
        {{ authStore.user.name.charAt(0).toUpperCase() }}
      </AvatarFallback>
    </Avatar>
    <h2 class="font-semibold text-lg">{{ authStore.user.name }}</h2>
    <p class="text-sm text-muted-foreground">{{ authStore.user.email }}</p>
  </div>
</template>
