import { PostProps } from "./../types/column"
import { UserProps } from "./../types/user"
import { createPinia, defineStore } from "pinia"
import { ColumnProps } from "@src/types/column"
import { sortByDateNew } from "@src/utils/func"
import { clamp } from "ramda"

import axios from "@src/utils/request"
import { getLogin, clearLogin, saveLogin } from "@src/utils/session"
import { GlobalErrorProps } from "@src/types/error"

const piniaInstance = createPinia()
export default piniaInstance

export const useStore = defineStore("all", {
  state: () => ({
    user: {
      isLogin: false,
    } as UserProps,
    columns: [] as ColumnProps[],
    posts: [] as PostProps[],
    requestCount: 0,
    error: {
      status: false,
    } as GlobalErrorProps,
  }),
  getters: {
    sortedPosts: (state) => sortByDateNew(state.posts),
    loading: (state) => state.requestCount > 0,
  },
  actions: {
    createPost(newPost: PostProps) {
      this.posts.push(newPost)
    },
    fetchColumns() {
      axios.get<{ list: ColumnProps[] }>("/columns").then((resp) => {
        this.columns = resp.data.list
      })
    },
    fetchPostsByColumnId(columnId: string) {
      axios
        .get<{ list: PostProps[] }>(`/columns/${columnId}/posts`)
        .then((resp) => {
          this.posts = resp.data.list
        })
    },
    addRequest() {
      this.requestCount++
    },
    minusRequest(count: number = 1) {
      this.requestCount = clamp(0, 999)(this.requestCount - count)
    },
    checkLogin() {
      if (getLogin() && !this.user.isLogin) {
        return axios
          .get<UserProps>("/user/current")
          .then(({ data }) => {
            if (data) {
              this.$patch({
                user: { ...data, isLogin: true },
              })
            }
          })
          .catch(() => {
            this.logout()
          })
      }
    },
    async login(email: string, password: string) {
      try {
        const { data } = await axios.post<{
          token: string
        }>("/user/login", {
          email,
          password,
        })
        if (data.token) {
          saveLogin(data.token)
          this.checkLogin()
        }
      } catch (error) {}
    },
    setError(e: GlobalErrorProps) {
      this.$patch((state) => {
        state.error = e
      })
    },
    logout() {
      clearLogin()
      this.$patch({
        user: { isLogin: false },
      })
    },
  },
})
