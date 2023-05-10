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
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_DATABASE,
    public: {
      images: "http://localhost:3000/Images",
    },
  },
});
