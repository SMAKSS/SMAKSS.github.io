<template>
  <div class="site-main">
    <Social />
    <div v-if="$fetchState.pending" class="pending">
      <Logo />
    </div>
    <template v-else-if="!responsive">
      <Wide />
    </template>
    <template v-else>
      <Responsive />
    </template>
  </div>
</template>

<script>
import Logo from '~/assets/icons/SMAKSS.svg?inline'
import Social from '@/components/icons/Social'
import Wide from '@/components/stuff/Wide'
import Responsive from '@/components/stuff/Responsive'

export default {
  name: 'Stuff',
  components: {
    Social,
    Logo,
    Wide,
    Responsive
  },
  data: () => {
    return {
      responsive: false
    }
  },
  fetch() {},
  mounted: function() {
    this.$nextTick(function() {
      this.onResize()
    })
    window.addEventListener('resize', this.onResize)
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