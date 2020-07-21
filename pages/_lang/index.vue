<template>
  <div class="site-main-page">
    <Quote />
  </div>
</template>

<script>
import Quote from '@/components/Quote'

export default {
  name: 'Index',
  head() {
    return {
      title: this.$t('titles.index'),
      description: this.$t('descriptions.index')
    }
  },
  components: {
    Quote
  }
}
</script>

<style lang="scss">
.site-main-page {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 2;
  min-height: 68rem;
}
</style>
