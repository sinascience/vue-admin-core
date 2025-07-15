<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'
import { useNavigation } from '@/composables/useNavigation'
import { 
  DropdownMenuItem, 
  DropdownMenuSub, 
  DropdownMenuSubContent, 
  DropdownMenuSubTrigger 
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

interface Props {
  item: NavigationItemType
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  appearance: 'default',
})

const { isItemActive, isItemVisible, navigateToItem } = useNavigation()

const isActive = computed(() => isItemActive(props.item))
const hasChildren = computed(() => props.item.children && props.item.children.length > 0)

const handleClick = () => {
  if (props.item.disabled) return
  
  if (!hasChildren.value) {
    navigateToItem(props.item)
  }
}
</script>

<template>
  <template v-if="isItemVisible(item)">
    <!-- Item with children (submenu) -->
    <DropdownMenuSub v-if="hasChildren">
      <DropdownMenuSubTrigger
        :disabled="item.disabled"
        :class="[
          'navigation-dropdown-item',
          {
            'navigation-dropdown-item--active': isActive,
            'navigation-dropdown-item--disabled': item.disabled,
          }
        ]"
      >
        <!-- Icon -->
        <div v-if="item.icon" class="navigation-dropdown-item__icon">
          <component 
            v-if="typeof item.icon !== 'string'" 
            :is="item.icon" 
            class="size-4 shrink-0" 
          />
          <span 
            v-else 
            class="size-4 shrink-0 flex items-center justify-center text-current"
            v-html="item.icon"
          />
        </div>
        
        <!-- Content -->
        <div class="navigation-dropdown-item__content">
          <!-- Title -->
          <div class="navigation-dropdown-item__title">
            {{ item.title }}
          </div>
          
          <!-- Subtitle -->
          <div v-if="item.subtitle" class="navigation-dropdown-item__subtitle">
            {{ item.subtitle }}
          </div>
        </div>
        
        <!-- Badge -->
        <Badge v-if="item.badge?.title" 
               :class="['navigation-dropdown-item__badge ml-auto', item.badge.classes]"
               variant="secondary">
          {{ item.badge.title }}
        </Badge>
      </DropdownMenuSubTrigger>
      
      <DropdownMenuSubContent class="navigation-dropdown-item__submenu">
        <NavigationDropdownItem
          v-for="child in item.children"
          :key="child.id || child.title"
          :item="child"
          :appearance="appearance"
        />
      </DropdownMenuSubContent>
    </DropdownMenuSub>

    <!-- Item without children (leaf) -->
    <DropdownMenuItem
      v-else
      @click="handleClick"
      :disabled="item.disabled"
      :class="[
        'navigation-dropdown-item',
        {
          'navigation-dropdown-item--active': isActive,
          'navigation-dropdown-item--disabled': item.disabled,
        }
      ]"
    >
      <!-- Icon -->
      <div v-if="item.icon" class="navigation-dropdown-item__icon">
        <component 
          v-if="typeof item.icon !== 'string'" 
          :is="item.icon" 
          class="size-4 shrink-0" 
        />
        <span 
          v-else 
          class="size-4 shrink-0 flex items-center justify-center text-current"
          v-html="item.icon"
        />
      </div>
      
      <!-- Content -->
      <div class="navigation-dropdown-item__content">
        <!-- Title -->
        <div class="navigation-dropdown-item__title">
          {{ item.title }}
        </div>
        
        <!-- Subtitle -->
        <div v-if="item.subtitle" class="navigation-dropdown-item__subtitle">
          {{ item.subtitle }}
        </div>
      </div>
      
      <!-- Badge -->
      <Badge v-if="item.badge?.title" 
             :class="['navigation-dropdown-item__badge ml-auto', item.badge.classes]"
             variant="secondary">
        {{ item.badge.title }}
      </Badge>
    </DropdownMenuItem>
  </template>
</template>

<style scoped>
@reference "../../assets/main.css";

.navigation-dropdown-item {
  @apply flex items-center gap-3 cursor-pointer min-h-[2.5rem];
  @apply transition-colors duration-200;
}

.navigation-dropdown-item--active {
  @apply bg-primary/10 text-primary;
}

.navigation-dropdown-item--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.navigation-dropdown-item__icon {
  @apply shrink-0 flex items-center justify-center;
  @apply text-muted-foreground;
}

.navigation-dropdown-item__content {
  @apply flex flex-col gap-0.5 flex-1 min-w-0;
}

.navigation-dropdown-item__title {
  @apply text-sm font-medium truncate;
}

.navigation-dropdown-item__subtitle {
  @apply text-xs text-muted-foreground truncate;
}

.navigation-dropdown-item__badge {
  @apply shrink-0 text-xs;
}

.navigation-dropdown-item__submenu {
  @apply min-w-[200px];
}

/* Appearance variations */
.navigation-dropdown-item--compact {
  @apply min-h-[2rem] gap-2;
}

.navigation-dropdown-item--compact .navigation-dropdown-item__title {
  @apply text-xs;
}

.navigation-dropdown-item--compact .navigation-dropdown-item__subtitle {
  @apply text-[10px];
}

.navigation-dropdown-item--dense {
  @apply min-h-[1.75rem] gap-1.5;
}

.navigation-dropdown-item--dense .navigation-dropdown-item__title {
  @apply text-xs;
}

.navigation-dropdown-item--dense .navigation-dropdown-item__subtitle {
  @apply text-[10px];
}

.navigation-dropdown-item--thin {
  @apply min-h-[1.5rem] gap-1;
}

.navigation-dropdown-item--thin .navigation-dropdown-item__title {
  @apply text-xs;
}

.navigation-dropdown-item--thin .navigation-dropdown-item__subtitle {
  @apply text-[10px];
}
</style>