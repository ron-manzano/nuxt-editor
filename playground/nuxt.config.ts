export default defineNuxtConfig({
  modules: ["../src/module"],
  extends: ['../../ui'],
  css: ['~/assets/css/main.css'],
  // tiptap: {
  //   lowlight: {
  //     theme: "github-dark",
  //   },
  // },
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
});
