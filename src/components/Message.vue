<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    @enter="startEnter"
    @before-leave="beforeEnter"
  >
    <div
      v-show="visible"
      class="message absolute flex items-center left-1/2 -translate-x-1/2 top-16 z-40 min-w-[385px] px-2 py-1 rounded-sm border shadow-md"
      :class="{
        'bg-red-300 border-red-400 text-red-700': type === 'error',
        'bg-yellow-300 border-yellow-400 text-yellow-600': type === 'warning',
        'bg-green-300 border-green-500 text-green-700': type === 'success',
      }"
    >
      <span class="icon inline-block mr-2">
        <SuccessIcon v-if="isSuccess" />
        <ErrorIcon v-if="isError" />
        <WarningIcon v-if="isWarning" />
      </span>
      <span class="inline-block max-w-lg">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import SuccessIcon from "~icons/clarity/success-standard-line"
import ErrorIcon from "~icons/clarity/error-standard-line"
import WarningIcon from "~icons/clarity/warning-standard-line"
import { onMounted, ref, getCurrentInstance } from "vue"
import emitter from "@src/utils/eventBus"

const props = defineProps<{
  type: "error" | "success" | "warning"
  message: string
  duration?: number
}>()

// const emit = defineEmits(["enter", "beforeLeave"])

const isError = props.type === "error"
const isSuccess = props.type === "success"
const isWarning = props.type === "warning"

const visible = ref(false)

onMounted(() => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, props.duration || 3000)
})

const self = getCurrentInstance()
const startEnter = () => {
  emitter.emit("message-enter", self)
}

const beforeEnter = () => {
  emitter.emit("massage-before-leave", self)
}
</script>

<style scoped></style>
