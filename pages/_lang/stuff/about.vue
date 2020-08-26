<template>
  <div class="site-about-me">
    <div class="wrapper">
      <div class="header">
        <h1 class="heading-01 heading" ref="heading">{{$t('main.pillars.headings.about')}}</h1>
        <div class="straight" ref="straightHeader"></div>
      </div>
      <div class="content">
        <p class="main-content des-01" ref="mainContent">{{$t('contents.about.main')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'about',
  mounted() {
    gsap.set(this.$refs.heading, { y: 500, fontSize: '1.5rem' })
    gsap.set(this.$refs.straightHeader, { width: 0 })
    gsap.set(this.$refs.mainContent, { opacity: 0, visibility: 'hidden' })

    this.$i18n.locale === 'en'
      ? gsap.set(this.$refs.heading, { x: 500 })
      : gsap.set(this.$refs.heading, { x: -500 })

    const tl = gsap.timeline()
    tl.to(this.$refs.heading, 1, { x: 0, y: 0 }, 'relocateHeading')
    tl.to(this.$refs.heading, 1, { fontSize: '3rem' }, 'relocateHeading += 0.3')
    tl.to(this.$refs.straightHeader, 1, { width: '60%' })
    tl.to(this.$refs.mainContent, 1, { opacity: 1, visibility: 'inherit' })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 8rem 4rem;
  @include flex-display(flex-start, center, column);
  height: 100%;
  width: 100%;
}

.header {
  @include flex-display(center, center, row);
  width: 100%;
}

.header .straight {
  background: $border-color;
  margin: auto;
  height: 2px;
  border-radius: 50%;
}

.content {
  width: 100%;
}

.main-content {
  padding-top: 3rem;
}
</style>