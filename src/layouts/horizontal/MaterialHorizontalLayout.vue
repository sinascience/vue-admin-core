<script setup lang="ts">
import { onMounted } from 'vue'
import { NavigationHorizontal } from '@/components/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { navigationData } from '@/configs/navigation'
import UserMenu from '@/components/layout/UserMenu.vue'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'
import { RouterView } from 'vue-router'
import { Menu } from 'lucide-vue-next'
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
    mode: 'side',
    collapsed: false,
    autoCollapse: config.navigation.autoCollapse,
  })
})
</script>

<template>
  <div class="material-layout">
    <!-- App Bar -->
    <header class="material-header">
      <div class="material-header__container">
        <!-- Left section -->
        <div class="material-header__left">
          <button class="material-menu-button">
            <Menu class="size-6" />
          </button>
          
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-7 text-white shrink-0"
            >
              <path
                d="M12 2L1 9l11 7 9-7-5-3.17L12 2zM3.49 10.51L12 16l8.51-5.49L12 4.49 3.49 10.51z"
              />
            </svg>
            <span class="text-xl font-medium text-white">Vue Admin</span>
          </div>
        </div>

        <!-- Right section -->
        <div class="material-header__right">
          <div class="flex items-center gap-1">
            <div class="material-notifications">
              <NotificationsMenu />
            </div>
            <div class="material-user">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="material-navigation">
      <div class="material-navigation__container">
        <NavigationHorizontal :navigation="navigationData.horizontal" :appearance="navConfig.appearance" />
      </div>
    </nav>

    <!-- Main Content -->
    <main class="material-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.material-layout {
  @apply flex flex-col h-screen w-full overflow-hidden bg-background;
}

.material-header {
  @apply shrink-0 shadow-md;
  background: linear-gradient(135deg, oklch(0.5106 0.2301 276.97) 0%, oklch(0.4106 0.2801 286.97) 100%);
  height: 64px;
}

.material-header__container {
  @apply flex items-center justify-between h-full px-6;
}

.material-header__left {
  @apply flex items-center gap-4;
}

.material-menu-button {
  @apply p-2 rounded-full hover:bg-white/10 transition-colors text-white;
}

.material-header__right {
  @apply flex items-center;
}

.material-notifications,
.material-user {
  @apply flex items-center;
}

/* Override button colors for material theme */
.material-notifications :deep(button),
.material-user :deep(button) {
  @apply text-white hover:bg-white/10;
}

.material-navigation {
  @apply bg-white shadow-sm border-b border-border;
  @apply h-12 shrink-0;
}

.material-navigation__container {
  @apply flex items-center h-full px-6;
}

/* Override navigation colors for material theme */
.material-navigation :deep(.navigation-horizontal-item) {
  @apply text-foreground/80 hover:text-primary hover:bg-primary/10;
  @apply rounded-none border-b-2 border-transparent;
  @apply px-4 py-3;
}

.material-navigation :deep(.navigation-horizontal-item--active) {
  @apply text-primary bg-transparent border-b-primary;
}

.material-content {
  @apply flex-1 overflow-y-auto p-6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .material-header__container {
    @apply px-4;
  }
  
  .material-header__left span {
    @apply hidden;
  }
  
  .material-navigation__container {
    @apply px-4 overflow-x-auto;
  }
}
</style>