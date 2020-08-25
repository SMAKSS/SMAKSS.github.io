<template>
  <div class="home-page">
    <div class="content" ref="content">
      <h1 class="header" ref="header">
        {{$t('main.header.partOne')}}
        <span class="header-part-two">{{$t('main.header.partTwo')}}</span>
      </h1>
      <p class="description" ref="description">{{$t('main.content')}}</p>
    </div>
    <div class="viewport">
      <div class="draggable">
        <div class="about-pillar" ref="aboutPillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/about/` : 'stuff/about/' }`"
            class="button pillar-link"
            data-pillar="about"
            :title="$t('titles.about')"
            @click.native="aboutHandler"
            event="false"
            exact
            data-background
          >
            <div class="pillar-animation"></div>
            <div class="pillar-description">
              <div
                class="pillar-icon"
                @mouseover="aboutTrigger = true"
                @mouseleave="aboutTrigger = false"
              >
                <span class="fill pulse" />
                <span class="fill intro" ref="aboutIntro">
                  <span class="fill mask" ref="aboutMask" />
                </span>
                <span class="icon-container" ref="aboutIconContainer">
                  <span class="svg-container icon" ref="aboutIcon">
                    <user />
                  </span>
                </span>
              </div>
              <div class="pillar-label" ref="aboutLabel">
                <p class="heading" ref="aboutHeading">{{$t('main.pillars.headings.about')}}</p>
                <div class="sub-heading" ref="aboutSubHeading">
                  <p class="description">{{$t('main.pillars.descriptions.about')}}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="npm-pillar" ref="npmPillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/` : 'stuff/' }`"
            class="button pillar-link"
            data-pillar="npm"
            :title="$t('titles.npm')"
            event="false"
            exact
            data-background
          >
            <div class="pillar-animation"></div>
            <div class="pillar-description">
              <div
                class="pillar-icon"
                @mouseover="npmTrigger = true"
                @mouseleave="npmTrigger = false"
              >
                <span class="fill pulse" />
                <span class="fill intro" ref="npmIntro">
                  <span class="fill mask" ref="npmMask" />
                </span>
                <span class="icon-container" ref="npmIconContainer">
                  <span class="svg-container icon" ref="npmIcon">
                    <packageDelivery />
                  </span>
                </span>
              </div>
              <div class="pillar-label">
                <p class="heading">{{$t('main.pillars.headings.npm')}}</p>
                <div class="sub-heading" ref="npmSubHeading">
                  <p class="description">{{$t('main.pillars.descriptions.npm')}}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="interactive-pillar" ref="interactivePillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/` : 'stuff/' }`"
            class="button pillar-link"
            data-pillar="interactive"
            :title="$t('titles.interactive')"
            event="false"
            exact
            data-background
          >
            <div class="pillar-animation"></div>
            <div class="pillar-description">
              <div
                class="pillar-icon"
                @mouseover="interactiveTrigger = true"
                @mouseleave="interactiveTrigger = false"
              >
                <span class="fill pulse" />
                <span class="fill intro" ref="interactiveIntro">
                  <span class="fill mask" ref="interactiveMask" />
                </span>
                <span class="icon-container" ref="interactiveIconContainer">
                  <span class="svg-container icon" ref="interactiveIcon">
                    <tap />
                  </span>
                </span>
              </div>
              <div class="pillar-label">
                <p class="heading">{{$t('main.pillars.headings.interactive')}}</p>
                <div class="sub-heading" ref="interactiveSubHeading">
                  <p class="description">{{$t('main.pillars.descriptions.interactive')}}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="contribution-pillar" ref="contributionPillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/` : 'stuff/' }`"
            class="button pillar-link"
            data-pillar="contribution"
            :title="$t('titles.contribution')"
            event="false"
            exact
            data-background
          >
            <div class="pillar-animation"></div>
            <div class="pillar-description">
              <div
                class="pillar-icon"
                @mouseover="contributionTrigger = true"
                @mouseleave="contributionTrigger = false"
              >
                <span class="fill pulse" />
                <span class="fill intro" ref="contributionIntro">
                  <span class="fill mask" ref="contributionMask" />
                </span>
                <span class="icon-container" ref="contributionIconContainer">
                  <span class="svg-container icon" ref="contributionIcon">
                    <contribution />
                  </span>
                </span>
              </div>
              <div class="pillar-label">
                <p class="heading">{{$t('main.pillars.headings.contribution')}}</p>
                <div class="sub-heading" ref="contributionSubHeading">
                  <p class="description">{{$t('main.pillars.descriptions.contribution')}}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

