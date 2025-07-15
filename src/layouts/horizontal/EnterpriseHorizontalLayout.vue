<script setup lang="ts">
import { onMounted } from 'vue'
import { NavigationHorizontal } from '@/components/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { navigationData } from '@/configs/navigation'
import UserMenu from '@/components/layout/UserMenu.vue'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'
import { RouterView } from 'vue-router'
import { Search, Settings } from 'lucide-vue-next'
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
  <div class="enterprise-layout">
    <!-- Top Bar -->
    <header class="enterprise-header">
      <!-- Brand section -->
      <div class="enterprise-header__brand">
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
          <div class="flex flex-col">
            <span class="text-lg font-bold text-foreground">Vue Admin</span>
            <span class="text-xs text-muted-foreground">Enterprise Dashboard</span>
          </div>
        </div>
      </div>

      <!-- Tools section -->
      <div class="enterprise-header__tools">
        <div class="flex items-center gap-4">
          <!-- Search -->
          <div class="enterprise-search">
            <Search class="size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search everything..." 
              class="enterprise-search__input"
            />
          </div>
          
          <!-- Settings -->
          <button class="enterprise-tool-button">
            <Settings class="size-5" />
          </button>
          
          <!-- Notifications and User -->
          <div class="flex items-center gap-2">
            <NotificationsMenu />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation Bar -->
    <nav class="enterprise-navigation">
      <div class="enterprise-navigation__container">
        <NavigationHorizontal :navigation="navigationData.horizontal" :appearance="navConfig.appearance" />
      </div>
    </nav>

    <!-- Main Content -->
    <main class="enterprise-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.enterprise-layout {
  @apply flex flex-col h-screen w-full overflow-hidden bg-background;
}

.enterprise-header {
  @apply flex items-center justify-between bg-card border-b border-border px-6 py-4;
  @apply h-20 shrink-0 shadow-sm;
}

.enterprise-header__brand {
  @apply flex items-center;
}

.enterprise-header__tools {
  @apply flex items-center;
}

.enterprise-search {
  @apply flex items-center gap-3 bg-accent rounded-lg px-4 py-2 min-w-80;
  @apply border border-border/50 transition-colors focus-within:border-primary/50;
}

.enterprise-search__input {
  @apply flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground;
}

.enterprise-tool-button {
  @apply p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground;
}

.enterprise-navigation {
  @apply bg-muted/30 border-b border-border px-6 py-2;
  @apply h-14 shrink-0;
}

.enterprise-navigation__container {
  @apply flex items-center h-full;
}

.enterprise-content {
  @apply flex-1 overflow-y-auto p-6;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .enterprise-search {
    @apply min-w-60;
  }
}

@media (max-width: 768px) {
  .enterprise-header {
    @apply px-4 py-3 h-16;
  }
  
  .enterprise-header__brand div span:last-child {
    @apply hidden;
  }
  
  .enterprise-search {
    @apply min-w-40;
  }
  
  .enterprise-navigation {
    @apply px-4 overflow-x-auto;
  }
}
</style>