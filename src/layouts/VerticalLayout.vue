<script setup lang="ts">
import { ref, watch } from 'vue'
import { menuConfig } from '@/configs/menu'
import UserProfileCard from '@/components/layout/UserProfileCard.vue'
import UserMenu from '@/components/layout/UserMenu.vue'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useScreen } from '@/composables/useScreen'

const isSidebarOpen = ref(false) // For mobile overlay
const isSidebarCollapsed = ref(false) // For desktop collapse

const { isMobile } = useScreen()

const toggleSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = !isSidebarOpen.value
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
}

// Watch for screen size changes to close mobile overlay if screen gets larger
watch(isMobile, (newVal) => {
  if (!newVal) {
    isSidebarOpen.value = false
  }
})
</script>

<template>
  <div class="relative flex h-screen w-full overflow-hidden bg-background">
    <aside
      :class="[
        'z-40 flex flex-col bg-sidebar text-sidebar-foreground p-4 h-full w-72 transition-all duration-300 ease-in-out ',
        'md:relative',
        'max-md:absolute max-md:w-72', // Mobile-specific styles
        isSidebarOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
        !isSidebarCollapsed ? 'md:ml-0' : 'md:-ml-72',
      ]"
    >
      <div
        :class="[
          'flex h-16 shrink-0 items-center justify-between px-2 transition-all duration-300',
          'justify-between px-2',
        ]"
      >
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-8 text-primary shrink-0"
          >
            <path
              d="M12 2L1 9l11 7 9-7-5-3.17L12 2zM3.49 10.51L12 16l8.51-5.49L12 4.49 3.49 10.51z"
            />
          </svg>
        </div>

        <div class="flex items-center">
          <NotificationsMenu />
          <UserMenu />
        </div>
      </div>

      <UserProfileCard class="my-4 shrink-0" />

      <nav class="flex flex-col gap-6 overflow-y-auto px-2">
        <div v-for="section in menuConfig" :key="section.title">
          <div class="px-3 mb-2">
            <h3 class="text-sm font-bold tracking-wider text-sidebar-section-header uppercase">
              {{ section.title }}
            </h3>
            <p class="text-xs text-sidebar-muted-foreground/80">{{ section.description }}</p>
          </div>
          <div class="flex flex-col gap-1">
            <RouterLink
              v-for="item in section.items"
              :key="item.to"
              :to="item.to"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                @click="navigate"
                :href="href"
                :class="[
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-primary/50',
                ]"
              >
                <component :is="item.icon" class="size-5 shrink-0" />
                <span>{{ item.title }}</span>
              </a>
            </RouterLink>
          </div>
        </div>
      </nav>
    </aside>

    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-30 bg-black/30 md:hidden"
      aria-hidden="true"
    ></div>

    <div class="flex flex-1 flex-col">
      <header
        class="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6"
      >
        <div>
          <button @click="toggleSidebar" class="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div></div>
      </header>
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
