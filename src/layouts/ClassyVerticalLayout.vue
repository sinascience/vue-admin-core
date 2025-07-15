<script setup lang="ts">
import { watch, onMounted, computed } from 'vue'
import { NavigationVertical } from '@/components/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { navigationData } from '@/configs/navigation'
import UserProfileCard from '@/components/layout/UserProfileCard.vue'
import UserMenu from '@/components/layout/UserMenu.vue'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'
import { RouterView } from 'vue-router'
import { useScreen } from '@/composables/useScreen'
import config from '../../v-pack.vue.config.ts'

const {
  config: navConfig,
  setNavigationData,
  setMode,
  setNavigationConfig,
  toggleCollapsed,
  toggleOpened,
} = useNavigation()

const { isMobile } = useScreen()

// Initialize navigation data and config from v-pack config
onMounted(() => {
  setNavigationData('default', navigationData.default)
  setNavigationData('compact', navigationData.compact)
  setNavigationData('horizontal', navigationData.horizontal)
  setNavigationData('futuristic', navigationData.futuristic)

  // Set initial config from v-pack.vue.config.ts
  setNavigationConfig({
    appearance: config.navigation.appearance,
    mode: config.navigation.mode,
    collapsed: config.navigation.collapsed,
    autoCollapse: config.navigation.autoCollapse,
  })
})

// Handle responsive behavior
watch(
  isMobile,
  (newVal) => {
    if (newVal) {
      setMode('over')
      if (navConfig.value.opened) {
        toggleOpened()
      }
    } else {
      setMode('side')
    }
  },
  { immediate: true },
)

const handleSidebarToggle = () => {
  if (navConfig.value.mode === 'over') {
    toggleOpened()
  } else {
    toggleCollapsed()
  }
}

const handleOverlayClick = () => {
  if (navConfig.value.mode === 'over' && navConfig.value.opened) {
    toggleOpened()
  }
}

const sidebarClasses = computed(() => [
  'classy-sidebar',
  `classy-sidebar--${navConfig.value.mode}`,
  {
    'classy-sidebar--collapsed': navConfig.value.collapsed && navConfig.value.mode === 'side',
    'classy-sidebar--opened': navConfig.value.opened && navConfig.value.mode === 'over',
    'classy-sidebar--closed': !navConfig.value.opened && navConfig.value.mode === 'over',
  },
])

const mainClasses = computed(() => [
  'classy-main',
  {
    'classy-main--sidebar-collapsed': navConfig.value.collapsed && navConfig.value.mode === 'side',
  },
])

const showSidebarContent = computed(() => {
  return !navConfig.value.collapsed || navConfig.value.mode === 'over'
})
</script>

<template>
  <div class="classy-layout">
    <!-- Sidebar -->
    <aside :class="sidebarClasses">
      <!-- Header -->
      <div class="classy-sidebar__header">
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
            v-if="showSidebarContent"
            class="text-lg font-bold text-sidebar-foreground transition-opacity duration-300"
          >
            Vue Admin
          </span>
        </div>

        <div v-if="showSidebarContent" class="flex items-center">
          <NotificationsMenu />
          <UserMenu />
        </div>
      </div>

      <!-- User Profile -->
      <UserProfileCard v-if="showSidebarContent" class="classy-sidebar__profile" />

      <!-- Navigation -->
      <div class="classy-sidebar__navigation">
        <NavigationVertical :appearance="navConfig.appearance" />
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="navConfig.mode === 'over' && navConfig.opened"
      @click="handleOverlayClick"
      class="classy-overlay"
    />

    <!-- Main Content -->
    <div :class="mainClasses">
      <!-- Header -->
      <header class="classy-header">
        <div class="flex items-center gap-4">
          <button @click="handleSidebarToggle" class="classy-header__toggle">
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

        <div class="flex items-center gap-4">
          <!-- Additional header content can go here -->
        </div>
      </header>

      <!-- Content -->
      <main class="classy-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.classy-layout {
  @apply relative flex h-screen w-full overflow-hidden;
}

