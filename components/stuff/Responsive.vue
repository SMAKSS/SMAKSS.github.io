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
            class="pillar-card hover"
            data-pillar="about"
            :title="$t('titles.about')"
            exact
            data-background
          >
            <div class="fill">
              <div class="center inner">
                <div class="fill card">
                  <h2 class="heading-04 heading">
                    <span class="svg-container">
                      <user />
                    </span>
                    {{$t('main.pillars.headings.about')}}
                  </h2>
                  <div class="animation">
                    <div class="lottie-wrapper">
                      <div class="fill lottie">
                        <div class="wrapper">
                          <canvas width="238" height="238"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sub-heading">
                    <p class="des-01 description">{{$t('main.pillars.descriptions.about')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="npm-pillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/` : 'stuff/' }`"
            class="pillar-card"
            data-pillar="npm"
            :title="$t('titles.npm')"
            exact
            data-background
          >
            <div class="fill">
              <div class="center inner">
                <div class="fill card">
                  <h2 class="heading-04 heading">
                    <span class="svg-container">
                      <packageDelivery />
                    </span>
                    {{$t('main.pillars.headings.npm')}}
                  </h2>
                  <div class="animation">
                    <div class="lottie-wrapper">
                      <div class="fill lottie">
                        <div class="wrapper">
                          <canvas width="238" height="238"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sub-heading">
                    <p class="des-01 description">{{$t('main.pillars.descriptions.npm')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="interactive-pillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/` : 'stuff/' }`"
            class="pillar-card"
            data-pillar="interactive"
            :title="$t('titles.interactive')"
            exact
            data-background
          >
            <div class="fill">
              <div class="center inner">
                <div class="fill card">
                  <h2 class="heading-04 heading">
                    <span class="svg-container">
                      <tap />
                    </span>
                    {{$t('main.pillars.headings.interactive')}}
                  </h2>
                  <div class="animation">
                    <div class="lottie-wrapper">
                      <div class="fill lottie">
                        <div class="wrapper">
                          <canvas width="238" height="238"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sub-heading">
                    <p class="des-01 description">{{$t('main.pillars.descriptions.interactive')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="contribution-pillar">
          <NuxtLink
            :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/stuff/` : 'stuff/' }`"
            class="pillar-card"
            data-pillar="contribution"
            :title="$t('titles.contribution')"
            exact
            data-background
          >
            <div class="fill">
              <div class="center inner">
                <div class="fill card">
                  <h2 class="heading-04 heading">
                    <span class="svg-container">
                      <contribution />
                    </span>
                    {{$t('main.pillars.headings.contribution')}}
                  </h2>
                  <div class="animation">
                    <div class="lottie-wrapper">
                      <div class="fill lottie">
                        <div class="wrapper">
                          <canvas width="238" height="238"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sub-heading">
                    <p class="des-01 description">{{$t('main.pillars.descriptions.contribution')}}</p>
                  </div>
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
  name: 'Responsive',
  components: {
    user,
    packageDelivery,
    tap,
    contribution
  },
  mounted() {
    if (this.$refs.header && this.$refs.description) this.animatedStuff()
  },
  methods: {
    animatedStuff() {
      gsap.set([this.$refs.header, this.$refs.description, '.pillar-card'], {
        opacity: 0,
        visibility: 'hidden'
      })
      this.$i18n.locale === 'en'
        ? gsap.set(this.$refs.header, {
            x: 150
          })
        : gsap.set(this.$refs.header, {
            x: -150
          })
      gsap.set([this.$refs.description, '.pillar-card'], { y: 150 })
      const tl = gsap.timeline()
      tl.to(this.$refs.header, 1, {
        opacity: 1,
        visibility: 'inherit',
        x: 0
      }).to([this.$refs.description, '.pillar-card'], 0.7, {
        stagger: 0.3,
        opacity: 1,
        visibility: 'inherit',
        y: 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/pillars.scss';

.pillar-card {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;
}

.pillar-card.hover {
  pointer-events: all;
}

.pillar-card::before {
  content: '';
  display: block;
  padding-top: 116.66667%;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.pillar-card.hover .inner {
  position: relative;
}

.pillar-card.hover .inner {
  box-shadow: 0 9px 0 0 $box-shadow;
  width: 100%;
}

.pillar-card .inner {
  position: relative;
}

.pillar-card .inner {
  width: calc(100% - 2rem);
  border: 1px solid $mask;
  border-radius: 0.8rem;
  background: currentColor;
  transition: width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 0.5rem 0 0 $box-shadow;
}

.pillar-card .inner {
  position: relative;
}

.pillar-card .inner::before {
  content: '';
  display: block;
  padding-top: 116.66667%;
}

.pillar-card .card {
  padding: 2rem 0;
}

.pillar-card .card {
  @include flex-display(center, space-between, column);
}

.pillar-card .heading {
  text-transform: capitalize;
  margin-bottom: 1rem;
}

.heading-04 {
  font-size: 1.4rem;
  line-height: 2rem;
}

.pillar-card .svg-container {
  height: 1.5rem;
  width: 1.5rem;
  margin-bottom: 0.2em;
}

.pillar-card .svg-container svg {
  fill: currentColor;
}

.pillar-card .animation {
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
  max-width: 24rem;
}

.pillar-card .animation::before {
  content: '';
  display: block;
  padding-top: 100%;
}

.pillar-card.hover .lottie-wrapper {
  -webkit-transform: scale(1);
  transform: scale(1);
}

.pillar-card .lottie-wrapper {
  -webkit-transform: scale(0.75);
  transform: scale(0.75);
}

.pillar-card .animation .lottie-wrapper {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.lottie {
  width: 100%;
  display: inline-block;
}

.wrapper {
  padding-top: 100%;
  height: auto;
  width: 100%;
  position: relative;
}

.pillar-card .description {
  white-space: normal;
  width: 15rem;
  margin: 0 auto;
}

.des-01 {
  font-size: 1.2rem;
  line-height: 1.8rem;
}
</style>