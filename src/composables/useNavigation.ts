import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigationStore } from '@/stores/navigation'
import type { NavigationItem } from '@/types/navigation'

export function useNavigation() {
  const navigationStore = useNavigationStore()
  const route = useRoute()
  const router = useRouter()

  // Reactive references to store getters
  const config = computed(() => navigationStore.config)
  const currentNavigation = computed(() => navigationStore.currentNavigation)
  const activeItemId = computed(() => navigationStore.activeItemId)
  const expandedItems = computed(() => navigationStore.expandedItems)

  // Navigation item utilities
  const isItemActive = (item: NavigationItem): boolean => {
    if (!item.link) return false

    // Handle external links
    if (item.externalLink) return false

    const currentPath = route.path
    const itemPath = typeof item.link === 'string' ? item.link : router.resolve(item.link).path

    if (item.exactMatch) {
      return currentPath === itemPath
    }

    // Check if current path starts with item path
    return currentPath.startsWith(itemPath)
  }

  const isItemExpanded = (item: NavigationItem): boolean => {
    if (!item.id) return false
    return navigationStore.isItemExpanded(item.id)
  }

  const isItemVisible = (item: NavigationItem): boolean => {
    if (item.hidden && typeof item.hidden === 'function') {
      return !item.hidden(item)
    }
    return true
  }

  const hasActiveChild = (item: NavigationItem): boolean => {
    if (!item.children || item.children.length === 0) return false

    const checkChildren = (children: NavigationItem[]): boolean => {
      return children.some(child => {
        if (isItemActive(child)) return true
        if (child.children && child.children.length > 0) {
          return checkChildren(child.children)
        }
        return false
      })
    }

    return checkChildren(item.children)
  }

  const canExpand = (item: NavigationItem): boolean => {
    return item.type === 'collapsable' && !!(item.children && item.children.length > 0)
  }

  // Navigation actions
  const navigateToItem = async (item: NavigationItem) => {
    if (item.disabled) return

    // Handle function items
    if (item.function && typeof item.function === 'function') {
      item.function(item)
      return
    }

    // Handle external links
    if (item.externalLink && item.link) {
      const target = item.target || '_blank'
      window.open(item.link as string, target)
      return
    }

    // Handle internal navigation
    if (item.link) {
      try {
        await router.push({
          ...(typeof item.link === 'string' ? { path: item.link } : item.link),
          query: item.queryParams ? { ...route.query, ...item.queryParams as Record<string, string> } : route.query,
          hash: item.fragment ? `#${item.fragment}` : undefined,
        })
      } catch (error) {
        console.error('Navigation error:', error)
      }
    }
  }

  const toggleItem = (item: NavigationItem) => {
    if (!item.id || !canExpand(item)) return
    navigationStore.toggleItem(item.id)
  }

  const expandItem = (item: NavigationItem) => {
    if (!item.id || !canExpand(item)) return
    navigationStore.expandItem(item.id)
  }

  const collapseItem = (item: NavigationItem) => {
    if (!item.id) return
    navigationStore.collapseItem(item.id)
  }

  // Auto-detect active item based on current route
  const updateActiveItem = () => {
    const flatNavigation = navigationStore.getFlatNavigation()
    
    for (const item of flatNavigation) {
      if (isItemActive(item) && item.id) {
        navigationStore.setActiveItemWithExpansion(item.id)
        break
      }
    }
  }

  // Watch route changes to update active item
  watch(route, updateActiveItem, { immediate: true })

  // Auto-expand items that have active children
  watch(currentNavigation, () => {
    const checkAndExpand = (items: NavigationItem[]) => {
      items.forEach(item => {
        if (item.type === 'collapsable' && hasActiveChild(item) && item.id) {
          navigationStore.expandItem(item.id)
        }
        if (item.children) {
          checkAndExpand(item.children)
        }
      })
    }
    
    checkAndExpand(currentNavigation.value)
  }, { immediate: true })

  return {
    // Store references
    config,
    currentNavigation,
    activeItemId,
    expandedItems,

    // Store actions
    setNavigationData: navigationStore.setNavigationData,
    setNavigationConfig: navigationStore.setNavigationConfig,
    setMode: navigationStore.setMode,
    setAppearance: navigationStore.setAppearance,
    toggleCollapsed: navigationStore.toggleCollapsed,
    toggleOpened: navigationStore.toggleOpened,

    // Item utilities
    isItemActive,
    isItemExpanded,
    isItemVisible,
    hasActiveChild,
    canExpand,

    // Navigation actions
    navigateToItem,
    toggleItem,
    expandItem,
    collapseItem,
    updateActiveItem,

    // Store utilities
    getFlatNavigation: navigationStore.getFlatNavigation,
    getNavigationItem: navigationStore.getNavigationItem,
    getNavigationItemParent: navigationStore.getNavigationItemParent,
  }
}