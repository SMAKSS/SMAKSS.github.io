<template>
  <NuxtLink
    :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/` : '' }`"
    :title="$t('title.home')"
    :aria-label="$t('title.home')"
    exact
  >
    <span class="svg-container logo">
      <SMAKSS />
    </span>
  </NuxtLink>
</template>

<script>
import SMAKSS from '@/assets/icons/SMAKSS.svg?inline'

export default {
  name: 'Logo',
  components: {
    SMAKSS
  }
}
</script>

<style lang="scss">
.svg-container {
  height: 100%;
  width: 100%;
  display: inline-block;
  position: relative;
  vertical-align: middle;
}
</style>