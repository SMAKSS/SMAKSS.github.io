<template>
  <a class="link" :href="link" noreferrer noopener target="_blank"
    ><template v-if="text">{{ text }}</template
    ><template v-else><slot /></template
  ></a>
</template>

<script>
export default {
  name: 'AnchorTag',
  props: ['link', 'text'],
}
</script>

<style lang="scss" scoped>
.link {
  color: $text-color;

  text-decoration: none;

  &:hover {
    color: $button;

    transition: color 0.4s ease-in-out;
  }
}
</style>
