// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'WhiteSpace',
      titleTemplate: 'WhiteSpace | %s'
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  typescript: {
    typeCheck: true
  }
})
