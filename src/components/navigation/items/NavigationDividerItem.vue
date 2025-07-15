<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'

interface Props {
  item: NavigationItemType
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  appearance: 'default',
})

const dividerClasses = computed(() => [
  'navigation-divider-item',
  `navigation-divider-item--${props.appearance}`,
  props.item.classes?.wrapper,
])
</script>

<template>
  <div :class="dividerClasses">
    <hr class="navigation-divider-item__line" />
    
    <!-- Optional title for labeled divider -->
    <div 
      v-if="item.title" 
      :class="['navigation-divider-item__title', item.classes?.title]"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped>
@reference "../../../assets/main.css";

.navigation-divider-item {
  @apply my-4 px-3;
}

.navigation-divider-item__line {
  @apply border-t border-border;
}

.navigation-divider-item__title {
  @apply text-xs text-muted-foreground mt-2 font-medium tracking-wider uppercase;
}

/* Appearance variations */
.navigation-divider-item--compact {
  @apply my-2 px-2;
}

.navigation-divider-item--compact .navigation-divider-item__title {
  @apply text-xs mt-1;
}

.navigation-divider-item--dense {
  @apply my-1 px-2;
}

.navigation-divider-item--dense .navigation-divider-item__title {
  @apply text-xs mt-0.5;
}

.navigation-divider-item--thin {
  @apply my-1 px-1;
}

.navigation-divider-item--thin .navigation-divider-item__title {
  @apply text-xs mt-0.5;
}
</style>