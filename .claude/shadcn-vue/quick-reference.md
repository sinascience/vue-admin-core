# shadcn-vue Quick Reference

## How to Check if Component Exists

1. Check in `src/components/ui/[component-name]/` folder
2. Look for `[ComponentName].vue` and `index.ts` files
3. If exists, import from `@/components/ui/[component-name]`

## How to Add New Components

```bash
# Check available components
bunx --bun shadcn-vue@latest add

# Add specific component
bunx --bun shadcn-vue@latest add [component-name]

# Example: Add dialog component
bunx --bun shadcn-vue@latest add dialog
```

## Common Import Patterns

```vue
<script setup>
// Single component
import { Button } from '@/components/ui/button'

// Multiple components from same package
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Dropdown menu (most complex)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>
```

## Component Variants

Most components support variants via props:

### Button Variants

- `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`

### Badge Variants

- `default`, `secondary`, `destructive`, `outline`

### Alert Variants

- `default`, `destructive`

## Size Props

Some components support size props:

- `sm`, `md`, `lg`, `xl`

## Common Props Patterns

```vue
<!-- Disabled state -->
<Button disabled>Disabled</Button>

<!-- Loading state -->
<Button :loading="isLoading">Submit</Button>

<!-- Variants -->
<Button variant="destructive">Delete</Button>
<Badge variant="secondary">New</Badge>

<!-- Custom classes -->
<Button class="w-full">Full Width</Button>

<!-- As child (render as different element) -->
<Button as-child>
  <router-link to="/home">Home</router-link>
</Button>
```

## Form Integration

```vue
<script setup>
import { ref } from 'vue'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const name = ref('')
const email = ref('')
</script>

<template>
  <form>
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl>
        <Input v-model="name" />
      </FormControl>
      <FormMessage />
    </FormItem>

    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input v-model="email" type="email" />
      </FormControl>
      <FormMessage />
    </FormItem>

    <Button type="submit">Submit</Button>
  </form>
</template>
```

## Navigation Menu Pattern

```vue
<script setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Sub Item</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

## Data Table Pattern

```vue
<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in data" :key="item.id">
        <TableCell>{{ item.name }}</TableCell>
        <TableCell>{{ item.email }}</TableCell>
        <TableCell>
          <Button variant="ghost" size="sm">Edit</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
```

## Dark Mode Support

All components automatically support dark mode when using Tailwind CSS dark mode classes.

## Customization

Components can be customized by:

1. Passing custom classes via `class` prop
2. Modifying the component files directly in `src/components/ui/`
3. Using CSS custom properties for theming
4. Using Tailwind utilities for styling
