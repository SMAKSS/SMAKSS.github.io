<template>
  <footer class="site-footer">
    <NuxtLink :to="`/${($i18n.locale !== 'en') ? `${$i18n.locale}/` : '' }`" exact>
      <span class="svg-container logo">logo</span>
    </NuxtLink>

    <ul>
      <li class="item">
        <a
          href="https://ko-fi.com/smakss"
          rel="noopener noreferrer"
          target="_blank"
          class="link"
        >{{$t('links.donate')}}</a>
      </li>
      <li class="item">
        <NuxtLink :to="$i18n.path('about')" class="link" exact>{{$t('links.about')}}</NuxtLink>
      </li>
    </ul>

    <div class="localization-bar">
      <NuxtLink :to="$route.fullPath.replace(/^\/[^\/]+/, '')" class="link" exact>English</NuxtLink>
      <NuxtLink :to="`/fa` + $route.fullPath.replace(/^\/['fa']+/, '')" class="link" exact>فارسی</NuxtLink>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
footer {
  @include flex-display(center, flex-start);
  height: auto;
  width: 100%;
  background: $footer-color;
  padding: 4rem;
}

footer .svg-container {
  height: 100%;
  width: 100%;
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

footer .svg-container.logo {
  height: 2.8rem;
  width: 8.6rem;
  margin-right: 5rem;
}

footer .link {
  text-decoration: none;
  font: 1.4rem/1 $font;
  letter-spacing: 0.25px;
  color: $link;
}

footer .item {
  list-style: none;
  display: inline-block;
  margin: 1rem 3rem 1rem 0;
  padding: 0;
}

footer .link:hover {
  color: $link-hover;
}

footer .localization-bar {
  margin-left: auto;
}

footer .localization-bar .link {
  margin: 1rem 0 1rem 3rem;
}
</style>