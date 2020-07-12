<template>
  <div class="container">
    <Footer />
    <Quote />
  </div>
</template>

<script>
import Quote from '~/components/Quote'
import Footer from '~/components/Footer'

export default {
  name: "Index",
  components: {
    Quote,
    Footer
  }
}
</script>

<style lang="scss">
.container {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 2;
  min-height: 68rem;
}
</style>
