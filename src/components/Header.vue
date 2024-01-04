<template>
  <header class="site-header" ref="siteHeader">
    <div class="container">
      <Logo />
      <ClientOnly>
        <div class="site-settings">
          <div
            class="settings localization-switcher"
            ref="localizationSwitcher"
            data-list="locales"
          >
            <Button
              @onClick="switchHandler"
              :mainClass="'dropdown'"
              :spanClass="'dropdown-container link'"
              >{{ selectedLocal.lang }}</Button
            >
            <ul class="locales" ref="locales">
              <li
                class="item locale"
                v-for="locale of remainingLocales"
                :key="locale.lang"
                @click.self="switchHandler"
              >
                <NuxtLink
                  @click.native="localChangeLinkHandler"
                  :to="locale.path"
                  class="link"
                  :class="{
                    en: $i18n.locale === 'fa',
                    fa: $i18n.locale === 'en',
                  }"
                  exact
                  >{{ locale.lang }}</NuxtLink
                >
              </li>
            </ul>
          </div>
          <div class="settings color-switcher" data-list="colors">
            <Button
              @onClick="switchHandler"
              :mainClass="'icon'"
              :title="$t(`titles.${$colorMode.preference}`)"
              :ariaLabel="$t(`titles.${$colorMode.preference}`)"
              :spanClass="'icon-container'"
            >
              <component
                :is="`icon-${$colorMode.preference}`"
                class="selected"
                :class="{
                  'system-light':
                    $colorMode.preference === 'system' &&
                    $colorMode.value === 'light',
                  'system-dark':
                    $colorMode.preference === 'system' &&
                    $colorMode.value === 'dark',
                }"
              />
            </Button>
            <ul class="colors" ref="colors">
              <li
                class="item color"
                :title="$t(`titles.${color}`)"
                v-for="color of remainingColors"
                :key="color"
                @click="
                  event => {
                    switchHandler(event)
                    $colorMode.preference = color
                  }
                "
              >
                <span class="icon-container">
                  <component :is="`icon-${color}`" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </ClientOnly>
    </div>
  </header>
</template>

<script>
import {gsap} from 'gsap'

import Logo from '@/components/icons/Logo'
import Button from '@/components/buttons/Button'
import IconSystem from '@/assets/icons/system.svg?inline'
import IconLight from '@/assets/icons/light.svg?inline'
import IconDark from '@/assets/icons/dark.svg?inline'

