import { createMessage } from "./../components/message"
import { getLogin } from "./session"
import { useStore } from "./../store/index"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://apis.imooc.com/api",
})

axiosInstance.interceptors.request.use((config) => {
  const store = useStore()
  store.addRequest()
  const token = getLogin()
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  config.params = { ...config.params, icode: import.meta.env.VITE_ICODE }
  if (config.data instanceof FormData) {
    config.data.append("icode", import.meta.env.VITE_ICODE)
  } else {
    config.data = { ...config.data, icode: import.meta.env.VITE_ICODE }
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    const store = useStore()
    store.minusRequest()
    const data = response.data
    if (data) return data
    return response
  },
  (err) => {
    const store = useStore()
    store.setError({
      status: true,
      message: err.response?.data?.error || "Server Error",
    })
    createMessage("error", store.error.message || "")
    store.minusRequest()
    return Promise.reject(err)
  }
)

export default axiosInstance
