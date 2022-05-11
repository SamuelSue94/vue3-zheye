<template>
  <textarea cols="30" rows="10" ref="textareaRef"></textarea>
</template>

<script setup lang="ts">
import EasyMDE, { Options } from "easymde"
import { ref, onMounted, onUnmounted, watch } from "vue"

type EditorProps = {
  modelValue?: string
  options?: Options
}

interface EditorEvents {
  (type: "update:modelValue", value: string): void
  (type: "change", value: string): void
  (type: "blur"): void
}

const props = defineProps<EditorProps>()
const emit = defineEmits<EditorEvents>()

const textareaRef = ref<HTMLElement | null>(null)
const inputVal = ref(props.modelValue || "")

let editorInstance: EasyMDE | null = null
watch(
  () => props.modelValue,
  (newValue) => {
    if (editorInstance) {
      if (newValue !== inputVal.value) {
        editorInstance.value(newValue || "")
      }
    }
  }
)
onMounted(() => {
  if (textareaRef.value) {
    editorInstance = new EasyMDE({
      element: textareaRef.value,
      initialValue: inputVal.value,
      ...(props.options || {}),
    })
    // Event
    editorInstance.codemirror.on("change", () => {
      if (editorInstance) {
        const newVal = editorInstance.value()
        inputVal.value = newVal
        emit("update:modelValue", newVal)
        emit("change", newVal)
      }
    })
    editorInstance.codemirror.on("blur", () => {
      if (editorInstance) {
        emit("blur")
      }
    })
  }
})
onUnmounted(() => {
  if (editorInstance) {
    editorInstance.toTextArea()
    editorInstance = null
  }
})

const clear = () => {
  if (editorInstance) {
    editorInstance.value("")
  }
}
const getInstance = () => editorInstance

type clearFn = typeof clear
type getInstanceFn = typeof getInstance

defineExpose<{
  clear: clearFn
  getInstance: getInstanceFn
}>({
  clear,
  getInstance,
})
</script>

<style scoped></style>
