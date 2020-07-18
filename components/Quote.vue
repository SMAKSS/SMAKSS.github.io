<template>
  <div class="site-intro">
    <Social />
    <p v-if="$fetchState.pending">Fetching posts...</p>
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
import Social from '@/components/icons/Social'
import { gsap } from 'gsap'

export default {
  name: 'Quote',
  components: {
    Social
  },
  data: () => {
    return {
      quoteData: null,
      requestStatus: false,
      quoteErrorContent: ''
    }
  },
  created() {
    if (!this.quoteData && this.$cookies.get('quote') !== undefined) {
      this.quoteData = this.$cookies.get('quote')
    }
  },
  async fetch() {
    if (this.$cookies.get('quote') === undefined) {
      const response = await fetch(
        'https://api.quotable.io/random'
      ).then(response => response.json())

      if (response.content) {
        this.quoteData = response
        this.quoteData.search = `https://www.google.com/search?q=${this.quoteData?.author
          .split(' ')
          .join('+')}+quotes`
        this.requestStatus = true
      } else if (process.server) {
        this.$nuxt.context.res.statusCode = response.statusCode
        this.requestStatus = false
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

    if (this.$cookies.get('quote') === undefined && this.requestStatus) {
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
    }

    if (this.$refs.quoteContent || this.$refs.quoteError) this.animatedQuote()
  },
  methods: {
    animatedQuote() {
      let animatedClassesSetOne = null
      let animatedClassesSetTwo = null

      if (this.$fetchState.error) {
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
        { opacity: 1, visibility: 'visible', delay: 1 },
        'content'
      )
      tl.to(animatedClassesSetOne, { y: 0, duration: 0.5 }, 'content+=2')
      tl.fromTo(
        animatedClassesSetTwo,
        { opacity: 0, visibility: 'hidden', y: 30 },
        { opacity: 1, visibility: 'visible', duration: 1 },
        'content+=2'
      )
      tl.to(animatedClassesSetTwo, { y: 0, duration: 0.5 }, 'content+=2')
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

.quote-content,
.quote-author,
.logos {
  direction: ltr;
}

.quote-content,
.quote-error {
  font: 400 3.6rem/4.4rem $font;
  width: 80%;
  max-width: 20.5em;
  margin: 0.75em auto 0;
  color: $heading-color;
}

.quote-content {
  font: 400 3.6rem/4.4rem $font-en;
}

@media (max-width: 767px) {
  .quote-content,
  .quote-error {
    font-size: 2.4rem;
    line-height: 3rem;
    margin-top: 0;
    width: calc(100% - 8rem);
  }

  .quote-author,
  .quote-reason {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
}

@media (max-width: 480px) {
  .quote-content,
  .quote-error {
    width: 75%;
  }
}

.quote-content.max-width-none {
  max-width: unset;
}

.quote-author,
.quote-reason {
  max-width: 620px;
  margin: 2rem auto 3rem;
  color: $text-color;
  text-decoration: none;
}

.quote-author {
  font: 400 1.5rem/2.3rem $font-en;
}

.quote-author {
  cursor: pointer;
}

.quote-author:hover {
  color: $link-hover;
}

.dark-mode .quote-author:hover {
  color: $link;
}
</style>