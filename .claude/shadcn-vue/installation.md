# shadcn-vue Installation Guide

## Project Setup (Already Done)

This project already has shadcn-vue configured with the following components installed:

- accordion, auto-form, avatar, badge, breadcrumb, button, card, checkbox, dropdown-menu, form, input, label, popover, select, separator, table, tabs, tooltip

## Adding New Components

### Step 1: Check Available Components

```bash
bunx --bun shadcn-vue@latest add
```

### Step 2: Add Specific Component

```bash
bunx --bun shadcn-vue@latest add [component-name]
```

### Step 3: Verify Installation

Check that the component appears in `src/components/ui/[component-name]/`

## Common Components to Add

### For Modals and Dialogs

```bash
bunx --bun shadcn-vue@latest add dialog
bunx --bun shadcn-vue@latest add alert-dialog
bunx --bun shadcn-vue@latest add drawer
bunx --bun shadcn-vue@latest add sheet
```

### For Forms

```bash
bunx --bun shadcn-vue@latest add textarea
bunx --bun shadcn-vue@latest add radio-group
bunx --bun shadcn-vue@latest add switch
bunx --bun shadcn-vue@latest add slider
bunx --bun shadcn-vue@latest add calendar
bunx --bun shadcn-vue@latest add date-picker
```

### For Navigation

```bash
bunx --bun shadcn-vue@latest add navigation-menu
bunx --bun shadcn-vue@latest add menubar
bunx --bun shadcn-vue@latest add context-menu
```

### For Data Display

```bash
bunx --bun shadcn-vue@latest add data-table
bunx --bun shadcn-vue@latest add carousel
bunx --bun shadcn-vue@latest add progress
```

### For Feedback

```bash
bunx --bun shadcn-vue@latest add alert
bunx --bun shadcn-vue@latest add toast
bunx --bun shadcn-vue@latest add skeleton
```

### For Layout

```bash
bunx --bun shadcn-vue@latest add collapsible
bunx --bun shadcn-vue@latest add separator
bunx --bun shadcn-vue@latest add scroll-area
bunx --bun shadcn-vue@latest add resizable
```

## Configuration (Already Set)

The project is already configured with:

- TypeScript support
- Tailwind CSS integration
- Proper import aliases (`@/components/ui/`)
- Dark mode support

## Import Structure

After adding a component, import it like:

```vue
<script setup>
import { ComponentName } from '@/components/ui/component-name'
</script>
```

## Troubleshooting

### Component Not Found

1. Check if component exists in `src/components/ui/`
2. Verify the component name is correct
3. Check import path matches folder structure

### Type Errors

1. Ensure TypeScript is properly configured
2. Check if `@/` alias is working
3. Restart TypeScript server in IDE

### Styling Issues

1. Verify Tailwind CSS is working
2. Check if component CSS is properly imported
3. Ensure dark mode classes are available

## Best Practices

1. Always check if component exists before adding
2. Use TypeScript for better development experience
3. Follow the established import patterns
4. Test components in both light and dark modes
5. Customize components by modifying files in `src/components/ui/` rather than creating new ones
