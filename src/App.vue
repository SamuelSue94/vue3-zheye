<script setup lang="ts">
import GlobalHeader from "./components/GlobalHeader.vue"
import { useStore } from "@src/store"
import { storeToRefs } from "pinia"
import Loading from "./components/Loading.vue"

const store = useStore()
const { user } = storeToRefs(store)
</script>

<template>
  <GlobalHeader :user="user" />
  <Loading :loading="store.loading" />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 495px;
}
#loading-target {
  position: fixed;
  z-index: 39;
  left: 50%;
  top: 2rem;
  transform: translateX(-50%);
}
</style>
