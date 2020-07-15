<template>
  <div class="theme-settings">
    <!-- <ul class="localization-bar">
      <li class="item">
        <NuxtLink :to="$route.fullPath.replace(/^\/[^\/]+/, '')" class="link" exact>English</NuxtLink>
      </li>
      <li class="item">
        <NuxtLink :to="`/fa` + $route.fullPath.replace(/^\/['fa']+/, '')" class="link" exact>فارسی</NuxtLink>
      </li>
    </ul>-->
    <div class="color-switcher">
      <button
        class="icon"
        :title="$t(`title.${$colorMode.preference}`)"
        :aria-label="$t(`title.${$colorMode.preference}`)"
        @click="openSwitcher"
      >
        <span class="icon-container">
          <component
            :is="`icon-${$colorMode.preference}`"
            class="selected"
            :class="{ 'system-light': ($colorMode.preference === 'system' && $colorMode.value === 'light'), 
            'system-dark': ($colorMode.preference === 'system' && $colorMode.value === 'dark')}"
          />
        </span>
      </button>
      <ul class="colors" ref="colors">
        <li
          class="item"
          :title="$t(`title.${color}`)"
          v-for="color of remainingColors"
          :key="color"
          @click="openSwitcher"
        >
          <component :is="`icon-${color}`" @click="$colorMode.preference = color" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconSystem from '@/assets/icons/system.svg?inline'
import IconLight from '@/assets/icons/light.svg?inline'
import IconDark from '@/assets/icons/dark.svg?inline'

export default {
  name: 'Theme-settings',
  components: {
    IconSystem,
    IconLight,
    IconDark
  },
  data() {
    return {
      colors: ['system', 'light', 'dark']
    }
  },
  methods: {
    openSwitcher() {
      let opacity = this.$refs.colors.style.opacity
      this.$refs.colors.style.opacity = opacity
        ? (this.$refs.colors.style = '')
        : 1
    }
  },
  computed: {
    remainingColors() {
      return this.colors.filter(color => color !== this.$colorMode.preference)
    }
  }
}
</script>

<style lang="scss">
.theme-settings {
  @include flex-display(center, flex-end);
}

.theme-settings .item {
  display: inline-block;
  list-style: none;
  padding: 0;
}

.theme-settings .link {
  text-decoration: none;
  font: 1.4rem/1 $font;
  letter-spacing: 0.25px;
  color: $link;
}

.theme-settings .color-switcher {
  @include flex-display(center, center);
  position: relative;
  z-index: 8;
  width: 8rem;
  height: 8rem;
}

.theme-settings .color-switcher .icon {
  transition: background 200ms cubic-bezier(1, 0, 0, 1) 0ms;
  position: relative;
  background: $button-icon;
  outline: none;
  height: 4rem;
  width: 4rem;
  display: inline-block;
  border-radius: 50%;
  z-index: 7;
}

.theme-settings .color-switcher .icon:hover {
  background: $button-icon-hover;
}

.theme-settings .color-switcher .colors {
  background: $button-icon;
  border-radius: 25px;
  position: absolute;
  padding-top: 3.1rem;
  top: 2rem;
  width: 4rem;
  height: auto;
  opacity: 0;
  transition: opacity 0.4s;
}

.theme-settings .color-switcher .colors .item {
  @include flex-display(center, center, column);
  margin: 1rem;
}

.theme-settings
  .color-switcher
  .icon-container
  .selected:note(.feather-monitor) {
  fill: $light-glow;
  stroke: $light-glow;
}

.theme-settings .color-switcher .icon-container .system-light {
  fill: $light-glow;
}

.theme-settings .color-switcher .icon-container .system-dark {
  fill: $background-color;
}
</style>