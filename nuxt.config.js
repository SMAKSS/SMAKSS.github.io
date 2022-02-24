export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.WEBSITE_NAME || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'default-description',
        name: 'description',
        content: process.env.WEBSITE_DESCRIPTION || '',
      },
      {
        hid: 'default-keywords',
        name: 'keywords',
        content: process.env.WEBSITE_KEYWORDS || '',
      },
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },
  pwa: {
    manifest: {
      name: 'smakss',
      lang: 'en',
      short_name: 'smakss',
      start_url: '/',
    },
    icon: {
      iconSrc: '/icon.png',
    },
  },
  /*
   ** Customize the progress-bar
   */
  loading: {
    color: '#f7f7f7',
    height: '1px',
  },
  /*
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/i18n.js'],
  /**
   * Localization router
   */
  router: {
    middleware: 'i18n',
  },
  /**
   * Custom routes
   */
  generate: {
    routes: [
      '/',
      '/fa/',
      '/stuff/',
      '/fa/stuff/',
      '/stuff/about/',
      '/fa/stuff/about/',
    ],
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/color-mode',
    '@nuxtjs/svg',
  ],
  styleResources: {
    scss: ['~assets/css/_variables.scss', '~assets/css/_mixins.scss'],
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
    'cookie-universal-nuxt',
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    splitChunks: {
      layouts: true,
    },
    transpile: ['gsap'],
  },
}
