# Available Components in Project

## Accordion ✅
**Path**: `@/components/ui/accordion`
**Usage**: Collapsible content sections
```vue
<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Auto Form ✅
**Path**: `@/components/ui/auto-form`
**Usage**: Automatically generated forms
```vue
<AutoForm :schema="schema" @submit="onSubmit" />
```

## Avatar ✅
**Path**: `@/components/ui/avatar`
**Usage**: User profile images with fallback
```vue
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

## Badge ✅
**Path**: `@/components/ui/badge`
**Usage**: Small status indicators
```vue
<Badge variant="default">New</Badge>
<Badge variant="secondary">Active</Badge>
<Badge variant="destructive">Error</Badge>
```

## Breadcrumb ✅
**Path**: `@/components/ui/breadcrumb`
**Usage**: Navigation breadcrumbs
```vue
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Button ✅
**Path**: `@/components/ui/button`
**Usage**: Clickable buttons with variants
```vue
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

## Card ✅
**Path**: `@/components/ui/card`
**Usage**: Content containers
```vue
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <CardAction>Action</CardAction>
  </CardFooter>
</Card>
```

## Checkbox ✅
**Path**: `@/components/ui/checkbox`
**Usage**: Binary input control
```vue
<Checkbox v-model="checked" />
```

## Dropdown Menu ✅
**Path**: `@/components/ui/dropdown-menu`
**Usage**: Contextual menus with submenus
```vue
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub Item</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

## Form ✅
**Path**: `@/components/ui/form`
**Usage**: Form field components
```vue
<FormItem>
  <FormLabel>Label</FormLabel>
  <FormControl>
    <Input />
  </FormControl>
  <FormDescription>Help text</FormDescription>
  <FormMessage />
</FormItem>
```

## Input ✅
**Path**: `@/components/ui/input`
**Usage**: Text input fields
```vue
<Input v-model="value" placeholder="Enter text" />
```

## Label ✅
**Path**: `@/components/ui/label`
**Usage**: Form labels
```vue
<Label for="input">Label text</Label>
```

## Popover ✅
**Path**: `@/components/ui/popover`
**Usage**: Floating content
```vue
<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>
```

## Select ✅
**Path**: `@/components/ui/select`
**Usage**: Dropdown selection
```vue
<Select v-model="selected">
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

## Separator ✅
**Path**: `@/components/ui/separator`
**Usage**: Visual dividers
```vue
<Separator />
<Separator orientation="vertical" />
```

## Table ✅
**Path**: `@/components/ui/table`
**Usage**: Data tables
```vue
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Tabs ✅
**Path**: `@/components/ui/tabs`
**Usage**: Tabbed content
```vue
<Tabs default-value="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>
```

## Tooltip ✅
**Path**: `@/components/ui/tooltip`
**Usage**: Hover information
```vue
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
```