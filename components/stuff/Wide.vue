<template>
  <div class="home-page">
    <div class="content">
      <h1 class="header" ref="header">
        {{$t('main.header.partOne')}}
        <span class="header-part-two">{{$t('main.header.partTwo')}}</span>
      </h1>
      <p class="description" ref="description">{{$t('main.content')}}</p>
    </div>
    <div class="viewport">
      <div class="draggable">
        <div class="about-pillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/about/` : 'stuff/about/' }`"
            class="button pillar-link"
            data-pillar="about"
            :title="$t('titles.about')"
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
              <div class="pillar-label">
                <p class="heading">{{$t('main.pillars.headings.about')}}</p>
                <div class="sub-heading" ref="aboutSubHeading">
                  <p class="description">{{$t('main.pillars.descriptions.about')}}</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="npm-pillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/npm/` : 'stuff/npm/' }`"
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
        <div class="interactive-pillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/interactive/` : 'stuff/interactive/' }`"
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
        <div class="contribution-pillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/contribution/` : 'stuff/contribution/' }`"
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
        .to([this.$refs.description], 0.7, {
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
.home-page {
  position: absolute;
  transition: color 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 100%;
  width: 100%;
  padding-top: 0;
  padding-bottom: 2rem;
  overflow: hidden;
}

.home-page .content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
}

.home-page .content .header {
  font: 400 3.6rem/4.4rem $font;
  color: $heading-color;
  position: relative;
  vertical-align: middle;
  margin: 0 auto;
  max-width: 23rem;
}

.home-page .content .header .header-part-two {
  display: block;
}

html[dir='ltr'] .home-page .content .header .header-part-two {
  margin-right: -1.5rem;
  text-align: right;
}

html[dir='rtl'] .home-page .content .header .header-part-two {
  margin-left: -2rem;
  text-align: left;
}

.home-page .content .description {
  text-align: center;
  max-width: 35rem;
  color: $text-color;
  font: 400 1.5rem/2.3rem $font;
}

.home-page .viewport,
.home-page .draggable {
  height: 100%;
  width: 100%;
}

.home-page .draggable .pillar-link {
  height: auto;
  width: 60rem;
  z-index: 1;
  pointer-events: none;
}

.home-page .draggable .pillar-link.active {
  pointer-events: all;
}

.home-page .draggable .pillar-link .pillar-description .pillar-icon .icon,
.home-page .draggable .pillar-link {
  position: absolute;
  transform: translate(-50%, -50%);
}

.home-page .draggable .pillar-link[data-pillar='about'] {
  width: 50rem;
  top: 25%;
}

html[dir='ltr'] .home-page .draggable .pillar-link[data-pillar='about'] {
  left: 75%;
}

html[dir='rtl'] .home-page .draggable .pillar-link[data-pillar='about'] {
  right: 75%;
}

.home-page .draggable .pillar-link[data-pillar='about'][data-background] {
  color: $about-pillar-color;
}

.home-page .draggable .pillar-link[data-pillar='npm'][data-background] {
  color: $npm-pillar-color;
}

.home-page .draggable .pillar-link[data-pillar='interactive'][data-background] {
  color: $interactive-pillar-color;
}

.home-page
  .draggable
  .pillar-link[data-pillar='contribution'][data-background] {
  color: $contribution-pillar-color;
}

.home-page .draggable .pillar-link .pillar-description {
  @include flex-display(center, center, column);
  position: absolute;
}

.home-page .draggable .pillar-link[data-pillar='about'] .pillar-description,
.home-page
  .draggable
  .pillar-link[data-pillar='contribution']
  .pillar-description {
  top: calc(50% - 4rem);
}

html[dir='ltr']
  .home-page
  .draggable
  .pillar-link[data-pillar='about']
  .pillar-description,
html[dir='ltr']
  .home-page
  .draggable
  .pillar-link[data-pillar='contribution']
  .pillar-description {
  left: calc(30% + 10rem);
}

html[dir='rtl']
  .home-page
  .draggable
  .pillar-link[data-pillar='about']
  .pillar-description,
html[dir='rtl']
  .home-page
  .draggable
  .pillar-link[data-pillar='contribution']
  .pillar-description {
  right: calc(-65% + 10rem);
}

.home-page .draggable .pillar-link[data-pillar='interactive'] {
  width: 50rem;
  top: 75%;
}

html[dir='ltr'] .home-page .draggable .pillar-link[data-pillar='interactive'] {
  left: 75%;
}

html[dir='rtl'] .home-page .draggable .pillar-link[data-pillar='interactive'] {
  right: 75%;
}

.home-page
  .draggable
  .pillar-link[data-pillar='interactive']
  .pillar-description,
.home-page .draggable .pillar-link[data-pillar='npm'] .pillar-description {
  top: calc(50% - 4rem);
}

html[dir='ltr']
  .home-page
  .draggable
  .pillar-link[data-pillar='interactive']
  .pillar-description,
html[dir='ltr']
  .home-page
  .draggable
  .pillar-link[data-pillar='npm']
  .pillar-description {
  left: calc(10% + 10rem);
}

html[dir='rtl']
  .home-page
  .draggable
  .pillar-link[data-pillar='interactive']
  .pillar-description,
html[dir='rtl']
  .home-page
  .draggable
  .pillar-link[data-pillar='npm']
  .pillar-description {
  right: calc(-85% + 10rem);
}

.home-page .draggable .pillar-link[data-pillar='npm'] {
  width: 50rem;
  top: 20%;
}

html[dir='ltr'] .home-page .draggable .pillar-link[data-pillar='npm'] {
  right: 30%;
}

html[dir='rtl'] .home-page .draggable .pillar-link[data-pillar='npm'] {
  left: 30%;
}

.home-page .draggable .pillar-link[data-pillar='contribution'] {
  width: 50rem;
  top: 80%;
}

html[dir='ltr'] .home-page .draggable .pillar-link[data-pillar='contribution'] {
  right: 35%;
}

html[dir='rtl'] .home-page .draggable .pillar-link[data-pillar='contribution'] {
  left: 45%;
}

.home-page .draggable .pillar-link .pillar-description .pillar-icon {
  height: 8rem;
  width: 8rem;
  display: inline-block;
  position: relative;
}

.home-page .draggable .pillar-link .pillar-description .pillar-icon .fill {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

html[dir='ltr']
  .home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-icon
  .fill {
  left: 0;
}

html[dir='rtl']
  .home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-icon
  .fill {
  right: 0;
}

.home-page .draggable .pillar-link .pillar-description .pillar-icon .pulse {
  border: 1px solid;
  border-radius: 50%;
  pointer-events: none;
}

.home-page .draggable .pillar-link .pillar-description .pillar-icon .intro {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  z-index: -2;
  pointer-events: none;
  background-color: currentColor;
}

.home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-icon
  .intro
  .mask {
  opacity: 1;
  visibility: inherit;
  background: $background-color;
  border-radius: 50%;
}

.home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-icon
  .icon-container {
  background: currentColor;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  display: inline-block;
}

.home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-icon
  .icon-container.pillar-active {
  background: $background-color;
}

.home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-icon
  .icon-container
  .icon {
  height: 25%;
  width: 25%;
  left: 50%;
  top: 50%;
  color: $heading-color;
}

.home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-icon
  .icon-container
  .icon
  svg {
  fill: currentColor;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  overflow: visible;
}

.home-page .draggable .pillar-link .pillar-description .pillar-label {
  position: absolute;
  top: 8rem;
  width: 16rem;
}

html[dir='ltr']
  .home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-label {
  left: 5px;
}

html[dir='rtl']
  .home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-label {
  right: 10px;
}

html[dir='ltr']
  .home-page
  .draggable
  .pillar-link[data-pillar='interactive']
  .pillar-description
  .pillar-label {
  left: -33px;
}

html[dir='rtl']
  .home-page
  .draggable
  .pillar-link[data-pillar='interactive']
  .pillar-description
  .pillar-label {
  right: 2px;
}

html[dir='ltr']
  .home-page
  .draggable
  .pillar-link[data-pillar='npm']
  .pillar-description
  .pillar-label {
  left: -13px;
}

html[dir='rtl']
  .home-page
  .draggable
  .pillar-link[data-pillar='npm']
  .pillar-description
  .pillar-label,
html[dir='rtl']
  .home-page
  .draggable
  .pillar-link[data-pillar='contribution']
  .pillar-description
  .pillar-label {
  right: -10px;
}

html[dir='ltr']
  .home-page
  .draggable
  .pillar-link[data-pillar='contribution']
  .pillar-description
  .pillar-label {
  left: -30px;
}

.home-page .draggable .pillar-link .pillar-description .pillar-label .heading {
  font: 600 1.5rem/1 $font;
  margin-top: 1em;
  color: $heading-color;
}

.home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-label
  .sub-heading {
  opacity: 0;
  margin-top: 1rem;
}

.home-page
  .draggable
  .pillar-link
  .pillar-description
  .pillar-label
  .description {
  font: 400 1.2rem/1.8rem $font;
  color: $text-color;
}
</style>