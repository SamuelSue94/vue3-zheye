<template>
  <ul class="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
    <li
      v-for="column in columnList"
      :key="column._id"
      class="shadow-lg border-solid-common p-8 flex flex-col items-center"
    >
      <img
        :src="column.avatar && column.avatar.url"
        :alt="column.title"
        class="rounded-full object-contain w-20 h-20 shadow-2xl"
      />
      <h5 class="font-semibold text-xl text-center py-4">{{ column.title }}</h5>
      <p class="mb-4">{{ column.description }}</p>
      <router-link
        :to="`/column/${column._id}`"
        class="info-btn px-4 py-1 hover:text-white hover:bg-blue-400"
        >进入专栏</router-link
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ColumnProps } from "@src/types/column"
import { computed } from "vue"
import avatarURL from "@src/assets/avatar.jpg"

const props = defineProps<{
  list: ColumnProps[]
}>()

const columnList = computed(() =>
  props.list.map((item) => ({
    avatar: {
      url: avatarURL,
    },
    ...item,
  }))
)
</script>

<style scoped></style>
