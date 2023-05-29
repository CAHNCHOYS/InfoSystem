// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
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
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
  ],
  runtimeConfig: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_DATABASE,
    APP_LINK: process.env.APP_LINK,
    EMAIL_PASS: process.env.EMAIL_PASS,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_VERIFYACC_KEY: process.env.JWT_VERIFYACC_KEY,
    //infosystem2023
    // emailPass: "kickmeinback",
    public: {
      images: "http://localhost:3000/Images",
    },
  },
});
