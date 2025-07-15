import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Bitcoin,
  FileText,
  Users,
  Settings,
  HelpCircle,
  Folder,
  Mail,
  MessageSquare,
  Bookmark,
  Clipboard,
  Calendar,
} from 'lucide-vue-next'
import type { NavigationItem, NavigationData } from '@/types/navigation'

// Basic navigation items for the default layout
const defaultNavigation: NavigationItem[] = [
  {
    id: 'dashboards',
    title: 'DASHBOARDS',
    type: 'group',
    children: [
      {
        id: 'dashboard-project',
        title: 'Project',
        type: 'basic',
        icon: LayoutDashboard,
        link: '/dashboard',
        exactMatch: true,
      },
      {
        id: 'dashboard-analytics',
        title: 'Analytics',
        type: 'basic',
        icon: BarChart3,
        link: '/analytics',
      },
      {
        id: 'dashboard-finance',
        title: 'Finance',
        type: 'basic',
        icon: Wallet,
        link: '/finance',
      },
      {
        id: 'dashboard-crypto',
        title: 'Crypto',
        type: 'basic',
        icon: Bitcoin,
        link: '/crypto',
      },
    ],
  },
  {
    id: 'divider-1',
    type: 'divider',
  },
  {
    id: 'applications',
    title: 'APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'app-posts',
        title: 'Posts',
        type: 'basic',
        icon: FileText,
        link: '/posts',
      },
      {
        id: 'app-contacts',
        title: 'Contacts',
        type: 'collapsable',
        icon: Users,
        children: [
          {
            id: 'contacts-list',
            title: 'List',
            type: 'basic',
            link: '/contacts',
          },
          {
            id: 'contacts-details',
            title: 'Details',
            type: 'basic',
            link: '/contacts/details',
          },
        ],
      },
      {
        id: 'app-file-manager',
        title: 'File Manager',
        type: 'basic',
        icon: Folder,
        link: '/file-manager',
      },
      {
        id: 'app-mail',
        title: 'Mailbox',
        type: 'collapsable',
        icon: Mail,
        children: [
          {
            id: 'mail-inbox',
            title: 'Inbox',
            type: 'basic',
            link: '/mail/inbox',
            badge: {
              title: '27',
              classes: 'bg-primary text-primary-foreground',
            },
          },
          {
            id: 'mail-sent',
            title: 'Sent',
            type: 'basic',
            link: '/mail/sent',
          },
          {
            id: 'mail-drafts',
            title: 'Drafts',
            type: 'basic',
            link: '/mail/drafts',
          },
        ],
      },
      {
        id: 'app-chat',
        title: 'Chat',
        type: 'basic',
        icon: MessageSquare,
        link: '/chat',
      },
      {
        id: 'app-notes',
        title: 'Notes',
        type: 'basic',
        icon: Bookmark,
        link: '/notes',
      },
      {
        id: 'app-tasks',
        title: 'Tasks',
        type: 'basic',
        icon: Clipboard,
        link: '/tasks',
      },
      {
        id: 'app-calendar',
        title: 'Calendar',
        type: 'basic',
        icon: Calendar,
        link: '/calendar',
      },
    ],
  },
  {
    id: 'spacer-1',
    type: 'spacer',
  },
  {
    id: 'support',
    title: 'SUPPORT',
    type: 'group',
    children: [
      {
        id: 'help-center',
        title: 'Help Center',
        type: 'basic',
        icon: HelpCircle,
        link: '/help',
      },
      {
        id: 'settings',
        title: 'Settings',
        type: 'basic',
        icon: Settings,
        link: '/settings',
      },
    ],
  },
]

