<template>
  <div class="uploader w-[100%]" @click.stop="triggerSelectFile">
    <div class="upload-container" v-bind="$attrs">
      <slot name="loading" v-if="fileStatus === 'loading'">
        <button class="info-btn disabled" disabled>正在上传...</button>
      </slot>
      <slot name="uploaded" v-else-if="fileStatus === 'success'">
        <button class="info-btn">上传成功</button>
      </slot>
      <slot name="default" v-else>
        <button class="info-btn">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="hidden"
      ref="fileInputRef"
      :accept="fileType"
      @change="onFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import { CheckFunc, UploadStatus } from "@src/types/uploader"
import axios from "@src/utils/request"
export default defineComponent({
  name: "Uploader",
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunc>,
    },
    fileType: {
      type: String,
      default: "image/*",
    },
    // 上传完成后回显的数据
    uploaded: {
      type: Object,
    },
  },
  emits: ["file-uploaded", "error"],
  setup(props, context) {
    const fileInputRef = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>(props.uploaded ? "success" : "ready")
    const uploadedData = ref(props.uploaded)
    const triggerSelectFile = () => {
      if (fileInputRef.value) {
        fileInputRef.value.click()
      }
    }
    const onFileChange = (evt: Event) => {
      const currentTarget = evt.target as HTMLInputElement
      if (currentTarget.files) {
        const [file] = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(file)
          if (!result) return
        }
        fileStatus.value = "loading"
        const formData = new FormData()
        formData.append("file", file)
        axios
          .post(props.action, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp) => {
            fileStatus.value = "success"
            uploadedData.value = resp.data
            context.emit("file-uploaded", resp.data)
          })
          .catch((err) => {
            console.log(err)
            fileStatus.value = "error"
            context.emit("error", err)
          })
          .finally(() => {
            if (fileInputRef.value) {
              fileInputRef.value.value = ""
            }
          })
      }
    }

    watch(
      () => props.uploaded,
      (newVal) => {
        if (newVal) {
          fileStatus.value = "success"
          uploadedData.value = newVal
        }
      }
    )

    return {
      fileInputRef,
      fileStatus,
      triggerSelectFile,
      onFileChange,
    }
  },
})
</script>

<style scoped></style>
