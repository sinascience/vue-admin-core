<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, LogOut, Settings, UserCog, Sun, Moon, Laptop } from 'lucide-vue-next'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>

<template>
  <div class="flex items-center">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="icon" class="relative">
          <User class="size-5" />
          <span
            class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel class="font-normal">
          <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">Signed in as</p>
            <p class="text-xs leading-none text-muted-foreground">
              {{ authStore.user?.email }}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCog class="mr-2 size-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings class="mr-2 size-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun
                class="mr-2 size-4 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90"
              />
              <Moon
                class="absolute mr-2 size-4 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0"
              />
              <span class="ml-2">Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Laptop class="mr-2 size-4" />
                <span>System</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sun class="mr-2 size-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Moon class="mr-2 size-4" />
                <span>Dark</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="handleLogout">
          <LogOut class="mr-2 size-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
