# Missing Components (Can be Added)

## Alert ❌

**Add Command**: `bunx --bun shadcn-vue@latest add alert`
**Usage**: Status messages and notifications

```vue
<Alert>
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>
```

## Alert Dialog ❌

**Add Command**: `bunx --bun shadcn-vue@latest add alert-dialog`
**Usage**: Modal confirmations

```vue
<AlertDialog>
  <AlertDialogTrigger>
    <Button>Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Calendar ❌

**Add Command**: `bunx --bun shadcn-vue@latest add calendar`
**Usage**: Date picker calendar

```vue
<Calendar v-model="date" />
```

## Carousel ❌

**Add Command**: `bunx --bun shadcn-vue@latest add carousel`
**Usage**: Image/content sliders

```vue
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Collapsible ❌

**Add Command**: `bunx --bun shadcn-vue@latest add collapsible`
**Usage**: Expandable/collapsible content

```vue
<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>
```

## Combobox ❌

**Add Command**: `bunx --bun shadcn-vue@latest add combobox`
**Usage**: Searchable select dropdown

```vue
<Combobox v-model="selected" :options="options" />
```

## Command ❌

**Add Command**: `bunx --bun shadcn-vue@latest add command`
**Usage**: Command palette/search

```vue
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandItem>Item 1</CommandItem>
    <CommandItem>Item 2</CommandItem>
  </CommandList>
</Command>
```

## Context Menu ❌

**Add Command**: `bunx --bun shadcn-vue@latest add context-menu`
**Usage**: Right-click menus

```vue
<ContextMenu>
  <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Data Table ❌

**Add Command**: `bunx --bun shadcn-vue@latest add data-table`
**Usage**: Advanced data tables with sorting/filtering

```vue
<DataTable :columns="columns" :data="data" />
```

## Date Picker ❌

**Add Command**: `bunx --bun shadcn-vue@latest add date-picker`
**Usage**: Date selection input

```vue
<DatePicker v-model="date" />
```

## Dialog ❌

**Add Command**: `bunx --bun shadcn-vue@latest add dialog`
**Usage**: Modal dialogs

```vue
<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <DialogDescription>Dialog content</DialogDescription>
    <DialogFooter>
      <Button>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Drawer ❌

**Add Command**: `bunx --bun shadcn-vue@latest add drawer`
**Usage**: Side panels/drawers

```vue
<Drawer>
  <DrawerTrigger>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
    </DrawerHeader>
    Drawer content
  </DrawerContent>
</Drawer>
```

## Hover Card ❌

**Add Command**: `bunx --bun shadcn-vue@latest add hover-card`
**Usage**: Rich hover previews

```vue
<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Rich content</HoverCardContent>
</HoverCard>
```

## Menubar ❌

**Add Command**: `bunx --bun shadcn-vue@latest add menubar`
**Usage**: Application menu bars

```vue
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Navigation Menu ❌

**Add Command**: `bunx --bun shadcn-vue@latest add navigation-menu`
**Usage**: Complex navigation menus

```vue
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Product 1</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Progress ❌

**Add Command**: `bunx --bun shadcn-vue@latest add progress`
**Usage**: Progress indicators

```vue
<Progress :value="progress" />
```

## Radio Group ❌

**Add Command**: `bunx --bun shadcn-vue@latest add radio-group`
**Usage**: Radio button groups

```vue
<RadioGroup v-model="selected">
  <RadioGroupItem value="option1">Option 1</RadioGroupItem>
  <RadioGroupItem value="option2">Option 2</RadioGroupItem>
</RadioGroup>
```

## Sheet ❌

**Add Command**: `bunx --bun shadcn-vue@latest add sheet`
**Usage**: Slide-out panels

```vue
<Sheet>
  <SheetTrigger>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
    </SheetHeader>
    Sheet content
  </SheetContent>
</Sheet>
```

## Skeleton ❌

**Add Command**: `bunx --bun shadcn-vue@latest add skeleton`
**Usage**: Loading placeholders

```vue
<Skeleton class="w-full h-4" />
```

## Slider ❌

**Add Command**: `bunx --bun shadcn-vue@latest add slider`
**Usage**: Range sliders

```vue
<Slider v-model="value" :min="0" :max="100" />
```

## Switch ❌

**Add Command**: `bunx --bun shadcn-vue@latest add switch`
**Usage**: Toggle switches

```vue
<Switch v-model="enabled" />
```

## Textarea ❌

**Add Command**: `bunx --bun shadcn-vue@latest add textarea`
**Usage**: Multi-line text input

```vue
<Textarea v-model="content" placeholder="Enter text..." />
```

## Toast ❌

**Add Command**: `bunx --bun shadcn-vue@latest add toast`
**Usage**: Notification toasts

```vue
<Toast>
  <ToastTitle>Success</ToastTitle>
  <ToastDescription>Data saved successfully</ToastDescription>
</Toast>
```

## Toggle ❌

**Add Command**: `bunx --bun shadcn-vue@latest add toggle`
**Usage**: Toggle buttons

```vue
<Toggle v-model="pressed">
  <Bold />
</Toggle>
```
