import { type Component } from 'vue'
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Bitcoin,
  School,
  MessageSquare,
  Contact,
} from 'lucide-vue-next'

export interface MenuItem {
  title: string
  to: string
  icon?: Component
  children?: MenuItem[]
}

export interface MenuSection {
  title: string
  description?: string
  items: MenuItem[]
}

export const menuConfig: MenuSection[] = [
  {
    title: 'DASHBOARDS',
    description: 'Unique dashboard designs',
    items: [
      {
        title: 'Project',
        to: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Analytics',
        to: '/analytics',
        icon: BarChart3,
      },
      {
        title: 'Finance',
        to: '/finance',
        icon: Wallet,
      },
      {
        title: 'Crypto',
        to: '/crypto',
        icon: Bitcoin,
      },
    ],
  },
  {
    title: 'APPLICATIONS',
    description: 'Custom made application designs',
    items: [
      {
        title: 'Academy',
        to: '/apps/academy',
        icon: School,
      },
      {
        title: 'Chat',
        to: '/apps/chat',
        icon: MessageSquare,
      },
      {
        title: 'Contacts',
        to: '/apps/contacts',
        icon: Contact,
      },
    ],
  },
]