export default {
  name: 'Header',
  props: ['error'],
  components: {
    Logo,
    Button,
    IconSystem,
    IconLight,
    IconDark,
  },
  data() {
    return {
      colors: ['system', 'light', 'dark'],
      locales: [
        {
          code: 'en',
          lang: 'English',
          path: this.$route.fullPath.replace(/^\/[^\/]+\/*/, '/'),
          regex: /^\/[^\/]+\/*/,
        },
        {
          code: 'fa',
          lang: 'فارسـی',
          path: `/fa${this.$route.fullPath.replace(/^\/(fa)+\/*/, '/')}`,
          regex: /^\/(fa)+\/*/,
        },
      ],
    }
  },
  methods: {
    visibilityHandler({switcher, ref, opacity}) {
      if (opacity) {
        gsap.to(this.$refs[ref], 0.1, {y: -1, opacity: '', visibility: ''})
        switcher.classList.remove('active')
      } else {
        const tl = gsap.timeline({
          onComplete: () => switcher.classList.add('active'),
        })
        tl.fromTo(
          this.$refs[ref],
          0.1,
          {y: -5},
          {y: 0, opacity: 1, visibility: 'inherit'},
        )
      }
    },
    switchHandler(event) {
      const switcher = event.target.closest('.settings')
      const ref = switcher.dataset.list
      this.visibilityHandler({
        switcher,
        ref,
        opacity: this.$refs[ref].style.opacity,
      })

      if (event.target.classList.contains('item') && ref === 'locales')
        event.target.querySelector('.link').click()
    },
    localChangeLinkHandler(event) {
      /* Since the computed property change the structure of the locales list
      the closest element is not reachable for locale link so we implement this function instead */
      this.$refs.locales.style.opacity &&
        this.visibilityHandler({
          switcher: this.$refs.localizationSwitcher,
          ref: 'locales',
          opacity: this.$refs.locales.style.opacity,
        })
    },
  },
  mounted() {
    gsap.set(this.$refs.siteHeader, {y: -150})
    gsap.to(this.$refs.siteHeader, 0.7, {y: 0})
  },
  computed: {
    remainingColors() {
      return this.colors.filter(color => color !== this.$colorMode.preference)
    },
    selectedLocal() {
      return this.locales.find(locale => locale.code === this.$i18n.locale)
    },
    remainingLocales() {
      return this.locales.filter(locale => locale.code !== this.$i18n.locale)
    },
  },
  watch: {
    $route(to) {
      this.locales.forEach(locale => {
        locale.path = to.fullPath.replace(locale.regex, '/')

        if (locale.code !== 'en' && locale.path === to.fullPath)
          locale.path = `/${locale.code}${to.fullPath}`
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.site-header {
  position: relative;

  width: 100%;

  border-bottom: 1px solid $secondary-border-color;

  z-index: 9;

  & .container {
    @include flex-display(center, space-between);

    max-width: $container-max-size;
    height: 64px;

    margin: 0 auto;

    @media (max-width: $container-max-size) {
      padding: 0 2rem;
    }

    @media (max-width: $default-tablet-viewport) {
      height: 60px;
    }
  }
}

.site-header .container /deep/ .svg-container.logo > svg {
  height: 1.8rem;
  width: 8.6rem;
  fill: $link;

  @media (max-width: $default-mobile-viewport) {
    height: 1.5rem;
    width: 8rem;
  }
}

.site-header .container .site-settings {
  @include flex-display(
    $alignItems: center,
    $justifyContent: flex-end,
    $gap: 2rem
  );
}

.site-header .container .site-settings .item {
  display: inline-block;
  list-style: none;
  padding: 0;
  cursor: pointer;
}

.site-header .container .site-settings /deep/ .link {
  text-decoration: none;
  font: 1.4rem/1 $font;
  letter-spacing: 0.25px;
  color: $settings-default;
  user-select: none;
}

.site-header .container .site-settings.pillar-active /deep/ .link {
  color: $settings-pillar-activated;
}

.site-header .container .site-settings /deep/ .link.en {
  font-family: $font-en;
}

.site-header .container .site-settings /deep/ .link.fa {
  font-family: $font-fa;
}

.site-header .container .site-settings .localization-switcher,
.site-header .container .site-settings .color-switcher {
  @include flex-display($alignItems: center, $justifyContent: center);

  position: relative;
  z-index: 8;
  height: auto;
}

.site-header .container .site-settings .localization-switcher /deep/ .dropdown,
.site-header .container .site-settings .color-switcher .icon {
  @include flex-display($alignItems: center, $justifyContent: center);
  position: relative;
  background: $button-icon;
  outline: none;
  height: 4rem;
  z-index: 7;
  transition: background 200ms cubic-bezier(1, 0, 0, 1) 0ms;
}

.site-header
  .container
  .site-settings.pillar-active
  .localization-switcher
  /deep/
  .dropdown,
.site-header .container .site-settings.pillar-active .color-switcher .icon {
  background: $background-color;
}

.site-header .container .site-settings .localization-switcher /deep/ .dropdown {
  border-radius: 25px;
}

.site-header .container .site-settings .localization-switcher /deep/ .dropdown,
.site-header .container .site-settings .localization-switcher .locales {
  width: 9rem;

  @media (max-width: $small-mobile-viewport) {
    width: 8rem;
  }
}

.site-header
  .container
  .site-settings
  .localization-switcher.active
  /deep/
  .dropdown::before,
.site-header
  .container
  .site-settings
  .color-switcher.active
  /deep/
  .icon::before {
  content: '';
  position: absolute;
  top: 4rem;
  right: 1.1rem;
  width: calc(100% - 24px);
  height: 1px;
  background-color: $border-color;
}

.site-header
  .container
  .site-settings
  .localization-switcher
  /deep/
  .dropdown:hover,
.site-header .container .site-settings .color-switcher /deep/ .icon:hover {
  background: $button-icon-hover;
}

.site-header .container .site-settings .localization-switcher .locales,
.site-header .container .site-settings .color-switcher .colors {
  position: absolute;
  background: $button-icon;
  height: auto;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  transition: opacity 0.5s, visibility 0.5s;
}

.site-header
  .container
  .site-settings.pillar-active
  .localization-switcher
  .locales,
.site-header .container .site-settings.pillar-active .color-switcher .colors {
  background: $background-color;
}

.site-header .container .site-settings .localization-switcher .locales {
  top: 2rem;
  text-align: center;
  border-radius: 0 0 25px 25px;
  padding-top: 2rem;
  padding-bottom: 1rem;
}

.site-header .container .site-settings .localization-switcher .locales .locale {
  padding: 1rem;
}

.site-header .container .site-settings .color-switcher /deep/ .icon {
  border-radius: 50%;
}

.site-header .container .site-settings .color-switcher /deep/ .icon,
.site-header .container .site-settings .color-switcher .colors {
  width: 4rem;
}

.site-header .container .site-settings .color-switcher .colors {
  border-radius: 25px;
  padding-top: 4rem;
  top: 0;
}

.site-header .container .site-settings .color-switcher .colors .color {
  @include flex-display(center, center, column);
  padding: 1rem;
  color: $settings-default;
}

.site-header
  .container
  .site-settings.pillar-active
  .color-switcher
  /deep/
  .icon-container {
  color: $settings-pillar-activated;
}

.site-header
  .container
  .site-settings
  .color-switcher
  /deep/
  .icon-container
  .feather {
  width: 2.5rem;
}

.site-header
  .container
  .site-settings
  .color-switcher
  .colors
  /deep/
  .icon-container
  .feather {
  width: 2rem;
}

.site-header
  .container
  .site-settings
  .color-switcher
  /deep/
  .icon-container
  .selected:note(.feather-monitor) {
  fill: $light-glow;
  stroke: $light-glow;
}

.site-header
  .container
  .site-settings
  .color-switcher
  /deep/
  .icon-container
  .system-light {
  fill: $light-glow;
}

.site-header
  .container
  .site-settings
  .color-switcher
  /deep/
  .icon-container
  .system-dark {
  fill: $background-color;
}
</style>
