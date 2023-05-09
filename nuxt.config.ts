// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },
  plugins: ["~/plugins/vuetify/index.ts"],

  modules: [
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
      },
    ],
  ],
  runtimeConfig: {
    public: {
      images: "http://localhost:3000/Images",
    },
  },
});
