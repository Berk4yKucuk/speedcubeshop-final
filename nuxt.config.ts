// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Pinia Modülü
  modules: ['@pinia/nuxt'],

  // Global CSS (Henüz dosya yok ama ayarı hazır olsun)
  css: ['~/assets/css/main.scss'],

  // Atomik Yapı Tanımları (Hocanın istediği yapı)
  components: [
    { path: '~/components/organisms', prefix: 'O' },
    { path: '~/components/molecules', prefix: 'M' },
    { path: '~/components/atoms', prefix: 'A' },
    '~/components'
  ],

  // TypeScript Ayarları
  typescript: {
    strict: true,
    typeCheck: true
  }
})