// Compact navigation for smaller sidebars (using aside items)
const compactNavigation: NavigationItem[] = [
  {
    id: 'dashboard-compact',
    title: 'Dashboard',
    type: 'aside',
    icon: LayoutDashboard,
    link: '/dashboard',
    children: [
      {
        id: 'dashboard-project-compact',
        title: 'Project',
        type: 'basic',
        link: '/dashboard',
      },
      {
        id: 'dashboard-analytics-compact',
        title: 'Analytics',
        type: 'basic',
        link: '/analytics',
      },
      {
        id: 'dashboard-finance-compact',
        title: 'Finance',
        type: 'basic',
        link: '/finance',
      },
      {
        id: 'dashboard-crypto-compact',
        title: 'Crypto',
        type: 'basic',
        link: '/crypto',
      },
    ],
  },
  {
    id: 'divider-compact-1',
    type: 'divider',
  },
  {
    id: 'app-posts-compact',
    title: 'Posts',
    type: 'aside',
    icon: FileText,
    link: '/posts',
  },
  {
    id: 'app-contacts-compact',
    title: 'Contacts',
    type: 'aside',
    icon: Users,
    children: [
      {
        id: 'contacts-list-compact',
        title: 'List',
        type: 'basic',
        link: '/contacts',
      },
      {
        id: 'contacts-details-compact',
        title: 'Details',
        type: 'basic',
        link: '/contacts/details',
      },
    ],
  },
  {
    id: 'app-mail-compact',
    title: 'Mailbox',
    type: 'aside',
    icon: Mail,
    badge: {
      title: '27',
      classes: 'bg-primary text-primary-foreground',
    },
    children: [
      {
        id: 'mail-inbox-compact',
        title: 'Inbox',
        type: 'basic',
        link: '/mail/inbox',
      },
      {
        id: 'mail-sent-compact',
        title: 'Sent',
        type: 'basic',
        link: '/mail/sent',
      },
      {
        id: 'mail-drafts-compact',
        title: 'Drafts',
        type: 'basic',
        link: '/mail/drafts',
      },
    ],
  },
  {
    id: 'app-chat-compact',
    title: 'Chat',
    type: 'aside',
    icon: MessageSquare,
    link: '/chat',
  },
  {
    id: 'divider-compact-2',
    type: 'divider',
  },
  {
    id: 'help-center-compact',
    title: 'Help Center',
    type: 'aside',
    icon: HelpCircle,
    link: '/help',
  },
  {
    id: 'settings-compact',
    title: 'Settings',
    type: 'aside',
    icon: Settings,
    link: '/settings',
  },
]

// Horizontal navigation for horizontal layouts
const horizontalNavigation: NavigationItem[] = [
  {
    id: 'dashboards-horizontal',
    title: 'Dashboards',
    type: 'basic',
    icon: LayoutDashboard,
    children: [
      {
        id: 'dashboard-project-horizontal',
        title: 'Project',
        type: 'basic',
        icon: LayoutDashboard,
        link: '/dashboard',
        badge: {
          title: 'New',
          classes: 'bg-blue-500 text-white',
        },
      },
      {
        id: 'dashboard-analytics-horizontal',
        title: 'Analytics',
        subtitle: 'Performance metrics',
        type: 'basic',
        icon: BarChart3,
        link: '/analytics',
        badge: {
          title: '12',
          classes: 'bg-green-500 text-white',
        },
      },
      {
        id: 'dashboard-finance-horizontal',
        title: 'Finance',
        subtitle: 'Financial tracking',
        type: 'basic',
        icon: Wallet,
        link: '/finance',
        children: [
          {
            id: 'finance-reports',
            title: 'Reports',
            subtitle: 'Monthly and yearly reports',
            type: 'basic',
            icon: FileText,
            link: '/finance/reports',
          },
          {
            id: 'finance-transactions',
            title: 'Transactions',
            subtitle: 'All financial transactions',
            type: 'basic',
            icon: Bitcoin,
            link: '/finance/transactions',
            badge: {
              title: '99+',
              classes: 'bg-red-500 text-white',
            },
          },
        ],
      },
      {
        id: 'dashboard-crypto-horizontal',
        title: 'Crypto',
        subtitle: 'Cryptocurrency tracking',
        type: 'basic',
        icon: Bitcoin,
        link: '/crypto',
        disabled: true,
      },
    ],
  },
  {
    id: 'apps-horizontal',
    title: 'Applications',
    type: 'basic',
    icon: FileText,
    children: [
      {
        id: 'app-posts-horizontal',
        title: 'Posts',
        subtitle: 'Manage blog posts',
        type: 'basic',
        icon: FileText,
        link: '/posts',
        badge: {
          title: 'Active',
          classes: 'bg-green-500 text-white',
        },
      },
      {
        id: 'app-contacts-horizontal',
        title: 'Contacts',
        subtitle: 'Contact management',
        type: 'basic',
        icon: Users,
        link: '/contacts',
      },
      {
        id: 'app-mail-horizontal',
        title: 'Mailbox',
        subtitle: 'Email management',
        type: 'basic',
        icon: Mail,
        link: '/mail',
        children: [
          {
            id: 'mail-inbox',
            title: 'Inbox',
            subtitle: 'Received messages',
            type: 'basic',
            icon: Mail,
            link: '/mail/inbox',
            badge: {
              title: '5',
              classes: 'bg-blue-500 text-white',
            },
          },
          {
            id: 'mail-sent',
            title: 'Sent',
            subtitle: 'Sent messages',
            type: 'basic',
            icon: Mail,
            link: '/mail/sent',
          },
          {
            id: 'mail-drafts',
            title: 'Drafts',
            subtitle: 'Draft messages',
            type: 'basic',
            icon: Mail,
            link: '/mail/drafts',
            badge: {
              title: '2',
              classes: 'bg-yellow-500 text-white',
            },
          },
        ],
      },
      {
        id: 'app-chat-horizontal',
        title: 'Chat',
        subtitle: 'Real-time messaging',
        type: 'basic',
        icon: MessageSquare,
        link: '/chat',
        badge: {
          title: 'Online',
          classes: 'bg-green-500 text-white',
        },
      },
    ],
  },
  {
    id: 'help-horizontal',
    title: 'Help',
    subtitle: 'Get support',
    type: 'basic',
    icon: HelpCircle,
    link: '/help',
  },
]

