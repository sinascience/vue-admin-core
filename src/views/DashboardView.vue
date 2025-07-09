<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const authStore = useAuthStore()
const welcomeMessage = computed(() => `Welcome back, ${authStore.user?.name || 'User'}!`)

const stats = [
  { title: 'Due Tasks', value: 25, color: 'text-blue-500' },
  { title: 'Tasks', value: 4, color: 'text-red-500' },
  { title: 'Issues', value: 32, color: 'text-amber-500' },
  { title: 'Features', value: 42, color: 'text-green-500' },
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex items-center gap-4">
        <Avatar>
          <AvatarImage :src="authStore.displayAvatarUrl" alt="User Avatar" />
          <AvatarFallback>VU</AvatarFallback>
        </Avatar>
        <div>
          <h1 class="text-2xl font-bold tracking-tight">{{ welcomeMessage }}</h1>
          <p class="text-muted-foreground">You have 2 new messages and 15 new tasks</p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button>Messages</Button>
        <Button variant="outline">Settings</Button>
      </div>
    </div>

    <Tabs default-value="home" class="space-y-4">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="budget">Budget</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="home" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card v-for="stat in stats" :key="stat.title">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="text-4xl font-bold" :class="stat.color">{{ stat.value }}</div>
            </CardContent>
          </Card>
        </div>

        <Card class="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Github Issues Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              class="h-64 bg-slate-200 dark:bg-slate-800 rounded-md flex items-center justify-center"
            >
              <p class="text-muted-foreground">Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
