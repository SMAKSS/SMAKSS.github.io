<template>
  <main class="site-intro" ref="siteIntro">
    <div v-if="$fetchState.pending" class="pending">
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
      >
        {{ quoteData.content }}
      </h2>
      <a
        :href="quoteData.search"
        rel="noopener noreferrer"
        target="_blank"
        class="quote-author"
        :title="$t('quote.title.author')"
        >{{ quoteData.author }}</a
      >
    </template>
    <Button @onClick="introHandler" :title="$t('buttons.start')">{{
      $t('buttons.start')
    }}</Button>
    <Info @moreInfo="modalHandler" />
    <Modal :ariaHidden="true" :trigger="$store.state.modalTrigger">
      <h1 class="info-title">{{ $t('contents.info.title') }}</h1>
      <div class="scroll-wrapper">
        <div class="scroll-content">
          <p class="info-description">{{ $t('contents.info.description') }}</p>
          <p class="info-ps">
            {{ $t('contents.info.ps') }}
            <a
              href="https://github.com/lukePeavey/quotable"
              rel="noopener noreferrer"
              target="_blank"
              >{{ $t('contents.info.quotable') }}</a
            >
          </p>
        </div>
      </div>
      <Button
        @onClick="modalHandler"
        :mainClass="'button close'"
        :title="$t('buttons.close')"
        >{{ $t('buttons.close') }}</Button
      >
    </Modal>
  </main>
</template>

<script>
import {gsap} from 'gsap'

import Logo from '~/assets/icons/SMAKSS.svg?inline'
import Button from '@/components/buttons/Button'
import Info from '@/components/buttons/Info'
import Modal from '@/components/Modal'
import handlers from '@/mixins/handlers'

export default {
  name: 'index',
  fetchOnServer: false,
  components: {
    Logo,
    Button,
    Info,
    Modal,
  },
  mixins: [handlers],
  head() {
    return {
      title: this.$t('titles.index'),
      description: this.$t('descriptions.index'),
    }
  },
  data: () => {
    return {
      smakssEl: {},
      animationState: false,
      quoteData: null,
      quoteErrorContent: '',
    }
  },
  created() {
    if (!this.quoteData && this.$cookies.get('quote')) {
      this.quoteData = this.$cookies.get('quote')
    }
  },
  async fetch() {
    if (!this.$cookies.get('quote') && !this.requestStatus) {
      const abortController = new AbortController()

      const response = await fetch('https://api.quotable.io/random', {
        signal: abortController.signal,
      }).then(response => response.json())

      setTimeout(() => {
        abortController.abort()
      }, 8000)

      if (response.content) {
        this.quoteData = response
        this.quoteData.search = `https://www.google.com/search?q=${this.quoteData?.author
          .split(' ')
          .join('+')}+quotes`
        const quote = {
          author: this.quoteData?.author,
          content: this.quoteData?.content,
          length: this.quoteData?.length,
          search: this.quoteData?.search,
        }

        this.$cookies.set('quote', JSON.stringify(quote), {
          path: '/',
          maxAge: 60 * 60 * 24 * 1,
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
    introHandler() {
      const tl = gsap.timeline()
      tl.to(this.$refs.siteIntro, 1, {opacity: 0}).to(this.$refs.siteIntro, {
        visibility: 'hidden',
      })
      setTimeout(() => this.$router.push('stuff/'), 1000)
    },
    animatedQuote() {
      let animatedClassesSetOne = null
      let animatedClassesSetTwo = null

      if (this.$fetchState.error || !this.quoteData) {
        animatedClassesSetOne = '.quote-error'
        animatedClassesSetTwo = ['.button', '.quote-reason']
      } else {
        animatedClassesSetOne = '.quote-content'
        animatedClassesSetTwo = ['.quote-author', '.button']
      }

      const tl = gsap.timeline()
      tl.fromTo(
        animatedClassesSetOne,
        {opacity: 0, visibility: 'hidden', y: 70},
        {opacity: 1, visibility: 'inherit', delay: 1},
        'content',
      )
        .to(animatedClassesSetOne, {y: 0, duration: 0.5}, 'content+=2')
        .fromTo(
          animatedClassesSetTwo,
          {opacity: 0, visibility: 'hidden', y: 30},
          {opacity: 1, visibility: 'inherit', duration: 1},
          'content+=2',
        )
        .to(animatedClassesSetTwo, {y: 0, duration: 0.5}, 'content+=2')
      this.animationState = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/pages/index.scss';
</style>
