<template>
  <div class="site-intro">
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <template v-else-if="$fetchState.error || !quoteData">
      <h2 class="quote-error">{{ $t('quote.error') }}</h2>
      <p class="quote-reason">{{ $t('quote.reason') }}</p>
    </template>
    <template v-else>
      <h2
        class="quote-content"
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
export default {
  name: 'Quote',
  head() {
    return {
      title: this.$t('title.index')
    }
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
  mounted() {
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

.site-intro {
  text-align: center;
  position: absolute;
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

.quote-content,
.quote-author {
  direction: ltr;
}

@media (max-width: 767px) {
  .quote-content,
  .quote-error {
    margin-top: 0;
    width: calc(100% - 8rem);
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