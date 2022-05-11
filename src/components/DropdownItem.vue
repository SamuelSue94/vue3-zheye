<template>
  <li
    class="text-black leading-8 select-none text-left indent-4"
    :class="{ disabled: disabled, 'hover:bg-slate-100': !disabled }"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped></style>
