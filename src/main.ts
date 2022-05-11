import { createApp } from "vue"
import App from "./App.vue"
import "../index.css"
import "../unreset.scss"
import "easymde/dist/easymde.min.css"
import "animate.css"
import router from "./router"
import piniaInstance from "./store"

const app = createApp(App)
app.use(router)
app.use(piniaInstance)
app.mount("#app")
