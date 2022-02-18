<template>
  <div class="site-about-me">
    <span class="svg-container">
      <BlobScene class="wave" ref="wave" />
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
        <div class="experience" ref="experience">
          <h2 class="heading-02 subheading">
            {{ $t('main.pillars.sub-headings.work-experience') }}
          </h2>
          <div class="list">
            <div
              class="item"
              v-for="experience of experiences"
              :key="experience.id"
            >
              <h3 class="heading-03 title">
                {{ experience.company }}
                <span class="des-01">
                  {{ experience.location }}
                </span>
              </h3>
              <h4 class="heading-04">
                {{ experience.role }}
              </h4>
              <span class="des-01">
                {{ experience.duration }}
              </span>
              <p class="text des-01">
                {{ experience.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {gsap} from 'gsap'

import BlobScene from '@/assets/icons/backgrounds/blobScene.svg?inline'

export default {
  name: 'about',
  components: {
    BlobScene,
  },
  data() {
    return {
      experiences: [
        {
          id: 'coin-plus',
          company: this.$t('main.pillars.experience.coin-plus.company'),
          role: this.$t('main.pillars.experience.coin-plus.role'),
          duration: this.$t('main.pillars.experience.coin-plus.duration'),
          location: this.$t('main.pillars.experience.coin-plus.location'),
          description: this.$t('main.pillars.experience.coin-plus.description'),
        },
      ],
    }
  },
  mounted() {
    const topRightWave = this.$refs.wave.querySelector('#top-right')
    const bottomLeft = this.$refs.wave.querySelector('#bottom-left')
    const timeline = gsap.timeline()

    timeline.set(
      [
        this.$refs.header,
        this.$refs.summary,
        this.$refs.experience,
        topRightWave,
        bottomLeft,
      ],
      {opacity: 0, visibility: 'none'},
    )
    timeline.set(topRightWave, {x: 1000})
    timeline.set(bottomLeft, {x: -300})

    timeline.to(
      topRightWave,
      1,
      {
        x: 900,
        opacity: 1,
        visibility: 'visible',
      },
      'wave',
    )
    timeline.to(
      bottomLeft,
      1,
      {
        x: 0,
        opacity: 1,
        visibility: 'visible',
      },
      'wave',
    )
    timeline.to(this.$refs.header, 1.2, {opacity: 1, visibility: 'visible'})
    timeline.to(this.$refs.summary, 0.8, {opacity: 1, visibility: 'visible'})
    timeline.to(this.$refs.experience, 0.8, {opacity: 1, visibility: 'visible'})
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

    & .wave {
      width: 100%;
      height: 100%;

      & .stop-color-01 {
        stop-color: $wave-color-01;
      }

      & .stop-color-02 {
        stop-color: $wave-color-02;
      }

      & .stop-color-03 {
        stop-color: $wave-color-03;
      }

      & .stop-color-04 {
        stop-color: $wave-color-04;
      }

      & .stop-color-05 {
        stop-color: $wave-color-05;
      }

      & .stop-color-06 {
        stop-color: $wave-color-06;
      }

      & :where(#top-right-01, #bottom-left-01) {
        fill: $wave-fill-color-01;
      }

      & :where(#top-right-02, #bottom-left-02) {
        fill: $wave-fill-color-02;
      }

      & :where(#top-right-03, #bottom-left-03) {
        fill: $wave-fill-color-03;
      }

      & :where(#top-right-04, #bottom-left-04) {
        fill: $wave-fill-color-04;
      }

      & :where(#top-right-05, #bottom-left-05) {
        fill: $wave-fill-color-05;
      }

      & :where(#top-right-06, #bottom-left-06) {
        fill: $wave-fill-color-06;
      }
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

    padding-top: 2%;
    margin: 0 auto;

    @media (max-width: $container-max-size) {
      padding-right: 2rem;
      padding-left: 2rem;
    }

    & .content {
      @include flex-display(
        $alignItems: flex-start,
        $justifyContent: flex-start,
        $flexDirection: column,
        $gap: 5rem
      );

      & :where(.summary, .experience) {
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

      & .experience {
        & .item {
          @include flex-display($flexDirection: column, $gap: 0.5rem);
        }
      }
    }
  }
}
</style>
