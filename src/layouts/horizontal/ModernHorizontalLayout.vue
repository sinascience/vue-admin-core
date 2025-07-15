<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { NavigationHorizontal, NavigationVertical } from '@/components/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { navigationData } from '@/configs/navigation'
import UserMenu from '@/components/layout/UserMenu.vue'
import NotificationsMenu from '@/components/layout/NotificationsMenu.vue'
import { RouterView } from 'vue-router'
import { Menu, Search, Zap, MessageCircle, Settings, Globe, Maximize2 } from 'lucide-vue-next'
import config from '../../../v-pack.vue.config.ts'
import { useMediaQuery } from '@vueuse/core'

const { config: navConfig, setNavigationData, setNavigationConfig } = useNavigation()

// Responsive breakpoint
const isScreenSmall = useMediaQuery('(max-width: 768px)')
const showMobileNav = ref(false)

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

// Toggle mobile navigation
const toggleMobileNav = () => {
  showMobileNav.value = !showMobileNav.value
}

// Get current year
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div class="modern-layout">
    <!-- Mobile Navigation Overlay -->
    <div
      v-if="isScreenSmall && showMobileNav"
      class="modern-mobile-overlay"
      @click="toggleMobileNav"
    />

    <!-- Mobile Vertical Navigation -->
    <aside
      v-if="isScreenSmall"
      class="modern-mobile-nav"
      :class="{ 'modern-mobile-nav--open': showMobileNav }"
    >
      <div class="modern-mobile-nav__header">
        <div class="modern-mobile-nav__logo">
          <Zap class="size-8 text-primary" />
          <span class="text-lg font-bold text-white">Vue Admin</span>
        </div>
        <button @click="toggleMobileNav" class="modern-mobile-nav__close">
          <Menu class="size-6 text-white" />
        </button>
      </div>
      <div class="modern-mobile-nav__content">
        <NavigationVertical
          :navigation="navigationData.default"
          :appearance="navConfig.appearance"
        />
      </div>
    </aside>

    <!-- Main Wrapper -->
    <div class="modern-wrapper">
      <!-- Header -->
      <header class="modern-header">
        <div class="modern-header__container">
          <!-- Logo Section -->
          <div class="modern-header__logo">
            <div v-if="!isScreenSmall" class="hidden lg:flex">
              <div class="modern-logo">
                <Zap class="size-8 text-primary" />
              </div>
              <div class="modern-brand-text">
                <h1 class="modern-brand-title">Vue Admin</h1>
                <p class="modern-brand-subtitle">Modern Experience</p>
              </div>
            </div>
            <div v-else class="flex lg:hidden">
              <Zap class="size-8 text-primary" />
            </div>
          </div>

          <!-- Horizontal Navigation (Desktop) -->
          <div v-if="!isScreenSmall" class="modern-header__navigation">
            <NavigationHorizontal
              :navigation="navigationData.horizontal"
              :appearance="navConfig.appearance"
            />
          </div>

          <!-- Mobile Menu Button -->
          <button v-if="isScreenSmall" @click="toggleMobileNav" class="modern-mobile-toggle">
            <Menu class="size-6" />
          </button>

          <!-- Header Actions -->
          <div class="modern-header__actions">
            <div class="flex items-center gap-1 sm:gap-2">
              <!-- Notifications -->
              <NotificationsMenu />

              <!-- User Menu -->
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="modern-content">
        <div class="modern-content__container">
          <RouterView />
        </div>
      </main>

      <!-- Footer -->
      <footer class="modern-footer">
        <div class="modern-footer__container">
          <span class="text-sm text-muted-foreground font-medium">
            Vue Admin © {{ currentYear }}
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.modern-layout {
  @apply flex w-full min-w-0 flex-col h-screen overflow-hidden;
  background: linear-gradient(135deg, oklch(0.98 0.005 280) 0%, oklch(0.96 0.01 260) 100%);
}

/* Mobile Navigation Overlay */
.modern-mobile-overlay {
  @apply fixed inset-0 bg-black/50 z-50;
  backdrop-filter: blur(4px);
}

/* Mobile Navigation */
.modern-mobile-nav {
  @apply fixed top-0 left-0 h-full w-80 bg-gray-900 transform transition-transform duration-300 z-50;
  transform: translateX(-100%);
}

.modern-mobile-nav--open {
  transform: translateX(0);
}

