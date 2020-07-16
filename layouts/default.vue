<template>
  <div class="container">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        dir: this.$i18n.locale === 'en' ? 'ltr' : 'rtl'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/layouts/default/default';
</style>
