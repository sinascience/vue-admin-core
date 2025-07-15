import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { 
  NavigationConfig, 
  NavigationData, 
  NavigationItem, 
  NavigationAppearance, 
  NavigationMode 
} from '@/types/navigation'

export const useNavigationStore = defineStore('navigation', () => {
  // State
  const config = ref<NavigationConfig>({
    mode: 'side',
    appearance: 'default',
    position: 'left',
    autoCollapse: true,
    opened: true,
    width: 280,
    collapsed: false,
  })

  const data = ref<NavigationData>({
    compact: [],
    default: [],
    futuristic: [],
    horizontal: [],
  })

  const activeItemId = ref<string | null>(null)
  const expandedItems = ref<Set<string>>(new Set())

  // Getters
  const currentNavigation = computed(() => {
    const appearanceKey = config.value.appearance === 'compact' ? 'compact' : 'default'
    return data.value[appearanceKey] || data.value.default
  })

  const isCollapsed = computed(() => config.value.collapsed)
  const isOpened = computed(() => config.value.opened)
  const navigationMode = computed(() => config.value.mode)
  const navigationAppearance = computed(() => config.value.appearance)

  // Actions
  const setNavigationData = (key: keyof NavigationData, navigation: NavigationItem[]) => {
    data.value[key] = navigation
  }

  const setNavigationConfig = (newConfig: Partial<NavigationConfig>) => {
    config.value = { ...config.value, ...newConfig }
  }

  const setMode = (mode: NavigationMode) => {
    config.value.mode = mode
  }

  const setAppearance = (appearance: NavigationAppearance) => {
    config.value.appearance = appearance
  }

  const toggleCollapsed = () => {
    config.value.collapsed = !config.value.collapsed
  }

  const toggleOpened = () => {
    config.value.opened = !config.value.opened
  }

  const setActiveItem = (itemId: string | null) => {
    activeItemId.value = itemId
  }

  const expandItem = (itemId: string) => {
    expandedItems.value.add(itemId)
  }

  const collapseItem = (itemId: string) => {
    expandedItems.value.delete(itemId)
  }

  const toggleItem = (itemId: string) => {
    if (expandedItems.value.has(itemId)) {
      collapseItem(itemId)
    } else {
      expandItem(itemId)
    }
  }

  const isItemExpanded = (itemId: string): boolean => {
    return expandedItems.value.has(itemId)
  }

  const collapseAll = () => {
    expandedItems.value.clear()
  }

  // Utility functions
  const getFlatNavigation = (navigation: NavigationItem[] = currentNavigation.value): NavigationItem[] => {
    const flatNavigation: NavigationItem[] = []

    const flattenItems = (items: NavigationItem[]) => {
      items.forEach(item => {
        flatNavigation.push(item)
        if (item.children && item.children.length > 0) {
          flattenItems(item.children)
        }
      })
    }

    flattenItems(navigation)
    return flatNavigation
  }

  const getNavigationItem = (id: string, navigation: NavigationItem[] = currentNavigation.value): NavigationItem | null => {
    const findItem = (items: NavigationItem[]): NavigationItem | null => {
      for (const item of items) {
        if (item.id === id) {
          return item
        }
        if (item.children && item.children.length > 0) {
          const found = findItem(item.children)
          if (found) {
            return found
          }
        }
      }
      return null
    }

    return findItem(navigation)
  }

  const getNavigationItemParent = (id: string, navigation: NavigationItem[] = currentNavigation.value): NavigationItem | null => {
    const findParent = (items: NavigationItem[], parent: NavigationItem | null = null): NavigationItem | null => {
      for (const item of items) {
        if (item.id === id) {
          return parent
        }
        if (item.children && item.children.length > 0) {
          const found = findParent(item.children, item)
          if (found) {
            return found
          }
        }
      }
      return null
    }

    return findParent(navigation)
  }

  const getNavigationItemChildren = (id: string): NavigationItem[] => {
    const item = getNavigationItem(id)
    return item?.children || []
  }

  // Auto-expand parents when setting active item
  const setActiveItemWithExpansion = (itemId: string | null) => {
    if (!itemId) {
      setActiveItem(null)
      return
    }

    setActiveItem(itemId)

    // Auto-expand parent items if autoCollapse is enabled
    if (config.value.autoCollapse) {
      let parent = getNavigationItemParent(itemId)
      while (parent && parent.id) {
        expandItem(parent.id)
        parent = getNavigationItemParent(parent.id)
      }
    }
  }

  return {
    // State
    config: computed(() => config.value),
    data: computed(() => data.value),
    activeItemId: computed(() => activeItemId.value),
    expandedItems: computed(() => expandedItems.value),

    // Getters
    currentNavigation,
    isCollapsed,
    isOpened,
    navigationMode,
    navigationAppearance,

    // Actions
    setNavigationData,
    setNavigationConfig,
    setMode,
    setAppearance,
    toggleCollapsed,
    toggleOpened,
    setActiveItem,
    setActiveItemWithExpansion,
    expandItem,
    collapseItem,
    toggleItem,
    isItemExpanded,
    collapseAll,

    // Utilities
    getFlatNavigation,
    getNavigationItem,
    getNavigationItemParent,
    getNavigationItemChildren,
  }
}, {
  persist: true,
})