<template>
  <main class="site-error">
    <h1 class="error not-found" v-if="error.statusCode === 404">
      {{ $t('errors.404') }}
    </h1>
    <h1 class="error error-occurred" v-else>{{ $t('errors.error') }}</h1>
    <Button @onClick="onClick" :title="$t('titles.home')">{{
      $t('buttons.goHome')
    }}</Button>
  </main>
</template>

<script>
import Button from '@/components/buttons/Button'

export default {
  name: 'error',
  props: ['error'],
  components: {
    Button,
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
        dir: this.$i18n.locale === 'en' ? 'ltr' : 'rtl',
      },
    }
  },
  mounted() {
    setTimeout(() => {
      const localizationDropDown = document.querySelector(
        '.site-settings .settings.localization-switcher .dropdown',
      )

      localizationDropDown.style.pointerEvents = 'none'
    }, 100)
  },
  beforeDestroy() {
    const localizationDropDown = document.querySelector(
      '.site-settings .settings.localization-switcher .dropdown',
    )

    localizationDropDown.style.pointerEvents = 'all'
  },
  methods: {
    onClick() {
      this.$router.push({path: '/'})
    },
  },
}
</script>

<style lang="scss" scoped>
.site-error {
  @include flex-display(center, center, column);

  position: relative;

  min-height: calc(100vh - 6.5rem);

  & .error {
    font: 400 3.6rem/4.4rem $font;
    width: 80%;
    max-width: 20.5em;
    margin: 0.75em auto 0;
    color: $heading-color;

    @media (max-width: $default-mobile-viewport) {
      font-size: 2.4rem;
      line-height: 3rem;

      width: calc(100% - 8rem);
    }
  }

  & .button {
    position: absolute;

    display: block;

    text-align: center;

    margin-bottom: 4rem;

    bottom: 0;
  }
}
</style>
