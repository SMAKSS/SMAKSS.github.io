<template>
  <div class="site-intro">
    <Social />
    <div v-if="$fetchState.pending" ref="pending" class="pending">
      <!-- <div ref="pending" class="pending"> -->
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
    <button class="button" :title="$t('buttons.start')">
      <span class="label">{{$t('buttons.start')}}</span>
    </button>
  </div>
</template>

<script>
import { gsap } from 'gsap'

import Logo from '~/assets/icons/SMAKSS.svg?inline'
import Social from '@/components/icons/Social'

export default {
  name: 'Quote',
  fetchOnServer: false,
  components: {
    Logo,
    Social
  },
  data: () => {
    return {
      smakssEl: {},
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

    if (this.$refs.quoteContent || this.$refs.quoteError) this.animatedQuote()
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
    }
  }
}
</script>

<style lang="scss">
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

.site-intro .logos {
  display: block;
  height: 6rem;
  margin-bottom: 4rem;
  bottom: 0;
}

.site-intro .logos .logo {
  display: inline-block;
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
}

.site-intro .logos .logo .svg-container {
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
  font: 400 3.6rem/4.4rem $font;
  width: 80%;
  max-width: 20.5em;
  margin: 0.75em auto 0;
  color: $heading-color;
}

.site-intro .quote-content {
  font: 400 3.6rem/4.4rem $font-en;
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
</style>