<template>
  <div class="container md:mx-8" v-if="post">
    <div class="h-96 overflow-hidden">
      <img :src="post.image?.url" :alt="post.title" class="object-cover" />
    </div>
    <h1 class="text-left text-2xl leading-loose font-bold my-4">
      {{ post.title }}
    </h1>
    <section class="flex justify-between border-y py-3 items-center">
      <div class="user flex">
        <img
          class="w-16 h-16 border p-1 rounded-full"
          :src="post.author.avatar.url"
          :alt="post.author.nickName"
        />
        <div class="inline-box text-left ml-3">
          <h3 class="text-lg font-semibold leading-relaxed">
            {{ post.author.nickName }}
          </h3>
          <p class="text-gray-500">
            {{ post.author.description || "此人太酷， 暂无简介~" }}
          </p>
        </div>
      </div>
      <span class="time font-normal italic text-gray-600">{{
        computedTimeStr
      }}</span>
    </section>
    <article class="unreset text-left mt-5" v-html="renderContent"></article>
    <div class="user-opt" v-if="showUserOpt">
      <router-link
        :to="{
          name: 'CreatePost',
          query: { id: post._id },
        }"
      >
        <button class="info-btn mr-6 hover:bg-blue-600 hover:text-white">
          编辑
        </button>
      </router-link>
      <button
        class="info-btn bg-red-500 text-white border-red-400 hover:border-red-600 hover:bg-white hover:text-red-700"
        @click="ensureDel"
      >
        删除
      </button>
    </div>
    <Modal v-model:visible="visibleRef" @ok="onDel">
      <template #header>删除文章</template>
      <template #content>确认删除？</template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "@src/components/Modal.vue"
import { PostResp } from "@src/types/column"
import axios from "@src/utils/request"
import { computed, ref } from "vue"
import { useRoute } from "vue-router"
import avatarURL from "@src/assets/avatar.jpg"
import { formatDate, renderMD } from "@src/utils/func"
import { useStore } from "@src/store"
import router from "@src/router"
import { createMessage } from "@src/components/message"

const route = useRoute()
const store = useStore()
const postId = `${route.params.id}`
const post = ref<PostResp | null>(null)
const visibleRef = ref(false)

axios.get(`/posts/${postId}`).then((resp) => {
  const data = resp.data as PostResp
  data.author.avatar = data.author.avatar || {
    url: avatarURL,
  }
  post.value = data
})

const computedTimeStr = computed(() => {
  if (post.value) {
    return post.value.updatedAt
      ? "更新于: " + formatDate(post.value.updatedAt)
      : "发表于: " + formatDate(post.value.createdAt)
  }
  return ""
})

const renderContent = computed(() => {
  if (post.value?.isHTML) {
    return post.value.content
  } else {
    return renderMD(post.value?.content || "")
  }
})

const showUserOpt = computed(() => {
  return store.user.isLogin && post.value?.author._id === store.user._id
})

const ensureDel = () => {
  visibleRef.value = true
}

const onDel = () => {
  axios.delete(`/posts/${postId}`).then(() => {
    createMessage("success", "删除成功，2秒后跳转首页", 2000)
    setTimeout(() => {
      router.push("/")
    }, 2000)
  })
}
</script>

<style scoped></style>
