<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { isAxiosError } from 'axios'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('sina4science@gmail.com')
const password = ref('34170202') // Pre-filled for demo purposes
const errorMessage = ref<string | null>(null)

async function handleLogin() {
  errorMessage.value = null
  try {
    await authStore.login({ email: email.value, password: password.value })
    router.push('/dashboard') // Redirect to dashboard on success
  } catch (e: unknown) {
    // Catch error as 'unknown'
    // Safely check if it's an Axios error
    if (isAxiosError(e) && e.response) {
      errorMessage.value =
        e.response.data.errors || 'Failed to login. Please check your credentials.'
    } else {
      errorMessage.value = 'An unknown error occurred.'
    }
    console.error(e)
  }
}
</script>

<template>
  <Card class="w-full border-none shadow-none">
    <CardHeader>
      <CardTitle class="text-2xl font-bold tracking-tight"> Sign in </CardTitle>
      <CardDescription>
        Don't have an account?
        <RouterLink to="/auth/register" class="font-medium text-primary underline"
          >Sign up</RouterLink
        >
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" required v-model="email" />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required v-model="password" />
        </div>

        <div v-if="errorMessage" class="text-sm font-medium text-red-500">
          {{ errorMessage }}
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <Label for="remember-me" class="text-sm font-normal">Remember me</Label>
          </div>
          <RouterLink to="/forgot-password" class="text-sm font-medium text-primary underline"
            >Forgot password?</RouterLink
          >
        </div>

        <Button type="submit" class="w-full"> Sign in </Button>
      </form>

      <Separator class="my-6" />

      <div class="space-y-4">
        <Button variant="outline" class="w-full">Sign in with Google</Button>
        <Button variant="outline" class="w-full">Sign in with Facebook</Button>
      </div>
    </CardContent>
  </Card>
</template>
