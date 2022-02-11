<template>
  <div class="site-about-me">
    <span class="svg-container">
      <HorizontalWave class="horizontal-wave" />
    </span>
    <div class="wrapper">
      <div class="header">
        <h1 class="heading-01 heading" ref="heading">
          {{ $t('main.pillars.headings.about') }}
        </h1>
        <div class="straight" ref="straightHeader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalWave from '@/assets/icons/horizontal-wave.svg?inline'

export default {
  name: 'about',
  components: {
    HorizontalWave,
  },
}
</script>

<style lang="scss" scoped>
.site-about-me {
  @include flex-display($alignItems: flex-start, $justifyContent: flex-start);

  & .svg-container {
    position: absolute;

    width: 100%;
    height: 100%;

    z-index: -1;

    & .horizontal-wave {
      width: 100%;
      height: 100%;
    }
  }

  html[dir='ltr'] {
    & .wrapper {
      margin-left: 20%;
    }
  }

  html[dir='rtl'] {
    & .svg-container {
      direction: rtl;
    }

    & .wrapper {
      margin-right: 20%;
    }
  }
}
</style>
