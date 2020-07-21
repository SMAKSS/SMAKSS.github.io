<template>
  <div class="cookie-banner" v-if="!cookieConsent">
    <p class="cookie-notif">{{$t('contents.cookie')}}</p>
    <Button
      @onClick="acceptCookie"
      :mainClass="'cookie-consent'"
      :title="$t('titles.cookieConsent')"
    >{{$t('buttons.ok')}}</Button>
  </div>
</template>

<script>
import { gsap } from 'gsap'

import Button from '@/components/buttons/Button'

export default {
  name: 'CookieBanner',
  components: {
    Button
  },
  data: () => {
    return {
      cookieConsent: false
    }
  },
  methods: {
    acceptCookie() {
      this.$cookies.set('cookie-consent', JSON.stringify({ consent: true }), {
        expires: new Date('2037-12-31T23:59:57.472Z')
      })
      localStorage.setItem('cookie-consent', JSON.stringify({ consent: true }))

      if (
        this.$cookies.get('cookie-consent') &&
        localStorage.getItem('cookie-consent')
      )
        this.cookieConsent = true
    }
  }
}
</script>

<style lang="scss" scoped>
.cookie-banner {
  @include flex-display(center, space-between);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  background-color: $banner-bg;
  border: none;
  border-radius: 0;
  color: $button-text;
  width: 100%;
  z-index: 999;
  padding: 1rem 1.2rem;
}

.cookie-banner .cookie-notif,
.cookie-banner .cookie-consent {
  font: 600 1.2rem/1.8rem $font;
}

html[dir='rtl'] .cookie-banner .cookie-notif,
html[dir='rtl'] .cookie-banner .cookie-consent {
  font-weight: 500;
}

.cookie-banner .cookie-consent {
  background-color: $banner-button;
  border: 1px solid $mask;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  color: $button-text;
  cursor: pointer;
  line-height: 19px;
  padding: 4px 8px;
  text-decoration: none;
  white-space: nowrap;
}
</style>