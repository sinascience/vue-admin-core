<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'
import { useNavigation } from '@/composables/useNavigation'
import NavigationItem from './NavigationItem.vue'

interface Props {
  navigation?: NavigationItemType[]
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  navigation: () => [],
  appearance: 'default',
})

const { config, currentNavigation } = useNavigation()

const navigationItems = computed(() => props.navigation.length > 0 ? props.navigation : currentNavigation.value)

const navigationClasses = computed(() => [
  'navigation-vertical',
  `navigation-vertical--${props.appearance}`,
  {
    'navigation-vertical--collapsed': config.value.collapsed,
    'navigation-vertical--opened': config.value.opened,
  },
])
</script>

<template>
  <nav :class="navigationClasses" class="flex flex-col gap-1 overflow-y-auto">
    <NavigationItem
      v-for="item in navigationItems"
      :key="item.id || item.title"
      :item="item"
      :appearance="appearance"
    />
  </nav>
</template>

<style scoped>
@reference "../../assets/main.css";

.navigation-vertical {
  @apply transition-all duration-300;
}

.navigation-vertical--compact {
  @apply gap-0;
}

.navigation-vertical--dense {
  @apply gap-0.5;
}

.navigation-vertical--thin {
  @apply gap-0;
}
</style>