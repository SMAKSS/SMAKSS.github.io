export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.title || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar
   */
  loading: {
    color: '#f7f7f7',
    height: '1px'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/i18n.js'],
  /**
   * Localization router
   */
  router: {
    middleware: 'i18n'
  },
  /**
   * Custom routes
   */
  generate: {
    routes: ['/', '/fa/', '/about/', '/fa/about/']
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/style-resources', '@nuxtjs/color-mode', '@nuxtjs/svg'],
  styleResources: {
    scss: ['~assets/_variables.scss', '~assets/_mixins.scss']
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    splitChunks: {
      layouts: true
    },
    transpile: [
      "gsap"
    ]
  }
}
