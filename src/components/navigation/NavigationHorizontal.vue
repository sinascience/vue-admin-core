<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem } from '@/types/navigation'
import { useNavigation } from '@/composables/useNavigation'
import NavigationHorizontalItem from './NavigationHorizontalItem.vue'

interface Props {
  navigation?: NavigationItem[]
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  navigation: () => [],
  appearance: 'default',
})

const { currentNavigation } = useNavigation()

const navigationItems = computed(() => props.navigation.length > 0 ? props.navigation : currentNavigation.value)

const navigationClasses = computed(() => [
  'navigation-horizontal',
  `navigation-horizontal--${props.appearance}`,
])
</script>

<template>
  <nav :class="navigationClasses" class="flex items-center gap-1 overflow-x-auto">
    <NavigationHorizontalItem
      v-for="item in navigationItems"
      :key="item.id || item.title"
      :item="item"
      :appearance="appearance"
    />
  </nav>
</template>

<style scoped>
@reference "../../assets/main.css";

.navigation-horizontal {
  @apply transition-all duration-300;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.navigation-horizontal::-webkit-scrollbar {
  @apply hidden;
}

.navigation-horizontal--compact {
  @apply gap-0.5;
}

.navigation-horizontal--dense {
  @apply gap-0;
}

.navigation-horizontal--thin {
  @apply gap-0;
}
</style>