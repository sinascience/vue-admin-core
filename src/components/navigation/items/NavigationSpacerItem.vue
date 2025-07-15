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

const spacerClasses = computed(() => [
  'navigation-spacer-item',
  `navigation-spacer-item--${props.appearance}`,
  props.item.classes?.wrapper,
])

// Allow custom height through meta property
const customHeight = computed(() => {
  if (props.item.meta && typeof props.item.meta === 'object' && 'height' in props.item.meta) {
    return { height: props.item.meta.height as string }
  }
  return {}
})
</script>

<template>
  <div :class="spacerClasses" :style="customHeight" />
</template>

<style scoped>
@reference "../../../assets/main.css";

.navigation-spacer-item {
  @apply h-4 flex-shrink-0;
}

/* Appearance variations */
.navigation-spacer-item--compact {
  @apply h-2;
}

.navigation-spacer-item--dense {
  @apply h-1;
}

.navigation-spacer-item--thin {
  @apply h-0.5;
}
</style>