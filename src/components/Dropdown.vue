<template>
  <div class="relative" ref="dropdownRef">
    <a
      href="#"
      @click.prevent="toggleExpand"
      class="info-btn pr-2 text-white border-white hover:bg-white hover:text-blue-500 select-none truncate text-ellipsis"
      >{{ title }}
      <IconUp class="inline-block align-text-top" v-if="expanded" />
      <IconDown class="inline-block align-text-top" v-else />
    </a>
    <transition name="expand">
      <ul
        class="dropdown-area overflow-hidden absolute top-[100%] mt-1 right-0 bg-white text-black w-[100%] rounded-sm border-solid-common py-1"
        :class="expanded ? 'open' : 'close'"
        v-show="expanded"
      >
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useClickOutSide } from "@src/hooks/click"
import { ref, watchEffect } from "vue"
import IconDown from "~icons/carbon/caret-down"
import IconUp from "~icons/carbon/caret-up"

defineProps<{ title: string }>()

const expanded = ref(false)
const toggleExpand = () => {
  expanded.value = !expanded.value
}

const dropdownRef = ref<null | HTMLElement>(null)

const isClickOutside = useClickOutSide(dropdownRef)

watchEffect(() => {
  expanded.value = isClickOutside.value
})
</script>
<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}
.dropdown-area {
  transition: all 0.3s linear;
}
.dropdown-area.close {
  max-height: 0;
  border: none;
  padding: 0;
}
.dropdown-area.open {
  max-height: 500px;
}
</style>
