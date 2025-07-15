<script setup lang="ts">
import { computed } from 'vue'
import config from '../../v-pack.vue.config.ts'
// Vertical Layout Variants
import VerticalLayout from '@/layouts/VerticalLayout.vue'
import ClassyVerticalLayout from '@/layouts/ClassyVerticalLayout.vue'
import CompactVerticalLayout from '@/layouts/VerticalLayout.vue' // TODO: Create specific layouts
import DenseVerticalLayout from '@/layouts/VerticalLayout.vue' // TODO: Create specific layouts
import FuturisticVerticalLayout from '@/layouts/VerticalLayout.vue' // TODO: Create specific layouts
import ThinVerticalLayout from '@/layouts/VerticalLayout.vue' // TODO: Create specific layouts

// Horizontal Layout Variants
import CenteredHorizontalLayout from '@/layouts/horizontal/CenteredHorizontalLayout.vue'
import EnterpriseHorizontalLayout from '@/layouts/horizontal/EnterpriseHorizontalLayout.vue'
import MaterialHorizontalLayout from '@/layouts/horizontal/MaterialHorizontalLayout.vue'
import ModernHorizontalLayout from '@/layouts/horizontal/ModernHorizontalLayout.vue'
import { RouterView } from 'vue-router'

// Map layout styles and variants to the imported layout components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const layouts: Record<string, Record<string, any>> = {
  vertical: {
    classic: VerticalLayout,
    classy: ClassyVerticalLayout,
    compact: CompactVerticalLayout,
    dense: DenseVerticalLayout,
    futuristic: FuturisticVerticalLayout,
    thin: ThinVerticalLayout,
  },
  horizontal: {
    centered: CenteredHorizontalLayout,
    enterprise: EnterpriseHorizontalLayout,
    material: MaterialHorizontalLayout,
    modern: ModernHorizontalLayout,
  },
}

// This computed property returns the currently active layout component
const activeLayout = computed(() => {
  const layoutStyle = config.layout.style || 'vertical'
  const layoutVariant = config.layout.variant || 'classy'
  
  const styleLayouts = layouts[layoutStyle] || layouts.vertical
  return styleLayouts[layoutVariant] || styleLayouts.classy || styleLayouts.classic || VerticalLayout
})
</script>

<template>
  <component :is="activeLayout">
    <RouterView />
  </component>
</template>