.modern-mobile-nav__header {
  @apply flex items-center justify-between p-6 border-b border-gray-800;
}

.modern-mobile-nav__logo {
  @apply flex items-center gap-3;
}

.modern-mobile-nav__close {
  @apply p-2 rounded-lg hover:bg-gray-800 transition-colors;
}

.modern-mobile-nav__content {
  @apply flex-1 overflow-y-auto p-4;
}

/* Main Wrapper */
.modern-wrapper {
  @apply flex flex-col w-full min-w-0 flex-auto;
  /* Ensure dropdown can show outside bounds */
  overflow: visible;
}

/* Header */
.modern-header {
  @apply relative flex items-center w-full h-16 sm:h-20 shrink-0 px-4 md:px-6;
  @apply bg-card/80 backdrop-blur-lg border-b shadow-sm;
  @apply dark:border-b dark:bg-transparent dark:shadow-none;
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.1);
  z-index: 49;
  /* Ensure dropdown can show outside header bounds */
  overflow: visible;
}

.modern-header__container {
  @apply flex items-center justify-between w-full h-full;
}

.modern-header__logo {
  @apply flex items-center mx-2 lg:mr-8;
}

.modern-logo {
  @apply flex items-center justify-center w-12 h-12 rounded-xl mr-4;
  background: linear-gradient(
    135deg,
    oklch(0.5106 0.2301 276.97) 0%,
    oklch(0.6106 0.1801 286.97) 100%
  );
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modern-brand-text {
  @apply flex flex-col;
}

.modern-brand-title {
  @apply text-xl font-bold text-foreground leading-none;
}

.modern-brand-subtitle {
  @apply text-xs text-muted-foreground font-medium tracking-wide uppercase;
}

.modern-header__navigation {
  @apply flex items-center mr-2;
  /* Ensure dropdown can show outside header bounds */
  position: static;
}

/* Modern navigation styling */
.modern-header__navigation :deep(.navigation-horizontal-item) {
  @apply text-foreground/70 hover:text-foreground;
  @apply px-6 py-3 transition-all duration-200;
  @apply relative overflow-hidden;
}

.modern-header__navigation :deep(.navigation-horizontal-item:hover) {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.modern-header__navigation :deep(.navigation-horizontal-item--active) {
  @apply text-primary;
  background: oklch(from var(--primary) l c h / 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.modern-header__navigation :deep(.navigation-horizontal-item--active::after) {
  background: linear-gradient(
    90deg,
    transparent,
    oklch(from var(--primary) l c h / 0.6),
    transparent
  );
}

/* Mobile Toggle */
.modern-mobile-toggle {
  @apply p-2 rounded-lg hover:bg-accent transition-colors;
}

/* Header Actions */
.modern-header__actions {
  @apply flex items-center ml-auto pl-2;
}

.modern-action-btn {
  @apply flex items-center justify-center w-10 h-10 rounded-lg;
  @apply text-muted-foreground hover:text-foreground;
  @apply hover:bg-accent transition-colors;
}

/* Content */
.modern-content {
  @apply flex-1 overflow-y-auto;
}

.modern-content__container {
  @apply p-4 sm:p-6 md:p-8;
  min-height: 100%;
}

/* Glass effect for content cards */
.modern-content :deep(.card),
.modern-content :deep([class*='card']) {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Footer */
.modern-footer {
  @apply relative flex items-center w-full h-14 sm:h-20 shrink-0 px-4 md:px-6;
  @apply bg-card/80 backdrop-blur-lg border-t;
  @apply dark:bg-transparent;
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.1);
  z-index: 49;
}

.modern-footer__container {
  @apply flex items-center w-full h-full;
}

/* Dark mode overrides */
.dark .modern-header,
.dark .modern-footer {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .modern-content :deep(.card),
.dark .modern-content :deep([class*='card']) {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .modern-header__logo .modern-logo {
    @apply w-10 h-10;
  }

  .modern-brand-title {
    @apply text-lg;
  }
}

@media (max-width: 768px) {
  .modern-header {
    height: 64px;
  }

  .modern-brand-subtitle {
    @apply hidden;
  }

  .modern-header__navigation {
    @apply hidden;
  }

  .modern-mobile-nav {
    @apply w-72;
  }
}

@media (max-width: 480px) {
  .modern-header {
    @apply px-3;
  }

  .modern-content__container {
    @apply p-3;
  }

  .modern-footer {
    @apply px-3;
  }
}
</style>
