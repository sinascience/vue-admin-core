# Shadcn-Vue Components Status

This document tracks the status of shadcn-vue components in the project.

## ✅ Available Components (16/54)

### Core UI Components
- **Accordion** - Collapsible content sections
- **Auto Form** - Automatic form generation (Extended)
- **Avatar** - User profile images with fallback
- **Badge** - Status indicators and labels
- **Button** - Primary interaction element
- **Card** - Content containers with actions
- **Checkbox** - Boolean input control
- **Dropdown Menu** - Contextual menu system
- **Form** - Form validation and structure
- **Input** - Text input field
- **Label** - Form field labels
- **Popover** - Floating content containers
- **Select** - Dropdown selection control
- **Separator** - Visual content dividers
- **Table** - Data presentation and manipulation
- **Tabs** - Tabbed content navigation
- **Tooltip** - Contextual help information

## ❌ Missing Components (38/54)

### Essential UI Components
- **Alert** - Notification and status messages
- **Alert Dialog** - Modal confirmation dialogs
- **Aspect Ratio** - Responsive aspect ratio containers
- **Breadcrumb** - Navigation hierarchy
- **Calendar** - Date selection interface
- **Carousel** - Content slideshow
- **Collapsible** - Expandable content sections
- **Combobox** - Searchable select input
- **Command** - Command palette interface
- **Context Menu** - Right-click contextual menu
- **Data Table** - Advanced table with sorting/filtering
- **Date Picker** - Date selection input
- **Dialog** - Modal dialog windows
- **Drawer** - Slide-out panels
- **Hover Card** - Hover-triggered information cards
- **Menubar** - Application menu bar
- **Navigation Menu** - Main navigation component
- **Number Field** - Numeric input with controls
- **Pagination** - Page navigation controls
- **PIN Input** - PIN/OTP input fields
- **Progress** - Progress indicators
- **Radio Group** - Exclusive selection controls
- **Range Calendar** - Date range selection
- **Resizable** - Resizable panel components
- **Scroll Area** - Custom scrollable containers
- **Sheet** - Slide-out panels (alternative to Drawer)
- **Skeleton** - Loading placeholders
- **Slider** - Range input controls
- **Sonner** - Toast notifications
- **Stepper** - Step-by-step navigation
- **Switch** - Toggle switches
- **Tags Input** - Multi-value input field
- **Textarea** - Multi-line text input
- **Toast** - Notification messages (deprecated, use Sonner)
- **Toggle** - Toggle buttons
- **Toggle Group** - Grouped toggle controls

### Extended Components
- **Sidebar** - Navigation sidebar (Extended)
- **Charts** - Data visualization (currently unavailable)

## Installation Commands

To install missing components, use the following commands:

```bash
# Install essential UI components
bunx shadcn-vue@latest add alert alert-dialog aspect-ratio breadcrumb calendar carousel collapsible combobox command context-menu data-table date-picker dialog drawer hover-card menubar navigation-menu number-field pagination pin-input progress radio-group range-calendar resizable scroll-area sheet skeleton slider sonner stepper switch tags-input textarea toggle toggle-group

# Install extended components
bunx shadcn-vue@latest add sidebar

# Note: Charts component is currently unavailable due to registry issues
```

## Priority Installation Recommendations

### High Priority (Core Admin Features)
1. **Dialog** - Essential for modals and confirmations
2. **Alert** - Critical for user notifications
3. **Skeleton** - Improves loading UX
4. **Progress** - For loading states and file uploads
5. **Switch** - Common in admin settings
6. **Textarea** - For multi-line text inputs
7. **Radio Group** - For exclusive selections
8. **Sonner** - Modern toast notifications

### Medium Priority (Enhanced UX)
1. **Date Picker** - For date inputs
2. **Combobox** - Searchable selections
3. **Command** - For command palette
4. **Pagination** - For data tables
5. **Breadcrumb** - For navigation
6. **Hover Card** - For contextual information
7. **Drawer** - For mobile-friendly panels

### Low Priority (Nice to Have)
1. **Calendar** - For advanced date selection
2. **Carousel** - For content showcases
3. **Stepper** - For multi-step processes
4. **Range Calendar** - For date ranges
5. **Tags Input** - For tag management
6. **PIN Input** - For authentication
7. **Resizable** - For customizable layouts

## Component Usage Guidelines

When using these components:

1. **Import from index files**: Always import from `@/components/ui/[component]`
2. **Follow shadcn-vue patterns**: Use the established patterns for styling and behavior
3. **Maintain consistency**: Use existing components before creating custom ones
4. **Type safety**: Leverage TypeScript definitions for better DX
5. **Accessibility**: Ensure all components meet WCAG guidelines

## Notes

- Toast component is deprecated in favor of Sonner
- Charts component has registry issues and may need manual installation
- Auto Form is an extended component with additional dependencies
- Some components may require additional setup (e.g., date components need date libraries)

Last updated: July 15, 2025