<template>
  <div class="my-5">
    <label
      class="text-lg leading-10"
      :class="[
        inline
          ? 'grid grid-cols-[minmax(100px,max-content)_1fr]'
          : 'block text-left px-3',
      ]"
    >
      <span class="form-label">
        {{ name }}
      </span>
      <div class="flex-1 text-left box-border" :class="inline ? 'mx-3' : ''">
        <textarea
          v-if="type === 'textarea'"
          cols="30"
          rows="10"
          class="border w-[100%] outline-none leading-10 rounded-md"
          :class="[
            inputRef.error
              ? 'border-red-600 focus:border-red-600 text-red-600'
              : '',
          ]"
          v-model="inputRef.val"
          @blur="validateInput"
          v-bind="$attrs"
        ></textarea>
        <input
          v-else
          class="border w-[100%] indent-1 outline-none leading-10 rounded-md"
          :class="[
            inputRef.error
              ? 'border-red-600 focus:border-red-600 text-red-600'
              : '',
          ]"
          :type="type === 'password' ? 'password' : 'text'"
          v-model="inputRef.val"
          @blur="validateInput"
          v-bind="$attrs"
        />
        <p class="text-red-600 text-sm" v-if="inputRef.error">
          {{ inputRef.message }}
        </p>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { RuleProp } from "@src/types/rules"
import { onMounted, reactive, watch } from "vue"
import { email, notNull } from "@src/utils/regex"
import emitter from "@src/utils/eventBus"
import { FORM_ITEM_CREATED } from "@src/constants/events"
const props = defineProps<{
  rules?: RuleProp[]
  name: string
  inline?: boolean
  input: string
  type?: "input" | "textarea" | string
}>()
const emit = defineEmits(["update:input"])
const inputRef = reactive({
  val: props.input || "",
  error: false,
  message: "123123",
})

const validateInput = () => {
  if (props.rules) {
    const validStr = inputRef.val.trim()
    const allPass = props.rules.every((rule) => {
      inputRef.message = rule.message
      let passed = true
      switch (rule.type) {
        case "required":
          passed = !!validStr.match(notNull)
          break
        case "email":
          passed = !!validStr.match(email)
          break
        case "custom":
          passed = !!rule?.validator?.(validStr) && true
        default:
          break
      }
      return passed
    })
    inputRef.error = !allPass
    return allPass
  }
  return true
}
watch(
  () => inputRef.val,
  () => {
    emit("update:input", inputRef.val)
  }
)
watch(
  () => props.input,
  () => {
    inputRef.val = props.input
  }
)

onMounted(() => {
  emitter.emit(FORM_ITEM_CREATED, validateInput)
})
</script>
<style scoped></style>
