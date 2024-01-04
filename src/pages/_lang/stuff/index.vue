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
        <div
          v-for="pillar of activePillars"
          :key="pillar.id"
          :class="`${pillar.id}-pillar`"
          @click="pillarOnClickHandler(pillar.id)"
        >
          <span class="pillar-title">
            {{ $t(`main.pillars.headings.${pillar.id}`) }}
          </span>
          <span class="bottom-border" />
        </div>
        <div class="blog-pillar">
          <AnchorTag :link="this.$constants.blog">
            <span class="pillar-title">
              {{ $t('main.pillars.headings.blog') }}
            </span>
          </AnchorTag>
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
            :class="`${pillar.id}-pillar`"
            @click="pillarOnClickHandler(pillar.id)"
          >
            <span class="pillar-title">
              {{ $t(`main.pillars.headings.${pillar.id}`) }}
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
import AnchorTag from '@/components/links/anchorTag'

export default {
  name: 'Stuff',
  mixins: [handlers],
  components: {
    AnchorTag,
  },
  head() {
    return {
      title: this.$t('titles.stuff'),
      description: this.$t('descriptions.stuff'),
    }
  },
  data() {
    return {
      activePillars: [
        {id: 'about'},
        {id: 'npm'},
        {id: 'contribution'},
        {id: 'hackernoon'},
      ],
      pillars: [{id: 'interactive'}],
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
      if (pillar === 'about') {
        this.fadingOutAndPushToRouterHandler({
          element: this.$refs.siteMain,
          route: pillar,
        })
      } else {
        switch (pillar) {
          case 'npm':
            window.open('https://www.npmjs.com/~smakss', '_blank')
            break
          case 'contribution':
            window.open('https://github.com/SMAKSS', '_blank')
            break
          case 'hackernoon':
            window.open('https://hackernoon.com/u/smakss', '_blank')
            break
          default:
            break
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/pages/stuff/index.scss';
</style>
