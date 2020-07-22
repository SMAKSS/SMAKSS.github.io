<template>
  <div class="site-main">
    <div class="home-page">
      <div class="content">
        <h1 class="header" ref="header">
          {{$t('main.header.partOne')}}
          <span class="header-part-two">{{$t('main.header.partTwo')}}</span>
        </h1>
        <p class="description" ref="description">{{$t('main.content')}}</p>
      </div>
    </div>
    <Social />
  </div>
</template>

<script>
import { gsap } from 'gsap'

import Social from '@/components/icons/Social'

export default {
  name: 'stuff',
  components: {
    Social
  },
  head() {
    return {
      title: this.$t('titles.stuff'),
      description: this.$t('descriptions.stuff')
    }
  },
  mounted() {
    const logos = document.querySelector('.logos')
    gsap.set([this.$refs.header, this.$refs.description, logos], {
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
    gsap.set(this.$refs.description, { y: 150 })
    gsap.set(logos, { y: 30 })
    const tl = gsap.timeline()
    tl.to(this.$refs.header, 1, { opacity: 1, visibility: 'inherit', x: 0 }).to(
      [this.$refs.description, logos],
      0.7,
      {
        stagger: 0.3,
        opacity: 1,
        visibility: 'inherit',
        y: 0
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.site-main {
  height: 100%;
  width: 100%;
  z-index: 8;
  min-height: 68rem;
  position: relative;
}

.site-main .home-page {
  position: absolute;
  transition: color 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 100%;
  width: 100%;
  padding-top: 0;
  padding-bottom: 2rem;
  overflow: hidden;
}

.site-main .home-page .content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
}

@media (max-width: 767px) {
  .site-main .home-page {
    @include flex-display(center, center, column);
  }

  .site-main .home-page .content {
    top: auto;
    left: auto;
    position: relative;
    margin-bottom: 1rem;
    -webkit-transform: none;
    transform: none;
  }
}

.site-main .home-page .content .header {
  font: 400 3.6rem/4.4rem $font;
  color: $heading-color;
  position: relative;
  vertical-align: middle;
  margin: 0 auto;
  max-width: 23rem;
}

@media (max-width: 767px) {
  .site-main .home-page .content .header {
    font-size: 2.4rem;
    line-height: 3rem;
    max-width: 15rem;
  }
}

.site-main .home-page .content .header .header-part-two {
  display: block;
}

html[dir='ltr'] .site-main .home-page .content .header .header-part-two {
  margin-right: -1.5rem;
  text-align: right;
}

html[dir='rtl'] .site-main .home-page .content .header .header-part-two {
  margin-left: -2rem;
  text-align: left;
}

.site-main .home-page .content .description {
  text-align: center;
  max-width: 35rem;
  color: $text-color;
  font: 400 1.5rem/2.3rem $font;
}

@media (max-width: 767px) {
  .site-main .home-page .content .description {
    font-size: 1.2rem;
    line-height: 1.8rem;
    padding: 0 4rem;
  }
}
</style>