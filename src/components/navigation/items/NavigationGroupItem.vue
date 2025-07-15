<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem as NavigationItemType } from '@/types/navigation'
import NavigationItem from '../NavigationItem.vue'

interface Props {
  item: NavigationItemType
  appearance?: 'default' | 'compact' | 'dense' | 'thin'
}

const props = withDefaults(defineProps<Props>(), {
  appearance: 'default',
})

const groupClasses = computed(() => [
  'navigation-group-item',
  `navigation-group-item--${props.appearance}`,
  props.item.classes?.wrapper,
])

const headerClasses = computed(() => [
  'navigation-group-item__header',
  `navigation-group-item__header--${props.appearance}`,
])

const titleClasses = computed(() => [
  'navigation-group-item__title',
  props.item.classes?.title,
])

const subtitleClasses = computed(() => [
  'navigation-group-item__subtitle',
  props.item.classes?.subtitle,
])

const childrenClasses = computed(() => [
  'navigation-group-item__children',
  `navigation-group-item__children--${props.appearance}`,
])
</script>

<template>
  <div :class="groupClasses">
    <!-- Group Header -->
    <div v-if="item.title || item.subtitle" :class="headerClasses">
      <!-- Title -->
      <h3 v-if="item.title" :class="titleClasses">
        {{ item.title }}
      </h3>

      <!-- Subtitle -->
      <p v-if="item.subtitle" :class="subtitleClasses">
        {{ item.subtitle }}
      </p>
    </div>

    <!-- Group Children -->
    <div v-if="item.children && item.children.length > 0" :class="childrenClasses">
      <NavigationItem
        v-for="child in item.children"
        :key="child.id || child.title"
        :item="child"
        :appearance="appearance"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "../../../assets/main.css";

.navigation-group-item {
  @apply space-y-2;
}

.navigation-group-item__header {
  @apply px-3 mb-2;
}

.navigation-group-item__title {
  @apply text-sm font-bold tracking-wider text-sidebar-section-header uppercase;
}

.navigation-group-item__subtitle {
  @apply text-xs text-sidebar-muted-foreground/80 mt-1;
}

.navigation-group-item__children {
  @apply space-y-1;
}

/* Appearance variations */
.navigation-group-item--compact .navigation-group-item__header {
  @apply px-2 mb-1;
}

.navigation-group-item--compact .navigation-group-item__title {
  @apply text-xs;
}

.navigation-group-item--compact .navigation-group-item__subtitle {
  @apply text-xs;
}

.navigation-group-item--compact .navigation-group-item__children {
  @apply space-y-0.5;
}

.navigation-group-item--dense .navigation-group-item__header {
  @apply px-2 mb-1;
}

.navigation-group-item--dense .navigation-group-item__title {
  @apply text-xs;
}

.navigation-group-item--dense .navigation-group-item__subtitle {
  @apply text-xs;
}

.navigation-group-item--dense .navigation-group-item__children {
  @apply space-y-0.5;
}

.navigation-group-item--thin .navigation-group-item__header {
  @apply px-1 mb-0.5;
}

.navigation-group-item--thin .navigation-group-item__title {
  @apply text-xs;
}

.navigation-group-item--thin .navigation-group-item__subtitle {
  @apply text-xs;
}

.navigation-group-item--thin .navigation-group-item__children {
  @apply space-y-0;
}
</style>