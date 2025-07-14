<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostStore } from '../stores/post.store'
import { storeToRefs } from 'pinia'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MoreHorizontal,
  ArrowUpDown,
  PlusCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Check,
  X,
} from 'lucide-vue-next'
import { format } from 'date-fns'

const postStore = usePostStore()
const { posts, loading, error, totalRecords } = storeToRefs(postStore)

onMounted(() => {
  postStore.fetchPosts()
})

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMM dd, yyyy')
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Posts</h1>
      <div class="flex items-center gap-4">
        <div class="relative w-72">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search posts..." class="pl-10" />
        </div>
        <Button>
          <PlusCircle class="mr-2 size-4" />
          Add
        </Button>
      </div>
    </div>

    <div class="border rounded-lg bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-12 px-4"><Checkbox /></TableHead>
            <TableHead class="w-[40%]">
              <button class="flex items-center gap-2 font-medium">
                Post <ArrowUpDown class="size-3 text-muted-foreground" />
              </button>
            </TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead class="text-right pr-4">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="loading">
            <TableRow>
              <TableCell :colspan="6" class="h-24 text-center">Loading...</TableCell>
            </TableRow>
          </template>
          <template v-else-if="error">
            <TableRow>
              <TableCell :colspan="6" class="h-24 text-center text-red-500">{{ error }}</TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow v-for="post in posts" :key="post.id" class="hover:bg-muted/50">
              <TableCell class="px-4"><Checkbox /></TableCell>
              <TableCell class="font-medium">
                <div class="flex items-center gap-4">
                  <Avatar class="size-10 rounded-md">
                    <AvatarImage :src="post.author.avatar_url!" :alt="post.author.name" />
                    <AvatarFallback class="rounded-md">{{
                      post.author.name.charAt(0)
                    }}</AvatarFallback>
                  </Avatar>
                  <span>{{ post.title }}</span>
                </div>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ post.author.name }}</TableCell>
              <TableCell>
                <div class="flex justify-center">
                  <Check v-if="post.status === 'published'" class="size-4 text-green-500" />
                  <X v-else class="size-4 text-red-500" />
                </div>
              </TableCell>
              <TableCell class="text-muted-foreground">{{ formatDate(post.created_at) }}</TableCell>
              <TableCell class="text-right pr-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button variant="ghost" size="icon" class="rounded-full size-8">
                        <MoreHorizontal class="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-between text-sm text-muted-foreground px-2">
      <div class="flex items-center gap-2">
        <span>Items per page:</span>
        <Select default-value="10">
          <SelectTrigger class="w-20 h-8">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex items-center gap-6">
        <span>1–10 of {{ totalRecords }}</span>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon" class="size-8"
            ><ChevronsLeft class="size-4"
          /></Button>
          <Button variant="outline" size="icon" class="size-8"
            ><ChevronLeft class="size-4"
          /></Button>
          <Button variant="outline" size="icon" class="size-8"
            ><ChevronRight class="size-4"
          /></Button>
          <Button variant="outline" size="icon" class="size-8"
            ><ChevronsRight class="size-4"
          /></Button>
        </div>
      </div>
    </div>
  </div>
</template>
