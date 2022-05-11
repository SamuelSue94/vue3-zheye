import { ValidateFunc } from "./../types/rules"
import { FORM_ITEM_CREATED } from "@src/constants/events"
import mitt from "mitt"
import { ComponentInternalInstance } from "vue"
const emitter = mitt<{
  [FORM_ITEM_CREATED]: ValidateFunc
  "message-enter": ComponentInternalInstance | null
  "massage-before-leave": ComponentInternalInstance | null
}>()

export default emitter
