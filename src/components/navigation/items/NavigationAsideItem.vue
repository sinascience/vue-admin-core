<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'
import { useNavigation } from '@/composables/useNavigation'
import NavigationItem from '../NavigationItem.vue'

interface Props {
  item: NavigationItemType
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  appearance: 'default',
})

const { isItemActive, navigateToItem } = useNavigation()

const isPopoverOpen = ref(false)
const popoverRef = ref<HTMLElement>()

const isActive = computed(() => isItemActive(props.item))

const itemClasses = computed(() => [
  'navigation-aside-item',
  `navigation-aside-item--${props.appearance}`,
  {
    'navigation-aside-item--active': isActive.value,
    'navigation-aside-item--disabled': props.item.disabled,
    'navigation-aside-item--popover-open': isPopoverOpen.value,
  },
  props.item.classes?.wrapper,
])

const iconClasses = computed(() => [
  'navigation-aside-item__icon',
  props.item.classes?.icon,
])

const handleClick = () => {
  if (props.item.disabled) return
  navigateToItem(props.item)
}

const showPopover = () => {
  if (props.item.children && props.item.children.length > 0) {
    isPopoverOpen.value = true
  }
}

const hidePopover = () => {
  isPopoverOpen.value = false
}

const handleMouseEnter = () => {
  showPopover()
}

const handleMouseLeave = () => {
  // Add a small delay to prevent flicker when moving to popover
  setTimeout(() => {
    if (!popoverRef.value?.matches(':hover')) {
      hidePopover()
    }
  }, 100)
}
</script>

<template>
  <div class="navigation-aside-item-container">
    <!-- Aside Item -->
    <div
      :class="itemClasses"
      :title="item.tooltip || item.title"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      role="button"
      :tabindex="item.disabled ? -1 : 0"
      @keydown.enter="handleClick"
      @keydown.space.prevent="handleClick"
    >
      <!-- Icon -->
      <div v-if="item.icon" :class="iconClasses">
        <component 
          v-if="typeof item.icon !== 'string'" 
          :is="item.icon" 
          class="size-5 shrink-0" 
        />
        <span 
          v-else 
          class="size-5 shrink-0 flex items-center justify-center text-current"
          v-html="item.icon"
        />
      </div>

      <!-- Badge -->
      <div 
        v-if="item.badge?.title" 
        :class="['navigation-aside-item__badge', item.badge.classes]"
      >
        {{ item.badge.title }}
      </div>
    </div>

    <!-- Popover for children -->
    <div
      v-if="item.children && item.children.length > 0 && isPopoverOpen"
      ref="popoverRef"
      class="navigation-aside-item__popover"
      @mouseenter="showPopover"
      @mouseleave="hidePopover"
    >
      <div class="navigation-aside-item__popover-content">
        <!-- Header -->
        <div v-if="item.title || item.subtitle" class="navigation-aside-item__popover-header">
          <h4 v-if="item.title" class="navigation-aside-item__popover-title">
            {{ item.title }}
          </h4>
          <p v-if="item.subtitle" class="navigation-aside-item__popover-subtitle">
            {{ item.subtitle }}
          </p>
        </div>

        <!-- Children -->
        <div class="navigation-aside-item__popover-children">
          <NavigationItem
            v-for="child in item.children"
            :key="child.id || child.title"
            :item="child"
            :appearance="appearance"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../assets/main.css";

.navigation-aside-item-container {
  @apply relative;
}

.navigation-aside-item {
  @apply flex items-center justify-center rounded-md p-2.5 text-sm font-medium transition-colors cursor-pointer;
  @apply text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-primary/50;
  @apply w-12 h-12;
}

.navigation-aside-item--active,
.navigation-aside-item--popover-open {
  @apply bg-sidebar-primary text-sidebar-primary-foreground;
}

.navigation-aside-item--disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

.navigation-aside-item__icon {
  @apply shrink-0;
}

.navigation-aside-item__badge {
  @apply absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground;
  @apply min-w-[20px] h-5 flex items-center justify-center;
}

.navigation-aside-item__popover {
  @apply absolute left-full top-0 ml-2 z-50;
  @apply w-64 min-w-max;
}

.navigation-aside-item__popover-content {
  @apply bg-card border border-border rounded-lg shadow-lg p-2;
  @apply animate-in fade-in-0 slide-in-from-left-2;
}

.navigation-aside-item__popover-header {
  @apply px-2 py-1 border-b border-border mb-2;
}

.navigation-aside-item__popover-title {
  @apply text-sm font-semibold text-foreground;
}

.navigation-aside-item__popover-subtitle {
  @apply text-xs text-muted-foreground mt-1;
}

.navigation-aside-item__popover-children {
  @apply space-y-1;
}

/* Appearance variations */
.navigation-aside-item--compact {
  @apply w-10 h-10 p-2;
}

.navigation-aside-item--compact .navigation-aside-item__icon {
  @apply size-4;
}

.navigation-aside-item--dense {
  @apply w-8 h-8 p-1.5;
}

.navigation-aside-item--dense .navigation-aside-item__icon {
  @apply size-4;
}

.navigation-aside-item--thin {
  @apply w-6 h-6 p-1;
}

.navigation-aside-item--thin .navigation-aside-item__icon {
  @apply size-3;
}

.navigation-aside-item--thin .navigation-aside-item__badge {
  @apply text-xs px-1 py-0 min-w-[16px] h-4;
}
</style>