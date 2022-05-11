export type UploadStatus = "ready" | "loading" | "success" | "error"
export type CheckFunc = (file: File) => boolean

export type ImageUploadResponse = {
  url: string
  filename?: string
  extname?: string
  _id: string
  createdAt?: string
}
