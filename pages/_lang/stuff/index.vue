<template>
  <div class="site-main">
    <Social />
    <template v-if="!responsive">
      <Wide />
    </template>
    <template v-else>
      <Responsive />
    </template>
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
    Responsive
  },
  data: () => {
    return {
      responsive: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.onResize()
    })
    window.addEventListener('resize', this.onResize)
    const logos = document.querySelector('.logos')
    gsap.set(logos, { y: 50, opacity: 0, visibility: 'hidden' })
    gsap.to(logos, 1, { y: 0, opacity: 1, visibility: 'inherit', delay: 1 })
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      window.innerWidth < 767
        ? (this.responsive = true)
        : (this.responsive = false)
    }
  }
}
</script>