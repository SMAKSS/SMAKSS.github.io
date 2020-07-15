<template>
  <div class="site-settings">
    <div class="settings localization-switcher" ref="localizationSwitcher" data-list="locales">
      <button class="dropdown" @click="switchHandler">
        <span class="dropdown-container link">{{ selectedLocal.lang }}</span>
      </button>
      <ul class="locales" ref="locales">
        <li
          class="item"
          v-for="local of remainingLocales"
          :key="local.lang"
          @click.self="switchHandler"
        >
          <NuxtLink
            @click.native="localChangeLinkHandler"
            :to="local.path"
            class="link"
            exact
          >{{ local.lang }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="settings color-switcher" data-list="colors">
      <button
        class="icon"
        :title="$t(`title.${$colorMode.preference}`)"
        :aria-label="$t(`title.${$colorMode.preference}`)"
        @click="switchHandler"
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
          @click="(event) => { switchHandler(event); $colorMode.preference = color; }"
        >
          <component :is="`icon-${color}`" />
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
      colors: ['system', 'light', 'dark'],
      locales: [
        {
          code: 'en',
          lang: 'English',
          path: this.$route.fullPath.replace(/^\/[^\/]+/, '')
        },
        {
          code: 'fa',
          lang: 'فارسـی',
          path: `/fa${this.$route.fullPath.replace(/^\/['fa']+/, '')}`
        }
      ]
    }
  },
  methods: {
    visibilityHandler({ switcher, ref, opacity }) {
      if (opacity) {
        switcher.classList.remove('active')
        this.$refs[ref].style = ''
      } else {
        switcher.classList.add('active')
        this.$refs[ref].style.opacity = 1
        this.$refs[ref].style.visibility = 'inherit'
      }
    },
    switchHandler(event) {
      const switcher = event.target.closest('.settings')
      const ref = switcher.dataset.list
      this.visibilityHandler({
        switcher,
        ref,
        opacity: this.$refs[ref].style.opacity
      })

      if (event.target.classList.contains('item') && ref === 'locales')
        event.target.querySelector('.link').click()
    },
    localChangeLinkHandler(event) {
      /* Since the computed property change the structure of the locales list
      the closest element is not reachable for local link so we implement this function instead */
      this.$refs.locales.style.opacity &&
        this.visibilityHandler({
          switcher: this.$refs.localizationSwitcher,
          ref: 'locales',
          opacity: this.$refs.locales.style.opacity
        })
    }
  },
  computed: {
    remainingColors() {
      return this.colors.filter(color => color !== this.$colorMode.preference)
    },
    selectedLocal() {
      return this.locales.find(local => local.code === this.$i18n.locale)
    },
    remainingLocales() {
      return this.locales.filter(local => local.code !== this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss">
.site-settings {
  @include flex-display(center, flex-end);
}

.site-settings .item {
  display: inline-block;
  list-style: none;
  padding: 0;
  cursor: pointer;
}

.site-settings .link {
  text-decoration: none;
  font: 1.4rem/1 $font;
  letter-spacing: 0.25px;
  color: $settings-default;
  user-select: none;
}

.site-settings .localization-switcher,
.site-settings .color-switcher {
  @include flex-display(center, center);
  position: relative;
  z-index: 8;
  width: 9rem;
  height: auto;
}

.site-settings .localization-switcher .dropdown,
.site-settings .color-switcher .icon {
  transition: background 200ms cubic-bezier(1, 0, 0, 1) 0ms;
  position: relative;
  background: var(--button-icon);
  outline: none;
  height: 4rem;
  display: inline-block;
  z-index: 7;
}

.site-settings .localization-switcher .dropdown {
  border-radius: 25px;
}

.site-settings .localization-switcher .dropdown,
.site-settings .localization-switcher .locales {
  width: 9rem;
}

.site-settings .localization-switcher.active .dropdown::before,
.site-settings .color-switcher.active .icon::before {
  content: '';
  position: absolute;
  top: 4rem;
  right: 1.1rem;
  width: calc(100% - 24px);
  height: 1px;
  background-color: $border-color;
}

.site-settings .localization-switcher .dropdown:hover,
.site-settings .color-switcher .icon:hover {
  background: $button-icon-hover;
}

.site-settings .localization-switcher .locales,
.site-settings .color-switcher .colors {
  position: absolute;
  background: $button-icon;
  height: auto;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  transition: opacity 0.5s, visibility 0.5s;
}

.site-settings .localization-switcher .locales {
  top: 2rem;
  text-align: center;
  border-radius: 0 0 25px 25px;
  padding-top: 2rem;
  padding-bottom: 1rem;
}

.site-settings .localization-switcher .locales .item {
  padding: 1rem;
}

.site-settings .color-switcher .icon {
  border-radius: 50%;
}

.site-settings .color-switcher .icon,
.site-settings .color-switcher .colors {
  width: 4rem;
}

.site-settings .color-switcher .colors {
  border-radius: 25px;
  padding-top: 4rem;
  top: 0;
}

.site-settings .color-switcher .colors .item {
  @include flex-display(center, center, column);
  padding: 1rem;
  color: $settings-default;
}

.site-settings
  .color-switcher
  .icon-container
  .selected:note(.feather-monitor) {
  fill: $light-glow;
  stroke: $light-glow;
}

.site-settings .color-switcher .icon-container .system-light {
  fill: $light-glow;
}

.site-settings .color-switcher .icon-container .system-dark {
  fill: $background-color;
}
</style>