<template>
  <button
    @click="onClick"
    :class="$props.mainClass || 'button'"
    :title="title"
    :aria-label="ariaLabel"
  >
    <span :class="spanClass || 'label'">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['mainClass', 'title', 'ariaLabel', 'spanClass'],
  methods: {
    onClick(event) {
      this.$emit('onClick', event)
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  background: $button;
  color: $button-text;
  border-radius: 0.25rem;
  padding: 0 2rem;
  transition: background 0.2s cubic-bezier(1, 0, 0, 1);
  height: 4.6rem;
  border: 2px solid transparent;
  line-height: calc(4.6rem - 2px);
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  font-size: 0;
}

.button:hover {
  background: $button-hover;
}

.button .label {
  vertical-align: middle;
  display: inline-block;
  white-space: nowrap;
  font: 500 1.4rem/1 $font;
  user-select: none;
}

@media (max-width: $default-mobile-viewport) {
  .button .label {
    font-size: 1.2rem;
  }
}
</style>
