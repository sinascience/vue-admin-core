<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
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

const { isItemActive, isItemExpanded, hasActiveChild, toggleItem, navigateToItem } = useNavigation()

const isActive = computed(() => isItemActive(props.item))
const isExpanded = computed(() => isItemExpanded(props.item))
const hasActiveChildren = computed(() => hasActiveChild(props.item))

const itemClasses = computed(() => [
  'navigation-collapsable-item',
  `navigation-collapsable-item--${props.appearance}`,
  {
    'navigation-collapsable-item--active': isActive.value,
    'navigation-collapsable-item--expanded': isExpanded.value,
    'navigation-collapsable-item--has-active-child': hasActiveChildren.value,
    'navigation-collapsable-item--disabled': props.item.disabled,
  },
  props.item.classes?.wrapper,
])

const titleClasses = computed(() => [
  'navigation-collapsable-item__title',
  props.item.classes?.title,
])

const subtitleClasses = computed(() => [
  'navigation-collapsable-item__subtitle',
  props.item.classes?.subtitle,
])

const iconClasses = computed(() => [
  'navigation-collapsable-item__icon',
  props.item.classes?.icon,
])

const handleClick = () => {
  if (props.item.disabled) return
  
  // If item has a link, navigate to it first
  if (props.item.link) {
    navigateToItem(props.item)
  }
  
  // Then toggle expansion
  toggleItem(props.item)
}

const handleToggle = (event: Event) => {
  event.stopPropagation()
  if (props.item.disabled) return
  toggleItem(props.item)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div
      :class="itemClasses"
      :title="item.tooltip"
      @click="handleClick"
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

      <!-- Content -->
      <div class="navigation-collapsable-item__content">
        <!-- Title -->
        <div v-if="item.title" :class="titleClasses">
          {{ item.title }}
        </div>

        <!-- Subtitle -->
        <div v-if="item.subtitle" :class="subtitleClasses">
          {{ item.subtitle }}
        </div>
      </div>

      <!-- Badge -->
      <div 
        v-if="item.badge?.title" 
        :class="['navigation-collapsable-item__badge', item.badge.classes]"
      >
        {{ item.badge.title }}
      </div>

      <!-- Toggle Arrow -->
      <button
        @click="handleToggle"
        class="navigation-collapsable-item__toggle"
        :aria-expanded="isExpanded"
        aria-label="Toggle submenu"
        tabindex="-1"
      >
        <ChevronRight 
          :class="[
            'size-4 transition-transform duration-200',
            isExpanded ? 'rotate-90' : ''
          ]"
        />
      </button>
    </div>

    <!-- Children -->
    <div 
      v-if="item.children && item.children.length > 0"
      :class="[
        'navigation-collapsable-item__children',
        `navigation-collapsable-item__children--${appearance}`,
        {
          'navigation-collapsable-item__children--expanded': isExpanded,
          'navigation-collapsable-item__children--collapsed': !isExpanded,
        }
      ]"
    >
      <NavigationItem
        v-for="child in item.children"
        :key="child.id || child.title"
        :item="child"
        :appearance="appearance"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "../../../assets/main.css";

.navigation-collapsable-item {
  @apply flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer;
  @apply text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-primary/50;
}

.navigation-collapsable-item--active,
.navigation-collapsable-item--has-active-child {
  @apply bg-sidebar-primary text-sidebar-primary-foreground;
}

.navigation-collapsable-item--disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

.navigation-collapsable-item__content {
  @apply flex-1 min-w-0;
}

.navigation-collapsable-item__title {
  @apply truncate;
}

.navigation-collapsable-item__subtitle {
  @apply text-xs opacity-75 truncate;
}

.navigation-collapsable-item__icon {
  @apply shrink-0;
}

.navigation-collapsable-item__badge {
  @apply px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground shrink-0;
}

.navigation-collapsable-item__toggle {
  @apply p-1 rounded hover:bg-sidebar-primary/30 shrink-0;
}

.navigation-collapsable-item__children {
  @apply overflow-hidden transition-all duration-300 ease-in-out;
  @apply pl-6 space-y-1;
}

.navigation-collapsable-item__children--expanded {
  @apply max-h-screen opacity-100;
}

.navigation-collapsable-item__children--collapsed {
  @apply max-h-0 opacity-0;
}

/* Appearance variations */
.navigation-collapsable-item--compact {
  @apply px-2 py-1.5 text-xs;
}

.navigation-collapsable-item--dense {
  @apply px-2 py-1 text-xs;
}

.navigation-collapsable-item--thin {
  @apply px-1 py-1 text-xs;
}

.navigation-collapsable-item--compact .navigation-collapsable-item__icon,
.navigation-collapsable-item--dense .navigation-collapsable-item__icon,
.navigation-collapsable-item--thin .navigation-collapsable-item__icon {
  @apply size-4;
}

.navigation-collapsable-item__children--compact,
.navigation-collapsable-item__children--dense,
.navigation-collapsable-item__children--thin {
  @apply pl-4 space-y-0.5;
}
</style>