<template>
  <div class="home-page">
    <section class="container mx-auto px-20 mt-8">
      <div class="mx-auto w-60 h-55">
        <Callout
          width="100%"
          height="100%"
          viewBox="0 0 777.80549 639.55194"
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
      <p class="text-center text-3xl font-bold leading-loose mt-2 mb-2">
        随心写作，自由表达
      </p>
      <button
        class="info-btn bg-blue-500 text-white hover:bg-blue-800"
        @click="toCreate"
      >
        开始写文章
      </button>
      <h3 class="mt-12 text-2xl">发现精彩</h3>
      <ColumnList :list="columns" class="mt-10" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Callout from "@src/assets/callout.svg?component"
import ColumnList from "@src/components/ColumnList.vue"
import { useStore } from "@src/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { useRouter } from "vue-router"
const store = useStore()
const router = useRouter()
const { columns } = storeToRefs(store)

onMounted(() => {
  store.fetchColumns()
})

const toCreate = () => router.push("/create")
</script>

<style scoped></style>
