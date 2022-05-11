import { onMounted, onUnmounted, ref, Ref } from "vue"

export const useClickOutSide = (
  elementRef: Ref<null | HTMLElement>,
) => {
  const isClickOutside = ref(false)
  const handler = (evt:MouseEvent) => {
    if(elementRef.value) {
      if(!elementRef.value.contains(evt.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener("click", handler)
  })
  onUnmounted(() => {
    document.removeEventListener("click", handler)
  })

  return isClickOutside
}
