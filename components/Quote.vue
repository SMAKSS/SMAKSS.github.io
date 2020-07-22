<template>
  <div class="site-intro">
    <Social />
    <div v-if="$fetchState.pending" ref="pending" class="pending">
      <Logo />
    </div>
    <template v-else-if="$fetchState.error || !quoteData">
      <h2 class="quote-error" ref="quoteError">{{ $t('quote.error') }}</h2>
      <p class="quote-reason">{{ $t('quote.reason') }}</p>
    </template>
    <template v-else>
      <h2
        class="quote-content"
        ref="quoteContent"
        :class="{'max-width-none': quoteData.length > 120}"
        :title="$t('quote.title.content')"
      >{{quoteData.content}}</h2>
      <a
        :href="quoteData.search"
        rel="noopener noreferrer"
        target="_blank"
        class="quote-author"
        :title="$t('quote.title.author')"
      >{{quoteData.author}}</a>
    </template>
    <Button :title="$t('buttons.start')">{{$t('buttons.start')}}</Button>
    <Info @moreInfo="modalHandler" />
    <Modal :trigger="$store.state.modalTrigger">
      <h1 class="info-title">{{$t('contents.info.title')}}</h1>
      <perfect-scrollbar class="scroll-wrapper">
        <div class="scroll-content">
          <p class="info-description">{{$t('contents.info.description')}}</p>
          <p class="info-ps">
            {{$t('contents.info.ps')}}
            <a
              href="https://github.com/lukePeavey/quotable"
              rel="noopener noreferrer"
              target="_blank"
            >{{$t('contents.info.quotable')}}</a>
          </p>
        </div>
      </perfect-scrollbar>
      <Button
        @onClick="modalHandler"
        :mainClass="'button close'"
        :title="$t('buttons.close')"
      >{{$t('buttons.close')}}</Button>
    </Modal>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

import Logo from '~/assets/icons/SMAKSS.svg?inline'
import Button from '@/components/buttons/Button'
import Social from '@/components/icons/Social'
import Info from '@/components/buttons/Info'
import Modal from '@/components/Modal'
import handlers from '@/mixins/handlers'

