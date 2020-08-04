<template>
  <header class="site-header" ref="siteHeader">
    <Logo />
    <ThemeSettings />
  </header>
</template>

<script>
import { gsap } from 'gsap'

import Logo from '@/components/icons/Logo'
import ThemeSettings from '@/components/ThemeSettings'

export default {
  name: 'Header',
  components: {
    Logo,
    ThemeSettings
  },
  mounted() {
    gsap.set(this.$refs.siteHeader, { y: -150 })
    gsap.to(this.$refs.siteHeader, 0.7, { y: 0 })
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  @include flex-display(center, space-between);
  position: absolute;
  z-index: 9;
  height: 64px;
  width: 100%;
  top: 0;
  left: 0;
}

@media (max-width: 920px) {
  .site-header {
    height: 60px;
  }
}
</style>