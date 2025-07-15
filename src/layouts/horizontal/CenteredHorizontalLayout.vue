<script setup lang="ts">
import { onMounted } from 'vue'
import { NavigationHorizontal } from '@/components/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { navigationData } from '@/configs/navigation'
import UserMenu from '@/components/layout/UserMenu.vue'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'
import { RouterView } from 'vue-router'
import config from '../../../v-pack.vue.config.ts'

const { config: navConfig, setNavigationData, setNavigationConfig } = useNavigation()

// Initialize navigation data and config from v-pack config
onMounted(() => {
  setNavigationData('default', navigationData.default)
  setNavigationData('compact', navigationData.compact)
  setNavigationData('horizontal', navigationData.horizontal)
  setNavigationData('futuristic', navigationData.futuristic)
  
  // Set initial config from v-pack.vue.config.ts
  setNavigationConfig({
    appearance: config.navigation.appearance,
    mode: 'side', // Horizontal layouts don't collapse
    collapsed: false,
    autoCollapse: config.navigation.autoCollapse,
  })
})
</script>

<template>
  <div class="centered-layout">
    <!-- Top Header -->
    <header class="centered-header">
      <!-- Left section -->
      <div class="centered-header__left">
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
          <span class="text-lg font-bold text-foreground">
            Vue Admin
          </span>
        </div>
      </div>

      <!-- Center navigation -->
      <div class="centered-header__center">
        <NavigationHorizontal :navigation="navigationData.horizontal" :appearance="navConfig.appearance" />
      </div>

      <!-- Right section -->
      <div class="centered-header__right">
        <div class="flex items-center gap-2">
          <NotificationsMenu />
          <UserMenu />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="centered-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.centered-layout {
  @apply flex flex-col h-screen w-full overflow-hidden bg-background;
}

.centered-header {
  @apply flex items-center justify-between bg-card border-b border-border px-6 py-3;
  @apply h-16 shrink-0 shadow-sm;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
}

.centered-header__left {
  @apply flex items-center;
}

.centered-header__center {
  @apply flex items-center justify-center;
  /* Ensure navigation is properly centered */
  min-width: 0;
}

.centered-header__right {
  @apply flex items-center justify-end;
}

.centered-content {
  @apply flex-1 overflow-y-auto p-6;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .centered-header {
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
  }
  
  .centered-header__center {
    @apply justify-start overflow-x-auto;
  }
}

@media (max-width: 768px) {
  .centered-header {
    @apply px-4;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
  }
  
  .centered-header__center {
    @apply hidden;
  }
  
  .centered-header__left span {
    @apply hidden;
  }
}
</style>