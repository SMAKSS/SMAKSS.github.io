<template>
  <header class="site-header">
    <Logo />
    <ThemeSettings />
  </header>
</template>

<script>
import Logo from '@/components/icons/Logo'
import ThemeSettings from '@/components/ThemeSettings'

export default {
  name: 'Header',
  components: {
    Logo,
    ThemeSettings
  }
}
</script>

<style lang="scss">
.site-header {
  @include flex-display(center, space-between);
  position: absolute;
  z-index: 9;
  height: 64px;
  width: 100%;
  top: 0;
  left: 0;
}
</style>