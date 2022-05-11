/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import Icons from "unplugin-icons/vite"
import svgLoader from "vite-svg-loader"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), Icons({ compiler: "vue3", autoInstall: true })],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  }
})
