# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager

This project uses **Bun** as the package manager. All commands should use `bun` instead of `npm`.

### Core Commands

- `bun install` - Install dependencies
- `bun dev` - Start development server with hot reload (runs theme generation first)
- `bun run build` - Build for production (includes type checking and theme generation)
- `bun run preview` - Preview production build
- `bun test:unit` - Run unit tests with Vitest
- `bun run type-check` - Type check with vue-tsc
- `bun lint` - Lint and auto-fix with ESLint
- `bun run format` - Format code with Prettier

### Theme Generation

The project has a custom theme system that generates CSS from `v-pack.vue.config.ts`:

- Theme is auto-generated before dev/build via `scripts/generate-theme.mjs`
- Generated CSS is written to `src/assets/generated-theme.css`
- Modify theme colors, fonts, and radius in `v-pack.vue.config.ts`

## Architecture Overview

### Tech Stack

- **Vue 3** with Composition API and TypeScript
- **Vite** for build tooling
- **Pinia** for state management with persistence
- **Vue Router** for routing with authentication guards
- **TailwindCSS v4** for styling
- **shadcn-vue** UI components (Reka UI based)
- **Vitest** for testing

### Project Structure

#### Module-Based Organization

The project follows a modular architecture where each feature is organized in `src/modules/`:

```
src/modules/
├── auth/          # Authentication module
│   ├── router.ts  # Auth routes
│   ├── services/  # Auth API services
│   ├── stores/    # Pinia auth store
│   ├── types.ts   # Auth type definitions
│   └── views/     # Login/Register views
└── posts/         # Posts management module
    ├── router.ts  # Post routes
    ├── services/  # Post API services
    ├── stores/    # Pinia post store
    └── views/     # Post views
```

#### Layout System

Multiple layout options in `src/layouts/`:

- `DashboardLayout.vue` - Main admin layout with sidebar
- `AuthLayout.vue` - Layout for login/register pages
- `VerticalLayout.vue` & `HorizontalLayout.vue` - Alternative layouts

Layout style is configured in `v-pack.vue.config.ts` (`layout.style`).

#### UI Components

- **Base UI**: `src/components/ui/` - shadcn-vue components (Button, Card, Table, etc.)
- **Layout Components**: `src/components/layout/` - Navigation, menus, user profile
- **Icons**: Uses `lucide-vue-next` icon library

### State Management

#### Pinia Stores

- **Auth Store** (`src/modules/auth/stores/auth.store.ts`):
  - Handles authentication tokens, user profile
  - Persisted to localStorage
  - Contains avatar URL logic for different image states
- **Post Store** (`src/modules/posts/stores/post.store.ts`):
  - Currently uses mock data
  - Prepared for real API integration

#### Authentication Flow

- Global router guard in `src/router/index.ts`
- Routes with `meta: { requiresAuth: true }` require authentication
- Routes with `meta: { nonAuth: true }` redirect authenticated users
- Auto-fetches user profile on authenticated route access

### API Integration

- **Base Service**: `src/services/apiService.ts` - Axios configuration
- **Module Services**: Each module has its own service layer
- **Response Types**: Standardized in `src/pkg/response/response.ts`

### Theme & Layout System

The custom theme system allows runtime theme generation:

- **Configuration**: Centralized in `v-pack.vue.config.ts`
- **Layout Variants**: Multiple layout styles (classic, classy, compact, dense, futuristic, thin)
- **Navigation Config**: Mode, appearance, collapse behavior
- **Theme Colors**: Custom colors, fonts, and border radius
- **CSS Generation**: Generates CSS custom properties
- **TailwindCSS v4**: Integration with @theme directive and @reference for utilities

#### Layout Configuration

```typescript
// v-pack.vue.config.ts
const config = {
  layout: {
    style: 'vertical' | 'horizontal',
    variant: 'classic' | 'classy' | 'compact' | 'dense' | 'futuristic' | 'thin',
  },
  navigation: {
    appearance: 'default' | 'compact' | 'dense' | 'thin',
    mode: 'side' | 'over',
    collapsed: boolean,
    autoCollapse: boolean,
  },
}
```

#### Current Default

- **Layout**: Horizontal with "modern" variant (glass morphism design with backdrop blur)
- **Navigation**: Side mode, not collapsed, with auto-collapse enabled

### Testing

- **Vitest** with jsdom environment
- Test files located in `src/components/__tests__/`
- Component testing with Vue Test Utils

## Development Guidelines

### Adding New Modules

1. Create module directory in `src/modules/[module-name]/`
2. Add router, services, stores, types, and views subdirectories
3. Export routes from `router.ts` and import in main router
4. Follow existing patterns for state management and API integration

### UI Component Usage

- **ALWAYS use shadcn-vue components** for UI elements
- **Check existing components first** in `src/components/ui/` before adding new ones
- **Add missing components** via `bunx --bun shadcn-vue@latest add [component-name]`
- Import from `@/components/ui/[component]`
- Follow shadcn-vue patterns for consistent styling
- Use Lucide icons via `lucide-vue-next`

**shadcn-vue Documentation Reference**: See `.claude/shadcn-vue/` folder for:

