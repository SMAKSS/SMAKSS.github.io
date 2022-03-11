<template>
  <main class="site-about-me">
    <span class="svg-container">
      <template v-if="width > 980">
        <BlobScene class="wave" ref="wave" />
      </template>
      <template v-else>
        <BlobSceneResponsive class="wave" ref="wave" />
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
                {{ $t(`main.pillars.experience.${experience.id}.company`) }}
                <span class="des-01">
                  {{ $t(`main.pillars.experience.${experience.id}.location`) }}
                </span>
              </h3>
              <h4 class="heading-04">
                {{ $t(`main.pillars.experience.${experience.id}.role`) }}
              </h4>
              <span class="des-01">
                {{ $t(`main.pillars.experience.${experience.id}.duration`) }}
              </span>
              <p class="text des-01">
                {{ $t(`main.pillars.experience.${experience.id}.description`) }}
              </p>
              <span class="des-01">
                {{ $t('main.pillars.labels.techStack') }}{{ ':' }}
                {{ $t(`main.pillars.experience.${experience.id}.stack`) }}
              </span>
              <div
                class="useful-links des-01"
                v-if="experience.links && experience.links.length > 0"
              >
                <span>
                  {{ $t('main.pillars.labels.usefulLinks') }}{{ ':' }}</span
                >
                <ul class="links-list">
                  <li
                    class="link-item"
                    v-for="link in experience.links"
                    :key="link.id"
                  >
                    <!-- prettier-ignore -->
                    <AnchorTag
                      :link="link.link"
                      :text="$t(`main.pillars.experience.${experience.id}.links.${link.id}.name`)"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {gsap} from 'gsap'

import handlers from '@/mixins/handlers'
import BlobScene from '@/assets/icons/backgrounds/blobScene.svg?inline'
import BlobSceneResponsive from '@/assets/icons/backgrounds/blobSceneResponsive.svg?inline'
import AnchorTag from '@/components/links/anchorTag'

export default {
  name: 'about',
  mixins: [handlers],
  components: {
    BlobScene,
    BlobSceneResponsive,
    AnchorTag,
  },
  head() {
    return {
      title: this.$t('titles.about'),
      description: this.$t('descriptions.about'),
    }
  },
  data() {
    return {
      screenWidth: 0,
      experiences: [
        {
          id: 'coin-plus',
          links: [
            {
              link: this.$constants.coinPlus,
              id: 'coinPlus',
            },
            {
              link: this.$constants.sarrafeh,
              id: 'sarrafeh',
            },
            {
              link: this.$constants.texToken,
              id: 'texToken',
            },
          ],
        },
        {
          id: 'sana-gostar-sabz',
          links: [
            {
              link: this.$constants.sanaGostarSabz,
              id: 'sanaGostarSabz',
            },
            {
              link: this.$constants.achareh,
              id: 'achareh',
            },
            {
              link: this.$constants.ubaar,
              id: 'ubaar',
            },
          ],
        },
        {
          id: 'pergas-it-solutions',
        },
        {
          id: 'smart-lancer',
        },
        {
          id: 'salamatpaad',
          links: [
            {
              link: this.$constants.salamatPaad,
              id: 'salamatpaad',
            },
          ],
        },
        {
          id: 'microsoft',
          links: [
            {
              link: this.$constants.ATGSamples,
              id: 'XboxATG',
            },
          ],
        },
        {
          id: 'persian-acc',
        },
        {
          id: 'up-work',
        },
      ],
    }
  },
  mounted() {
    this.width = this.windowDimensions().width

    const topRightWave = this.$refs.wave.querySelector('#top-right')
    const bottomLeft = this.$refs.wave.querySelector('#bottom-left')

    gsap.set(
      [
        this.$refs.header,
        this.$refs.summary,
        this.$refs.experience,
        topRightWave,
        bottomLeft,
      ],
      {opacity: 0, visibility: 'none'},
    )

    const timeline = gsap.timeline()

    timeline.set(topRightWave, {x: 1000})
    timeline.set(bottomLeft, {x: -300})

    timeline.to(
      topRightWave,
      1,
      {
        x: this.width > 980 ? 900 : 350,
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
@import '~/assets/css/pages/stuff/about.scss';
</style>
