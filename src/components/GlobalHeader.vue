<template>
  <nav
    class="sticky left-0 top-0 flex justify-between items-center px-9 bg-blue-500 text-white h-12"
  >
    <router-link to="/" class="text-lg font-semibold">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="inline-flex">
      <li class="info-btn-plain mr-3">
        <router-link :to="{ name: 'Login' }">登录</router-link>
      </li>
      <li class="info-btn-plain text-red-500">
        <router-link to="/register">注册</router-link>
      </li>
    </ul>
    <ul v-else>
      <li class="max-w-[250px]">
        <Dropdown :title="`你好! ${user.nickName}`">
          <DropdownItem>
            <router-link :to="`/create`">新建文章</router-link>
          </DropdownItem>
          <DropdownItem>
            <router-link :to="`/column/${user.column}`">我的专栏</router-link>
          </DropdownItem>
          <DropdownItem @click.prevent="logout">退出</DropdownItem>
          <DropdownItem :disabled="true">测试3</DropdownItem>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { UserProps } from "@src/types/user"
import Dropdown from "@src/components/Dropdown.vue"
import DropdownItem from "@src/components/DropdownItem.vue"
import { useStore } from "@src/store"

const store = useStore()
defineProps<{
  user: UserProps
}>()
const logout = () => {
  store.logout()
}
</script>

<style scoped></style>
