<template>
  <footer class="site-footer">
    <div class="container">
      <div class="start">
        <Logo />
        <ul class="footer-menu">
          <li class="item">
            <AnchorTag
              link="https://ko-fi.com/smakss/"
              :text="$t('links.donate')"
            />
          </li>
          <li class="item" v-for="link in links" :key="link.id">
            <NuxtLink
              :to="`/${
                $i18n.locale !== 'en'
                  ? `${$i18n.locale}/${link.link}/`
                  : `${link.link}/`
              }`"
              class="link"
              >{{ $t(`links.${link.id}`) }}</NuxtLink
            >
          </li>
        </ul>
      </div>
      <Social />
    </div>
  </footer>
</template>

<script>
import Logo from '@/components/icons/Logo'
import AnchorTag from '@/components/links/anchorTag'
import Social from '@/components/icons/Social'

export default {
  name: 'Footer',
  components: {
    Logo,
    AnchorTag,
    Social,
  },
  data() {
    return {
      links: [
        {id: 'stuff', link: 'stuff'},
        {id: 'about', link: 'stuff/about'},
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.site-footer {
  background: $footer-color;

  width: 100%;

  margin-top: auto;

  & .container {
    @include flex-display(
      $alignItems: center,
      $justifyContent: space-between,
      $gap: 5rem
    );

    max-width: $container-max-size;

    padding-top: 4rem;
    padding-bottom: 4rem;
    margin: 0 auto;

    @media (max-width: $container-max-size) {
      padding-right: 2rem;
      padding-left: 2rem;
    }

    @media (max-width: $large-tablet-viewport) {
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      gap: 3rem;
    }

    @media (max-width: $default-mobile-viewport) {
      height: auto;
    }

    & .start {
      @include flex-display(
        $alignItems: center,
        $justifyContent: flex-start,
        $gap: 5rem
      );

      @media (max-width: $large-tablet-viewport) {
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 3rem;
      }
    }

    & .footer-menu {
      @include flex-display(
        $alignItems: center,
        $justifyContent: flex-start,
        $gap: 3rem
      );
    }

    & /deep/ .svg-container.logo > svg {
      height: 1.8rem;
      width: 8.6rem;
      fill: $link;

      @media (max-width: $default-mobile-viewport) {
        height: 1.5rem;
        width: 8rem;
      }
    }

    & .item {
      display: inline-block;

      list-style: none;

      padding: 0;

      & .link {
        font: 1.4rem/1 $font;

        text-decoration: none;
        letter-spacing: 0.25px;

        color: $link;

        @media (max-width: $default-mobile-viewport) {
          font-size: 1.3rem;
        }

        &:hover {
          color: $link-hover;
        }
      }
    }
  }
}
</style>
