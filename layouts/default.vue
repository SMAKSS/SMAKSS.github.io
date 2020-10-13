<template>
  <div class="container">
    <Header />
    <nuxt />
    <Footer />
    <ClientOnly>
      <CookieBanner v-if="!cookieConsent" />
    </ClientOnly>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export default {
  name: 'defaultLayout',
  components: {
    Header,
    Footer,
    CookieBanner,
  },
  data: () => {
    return {
      cookieConsent: false,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        dir: this.$i18n.locale === 'en' ? 'ltr' : 'rtl',
      },
    }
  },
  beforeMount() {
    if (
      this.$cookies.get('cookie-consent') &&
      localStorage.getItem('cookie-consent')
    )
      this.cookieConsent = true
  },
}
</script>

<style lang="scss">
@import '~assets/layouts/default/default';
</style>
