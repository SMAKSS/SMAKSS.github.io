<template>
  <div class="home-page">
    <div class="content" ref="content">
      <h1 class="header" ref="header">
        {{ $t('main.header.partOne') }}
        <span class="header-part-two">{{ $t('main.header.partTwo') }}</span>
      </h1>
      <p class="description" ref="description">{{ $t('main.content') }}</p>
    </div>
    <div class="viewport"></div>
  </div>
</template>

<script>
import {gsap} from 'gsap'

export default {
  name: 'Wide',
  head() {
    return {
      title: this.$t('titles.stuff'),
      description: this.$t('descriptions.stuff'),
    }
  },
  data: () => {
    return {
      siteSettings: null,
      logos: {},
    }
  },
  mounted() {
    setTimeout(() => {
      this.siteSettings = document.querySelector('.site-settings')
      this.logos.in = document.querySelector('.logos .in')
      this.logos.innerP = document.querySelector('.logos #inner-p')
    }, 100)
    if (this.$refs.header && this.$refs.description) this.animatedStuff()
  },
  methods: {
    animatedStuff() {
      gsap.set([this.$refs.header, this.$refs.description], {
        opacity: 0,
        visibility: 'hidden',
      })
      this.$i18n.locale === 'en'
        ? gsap.set(this.$refs.header, {
            x: 150,
          })
        : gsap.set(this.$refs.header, {
            x: -150,
          })
      gsap.set(this.$refs.description, {y: 150})
      const tl = gsap.timeline()
      tl.to(this.$refs.header, 1, {
        opacity: 1,
        visibility: 'inherit',
        x: 0,
      }).to(this.$refs.description, 0.7, {
        stagger: 0.3,
        opacity: 1,
        visibility: 'inherit',
        y: 0,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/pillars.scss';
</style>
