<template></template>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .home-page {
    @include flex-display(center, center, column);
  }

  .home-page .content {
    top: auto;
    left: auto;
    position: relative;
    margin-bottom: 1rem;
    -webkit-transform: none;
    transform: none;
  }
}

@media (max-width: 767px) {
  .home-page .content .header {
    font-size: 2.4rem;
    line-height: 3rem;
    max-width: 15rem;
  }
}

@media (max-width: 767px) {
  .home-page .content .description {
    font-size: 1.2rem;
    line-height: 1.8rem;
    padding: 0 4rem;
  }
}

@media (max-height: 800px) {
  .home-page .draggable .pillar-link[data-pillar='about'] {
    width: 30rem;
  }
}
</style>