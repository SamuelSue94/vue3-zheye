<template>
  <teleport to="#loading-target">
    <transition
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
    >
      <div
        class="text-center relative flex items-center w-36 h-12 rounded-md shadow-sm transition-all"
        :class="loading ? 'bg-blue-100' : 'bg-green-100'"
        v-show="show"
      >
        <transition
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
        >
          <LoadingIcon
            v-if="loading"
            class="text-2xl absolute ml-4 left-0 bg-white text-blue-400 border rounded-full border-blue-300 inline-block"
          />
          <SuccessIcon
            v-else
            class="text-2xl absolute ml-4 left-0 bg-white rounded-full text-green-500 inline-block"
          />
        </transition>
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <span class="text text-blue-600 ml-14 absolute" v-if="loading"
            >Loading...</span
          >
          <span class="text text-green-600 ml-14 absolute" v-else>Loaded!</span>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import LoadingIcon from "~icons/eos-icons/bubble-loading"
import SuccessIcon from "~icons/clarity/success-standard-line"
import { ref, watchEffect } from "vue"
import { useStore } from "@src/store"

const props = defineProps<{
  loading: boolean
}>()

const store = useStore()
const show = ref(props.loading)

watchEffect((onInvalidate) => {
  let timmer: number
  if (store.error.status) {
    show.value = false
  } else if (props.loading) {
    show.value = props.loading
  } else {
    timmer = window.setTimeout(() => {
      show.value = props.loading
    }, 1000)
  }
  onInvalidate(() => clearTimeout(timmer))
})
</script>

<style scoped>
.animate__animated.animate__slideInDown,
.animate__animated.animate__slideOutUp,
.animate__animated.animate__zoomIn,
.animate__animated.animate__zoomOut,
.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 250ms;
}
</style>
