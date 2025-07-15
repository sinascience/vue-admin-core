<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'
import { useNavigation } from '@/composables/useNavigation'
import NavigationBasicItem from './items/NavigationBasicItem.vue'
import NavigationCollapsableItem from './items/NavigationCollapsableItem.vue'
import NavigationGroupItem from './items/NavigationGroupItem.vue'
import NavigationAsideItem from './items/NavigationAsideItem.vue'
import NavigationDividerItem from './items/NavigationDividerItem.vue'
import NavigationSpacerItem from './items/NavigationSpacerItem.vue'

interface Props {
  item: NavigationItemType
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  appearance: 'default',
})

const { isItemVisible } = useNavigation()

const itemComponent = computed(() => {
  switch (props.item.type) {
    case 'basic':
      return NavigationBasicItem
    case 'collapsable':
      return NavigationCollapsableItem
    case 'group':
      return NavigationGroupItem
    case 'aside':
      return NavigationAsideItem
    case 'divider':
      return NavigationDividerItem
    case 'spacer':
      return NavigationSpacerItem
    default:
      return NavigationBasicItem
  }
})

const itemClasses = computed(() => [
  'navigation-item',
  `navigation-item--${props.item.type}`,
  `navigation-item--${props.appearance}`,
  {
    'navigation-item--disabled': props.item.disabled,
    'navigation-item--hidden': !isItemVisible(props.item),
  },
])
</script>

<template>
  <div v-if="isItemVisible(item)" :class="itemClasses">
    <component 
      :is="itemComponent" 
      :item="item" 
      :appearance="appearance"
    />
  </div>
</template>

<style scoped>
.navigation-item--hidden {
  @apply hidden;
}

.navigation-item--disabled {
  @apply opacity-50 pointer-events-none;
}
</style>