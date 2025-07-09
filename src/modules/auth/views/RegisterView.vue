<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { isAxiosError } from 'axios'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const agreeToTerms = ref(false)

const errorMessage = ref<string | null>(null)

const isFormInvalid = computed(() => {
  return (
    !name.value ||
    !email.value ||
    !password.value ||
    password.value !== passwordConfirm.value ||
    !agreeToTerms.value
  )
})

async function handleRegister() {
  if (isFormInvalid.value) return

  errorMessage.value = null
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    // On success, redirect to login page
    router.push('/auth/login')
  } catch (e: unknown) {
    // Catch error as 'unknown'
    // Safely check if it's an Axios error with a response
    if (isAxiosError(e) && e.response) {
      errorMessage.value = e.response.data.errors || 'An error occurred during registration.'
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
      <CardTitle class="text-2xl font-bold tracking-tight"> Sign up </CardTitle>
      <CardDescription>
        Already have an account?
        <RouterLink to="/auth/login" class="font-medium text-primary underline">Sign in</RouterLink>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Display name</Label>
          <Input id="name" type="text" required v-model="name" />
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" required v-model="email" />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required v-model="password" />
        </div>
        <div class="space-y-2">
          <Label for="password-confirm">Password (Confirm)</Label>
          <Input id="password-confirm" type="password" required v-model="passwordConfirm" />
        </div>

        <div v-if="errorMessage" class="text-sm font-medium text-red-500">
          {{ errorMessage }}
        </div>

        <div class="flex items-center space-x-2 pt-2">
          <Checkbox id="terms" v-model="agreeToTerms" />
          <label for="terms" class="text-sm text-muted-foreground">
            I agree with <a href="#" class="font-medium text-primary underline">Terms</a> and
            <a href="#" class="font-medium text-primary underline">Privacy Policy</a>
          </label>
        </div>

        <Button type="submit" class="w-full" :disabled="isFormInvalid">
          Create your free account
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
