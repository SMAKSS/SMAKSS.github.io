<template>
  <NuxtLink
    :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/` : '' }`"
    :title="$t('titles.home')"
    :aria-label="$t('titles.home')"
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