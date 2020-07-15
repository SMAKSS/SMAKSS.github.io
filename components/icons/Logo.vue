<template>
  <NuxtLink
    :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/` : '' }`"
    :title="$t('title.home')"
    :aria-label="$t('title.home')"
    exact
  >
    <span class="svg-container logo"></span>
  </NuxtLink>
</template>

<script>
export default {
  name: 'Logo'
}
</script>