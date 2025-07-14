<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostStore } from '../stores/post.store'
import { storeToRefs } from 'pinia'

const postStore = usePostStore()
const { posts, loading, error } = storeToRefs(postStore)

onMounted(() => {
  postStore.fetchPosts()
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Posts</h1>
    <div v-if="loading">Loading posts...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="p-4 border-b">
        <h2 class="font-semibold text-lg">{{ post.title }}</h2>
        <p class="text-sm text-muted-foreground">By {{ post.author.name }}</p>
        <p class="mt-2">{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>
