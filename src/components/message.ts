import { ComponentInternalInstance, createVNode, render, VNode } from "vue"
import Message from "./Message.vue"
import anime from "animejs"
import emitter from "@src/utils/eventBus"

const messageQueue = [] as VNode[]

export const createMessage = (
  type: "error" | "success" | "warning",
  message: string,
  duration?: number
) => {
  let verticalTop = 0
  const container = document.createElement("div")
  const vm = createVNode(Message, { type, message, duration })
  messageQueue.forEach((instance) => {
    verticalTop += (instance.el?.offsetHeight || 0) + 16
  })
  verticalTop += 16
  messageQueue.push(vm)
  render(vm, container)
  if (vm.el) {
    vm.el.style.top = verticalTop + "px"
  }
  document.body.appendChild(container.firstElementChild!)
  const destroy = () => {
    render(null, container)
    const idx = messageQueue.indexOf(vm)
    if (idx > -1) {
      messageQueue.splice(idx, 1)
    }
  }
  const slideDown = (instance: ComponentInternalInstance | null) => {
    if (instance?.vnode === vm) {
      anime({
        targets: vm.el,
        translateX: ["-50%", "-50%"],
        translateY: [-100, 0],
        duration: 250,
        easing: "easeInOutQuad",
        complete: () => {
          emitter.off("message-enter", slideDown)
        },
      })
    }
  }
  const slideUp = (instance: ComponentInternalInstance | null) => {
    if (instance?.vnode === vm) {
      anime({
        targets: vm.el,
        translateX: ["-50%", "-50%"],
        translateY: "-=100",
        duration: 250,
        easing: "easeInOutQuad",
        complete: () => {
          emitter.off("massage-before-leave", slideUp)
          destroy()
        },
      })
      anime({
        targets: "div.message",
        translateX: ["-50%", "-50%"],
        translateY: "-=34",
        duration: 250,
        easing: "easeInOutQuad",
      })
    }
  }
  emitter.on("message-enter", slideDown)
  emitter.on("massage-before-leave", slideUp)
}