// Futuristic navigation with different styling approach
const futuristicNavigation: NavigationItem[] = [
  {
    id: 'command-center',
    title: 'COMMAND CENTER',
    subtitle: 'Mission control and analytics',
    type: 'group',
    children: [
      {
        id: 'dashboard-project-futuristic',
        title: 'Project Hub',
        subtitle: 'Central command',
        type: 'basic',
        icon: LayoutDashboard,
        link: '/dashboard',
      },
      {
        id: 'dashboard-analytics-futuristic',
        title: 'Data Analytics',
        subtitle: 'Intelligence reports',
        type: 'basic',
        icon: BarChart3,
        link: '/analytics',
      },
    ],
  },
  {
    id: 'divider-futuristic-1',
    type: 'divider',
    title: 'SYSTEMS',
  },
  {
    id: 'operations',
    title: 'OPERATIONS',
    subtitle: 'Mission-critical applications',
    type: 'group',
    children: [
      {
        id: 'app-posts-futuristic',
        title: 'Content Grid',
        subtitle: 'Content management',
        type: 'basic',
        icon: FileText,
        link: '/posts',
      },
      {
        id: 'app-contacts-futuristic',
        title: 'Personnel Database',
        subtitle: 'Contact management',
        type: 'collapsable',
        icon: Users,
        children: [
          {
            id: 'contacts-list-futuristic',
            title: 'Active Roster',
            type: 'basic',
            link: '/contacts',
          },
          {
            id: 'contacts-details-futuristic',
            title: 'Personnel Files',
            type: 'basic',
            link: '/contacts/details',
          },
        ],
      },
      {
        id: 'app-mail-futuristic',
        title: 'Communications',
        subtitle: 'Secure messaging',
        type: 'basic',
        icon: Mail,
        link: '/mail',
        badge: {
          title: '27',
          classes: 'bg-blue-500 text-white',
        },
      },
    ],
  },
]

export const navigationData: NavigationData = {
  default: defaultNavigation,
  compact: compactNavigation,
  horizontal: horizontalNavigation,
  futuristic: futuristicNavigation,
}

// Legacy compatibility - convert old menuConfig to new navigation format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertLegacyMenuConfig = (menuConfig: any[]): NavigationItem[] => {
  return menuConfig.map((section, sectionIndex) => ({
    id: `section-${sectionIndex}`,
    title: section.title,
    subtitle: section.description,
    type: 'group' as const,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: section.items.map((item: any, itemIndex: number) => ({
      id: `item-${sectionIndex}-${itemIndex}`,
      title: item.title,
      type: 'basic' as const,
      icon: item.icon,
      link: item.to,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: item.children?.map((child: any, childIndex: number) => ({
        id: `child-${sectionIndex}-${itemIndex}-${childIndex}`,
        title: child.title,
        type: 'basic' as const,
        icon: child.icon,
        link: child.to,
      })),
    })),
  }))
}
