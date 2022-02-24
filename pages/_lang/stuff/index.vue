<template>
  <main class="site-main" ref="siteMain">
    <div class="home-page">
      <div class="content" ref="content">
        <h1 class="header" ref="header">
          {{ $t('main.header.partOne') }}
          <span class="header-part-two">{{ $t('main.header.partTwo') }}</span>
        </h1>
        <p class="description" ref="description">{{ $t('main.content') }}</p>
      </div>
      <div class="viewport" ref="viewport">
        <div class="about-pillar" @click="pillarOnClickHandler('about')">
          <span class="pillar-title">
            {{ $t(`main.pillars.headings.about`) }}
          </span>
          <span class="bottom-border" />
        </div>
        <div class="yet-to-be-developed">
          <div class="under-construction">
            {{ $t(`main.pillars.comingSoon`) }}
          </div>
          <div
            data-disabled="true"
            v-for="pillar of pillars"
            :key="pillar.id"
            :class="`${pillar.title}-pillar`"
            @onClick="pillarOnClickHandler(pillar.id)"
          >
            <span class="pillar-title">
              {{ $t(`main.pillars.headings.${pillar.title}`) }}
            </span>
            <span class="bottom-border" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {gsap} from 'gsap'

import handlers from '@/mixins/handlers'

export default {
  name: 'Stuff',
  mixins: [handlers],
  head() {
    return {
      title: this.$t('titles.stuff'),
      description: this.$t('descriptions.stuff'),
    }
  },
  data() {
    return {
      pillars: [
        {id: 'npm', title: 'npm'},
        {id: 'interactive', title: 'interactive'},
        {id: 'contribution', title: 'contribution'},
      ],
    }
  },
  mounted() {
    if (this.$refs.header && this.$refs.description && this.$refs.viewport)
      this.animatedStuff()
  },
  methods: {
    animatedStuff() {
      gsap.set(this.$refs.description, {y: 150})
      gsap.set(
        [this.$refs.header, this.$refs.description, this.$refs.viewport],
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
      const timeline = gsap.timeline()
      timeline
        .to(
          this.$refs.header,
          1,
          {
            opacity: 1,
            visibility: 'inherit',
            x: 0,
          },
          'header',
        )
        .to(this.$refs.description, 1, {
          opacity: 1,
          visibility: 'inherit',
          y: 0,
        })
        .to(this.$refs.viewport, 0.5, {
          opacity: 1,
          visibility: 'visible',
        })
    },
    pillarOnClickHandler(pillar) {
      this.fadingOutAndPushToRouterHandler({
        element: this.$refs.siteMain,
        route: pillar,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/pages/stuff/stuff.scss';
</style>