.classy-sidebar {
  @apply z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300;
  @apply h-full w-72 rounded-r-xl shadow-lg;
}

.classy-sidebar--side {
  @apply relative;
}

.classy-sidebar--over {
  @apply absolute;
}

.classy-sidebar--collapsed {
  @apply w-0 opacity-0;
  transform: translateX(-100%);
  /* Ensure collapsed sidebar doesn't block the hamburger button */
  z-index: 10;
  pointer-events: none;
}

.classy-sidebar--opened {
  @apply translate-x-0;
}

.classy-sidebar--closed {
  @apply -translate-x-full;
}

.classy-sidebar__header {
  @apply flex h-16 shrink-0 items-center justify-between px-4 transition-all duration-300;
}

.classy-sidebar__profile {
  @apply mx-4 my-4 shrink-0;
}

.classy-sidebar__navigation {
  @apply flex-1 overflow-y-auto px-4 pb-4;
  /* Custom scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: oklch(0.35 0.05 265) oklch(0.25 0.04 265);
}

.classy-sidebar__navigation::-webkit-scrollbar {
  width: 8px;
}

.classy-sidebar__navigation::-webkit-scrollbar-track {
  background: oklch(0.25 0.04 265);
  border-radius: 10px;
}

.classy-sidebar__navigation::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    oklch(0.35 0.05 265) 0%,
    oklch(0.45 0.06 265) 50%,
    oklch(0.35 0.05 265) 100%
  );
  border-radius: 10px;
  border: 2px solid oklch(0.25 0.04 265);
  transition: all 0.2s ease;
}

.classy-sidebar__navigation::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    oklch(0.45 0.06 265) 0%,
    oklch(0.55 0.07 265) 50%,
    oklch(0.45 0.06 265) 100%
  );
  transform: scale(1.1);
}

.classy-sidebar__navigation::-webkit-scrollbar-thumb:active {
  background: linear-gradient(
    180deg,
    oklch(0.55 0.07 265) 0%,
    oklch(0.65 0.08 265) 50%,
    oklch(0.55 0.07 265) 100%
  );
}

.classy-overlay {
  @apply fixed inset-0 z-30 bg-black/30;
}

.classy-main {
  @apply flex flex-1 flex-col min-w-0 transition-all duration-300;
}

.classy-main--sidebar-collapsed {
  @apply ml-0;
}

.classy-header {
  @apply flex h-16 shrink-0 items-center justify-between border-b border-border transition-all duration-300;
  @apply bg-card;
  /* Extend to cover sidebar corner */
  margin-left: -18px;
  padding-left: calc(1.5rem + 18px);
  padding-right: 1.5rem;
  /* Background to match sidebar corner */
  background: oklch(1 0 0);
}

.classy-main--sidebar-collapsed .classy-header {
  /* When sidebar is collapsed, reset to normal */
  margin-left: 0;
  padding-left: 1.5rem;
  background: oklch(1 0 0);
}

.classy-header__toggle {
  @apply p-2 rounded-md transition-colors relative z-50;
  /* Better hover effect that works with sidebar background */
  color: oklch(0.85 0.02 265);
}

.classy-header__toggle:hover {
  background-color: oklch(0.25 0.04 265);
  color: oklch(1 0 0);
}

.classy-main--sidebar-collapsed .classy-header__toggle {
  /* Normal colors when sidebar is collapsed */
  color: oklch(0.4 0.02 265);
}

.classy-main--sidebar-collapsed .classy-header__toggle:hover {
  background-color: oklch(0.96 0.01 260);
  color: oklch(0.2 0.02 265);
}

.classy-content {
  @apply flex-1 overflow-y-auto p-6;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .classy-sidebar {
    @apply rounded-none shadow-none;
  }
}
</style>
