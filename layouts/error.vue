<template>
  <div class="site-error">
    <h1 class="error not-found" v-if="error.statusCode === 404">
      {{ $t('errors.404') }}
    </h1>
    <h1 class="error error-occurred" v-else>{{ $t('errors.error') }}</h1>
    <Button @onClick="onClick" :title="$t('titles.home')">{{
      $t('buttons.goHome')
    }}</Button>
  </div>
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
      const localizaitonDropDown = document.querySelector(
        '.site-settings .settings.localization-switcher .dropdown',
      )

      localizaitonDropDown.style.pointerEvents = 'none'
    }, 100)
  },
  beforeDestroy() {
    const localizaitonDropDown = document.querySelector(
      '.site-settings .settings.localization-switcher .dropdown',
    )

    localizaitonDropDown.style.pointerEvents = 'all'
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
  min-height: 68rem;
}

.site-error .error {
  font: 400 3.6rem/4.4rem $font;
  width: 80%;
  max-width: 20.5em;
  margin: 0.75em auto 0;
  color: $heading-color;
}

@media (max-width: $default-mobile-viewport) {
  .site-error .error {
    font-size: 2.4rem;
    line-height: 3rem;
    width: calc(100% - 8rem);
  }
}

.site-error .button {
  text-align: center;
  position: absolute;
  display: block;
  margin-bottom: 4rem;
  bottom: 0;
}
</style>
