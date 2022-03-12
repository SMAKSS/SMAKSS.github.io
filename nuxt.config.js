export default {
  target: 'static',
  srcDir: 'src/',
  head: {
    title: 'smakss',
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#158876'},
      {rel: 'manifest', href: '/site.webmanifest', hid: 'manifest'},
    ],
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#091a28',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        hid: 'default-description',
        name: 'description',
        content:
          "Hi there, I'm MAKSS a Software Engineer: Frontend, who seeks to move mankind one step forward. I will try to share my personal insights here.",
      },
      {
        hid: 'default-keywords',
        name: 'keywords',
        content:
          'smakss, seyed mohammad ali kazemi, mohammad ali kazemi, mohammad ali, makss, seyed mohammad ali kazemi sheykh shabani, sheykh shabani, محمدعلی, محمد علی, سیدمحمدعلی, سید محمد علی, سیدمحمدعلی کاظمی شیخ شبانی, شیخ شبانی, کاظمی شیخ شبانی, کاظمی, مکس, اسمکس',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        name: 'og:image',
        content: '/icon.png',
      },
      {
        hid: 'og-type',
        property: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og-title',
        property: 'og:title',
        name: 'og:title',
        content: 'smakss',
      },
      {
        hid: 'og-desc',
        property: 'og:description',
        name: 'og:description',
        content:
          "Hi there, I'm MAKSS a Software Engineer: Frontend, who seeks to move mankind one step forward. I will try to share my personal insights here.",
      },
      {
        hid: 'og-url',
        property: 'og:url',
        name: 'og:url',
        content: 'https://smakss.github.io',
      },
      {
        hid: 't-type',
        name: 'twitter:card',
        property: 'twitter:card',
        content: '/icon.png',
      },
    ],
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
  publicRuntimeConfig: {
    title: process.env.WEBSITE_NAME,
    description: process.env.WEBSITE_DESCRIPTION,
    keywords: process.env.WEBSITE_KEYWORDS,
    name: process.env.WEBSITE_NAME,
    baseURL: process.env.BASE_URL,
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID,
    },
  },
  gtm: {
    id: 'GTM-TZDDHD4', // Used as fallback if no runtime config is provided
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
  plugins: ['~/plugins/i18n.js', '~/plugins/constants.js'],
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
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    '@nuxtjs/gtm',
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
