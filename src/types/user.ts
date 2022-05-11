import { AvatarImage } from "./column"

export interface UserProps {
  nickName: string
  isLogin: boolean
  _id: string
  column?: string
  avatar: AvatarImage
}
