import { UserProps } from "./user"
export type AvatarImage = {
  _id: string
  url: string
  createdAt?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: AvatarImage
  description: string
  author: string
}

export type PostProps = {
  _id: string
  title: string
  content?: string
  image?: AvatarImage
  createdAt: string
  column: string
  excerpt?: string
}

export type PostReq = {
  title: string
  content: string
  image: string
  column: string
  author: string
}

export type PostPatchReq = {
  title: string
  content: string
  image: string
}

export interface PostResp extends PostProps {
  updatedAt: string
  author: UserProps & {
    description: string
  }
  isHTML: boolean
}
