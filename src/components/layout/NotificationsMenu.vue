<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Mail, Star, RefreshCw } from 'lucide-vue-next'
import { type Component } from 'vue'

interface Notification {
  id: number
  type: 'challenge' | 'invite' | 'mailbox' | 'cron'
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Mock data - this can later be moved to a Pinia store
const notifications: Notification[] = [
  {
    id: 1,
    type: 'challenge',
    title: 'Daily challenges',
    message: 'Your submission has been accepted',
    timestamp: 'Jul 09, 12:37 PM',
    read: false,
  },
  {
    id: 2,
    type: 'invite',
    title: 'Leo Gill',
    message: 'added you to Top Secret Project group and assigned you...',
    timestamp: 'Jul 09, 12:12 PM',
    read: true,
  },
  {
    id: 3,
    type: 'mailbox',
    title: 'Mailbox',
    message: 'You have 15 unread mails across 3 mailboxes',
    timestamp: 'Jul 09, 10:02 AM',
    read: false,
  },
  {
    id: 4,
    type: 'cron',
    title: 'Cron jobs',
    message: 'Your Docker container is ready to publish',
    timestamp: 'Jul 09, 8:02 AM',
    read: false,
  },
]

const iconMap: Record<Notification['type'], Component> = {
  challenge: Star,
  invite: Avatar, // Special case handled in template
  mailbox: Mail,
  cron: RefreshCw,
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" size="icon" class="relative">
        <Bell class="size-5" />
        <span
          class="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
          >3</span
        >
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80 p-0" align="start">
      <div class="p-4 border-b">
        <h3 class="text-lg font-medium">Notifications</h3>
      </div>
      <div class="flex flex-col">
        <a
          v-for="item in notifications"
          :key="item.id"
          href="#"
          class="flex items-start gap-4 p-4 transition-colors hover:bg-muted/50"
        >
          <div class="shrink-0 mt-0.5">
            <Avatar v-if="item.type === 'invite'" class="size-6">
              <AvatarImage src="https://i.pravatar.cc/32?u=leo" alt="Leo Gill" />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <component v-else :is="iconMap[item.type]" class="size-5 text-muted-foreground" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold">
              {{ item.title }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ item.message }}
            </p>
            <p class="text-xs text-muted-foreground/80 mt-1">
              {{ item.timestamp }}
            </p>
          </div>
          <div v-if="!item.read" class="shrink-0 mt-1">
            <span class="block size-2 rounded-full bg-primary" />
          </div>
        </a>
      </div>
      <div class="p-2 border-t text-center">
        <Button variant="link" size="sm" class="w-full"> View all notifications </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