- `overview.md` - General information and installation
- `available-components.md` - Components already in the project
- `missing-components.md` - Components that can be added
- `quick-reference.md` - Common patterns and usage examples
- `installation.md` - How to add new components

**UI Component Guidelines**:

1. **Always check** if the component exists in `src/components/ui/` first
2. **If component exists**, use it directly: `import { Button } from '@/components/ui/button'`
3. **If component missing**, add it: `bunx --bun shadcn-vue@latest add [component-name]`
4. **If shadcn-vue doesn't have it**, create a custom component following shadcn-vue patterns
5. **Use shadcn-vue for ALL UI needs**: buttons, forms, modals, tables, navigation, etc.

### Type Definitions

- Global types in `src/types/index.ts`
- Module-specific types in respective `types.ts` files
- Maintain type safety throughout the application

### Authentication Integration

- Use `useAuthStore()` for authentication state
- Implement route guards using `meta.requiresAuth`
- Handle token refresh automatically in API interceptors

## Reference Implementation (.reference/)

This project is recreating the **Angular Fuse Admin Template** in Vue.js. The `.reference/` directory contains the original Angular implementation for reference.

### Fuse Template Overview

- **Version**: Angular 19 with Fuse v21.0.0
- **License**: Commercial template from ThemeForest
- **Key Technologies**: Angular Material, TailwindCSS, ApexCharts, Transloco (i18n)

### Key Features Being Recreated

#### 1. Navigation System

The Fuse template includes a sophisticated navigation system with:

- **Multiple Layout Types**: 10+ layout variants (vertical: classic, classy, compact, dense, futuristic, thin; horizontal: centered, enterprise, material, modern)
- **Navigation Modes**: Side (persistent) and Over (overlay) modes
- **Navigation Appearances**: Default, compact, dense, thin
- **Item Types**: Basic, collapsable (multi-level), group, aside, divider, spacer
- **Advanced Features**: Auto-collapse, router integration, badges, icons, tooltips
- **Responsive Behavior**: Automatic mode switching based on screen size

#### 2. Built-in Applications

Reference implementation includes full-featured apps:

- **Academy**: Course management system
- **Chat**: Real-time messaging with contacts
- **Contacts**: Contact management with detailed views
- **E-commerce**: Inventory management system
- **File Manager**: File/folder browser with details
- **Help Center**: Documentation with FAQs and guides
- **Mailbox**: Email client with compose/reply
- **Notes**: Note-taking with labels and categories
- **Scrumboard**: Kanban-style project management
- **Tasks**: Task management with filters

#### 3. Layout Components

- **Multiple themes and color schemes** with auto dark/light mode
- **Header components**: Search, notifications, messages, user profile, settings
- **Sidebar variations** with different styling approaches
- **Responsive design** with mobile-first approach

#### 4. Fuse Framework Features

The `@fuse/` namespace provides:

- **Service Architecture**: Configuration, media watcher, platform detection
- **Component Library**: Alerts, cards, drawers, navigation, loading bars
- **Animation System**: Fade, slide, zoom, expand/collapse animations
- **Mock API System**: Complete API simulation for development
- **Utility Services**: Platform detection, splash screen, confirmation dialogs

### Vue Implementation Strategy

When working on this Vue recreation:

1. **Refer to Angular patterns** in `.reference/src/app/modules/` for application structure
2. **Study navigation implementation** in `.reference/src/@fuse/components/navigation/`
3. **Examine layout systems** in `.reference/src/app/layout/layouts/`
4. **Review theme management** in `.reference/src/@fuse/services/config/`
5. **Check component patterns** in `.reference/src/@fuse/components/`

### Navigation Data Structure

```typescript
interface FuseNavigationItem {
  id?: string
  title?: string
  subtitle?: string
  type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer'
  hidden?: (item: FuseNavigationItem) => boolean
  active?: boolean
  disabled?: boolean
  tooltip?: string
  link?: string
  externalLink?: boolean
  target?: string
  exactMatch?: boolean
  function?: (item: FuseNavigationItem) => void
  icon?: string
  badge?: { title?: string; classes?: string }
  children?: FuseNavigationItem[]
  classes?: {
    title?: string
    subtitle?: string
    icon?: string
    wrapper?: string
  }
}
```

### Current Implementation Status

The Vue version currently has:

- ✅ Basic modular architecture (auth, posts modules)
- ✅ Layout system foundation (DashboardLayout, AuthLayout)
- ✅ Theme generation system
- ✅ shadcn-vue UI components
- ✅ **Navigation system** (fully implemented with multi-level dropdown support)
- ✅ **Multiple layout variants** (vertical: classic, classy; horizontal: centered, enterprise, material, modern)
- ✅ **Advanced navigation features** (icons, badges, subtitles, disabled states, active detection)
- ⏳ Built-in applications

#### Navigation System Implementation Details

**✅ Completed Features:**

- **Navigation Components**: NavigationVertical, NavigationHorizontal, NavigationItem, NavigationDropdownItem
- **Layout Variants**:
  - **Vertical**: Classic (basic sidebar), Classy (dark sidebar with rounded corners)
  - **Horizontal**: Centered (grid-based), Enterprise (business-focused), Material (Material Design), Modern (glass morphism)
