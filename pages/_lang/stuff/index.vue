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