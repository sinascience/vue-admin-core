<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'
import { useNavigation } from '@/composables/useNavigation'

interface Props {
  item: NavigationItemType
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  appearance: 'default',
})

const { isItemActive, navigateToItem } = useNavigation()

const isActive = computed(() => isItemActive(props.item))

const itemClasses = computed(() => [
  'navigation-basic-item',
  `navigation-basic-item--${props.appearance}`,
  {
    'navigation-basic-item--active': isActive.value,
    'navigation-basic-item--disabled': props.item.disabled,
  },
  props.item.classes?.wrapper,
])

const titleClasses = computed(() => [
  'navigation-basic-item__title',
  props.item.classes?.title,
])

const subtitleClasses = computed(() => [
  'navigation-basic-item__subtitle',
  props.item.classes?.subtitle,
])

const iconClasses = computed(() => [
  'navigation-basic-item__icon',
  props.item.classes?.icon,
])

const handleClick = () => {
  if (props.item.disabled) return
  navigateToItem(props.item)
}
</script>

<template>
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
    <div class="navigation-basic-item__content">
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
      :class="['navigation-basic-item__badge', item.badge.classes]"
    >
      {{ item.badge.title }}
    </div>
  </div>
</template>

<style scoped>
@reference "../../../assets/main.css";

.navigation-basic-item {
  @apply flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer;
  @apply text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-primary/50;
}

.navigation-basic-item--active {
  @apply bg-sidebar-primary text-sidebar-primary-foreground;
}

.navigation-basic-item--disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

.navigation-basic-item__content {
  @apply flex-1 min-w-0;
}

.navigation-basic-item__title {
  @apply truncate;
}

.navigation-basic-item__subtitle {
  @apply text-xs opacity-75 truncate;
}

.navigation-basic-item__icon {
  @apply shrink-0;
}

.navigation-basic-item__badge {
  @apply px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground shrink-0;
}

/* Appearance variations */
.navigation-basic-item--compact {
  @apply px-2 py-1.5 text-xs;
}

.navigation-basic-item--dense {
  @apply px-2 py-1 text-xs;
}

.navigation-basic-item--thin {
  @apply px-1 py-1 text-xs;
}

.navigation-basic-item--compact .navigation-basic-item__icon,
.navigation-basic-item--dense .navigation-basic-item__icon,
.navigation-basic-item--thin .navigation-basic-item__icon {
  @apply size-4;
}
</style>