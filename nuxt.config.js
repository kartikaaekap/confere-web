
export default {
  env: {
    baseUrl: process.env.BASE_URL
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Confere',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito|Nunito+Sans:300,500,600,700,900|Rubik:300,500,700' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/bootstrap-icons',
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/vue-sweet-alert', ssr: false }
  ],
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  styleResources: {
    scss: ['./assets/scss/_mixins.scss', './assets/scss/_typography.scss', './assets/scss/_variables.scss']
  },
  // axios: { proxy: true },
  // proxy: {
  //   '/api/': {
  //     target: 'http://localhost:8080',
  //     pathRewrite: { '^/api': '' }
  //   }
  // },

  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/schemes/local.html
  */
  // auth: {
  //   cookie: false,
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: 'http://localhost:8080/api/signin', method: 'post', propertyName: 'data.token' }
  //         // user: { url: '/api/current', method: 'get', propertyName: 'data' }
  //       }
  //     }
  //   },
  //   redirect: {
  //     login: '/'
  //   },
  //   rewriteRedirects: false,
  //   resetOnError: true
  // },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
