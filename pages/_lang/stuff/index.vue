<template>
  <div class="site-main">
    <Social />
    <ClientOnly>
      <Responsive v-if="responsive" />
      <Wide v-else />
    </ClientOnly>
  </div>
</template>

<script>
import { gsap } from 'gsap'

import Social from '@/components/icons/Social'
import Wide from '@/components/stuff/Wide'
import Responsive from '@/components/stuff/Responsive'

export default {
  name: 'Stuff',
  components: {
    Social,
    Wide,
    Responsive,
  },
  data: () => {
    return {
      responsive: false,
    }
  },
  beforeMount() {
    this.$nextTick(function () {
      this.onResize()
    })
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    const logos = document.querySelector('.logos')
    gsap.set(logos, { y: 30, opacity: 0, visibility: 'hidden' })
    gsap.to(logos, 1, { y: 0, opacity: 1, visibility: 'inherit', delay: 1 })
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      window.innerWidth > 1100
        ? (this.responsive = false)
        : (this.responsive = true)
    },
  },
}
</script>

<style lang="scss" scoped>
.site-main /deep/ .logos {
  margin-bottom: 2rem;
}
</style>