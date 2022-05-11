<template>
  <div class="container mx-auto">
    <ValidateForm @form-submit="onFormSubmit">
      <ValidateInput
        name="Email"
        v-model:input="emailRef"
        :rules="emailRules"
        placeholder="请输入email"
      />
      <ValidateInput
        name="昵称"
        v-model:input="nickNameRef"
        placeholder="请输入昵称"
      />
      <ValidateInput
        :rules="pwdRule"
        name="密码"
        v-model:input="pwdRef"
        placeholder="请输入密码"
        type="password"
      ></ValidateInput>
      <ValidateInput
        :rules="repeatPwdRule"
        name="密码"
        v-model:input="repeatpwdRef"
        placeholder="请输入密码"
        type="password"
      ></ValidateInput>
      <template #submit>
        <button
          type="submit"
          class="info-btn px-96 mt-12 hover:bg-blue-500 hover:text-white"
        >
          注册新用户
        </button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { createMessage } from "@src/components/message"
import ValidateForm from "@src/components/ValidateForm.vue"
import ValidateInput from "@src/components/ValidateInput.vue"
import { RuleProp } from "@src/types/rules"
import axios from "@src/utils/request"
import { ref } from "vue"
import { useRouter } from "vue-router"

const emailRef = ref("")
const router = useRouter()
const nickNameRef = ref("")
const pwdRef = ref("")
const repeatpwdRef = ref("")

const emailRules: RuleProp[] = [
  { type: "required", message: "不允许为空" },
  {
    type: "email",
    message: "合法的邮箱",
  },
]
const pwdRule: RuleProp[] = [{ type: "required", message: "不允许为空" }]
const repeatPwdRule: RuleProp[] = [
  { type: "required", message: "不允许为空" },
  {
    type: "custom",
    message: "两次输入密码不一致",
    validator: (val) => {
      return val === pwdRef.value
    },
  },
]

const onFormSubmit = async (valid: boolean) => {
  if (valid) {
    const payload = {
      email: emailRef.value,
      password: pwdRef.value,
      nickName: nickNameRef.value,
    }
    try {
      const data = await axios.post("/users", payload)
      createMessage("success", (data as any).msg)
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } catch (error) {}
  }
}
</script>

<style scoped></style>
