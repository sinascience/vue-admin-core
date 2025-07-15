import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export type NavigationItemType = 'basic' | 'collapsable' | 'group' | 'aside' | 'divider' | 'spacer'

export type NavigationMode = 'side' | 'over'

export type NavigationAppearance = 'default' | 'compact' | 'dense' | 'thin'

export type NavigationPosition = 'left' | 'right'

export type VerticalLayoutVariant = 'classic' | 'classy' | 'compact' | 'dense' | 'futuristic' | 'thin'
export type HorizontalLayoutVariant = 'centered' | 'enterprise' | 'material' | 'modern'
export type LayoutVariant = VerticalLayoutVariant | HorizontalLayoutVariant

export interface NavigationItemClasses {
  title?: string
  subtitle?: string
  icon?: string
  wrapper?: string
}

export interface NavigationItemBadge {
  title?: string
  classes?: string
}

export interface NavigationItem {
  id?: string
  title?: string
  subtitle?: string
  type: NavigationItemType
  hidden?: (item: NavigationItem) => boolean
  active?: boolean
  disabled?: boolean
  tooltip?: string
  link?: string | RouteLocationRaw
  fragment?: string
  preserveFragment?: boolean
  queryParams?: Record<string, unknown>
  queryParamsHandling?: 'merge' | 'preserve' | ''
  externalLink?: boolean
  target?: '_blank' | '_self' | '_parent' | '_top' | string
  exactMatch?: boolean
  function?: (item: NavigationItem) => void
  classes?: NavigationItemClasses
  icon?: string | Component
  badge?: NavigationItemBadge
  children?: NavigationItem[]
  meta?: unknown
}

export interface NavigationConfig {
  mode: NavigationMode
  appearance: NavigationAppearance
  position: NavigationPosition
  autoCollapse: boolean
  opened: boolean
  width: number
  collapsed: boolean
}

export interface NavigationSection {
  title: string
  description?: string
  items: NavigationItem[]
}

export interface NavigationData {
  compact: NavigationItem[]
  default: NavigationItem[]
  futuristic: NavigationItem[]
  horizontal: NavigationItem[]
}

export interface NavigationState {
  config: NavigationConfig
  data: NavigationData
  activeItemId: string | null
  expandedItems: Set<string>
}