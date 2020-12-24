<template>
  <div class="site-main">
    <Social ref="social" />
    <div class="home-page">
      <div class="content" ref="content">
        <h1 class="header" ref="header">
          {{ $t('main.header.partOne') }}
          <span class="header-part-two">{{ $t('main.header.partTwo') }}</span>
        </h1>
        <p class="description" ref="description">{{ $t('main.content') }}</p>
      </div>
      <div class="viewport">
        <div
          v-for="pillar of pillars"
          :key="pillar.id"
          :class="`${pillar.title}-pillar`"
        >
          <button class="pillar-title" :disabled="pillar.id !== 'about'">
            {{ $t(`main.pillars.headings.${pillar.title}`) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {gsap} from 'gsap'

import Social from '@/components/icons/Social'

export default {
  name: 'Stuff',
  components: {
    Social,
  },
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
    // const logos = this.$refs.social.$el
    // gsap.set(logos, {y: 30, opacity: 0, visibility: 'hidden'})
    // gsap.to(logos, 1, {y: 0, opacity: 1, visibility: 'inherit', delay: 1})
    if (this.$refs.header && this.$refs.description) this.animatedStuff()
  },
  methods: {
    animatedStuff() {
      gsap.set(this.$refs.social.$el, {y: 30})
      gsap.set(this.$refs.description, {y: 150})
      gsap.set(
        [this.$refs.header, this.$refs.description, this.$refs.social.$el],
        {
          opacity: 0,
          visibility: 'hidden',
        },
      )
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
      )
        .to(this.$refs.description, 0.7, {
          stagger: 0.3,
          opacity: 1,
          visibility: 'inherit',
          y: 0,
        })
        .to(
          this.$refs.social.$el,
          1,
          {
            y: 0,
            opacity: 1,
            visibility: 'inherit',
          },
          'header+=1.5',
        )
    },
  },
}
</script>

<style lang="scss" scoped>
.site-main /deep/ .logos {
  margin-bottom: 2rem;
}

@import '~/assets/css/pages/pillars.scss';
</style>
