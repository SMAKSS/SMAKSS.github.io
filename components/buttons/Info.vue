<template>
  <Button
    @onClick="handler"
    :mainClass="'info icon'"
    :title="$t('titles.info')"
    :ariaLabel="$t('titles.info')"
    :spanClass="'svg-container'"
  >
    <info />
  </Button>
</template>

<script>
import Button from '@/components/buttons/Button'
import info from '~/assets/icons/info.svg?inline'

export default {
  name: 'Info',
  components: {
    Button,
    info
  },
  props: ['moreInfo'],
  methods: {
    handler() {
      this.$emit('moreInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.info.icon {
  outline: none;
  height: 4rem;
  width: 4rem;
  display: inline-block;
  border-radius: 50%;
  position: relative;
  background: $button-icon;
  transition: background 0.2s cubic-bezier(1, 0, 0, 1);
}

.info.icon /deep/ .svg-container {
  display: inline-block;
  vertical-align: middle;
  top: 50%;
  left: 50%;
  height: 40%;
  width: 40%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.info.icon /deep/ .svg-container svg {
  fill: $settings-default;
}
</style>