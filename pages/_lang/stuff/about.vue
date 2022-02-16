<template>
  <div class="site-about-me">
    <span class="svg-container">
      <template v-if="$i18n.locale === 'en'">
        <HorizontalWave class="horizontal-wave" ref="wave" />
      </template>
      <template v-else>
        <HorizontalWaveFlip class="horizontal-wave" ref="wave" />
      </template>
    </span>
    <div class="wrapper">
      <div class="header" ref="header">
        <h1 class="heading-01 heading" ref="heading">
          {{ $t('main.pillars.headings.about') }}
        </h1>
      </div>
      <div class="content">
        <div class="summary" ref="summary">
          <h2 class="heading-02 subheading">
            {{ $t('main.pillars.sub-headings.summary') }}
          </h2>
          <p class="text des-01">
            <span>{{ $t('main.pillars.content.summary') }}</span>
            <span class="final-thing">{{
              $t('main.pillars.content.summaryFinalThing')
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {gsap} from 'gsap'

import HorizontalWave from '@/assets/icons/waves/horizontal-wave.svg?inline'
import HorizontalWaveFlip from '@/assets/icons/waves/horizontal-wave-flip.svg?inline'

export default {
  name: 'about',
  components: {
    HorizontalWave,
    HorizontalWaveFlip,
  },
  mounted() {
    const timeline = gsap.timeline()

    this.$i18n.locale === 'en'
      ? timeline.set(this.$refs.wave, {x: -300})
      : timeline.set(this.$refs.wave, {x: 300})
    timeline.set(this.$refs.header, {opacity: 0, visibility: 'none'})
    timeline.set(this.$refs.summary, {opacity: 0, visibility: 'none'})

    timeline.to(this.$refs.wave, 0.7, {x: 0})
    timeline.to(this.$refs.header, 1.2, {opacity: 1, visibility: 'visible'})
    timeline.to(this.$refs.summary, 0.8, {opacity: 1, visibility: 'visible'})
  },
}
</script>

<style lang="scss" scoped>
.site-about-me {
  & .svg-container {
    position: absolute;

    width: 100%;
    height: 100%;

    z-index: -1;

    & .horizontal-wave {
      width: 100%;
      height: 100%;
    }
  }

  & .wrapper {
    @include flex-display(
      $alignItems: flex-start,
      $justifyContent: flex-start,
      $flexDirection: column,
      $gap: 5rem
    );

    max-width: $container-max-size;

    margin-top: 1%;

    & :where(.content, .summary) {
      @include flex-display(
        $alignItems: flex-start,
        $justifyContent: flex-start,
        $flexDirection: column,
        $gap: 2rem
      );

      & .text {
        @include flex-display($flexDirection: column, $gap: 1rem);

        text-align: justify;

        & .final-thing {
          display: block;
        }
      }
    }
  }
}

html[dir='ltr'] .site-about-me .wrapper {
  margin-right: 3rem;
  margin-left: 21.5%;

  & .content {
    padding-left: 6%;
  }
}

html[dir='rtl'] .site-about-me .wrapper {
  margin-right: 21.5%;
  margin-left: 3rem;

  & .content {
    padding-right: 6%;
  }
}
</style>
