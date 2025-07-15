# shadcn-vue Overview

## What is shadcn-vue?

- Vue port of shadcn/ui components
- Built with Tailwind CSS and Radix Vue
- Copy-paste components, not a traditional library
- Customizable and themeable

## Key Features

- 40+ Vue components
- Dark mode support
- TypeScript support
- Tailwind CSS integration
- Accessibility-first design
- Open source

## Installation

```bash
bunx --bun shadcn-vue@latest init
bunx --bun shadcn-vue@latest add [component]
```

## Project Structure

- Components are copied to `src/components/ui/`
- Each component has its own folder with Vue files and index.ts
- Uses Reka UI as the underlying primitive library

## Current Components Available in Project

✅ Accordion, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, Dropdown Menu, Form, Input, Label, Popover, Select, Separator, Table, Tabs, Tooltip

## Missing Components (can be added)

- Alert, Alert Dialog, Calendar, Carousel, Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker, Dialog, Drawer, Hover Card, Menubar, Navigation Menu, Number Field, Pagination, PIN Input, Progress, Radio Group, Resizable, Scroll Area, Sheet, Skeleton, Slider, Sonner, Stepper, Switch, Tags Input, Textarea, Toast, Toggle

## Usage Pattern

```vue
<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Example</CardTitle>
    </CardHeader>
    <CardContent>
      <Button>Click me</Button>
    </CardContent>
  </Card>
</template>
```
