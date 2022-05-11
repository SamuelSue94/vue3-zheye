import { useStore } from "./../store/index"
import * as VueRouter from "vue-router"
import { RouteRecordRaw } from "vue-router"
/* import Index from "@src/views/Index.vue"
import Login from "@src/views/Login.vue"
import Register from "@src/views/Register.vue"
import ColumnDetail from "@src/views/ColumnDetail.vue"
import CreatePost from "@src/views/CreatePost.vue"
import Post from "@src/views/Post.vue" */
const Index = () => import("@src/views/Index.vue")
const Login = () => import("@src/views/Login.vue")
const Register = () => import("@src/views/Register.vue")
const ColumnDetail = () => import("@src/views/ColumnDetail.vue")
const CreatePost = () => import("@src/views/CreatePost.vue")
const Post = () => import("@src/views/Post.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/column/:id",
    name: "ColumnDetail",
    component: ColumnDetail,
  },
  {
    path: "/post/:id",
    name: "Post",
    component: Post,
  },
  {
    path: "/create",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requireLogin: true,
    },
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const store = useStore()
  await store.checkLogin()
  if (to.meta.requireLogin && !store.user.isLogin) {
    next({ name: "Login" })
  } else if (to.name === "Login" && store.user.isLogin) {
    next("/")
  } else {
    next()
  }
})

export default router