- **Item Types**: Basic, collapsable (multi-level), group, aside, divider, spacer
- **Advanced Features**:
  - Multi-level dropdown menus with shadcn-vue DropdownMenu components
  - Icons (Lucide Vue icons), badges (custom colored), subtitles
  - Active state detection with router integration
  - Disabled states, tooltips, custom CSS classes
  - Responsive behavior (mobile navigation overlay)
- **shadcn-vue Integration**: Uses DropdownMenu, DropdownMenuSub, Button, Badge components
- **Navigation Data**: Rich configuration with icons, subtitles, badges, nested structure

**Current Active Layout**: Horizontal Modern variant with:

- Glass morphism design with backdrop blur
- Responsive mobile navigation with overlay
- Multi-level dropdown navigation with icons and badges
- Footer with copyright, header actions (search, settings, notifications, user menu)

**Navigation Store**: Pinia store with persistence, configuration management, and utility functions

#### Features Still To Be Implemented

**⏳ Layout Variants (Incomplete):**

- **Vertical Layouts**: compact, dense, futuristic, thin variants (only classic and classy completed)
- **Horizontal Layouts**: All variants are structurally complete but may need refinement and testing

**⏳ Navigation Appearances**:

- Currently only 'default' appearance is fully implemented
- Need to implement: compact, dense, thin navigation appearances across all components

**⏳ Navigation Item Types**:

- **Aside**: Navigation items that appear outside the main navigation flow
- **Divider**: Visual separators between navigation sections
- **Spacer**: Empty space elements for layout purposes
- **Group**: Currently basic implementation exists, may need enhancement

**⏳ Advanced Navigation Features**:

- **Auto-collapse behavior**: Smart collapsing based on screen size and user interaction
- **Navigation animations**: Smooth transitions for expand/collapse, hover states
- **Keyboard navigation**: Full keyboard accessibility for all navigation components
- **Navigation search**: Search functionality within navigation items
- **Navigation badges**: Dynamic badge updates based on application state
- **Navigation tooltips**: Enhanced tooltip system with rich content
- **Navigation persistence**: Remember expanded/collapsed states across sessions

**⏳ Built-in Applications** (Major features to implement):

- **Academy**: Course management system with lessons, progress tracking
- **Chat**: Real-time messaging with contacts, chat rooms, file sharing
- **Contacts**: Comprehensive contact management with detailed views, groups
- **E-commerce**: Inventory management, product catalog, orders, customers
- **File Manager**: File/folder browser with upload, download, preview capabilities
- **Help Center**: Documentation system with FAQs, guides, search
- **Mailbox**: Email client with compose, reply, folders, attachments
- **Notes**: Note-taking with labels, categories, rich text editing
- **Scrumboard**: Kanban-style project management with drag-and-drop
- **Tasks**: Task management with filters, priorities, due dates, assignments

**⏳ Layout Components** (Need enhancement):

- **Header Components**:
  - Advanced search with filters and results
  - Notifications system with real-time updates
  - Messages/chat integration
  - User profile management
  - Settings panel with theme switching
- **Sidebar Variations**: Additional styling approaches and customization options
- **Footer Components**: Links, social media, additional information sections

**⏳ Theme System Enhancements**:

- **Theme Switcher**: UI component for switching between light/dark themes
- **Color Scheme Variants**: Multiple color palettes (blue, green, purple, etc.)
- **Dynamic Theme Generation**: Runtime theme customization
- **Theme Persistence**: Save user theme preferences

**⏳ Responsive Design**:

- **Mobile-first optimization**: Enhanced mobile experience across all components
- **Tablet-specific layouts**: Optimized layouts for tablet devices
- **Touch interactions**: Improved touch/swipe gestures for mobile navigation

**⏳ Performance Optimizations**:

- **Lazy loading**: Load navigation items and routes on demand
- **Virtual scrolling**: For large navigation lists
- **Code splitting**: Split layout and navigation code for better performance
- **Caching**: Implement navigation data caching strategies

**⏳ Authentication & Authorization**:

- **Role-based navigation**: Show/hide navigation items based on user roles
- **Permission system**: Granular permissions for navigation access
- **User profile integration**: Connect navigation with user preferences

**⏳ Internationalization (i18n)**:

- **Multi-language support**: Translate navigation labels and content
- **RTL support**: Right-to-left layout support for Arabic, Hebrew, etc.
- **Locale-specific formatting**: Date, time, number formatting

**⏳ Testing & Quality**:

- **Unit tests**: Comprehensive testing for navigation components
- **Integration tests**: Test navigation with routing and state management
- **E2E tests**: End-to-end testing for navigation flows
- **Accessibility testing**: WCAG compliance testing
- **Performance testing**: Load testing and optimization

**⏳ Developer Experience**:

- **Navigation generator**: CLI tool to generate navigation configurations
- **Documentation**: Comprehensive component documentation
- **Storybook**: Component showcase and testing environment
- **TypeScript definitions**: Enhanced type definitions for better DX

```

```
