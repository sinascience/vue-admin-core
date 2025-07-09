<script setup lang="ts">
import { computed } from 'vue'
import config from '../../v-pack.vue.config.ts'
import VerticalLayout from '@/layouts/VerticalLayout.vue'
import HorizontalLayout from '@/layouts/HorizontalLayout.vue'
import { RouterView } from 'vue-router'

// Map the style names from the config to the imported layout components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const layouts: Record<string, any> = {
  vertical: VerticalLayout,
  horizontal: HorizontalLayout,
}

// This computed property returns the currently active layout component
const activeLayout = computed(() => {
  const layoutName = config.layout.style || 'vertical'
  return layouts[layoutName] || layouts.vertical
})
</script>

<template>
  <component :is="activeLayout">
    <RouterView />
  </component>
</template>
