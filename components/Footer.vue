<template>
  <footer class="site-footer">
    <Logo />
    <ul class="footer-menu">
      <li class="item">
        <a
          href="https://ko-fi.com/smakss/"
          rel="noopener noreferrer"
          target="_blank"
          class="link"
        >{{$t('links.donate')}}</a>
      </li>
    </ul>
  </footer>
</template>

<script>
import Logo from '@/components/icons/Logo'

export default {
  name: 'Footer',
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.site-footer {
  @include flex-display(center, flex-start);
  height: auto;
  width: 100%;
  background: $footer-color;
  padding: 4rem;
}

@media (max-width: 1023px) {
  .site-footer {
    @include flex-display(flex-start, center, column);
  }
}

@media (max-width: 767px) {
  .site-footer {
    height: auto;
    padding: 4rem 2rem;
  }
}

html[dir='ltr'] .site-footer .svg-container.logo > svg {
  margin-right: 5rem;
}

html[dir='rtl'] .site-footer .svg-container.logo > svg {
  margin-left: 5rem;
}

.site-footer .svg-container.logo > svg {
  height: 1.8rem;
  width: 8.6rem;
  fill: $link;
}

@media (max-width: 1023px) {
  .site-footer .svg-container.logo > svg {
    margin-bottom: 3rem;
  }
}

.site-footer .link {
  text-decoration: none;
  font: 1.4rem/1 $font;
  letter-spacing: 0.25px;
  color: $link;
}

.site-footer .item {
  list-style: none;
  display: inline-block;
  padding: 0;
}

html[dir='ltr'] .site-footer .footer-menu .item {
  margin: 1rem 3rem 1rem 0;
}

html[dir='rtl'] .site-footer .footer-menu .item {
  margin: 1rem 0 1rem 3rem;
}

.site-footer .link:hover {
  color: $link-hover;
}
</style>