import user from '~/assets/icons/user.svg?inline'
import packageDelivery from '~/assets/icons/package.svg?inline'
import tap from '~/assets/icons/tap.svg?inline'
import contribution from '~/assets/icons/contribution.svg?inline'

export default {
  name: 'Wide',
  components: {
    user,
    packageDelivery,
    tap,
    contribution
  },
  head() {
    return {
      title: this.$t('titles.stuff'),
      description: this.$t('descriptions.stuff')
    }
  },
  data: () => {
    return {
      aboutAnimation: false,
      aboutAnimationTl: null,
      npmAnimationTl: null,
      interactiveAnimationTl: null,
      contributionAnimationTl: null,
      siteSettings: null,
      logos: {},
      aboutTrigger: false,
      npmTrigger: false,
      interactiveTrigger: false,
      contributionTrigger: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.siteSettings = document.querySelector('.site-settings')
      this.logos.in = document.querySelector('.logos .in')
      this.logos.innerP = document.querySelector('.logos #inner-p')
    }, 100)
    if (this.$refs.header && this.$refs.description) this.animatedStuff()

    gsap.set('.pillar-icon .pulse', {
      opacity: 0,
      visibility: 'hidden'
    })

    const tl = gsap.timeline({ repeat: -1, delay: 1.6 })
    tl.to('.pillar-icon .pulse', {
      opacity: 1,
      visibility: 'inherit',
      scale: 0.1
    })
      .to('.pillar-icon .pulse', { scale: 1 })
      .to('.pillar-icon .pulse', { opacity: 0, scale: 2 })
  },
  destroyed() {
    this.siteSettings.classList.remove('pillar-active')
  },
  methods: {
    animatedStuff() {
      gsap.set(
        [
          this.$refs.header,
          this.$refs.description,
          '.pillar-icon .intro',
          '.pillar-icon .mask',
          '.pillar-icon .icon-container',
          '.pillar-icon .svg-container',
          '.pillar-label'
        ],
        {
          opacity: 0,
          visibility: 'hidden'
        }
      )
      this.$i18n.locale === 'en'
        ? gsap.set(this.$refs.header, {
            x: 150
          })
        : gsap.set(this.$refs.header, {
            x: -150
          })
      gsap.set(this.$refs.description, { y: 150 })
      const tl = gsap.timeline()
      tl.to(this.$refs.header, 1, {
        opacity: 1,
        visibility: 'inherit',
        x: 0
      })
        .to(this.$refs.description, 0.7, {
          stagger: 0.3,
          opacity: 1,
          visibility: 'inherit',
          y: 0
        })
        .fromTo(
          '.pillar-icon .intro',
          0.3,
          { scale: 0.1 },
          { scale: 1, opacity: 1, visibility: 'inherit' },
          'pillar'
        )
        .to(
          [
            '.pillar-icon .mask',
            '.pillar-icon .icon-container',
            '.pillar-icon .svg-container'
          ],
          {
            opacity: 1,
            visibility: 'inherit'
          },
          'pillar+=0.2'
        )
        .to('.pillar-label', { opacity: 1, visibility: 'inherit' })
      setTimeout(() => {
        document.querySelector('[data-pillar="about"]').classList.add('active')
        document.querySelector('[data-pillar="npm"]').classList.add('active')
        document
          .querySelector('[data-pillar="interactive"]')
          .classList.add('active')
        document
          .querySelector('[data-pillar="contribution"]')
          .classList.add('active')
      }, 3000)
    },
    animatedPillars(xCord, yCord, pillar) {
      const tl = gsap.timeline()
      this[`${pillar}AnimationTl`] = tl
      tl.to(
        this.$refs[`${pillar}Mask`],
        0.1,
        { opacity: 0, visibility: 'hidden' },
        'start'
      ).to(
        this.$refs[`${pillar}Intro`],
        0.3,
        {
          width: '1025px',
          height: '1025px',
          y: yCord
        },
        'repos'
      )

      this.$i18n.locale === 'en'
        ? tl.to(this.$refs[`${pillar}Intro`], 0.3, { x: -xCord }, 'repos')
        : tl.to(this.$refs[`${pillar}Intro`], 0.3, { x: xCord }, 'repos')

      tl.to(
        this.$refs[`${pillar}SubHeading`],
        { opacity: 1, visibility: 'inherit' },
        'start+=0.1'
      )
    },
    handleAboutMouseOver(xCord, yCord) {
      this.animatedPillars(xCord, yCord, 'about')
      setTimeout(() => {
        this.$refs.aboutIconContainer.classList.add('pillar-active')
        this.siteSettings.classList.add('pillar-active')
      }, 100)
    },
    handleAboutMouseLeave() {
      this.aboutAnimationTl.reverse()
      setTimeout(() => {
        this.siteSettings.classList.remove('pillar-active')
        this.$refs.aboutIconContainer.classList.remove('pillar-active')
      }, 300)
    },
    handleNPMMouseOver(xCord, yCord) {
      this.animatedPillars(xCord, yCord, 'npm')
      setTimeout(() => {
        this.$refs.npmIconContainer.classList.add('pillar-active')
      }, 100)
    },
    handleNPMMouseLeave() {
      this.npmAnimationTl.reverse()
      setTimeout(() => {
        this.$refs.npmIconContainer.classList.remove('pillar-active')
      }, 300)
    },
    handleInteractiveMouseOver(xCord, yCord) {
      this.animatedPillars(xCord, yCord, 'interactive')
      setTimeout(() => {
        if (this.$i18n.locale === 'en') {
          this.logos.innerP.classList.add('pillar-active')
        } else {
          this.logos.in.classList.add('pillar-active')
        }
        this.$refs.interactiveIconContainer.classList.add('pillar-active')
      }, 100)
    },
    handleInteractiveMouseLeave() {
      this.interactiveAnimationTl.reverse()
      setTimeout(() => {
        if (this.$i18n.locale === 'en') {
          this.logos.innerP.classList.remove('pillar-active')
        } else {
          this.logos.in.classList.remove('pillar-active')
        }
        this.$refs.interactiveIconContainer.classList.remove('pillar-active')
      }, 300)
    },
    handleContributionMouseOver(xCord, yCord) {
      this.animatedPillars(xCord, yCord, 'contribution')
      setTimeout(() => {
        if (this.$i18n.locale === 'en') {
          this.logos.in.classList.add('pillar-active')
        }
        this.$refs.contributionIconContainer.classList.add('pillar-active')
      }, 100)
    },
    handleContributionMouseLeave() {
      this.contributionAnimationTl.reverse()
      setTimeout(() => {
        if (this.$i18n.locale === 'en') {
          this.logos.in.classList.remove('pillar-active')
        }
        this.$refs.contributionIconContainer.classList.remove('pillar-active')
      }, 300)
    },
    aboutHandler() {
      this.handleAboutMouseLeave()
      const pillar = document.querySelector(
        '.about-pillar .pillar-link[data-pillar="about"]'
      )
      const tl = gsap.timeline({ delay: 0.1 })
      tl.to(
        [
          this.$refs.content,
          this.$refs.npmPillar,
          this.$refs.interactivePillar,
          this.$refs.contributionPillar
        ],
        1,
        { opacity: 0, visibility: 'hidden', pointerEvents: 'none' }
      )
      tl.to(
        pillar,
        1,
        {
          top: '50%',
          pointerEvents: 'none'
        },
        'relocatePillar'
      )
      this.$i18n.locale === 'en'
        ? tl.to(
            pillar,
            1,
            {
              left: '47.5%'
            },
            'relocatePillar'
          )
        : tl.to(
            pillar,
            1,
            {
              right: '46%'
            },
            'relocatePillar'
          )
      tl.to(
        '.about-pillar .pillar-description *:not(.pillar-label):not(.heading)',
        { opacity: 0, visibility: 'hidden', delay: 1 }
      )
      tl.to(
        this.$refs.aboutHeading,
        1,
        { fontSize: '3.3rem' },
        'headingRelocate'
      )
      tl.to(
        this.$refs.aboutLabel,
        { left: 'unset', right: 'unset' },
        'headingRelocate'
      )
      tl.to(pillar, 1, { top: '5%' }, 'headingRelocate')
      setTimeout(() => this.$router.push('about/'), 5700)
    }
  },
  watch: {
    aboutTrigger(value) {
      value
        ? this.handleAboutMouseOver(460, -845)
        : this.handleAboutMouseLeave()
    },
    npmTrigger(value) {
      value ? this.handleNPMMouseOver(560, -815) : this.handleNPMMouseLeave()
    },
    interactiveTrigger(value) {
      value
        ? this.handleInteractiveMouseOver(325, -110)
        : this.handleInteractiveMouseLeave()
    },
    contributionTrigger(value) {
      value
        ? this.handleContributionMouseOver(680, -215)
        : this.handleContributionMouseLeave()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/pillars.scss';
</style>