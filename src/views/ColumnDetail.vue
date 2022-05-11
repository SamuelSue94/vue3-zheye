<template>
  <div>
    <section
      class="flex items-center justify-center md:mx-8 lg:mx-36 mt-5 pb-5 border-b-2"
      v-if="column"
    >
      <img
        class="w-36 h-36 rounded-full border"
        :src="column.avatar && column.avatar.url"
        :alt="column.title"
      />
      <div class="flex-1 text-left pl-6">
        <h3 class="text-2xl font-semibold leading-loose">{{ column.title }}</h3>
        <p class="text-gray-400 leading-normal">{{ column.description }}</p>
      </div>
    </section>
    <div v-if="posts">
      <article
        v-for="post in posts"
        class="lg:mx-36 sm:mx-3 border shadow-lg rounded-md p-4 text-left mt-5"
      >
        <h2
          class="text-2xl text-left font-medium leading-10 hover:text-blue-700"
        >
          <router-link :to="`/post/${post._id}`">{{ post.title }}</router-link>
        </h2>
        <div class="flex items-start mt-2 mb-3">
          <img
            class="mr-4 max-w-[260px]"
            v-if="post.image"
            :src="post.image && post.image.url"
            :alt="post.title"
          />
          <p class="flex-1 text-left font-normal leading-relaxed">
            {{ post.excerpt }}
          </p>
        </div>
        <span class="text-gray-400">{{ formatDate(post.createdAt) }}</span>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@src/store"
import { filterPostsByColumnId } from "@src/utils/func"
import { useRoute } from "vue-router"
import { formatDate } from "@src/utils/func"
import { PostProps, ColumnProps } from "@src/types/column"
import { computed, onMounted, ref } from "vue"
import axios from "@src/utils/request"
import avatarURL from "@src/assets/avatar.jpg"
const route = useRoute()
const store = useStore()

const targetColumnId = `${route.params.id}`
// const column = findColumnByColumnId(targetColumnId)(store.columns)
const column = ref<ColumnProps | null>()

onMounted(() => {
  axios.get(`/columns/${targetColumnId}`).then((resp) => {
    column.value = {
      ...resp.data,
      avatar: resp.data.avatar || {
        url: avatarURL,
      },
    }
  })
  store.fetchPostsByColumnId(targetColumnId)
})

const posts = computed(() => {
  return filterPostsByColumnId(targetColumnId)<PostProps, PostProps[]>(
    store.sortedPosts
  )
})
</script>

<style scoped></style>
