<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import NavigationDropdownItem from './NavigationDropdownItem.vue'

interface Props {
  item: NavigationItemType
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  appearance: 'default',
})

const { isItemActive, isItemVisible, hasActiveChild, navigateToItem } = useNavigation()

const isActive = computed(() => isItemActive(props.item))
const hasActiveChildren = computed(() => hasActiveChild(props.item))
const hasChildren = computed(() => props.item.children && props.item.children.length > 0)

const buttonClasses = computed(() => [
  'navigation-horizontal-item',
  `navigation-horizontal-item--${props.appearance}`,
  {
    'navigation-horizontal-item--active': isActive.value,
    'navigation-horizontal-item--has-active-child': hasActiveChildren.value,
    'navigation-horizontal-item--disabled': props.item.disabled,
  },
  props.item.classes?.wrapper,
])

const titleClasses = computed(() => [
  'navigation-horizontal-item__title',
  props.item.classes?.title,
])

const iconClasses = computed(() => [
  'navigation-horizontal-item__icon',
  props.item.classes?.icon,
])

const handleClick = () => {
  if (props.item.disabled) return
  
  if (!hasChildren.value) {
    navigateToItem(props.item)
  }
}
</script>

<template>
  <div v-if="isItemVisible(item)" class="navigation-horizontal-item-container">
    <!-- Dropdown Menu for items with children -->
    <DropdownMenu v-if="hasChildren">
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          :class="buttonClasses"
          :title="item.tooltip"
          :disabled="item.disabled"
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

          <!-- Title -->
          <div v-if="item.title" :class="titleClasses">
            {{ item.title }}
          </div>

          <!-- Badge -->
          <Badge v-if="item.badge?.title" 
                 :class="['navigation-horizontal-item__badge', item.badge.classes]"
                 variant="secondary">
            {{ item.badge.title }}
          </Badge>

          <!-- Dropdown Arrow -->
          <ChevronDown class="navigation-horizontal-item__arrow size-4 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent class="navigation-horizontal-item__dropdown-content">
        <NavigationDropdownItem
          v-for="child in item.children"
          :key="child.id || child.title"
          :item="child"
          :appearance="appearance"
        />
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Simple button for items without children -->
    <Button
      v-else
      variant="ghost"
      :class="buttonClasses"
      :title="item.tooltip"
      :disabled="item.disabled"
      @click="handleClick"
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

      <!-- Title -->
      <div v-if="item.title" :class="titleClasses">
        {{ item.title }}
      </div>

      <!-- Badge -->
      <Badge v-if="item.badge?.title" 
             :class="['navigation-horizontal-item__badge', item.badge.classes]"
             variant="secondary">
        {{ item.badge.title }}
      </Badge>
    </Button>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.navigation-horizontal-item-container {
  @apply relative;
}

/* Button styling for navigation items */
.navigation-horizontal-item {
  @apply flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors;
  @apply text-foreground/70 hover:text-foreground hover:bg-accent;
  @apply whitespace-nowrap h-auto;
  @apply border-0 bg-transparent;
}

.navigation-horizontal-item--active,
.navigation-horizontal-item--has-active-child {
  @apply bg-primary/10 text-primary;
  @apply relative;
}

.navigation-horizontal-item--active::after,
.navigation-horizontal-item--has-active-child::after {
  @apply absolute bottom-0 left-0 right-0 h-0.5 bg-primary;
  content: '';
  border-radius: 2px 2px 0 0;
}

.navigation-horizontal-item--disabled {
  @apply opacity-50 cursor-not-allowed pointer-events-none;
}

.navigation-horizontal-item__title {
  @apply truncate;
}

.navigation-horizontal-item__icon {
  @apply shrink-0;
}

.navigation-horizontal-item__badge {
  @apply shrink-0;
}

.navigation-horizontal-item__arrow {
  @apply shrink-0;
}

/* Dropdown content styling */
.navigation-horizontal-item__dropdown-content {
  @apply min-w-[200px];
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.dark .navigation-horizontal-item__dropdown-content {
  background: rgba(30, 30, 30, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Dropdown item styling */
.navigation-horizontal-item__dropdown-item {
  @apply flex items-center gap-2 cursor-pointer;
}

.navigation-horizontal-item__dropdown-icon {
  @apply shrink-0;
}

.navigation-horizontal-item__dropdown-badge {
  @apply px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground shrink-0 ml-auto;
}

/* Appearance variations */
.navigation-horizontal-item--compact {
  @apply px-3 py-1.5 text-xs;
}

.navigation-horizontal-item--compact .navigation-horizontal-item__icon {
  @apply size-4;
}

.navigation-horizontal-item--dense {
  @apply px-2 py-1 text-xs;
}

.navigation-horizontal-item--dense .navigation-horizontal-item__icon {
  @apply size-4;
}

.navigation-horizontal-item--thin {
  @apply px-1 py-0.5 text-xs;
}

.navigation-horizontal-item--thin .navigation-horizontal-item__icon {
  @apply size-3;
}

/* Override button focus styles */
.navigation-horizontal-item:focus-visible {
  @apply ring-2 ring-ring ring-offset-2;
}
</style>