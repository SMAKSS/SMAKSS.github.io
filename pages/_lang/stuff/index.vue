<template>
  <main class="site-main">
    <div class="home-page">
      <div class="content" ref="content">
        <h1 class="header" ref="header">
          {{ $t('main.header.partOne') }}
          <span class="header-part-two">{{ $t('main.header.partTwo') }}</span>
        </h1>
        <p class="description" ref="description">{{ $t('main.content') }}</p>
      </div>
      <div class="viewport">
        <div class="under-construction">
          {{ $t(`main.pillars.comingSoon`) }}
        </div>
        <div
          v-for="pillar of pillars"
          :key="pillar.id"
          :class="`${pillar.title}-pillar`"
        >
          <button class="pillar-title" :disabled="true">
            {{ $t(`main.pillars.headings.${pillar.title}`) }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {gsap} from 'gsap'

export default {
  name: 'Stuff',
  head() {
    return {
      title: this.$t('titles.stuff'),
      description: this.$t('descriptions.stuff'),
    }
  },
  data() {
    return {
      pillars: [
        {id: 'about', title: 'about'},
        {id: 'npm', title: 'npm'},
        {id: 'interactive', title: 'interactive'},
        {id: 'contribution', title: 'contribution'},
      ],
    }
  },
  mounted() {
    if (this.$refs.header && this.$refs.description) this.animatedStuff()
  },
  methods: {
    animatedStuff() {
      gsap.set(this.$refs.description, {y: 150})
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
      const tl = gsap.timeline()
      tl.to(
        this.$refs.header,
        1,
        {
          opacity: 1,
          visibility: 'inherit',
          x: 0,
        },
        'header',
      ).to(this.$refs.description, 0.7, {
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
@import '~/assets/css/pages/stuff/stuff.scss';
</style>
