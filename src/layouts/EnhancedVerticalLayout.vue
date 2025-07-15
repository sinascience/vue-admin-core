<script setup lang="ts">
import { watch, onMounted, computed } from 'vue'
import { NavigationVertical } from '@/components/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { useNavigationStore } from '@/stores/navigation'
import { navigationData } from '@/configs/navigation'
import type { NavigationAppearance } from '@/types/navigation'
import UserProfileCard from '@/components/layout/UserProfileCard.vue'
import UserMenu from '@/components/layout/UserMenu.vue'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'
import { RouterView } from 'vue-router'
import { useScreen } from '@/composables/useScreen'

const navigationStore = useNavigationStore()
const { config, setNavigationData, setMode, toggleCollapsed, toggleOpened } = useNavigation()

const { isMobile } = useScreen()

// Initialize navigation data
onMounted(() => {
  setNavigationData('default', navigationData.default)
  setNavigationData('compact', navigationData.compact)
  setNavigationData('horizontal', navigationData.horizontal)
  setNavigationData('futuristic', navigationData.futuristic)
})

// Handle responsive behavior
watch(
  isMobile,
  (newVal) => {
    if (newVal) {
      setMode('over')
      if (config.value.opened) {
        toggleOpened()
      }
    } else {
      setMode('side')
    }
  },
  { immediate: true },
)

const handleSidebarToggle = () => {
  if (config.value.mode === 'over') {
    toggleOpened()
  } else {
    toggleCollapsed()
  }
}

const handleOverlayClick = () => {
  if (config.value.mode === 'over' && config.value.opened) {
    toggleOpened()
  }
}

const sidebarClasses = computed(() => [
  'enhanced-sidebar',
  `enhanced-sidebar--${config.value.appearance}`,
  `enhanced-sidebar--${config.value.mode}`,
  {
    'enhanced-sidebar--collapsed': config.value.collapsed && config.value.mode === 'side',
    'enhanced-sidebar--opened': config.value.opened && config.value.mode === 'over',
    'enhanced-sidebar--closed': !config.value.opened && config.value.mode === 'over',
  },
])
</script>

<template>
  <div class="enhanced-layout relative flex h-screen w-full overflow-hidden bg-background">
    <!-- Sidebar -->
    <aside :class="sidebarClasses">
      <!-- Header -->
      <div class="enhanced-sidebar__header">
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
          <span
            v-if="!config.collapsed || config.mode === 'over'"
            class="text-lg font-bold text-sidebar-foreground transition-opacity duration-300"
          >
            Vue Admin
          </span>
        </div>

        <div v-if="!config.collapsed || config.mode === 'over'" class="flex items-center">
          <NotificationsMenu />
          <UserMenu />
        </div>
      </div>

      <!-- User Profile -->
      <UserProfileCard
        v-if="!config.collapsed || config.mode === 'over'"
        class="enhanced-sidebar__profile"
      />

      <!-- Navigation -->
      <div class="enhanced-sidebar__navigation">
        <NavigationVertical :appearance="config.appearance" />
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="config.mode === 'over' && config.opened"
      @click="handleOverlayClick"
      class="enhanced-overlay"
    />

    <!-- Main Content -->
    <div class="enhanced-main">
      <!-- Header -->
      <header class="enhanced-header">
        <div class="flex items-center gap-4">
          <button @click="handleSidebarToggle" class="enhanced-header__toggle">
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

          <!-- Appearance Switcher (for testing) -->
          <select
            :value="config.appearance"
            @change="
              navigationStore.setAppearance(
                ($event.target as HTMLSelectElement).value as NavigationAppearance,
              )
            "
            class="text-sm border rounded px-2 py-1 bg-background"
          >
            <option value="default">Default</option>
            <option value="compact">Compact</option>
            <option value="dense">Dense</option>
            <option value="thin">Thin</option>
          </select>
        </div>

        <div class="flex items-center gap-4">
          <!-- Additional header content can go here -->
        </div>
      </header>

      <!-- Content -->
      <main class="enhanced-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.enhanced-layout {
  @apply transition-all duration-300 ease-in-out;
}

.enhanced-sidebar {
  @apply z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out;
  @apply h-full w-72;
}

.enhanced-sidebar--side {
  @apply relative;
}

.enhanced-sidebar--over {
  @apply absolute;
}

.enhanced-sidebar--collapsed {
  @apply w-16;
}

.enhanced-sidebar--opened {
  @apply translate-x-0;
}

.enhanced-sidebar--closed {
  @apply -translate-x-full;
}

.enhanced-sidebar__header {
  @apply flex h-16 shrink-0 items-center justify-between px-4 transition-all duration-300;
}

.enhanced-sidebar--collapsed .enhanced-sidebar__header {
  @apply justify-center px-2;
}

.enhanced-sidebar__profile {
  @apply mx-4 my-4 shrink-0;
}

.enhanced-sidebar--collapsed .enhanced-sidebar__profile {
  @apply mx-2;
}

.enhanced-sidebar__navigation {
  @apply flex-1 overflow-y-auto px-4 pb-4;
}

.enhanced-sidebar--collapsed .enhanced-sidebar__navigation {
  @apply px-2;
}

.enhanced-overlay {
  @apply fixed inset-0 z-30 bg-black/30;
}

.enhanced-main {
  @apply flex flex-1 flex-col min-w-0;
}

.enhanced-header {
  @apply flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6;
}

.enhanced-header__toggle {
  @apply p-2 rounded-md hover:bg-accent transition-colors;
}

.enhanced-content {
  @apply flex-1 overflow-y-auto p-6;
}

/* Appearance-specific styles */
.enhanced-sidebar--compact {
  @apply w-64;
}

.enhanced-sidebar--compact.enhanced-sidebar--collapsed {
  @apply w-14;
}

.enhanced-sidebar--dense {
  @apply w-60;
}

.enhanced-sidebar--dense.enhanced-sidebar--collapsed {
  @apply w-12;
}

.enhanced-sidebar--thin {
  @apply w-56;
}

.enhanced-sidebar--thin.enhanced-sidebar--collapsed {
  @apply w-10;
}
</style>
