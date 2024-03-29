<template>
  <div class="modal" ref="modal" :aria-hidden="ariaHidden">
    <div class="mask" @click="closeModal" />
    <div class="background" ref="background">
      <div class="circle-background"></div>
    </div>
    <div class="content">
      <div data-gutter class="information" ref="information">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import {gsap} from 'gsap'

export default {
  name: 'Modal',
  props: ['ariaHidden', 'content', 'trigger'],
  methods: {
    openModal() {
      const tl = gsap.timeline()
      tl.set('.site-header', {
        css: {zIndex: 2},
      })
        .to(
          this.$refs.modal,
          0.2,
          {
            visibility: 'inherit',
            opacity: '1',
            attr: {'aria-hidden': false},
          },
          'shown',
        )
        .fromTo(this.$refs.background, 0.2, {scale: 0.3}, {scale: 0.2}, 'shown')
        .to(this.$refs.background, 0.4, {scale: 1})
        .fromTo(
          this.$refs.information,
          {opacity: 0, visibility: 'hidden'},
          {opacity: 1, visibility: 'inherit'},
        )
    },
    closeModal() {
      const tl = gsap.timeline()
      tl.to(this.$refs.background, 0.1, {scale: 1.2})
        .set(this.$refs.information, {opacity: 0, visibility: 'hidden'})
        .to(this.$refs.background, {scale: 0})
        .to(this.$refs.modal, {
          visibility: 'hidden',
          opacity: '0',
          attr: {'aria-hidden': true},
        })
        .set('.site-header', {css: {zIndex: ''}})
      this.$store.commit('SET_MODALTRIGGER', false)
    },
  },
  watch: {
    trigger(value) {
      value ? this.openModal() : this.closeModal()
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
  text-align: center;
  z-index: 9;
}

@media (max-width: $default-mobile-viewport) {
  .modal {
    position: fixed;
  }
}

.modal,
.mask {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
}

.mask {
  background: $mask;
}

.background {
  color: $background-color;
}

.background,
.content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.circle-background {
  background: currentColor;
}

.circle-background {
  width: 80rem;
  height: 80rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
}

.content {
  max-width: 80rem;
  padding: 2rem;
}

@media (max-width: $default-mobile-viewport) {
  .circle-background {
    width: 75rem;
    height: 75rem;
  }

  .content {
    width: 100%;

    overflow-y: auto;
    padding: 0;
  }
}

.information {
  position: relative;
  padding: 6rem 0;
}

@media (max-width: 480px) {
  .content > div {
    padding-bottom: 2rem;
  }

  .content > div[data-gutter] {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