export default {
  name: 'Quote',
  fetchOnServer: false,
  components: {
    PerfectScrollbar,
    Logo,
    Button,
    Social,
    Info,
    Modal
  },
  mixins: [handlers],
  data: () => {
    return {
      smakssEl: {},
      animationState: false,
      quoteData: null,
      quoteErrorContent: ''
    }
  },
  created() {
    if (!this.quoteData && this.$cookies.get('quote')) {
      this.quoteData = this.$cookies.get('quote')
    }
  },
  async fetch() {
    if (!this.$cookies.get('quote') && !this.requestStatus) {
      const response = await fetch(
        'https://api.quotable.io/random'
      ).then(response => response.json())

      if (response.content) {
        this.quoteData = response
        this.quoteData.search = `https://www.google.com/search?q=${this.quoteData?.author
          .split(' ')
          .join('+')}+quotes`
        const quote = {
          author: this.quoteData?.author,
          content: this.quoteData?.content,
          length: this.quoteData?.length,
          search: this.quoteData?.search
        }

        this.$cookies.set('quote', JSON.stringify(quote), {
          path: '/',
          maxAge: 60 * 60 * 24 * 1
        })
      } else if (process.server) {
        this.$nuxt.context.res.statusCode = response.statusCode
        throw new Error(`\n Qoute request failed!`)
      }
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  updated() {
    if (
      (this.$refs.quoteContent || this.$refs.quoteError) &&
      !this.animationState
    )
      this.animatedQuote()
  },
  methods: {
    animatedQuote() {
      let animatedClassesSetOne = null
      let animatedClassesSetTwo = null

      if (this.$fetchState.error || !this.quoteData) {
        animatedClassesSetOne = '.quote-error'
        animatedClassesSetTwo = ['.button', '.logos', '.quote-reason']
      } else {
        animatedClassesSetOne = '.quote-content'
        animatedClassesSetTwo = ['.quote-author', '.button', '.logos']
      }

      const tl = gsap.timeline()
      tl.fromTo(
        animatedClassesSetOne,
        { opacity: 0, visibility: 'hidden', y: 70 },
        { opacity: 1, visibility: 'inherit', delay: 1 },
        'content'
      )
        .to(animatedClassesSetOne, { y: 0, duration: 0.5 }, 'content+=2')
        .fromTo(
          animatedClassesSetTwo,
          { opacity: 0, visibility: 'hidden', y: 30 },
          { opacity: 1, visibility: 'inherit', duration: 1 },
          'content+=2'
        )
        .to(animatedClassesSetTwo, { y: 0, duration: 0.5 }, 'content+=2')
      this.animationState = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

.site-intro {
  @include flex-display(center, center, column);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 8;
  overflow: hidden;
}

.site-intro,
.logos {
  text-align: center;
  position: absolute;
}

.site-intro /deep/ .logos {
  display: block;
  height: 6rem;
  margin-bottom: 4rem;
  bottom: 0;
}

.site-intro /deep/ .logos .logo {
  display: inline-block;
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
}

.site-intro /deep/ .logos .logo .svg-container {
  height: 100%;
  width: 100%;
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.site-intro .quote-content,
.site-intro .quote-author,
.site-intro .logos {
  direction: ltr;
}

.site-intro .pending {
  @include flex-display(center, center);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $background-color;
}

.site-intro .pending svg {
  width: 15rem;
  fill: $heading-color;
}

.site-intro .quote-content,
.site-intro .quote-error {
  width: 80%;
  max-width: 20.5em;
  margin: 0.75em auto 0;
  color: $heading-color;
}

.site-intro .quote-content {
  font: 400 3.6rem/4.4rem $font-en;
}

.site-intro .quote-error {
  font: 400 3.6rem/4.4rem $font;
}

@media (max-width: 767px) {
  .site-intro .quote-content,
  .site-intro .quote-error {
    font-size: 2.4rem;
    line-height: 3rem;
    margin-top: 0;
    width: calc(100% - 8rem);
  }

  .site-intro .quote-author,
  .site-intro .quote-reason {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
}

@media (max-width: 480px) {
  .site-intro .quote-content,
  .site-intro .quote-error {
    width: 75%;
  }
}

.site-intro .quote-content.max-width-none {
  max-width: unset;
}

.site-intro .quote-author,
.site-intro .quote-reason {
  max-width: 620px;
  margin: 2rem auto 3rem;
  color: $text-color;
  text-decoration: none;
}

.site-intro .quote-reason {
  font: 400 1.5rem/2.3rem $font;
}

.site-intro .quote-author {
  font: 400 1.5rem/2.3rem $font-en;
}

.site-intro .quote-author {
  cursor: pointer;
}

.site-intro .quote-author:hover {
  color: $link-hover;
}

.dark-mode .site-intro .quote-author:hover {
  color: $link;
}

.site-intro button.info.icon {
  top: auto;
  bottom: 2rem;
  position: absolute;
  z-index: 3;
}

html[dir='ltr'] .site-intro button.info.icon {
  right: 2rem;
  left: auto;
}

html[dir='rtl'] .site-intro button.info.icon {
  left: 2rem;
  right: auto;
}

.site-intro /deep/ .modal .content .information .info-title {
  font: 400 3.6rem/4.4rem $font;
  color: $heading-color;
  margin-bottom: 2rem;
  padding: 0 20%;
}

html[dir='ltr'] .site-intro /deep/ .modal .content .information .info-title {
  text-align: left;
}

html[dir='rtl'] .site-intro /deep/ .modal .content .information .info-title {
  text-align: right;
}

@media (max-width: 767px) {
  .site-intro /deep/ .modal .content .information .info-title {
    font-size: 2.4rem;
    line-height: 3rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .site-intro /deep/ .modal .content .information .info-title {
    padding: 0 5%;
  }
}

.site-intro /deep/ .modal .content .information .scroll-wrapper {
  height: calc(100% - 16rem);
  width: 60%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .site-intro /deep/ .modal .content .information .scroll-wrapper {
    width: 100%;
    padding: 0 20%;
    margin: 0;
  }
}

@media (max-width: 610px) {
  html[dir='ltr']
    .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper {
    padding: 0 0 0 20%;
  }

  html[dir='rtl']
    .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper {
    padding: 0 20% 0 0;
  }
}

@media (max-width: 480px) {
  html[dir='ltr']
    .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper {
    padding: 0 0 0 5%;
  }

  html[dir='rtl']
    .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper {
    padding: 0 5% 0 0;
  }

  .site-intro /deep/ .modal .content .information .scroll-wrapper {
    height: calc(100% - 20rem);
    width: 100%;
    margin: 0 auto;
  }
}

.site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

html[dir='ltr']
  .site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content {
  padding-right: 20px;
}

html[dir='rtl']
  .site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content {
  padding-left: 20px;
}

.site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-description,
.site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-ps {
  margin-bottom: 2rem;
  color: $text-color;
}

.site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-description {
  font: 400 1.5rem/2.3rem $font;
}

.site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-ps {
  font: 400 1.2rem/1.8rem $font;
}

html[dir='ltr']
  .site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-description,
html[dir='ltr']
  .site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-ps {
  padding-right: 2em;
  text-align: left;
}

html[dir='rtl']
  .site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-description,
html[dir='rtl']
  .site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-ps {
  padding-left: 2em;
  text-align: right;
}

.site-intro
  /deep/
  .modal
  .content
  .information
  .scroll-wrapper
  .scroll-content
  .info-ps
  a {
  color: $button;
}

@media (max-width: 767px) {
  .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper
    .scroll-content
    .info-description {
    font-size: 1.3rem;
    line-height: 1.9rem;
  }

  .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper
    .scroll-content
    .info-ps {
    font-size: 1.1rem;
    line-height: 1.7rem;
  }
}

@media (max-width: 480px) {
  .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper
    .scroll-content
    .info-description {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }

  .site-intro
    /deep/
    .modal
    .content
    .information
    .scroll-wrapper
    .scroll-content
    .info-ps {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.site-intro /deep/ .modal .content .information .close {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>