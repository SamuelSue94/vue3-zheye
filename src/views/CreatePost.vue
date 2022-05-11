<template>
  <div class="container px-16">
    <h2
      class="text-left text-2xl leading-loose font-bold mt-6"
      v-if="!isEditMode"
    >
      新建文章
    </h2>
    <div class="upload-wrapper px-4">
      <Uploader
        action="/upload"
        :uploaded="uploadedImg"
        @file-uploaded="onUploaded"
        class="bg-gray-50 h-80 overflow-hidden flex items-center justify-center text-gray-500 text-xl"
      >
        <template #default> 请上传头图 </template>
        <template #loading> <LoadingIcon class="mr-4" /> 上传中 </template>
        <template #uploaded>
          <img
            class="w-[100%] h-[100%] object-cover"
            :src="uploadedImg?.url"
            :alt="uploadedImg?.filename"
            v-if="uploadedImg"
          />
        </template>
      </Uploader>
    </div>
    <ValidateForm @form-submit="onSubmit">
      <ValidateInput
        name="文章标题"
        v-model:input="titleRef"
        :rules="titleRules"
      ></ValidateInput>
      <!--       <ValidateInput
        name="文章详情"
        v-model:input="contentRef"
        type="textarea"
        :rules="contentRules"
      ></ValidateInput> -->
      <div
        class="text-left px-3 editor-wrapper"
        :class="editorStatus.isValid ? '' : 'error'"
      >
        <h3 class="form-label text-lg leading-10 text-black">文章详情</h3>
        <Editor
          v-model="contentRef"
          :options="editorOptions"
          ref="editorIntanceRef"
          @blur="checkEditorStatus"
        />
        <p
          class="error-msg text-red-600 text-sm"
          v-show="!editorStatus.isValid"
        >
          {{ editorStatus.message }}
        </p>
      </div>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import ValidateForm from "@src/components/ValidateForm.vue"
import ValidateInput from "@src/components/ValidateInput.vue"
import LoadingIcon from "~icons/eos-icons/bubble-loading"

import Uploader from "@src/components/Uploader.vue"
import { useStore } from "@src/store"
import { PostPatchReq, PostReq, PostResp } from "@src/types/column"
import { RuleProp } from "@src/types/rules"
import { onMounted, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ImageUploadResponse } from "@src/types/uploader"
import axios from "@src/utils/request"
import Editor from "@src/components/Editor.vue"
import EasyMDE, { Options } from "easymde"

type EditorExpose = {
  clear: () => void
  getInstance: () => EasyMDE | null
}

const route = useRoute()
const router = useRouter()
const store = useStore()

const editPostId = route.query.id
const isEditMode = !!editPostId
const editorOptions: Options = {
  spellChecker: false,
}

const editorIntanceRef = ref<EditorExpose | null>(null)
const editorStatus = reactive({
  isValid: true,
  message: "",
})
const checkEditorStatus = () => {
  if (contentRef.value.trim() === "") {
    editorStatus.isValid = false
    editorStatus.message = "文章内容不能为空"
  } else {
    editorStatus.isValid = true
    editorStatus.message = ""
  }
}
const titleRef = ref("")
const contentRef = ref("")
const uploadedImg = ref<ImageUploadResponse | undefined>(undefined)

onMounted(() => {
  if (isEditMode) {
    axios.get(`/posts/${editPostId}`).then((resp) => {
      const data = resp.data as PostResp
      uploadedImg.value = data.image
      titleRef.value = data.title
      contentRef.value = data.content!
    })
  }
})

const titleRules: RuleProp[] = [
  {
    type: "required",
    message: "文章标题不能为空",
  },
]

/* const contentRules: RuleProp[] = [
  {
    type: "required",
    message: "文章内容不能为空",
  },
] */

const onUploaded = (imageData: ImageUploadResponse) => {
  uploadedImg.value = imageData
}

const onSubmit = (valid: boolean) => {
  checkEditorStatus()
  if (valid && editorStatus.isValid) {
    const { column, _id } = store.user
    if (column) {
      if (!isEditMode) {
        const newPost: PostReq = {
          title: titleRef.value,
          author: _id,
          content: contentRef.value,
          column: column,
          image: uploadedImg.value?._id || "",
        }
        axios.post("/posts", newPost).then(() => {
          router.push({
            name: "ColumnDetail",
            params: {
              id: column,
            },
          })
        })
      } else {
        const patchPost: PostPatchReq = {
          content: contentRef.value,
          title: titleRef.value,
          image: uploadedImg.value?._id || "",
        }
        axios.patch(`/posts/${editPostId}`, patchPost).then(() => {
          router.push(`/post/${editPostId}`)
        })
      }
    }
  }
}
</script>

<style scoped>
:deep() .form-label {
  @apply font-medium;
}
.editor-wrapper.error :deep() .CodeMirror {
  @apply border-red-500 border;
}
</style>
