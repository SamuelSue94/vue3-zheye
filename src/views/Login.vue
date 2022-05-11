<template>
  <div class="container mx-auto">
    <ValidateForm @form-submit="onFormSubmit">
      <ValidateInput
        :rules="rules"
        name="Email"
        v-model:input="emailRef"
        placeholder="请输入email"
        inline
      ></ValidateInput>
      <ValidateInput
        :rules="pwdRule"
        name="密码"
        v-model:input="pwdRef"
        placeholder="请输入密码"
        type="password"
        inline
      ></ValidateInput>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import ValidateInput from "@src/components/ValidateInput.vue"
import ValidateForm from "@src/components/ValidateForm.vue"
import { RuleProp } from "@src/types/rules"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "@src/store"
import { getLogin } from "@src/utils/session"
const router = useRouter()
const store = useStore()
const rules: RuleProp[] = [
  { type: "required", message: "不允许为空" },
  {
    type: "email",
    message: "合法的邮箱",
  },
]
const pwdRule: RuleProp[] = [{ type: "required", message: "不允许为空" }]

const emailRef = ref("")
const pwdRef = ref("")
const onFormSubmit = async (valid: boolean) => {
  if (valid) {
    await store.login(emailRef.value, pwdRef.value)
    if (getLogin()) {
      router.push({
        name: "Index",
      })
    }
  }
}
</script>

<style scoped></style>
