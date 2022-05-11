<template>
  <teleport to="body">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="mask" v-if="visible">
        <div
          v-if="visible"
          class="modal inline-block min-w-[300px] absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border rounded shadow-lg"
        >
          <div
            class="modal-header flex items-center justify-between px-2 py-2 border-b text-gray-600"
          >
            <slot name="header">测试内容</slot>
            <CancelIcon
              class="h-[100%] cursor-pointer"
              @click.stop="defaultClose"
            />
          </div>
          <div class="modal-content px-2 py-3 text-gray-600">
            <slot name="content"> 测试内容 </slot>
          </div>
          <div class="modal-footer px-2 border-t bg-gray-50 text-right py-2">
            <slot name="footer">
              <button
                class="info-btn mr-4 hover:bg-blue-400 hover:text-white"
                @click="emit('ok')"
              >
                确定
              </button>
              <button
                class="info-btn hover:bg-blue-400 hover:text-white"
                @click.stop="defaultClose"
              >
                取消
              </button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { useDOMCreate } from "@src/hooks/dom"
import CancelIcon from "~icons/iconoir/cancel"

const emit = defineEmits(["close", "ok", "update:visible"])
defineProps<{
  visible: boolean
}>()

useDOMCreate("modal")
const defaultClose = () => {
  emit("update:visible", false)
  emit("close")
}
</script>

<style scoped>
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 500ms;
}
</style>
