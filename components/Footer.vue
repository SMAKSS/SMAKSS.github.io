<template>
  <footer class="site-footer">
    <div class="container">
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
  </footer>
</template>

<script>
import Logo from '@/components/icons/Logo'
import AnchorTag from '@/components/links/anchorTag'

export default {
  name: 'Footer',
  components: {
    Logo,
    AnchorTag,
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
    @include flex-display($alignItems: center, $justifyContent: flex-start);

    max-width: $container-max-size;
    height: auto;

    padding: 4rem 0;
    margin: 0 auto;

    @media (max-width: $container-max-size) {
      padding-right: 2rem;
      padding-left: 2rem;
    }
  }
}

@media (max-width: $large-tablet-viewport) {
  .site-footer .container {
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }
}

@media (max-width: $default-mobile-viewport) {
  .site-footer .container {
    height: auto;
    padding: 4rem 2rem;
  }
}

html[dir='ltr'] .site-footer .container /deep/ .svg-container.logo > svg {
  margin-right: 5rem;
}

html[dir='rtl'] .site-footer .container /deep/ .svg-container.logo > svg {
  margin-left: 5rem;
}

.site-footer .container /deep/ .svg-container.logo > svg {
  height: 1.8rem;
  width: 8.6rem;
  fill: $link;
}

@media (max-width: $large-tablet-viewport) {
  .site-footer .container /deep/ .svg-container.logo > svg {
    margin-bottom: 3rem;
  }
}

@media (max-width: $default-mobile-viewport) {
  .site-footer .container /deep/ .svg-container.logo > svg {
    height: 1.5rem;
    width: 8rem;
  }
}

.site-footer .container .item {
  list-style: none;
  display: inline-block;
  padding: 0;
}

.site-footer .container .link {
  text-decoration: none;
  font: 1.4rem/1 $font;
  letter-spacing: 0.25px;
  color: $link;
}

@media (max-width: $default-mobile-viewport) {
  .site-footer .container .link {
    font-size: 1.3rem;
  }
}

html[dir='ltr'] .site-footer .container .footer-menu .item {
  margin: 1rem 3rem 1rem 0;
}

html[dir='rtl'] .site-footer .container .footer-menu .item {
  margin: 1rem 0 1rem 3rem;
}

.site-footer .container .link:hover {
  color: $link-hover;
}
</style>
