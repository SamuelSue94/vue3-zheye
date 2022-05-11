<script setup lang="ts">
import { FORM_ITEM_CREATED } from "@src/constants/events"
import { ValidateFunc } from "@src/types/rules"
import emitter from "@src/utils/eventBus"
import { onUnmounted } from "vue"
const emit = defineEmits<{
  (event: "form-submit", valid: boolean): void
}>()
const funcArr = new Set<ValidateFunc>()
const callBack = (validateFunc: ValidateFunc) => {
  funcArr.add(validateFunc)
}
emitter.on(FORM_ITEM_CREATED, callBack)
onUnmounted(() => {
  emitter.off(FORM_ITEM_CREATED, callBack)
})

const submitForm = () => {
  let flag = true
  for (const func of funcArr) {
    if (!func()) flag = false
  }
  emit("form-submit", flag)
}
</script>

<template>
  <form>
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent.stop="submitForm">
      <slot name="submit">
        <button
          type="submit"
          class="info-btn hover:bg-blue-500 hover:text-white"
        >
          提交
        </button>
      </slot>
    </div>
  </form>
</template>

<style scoped></style>
