<template>
  <ul class="logos" ref="logos">
    <li class="logo" :title="$t(`title.${logo.name}`)" v-for="logo of logos" :key="logo.name">
      <span class="svg-container" @mouseover="handleMouseover" :class="logo.name">
        <a :href="logo.url" rel="noopener noreferrer" target="_blank">
          <component :is="logo.name" />
        </a>
      </span>
    </li>
  </ul>
</template>
<script>
import { gsap, Bounce } from 'gsap'
import randomArrayElement from '@smakss/random-array-element'

import linkedin from '@/assets/icons/linkedin.svg?inline'
import github from '@/assets/icons/github.svg?inline'
import stackoverflow from '@/assets/icons/stackoverflow.svg?inline'
import npm from '@/assets/icons/npm.svg?inline'

export default {
  name: 'Social',
  components: {
    linkedin,
    github,
    stackoverflow,
    npm
  },
  data: () => {
    return {
      linkedin: { hover: true },
      npm: { hover: true },
      logos: [
        { name: 'linkedin', url: 'https://www.linkedin.com/in/smakss/' },
        { name: 'github', url: 'https://github.com/SMAKSS' },
        {
          name: 'stackoverflow',
          url: 'https://stackoverflow.com/users/11908502/smakss'
        },
        { name: 'npm', url: 'https://www.npmjs.com/settings/smakss/packages' }
      ]
    }
  },
  mounted() {
    this.linkedin.periodEl = this.$refs.logos.querySelector(
      '.svg-container.linkedin svg .in .period'
    )
    this.npm.el = this.$refs.logos.querySelector('.svg-container.npm svg')
    this.npm.nEl = this.$refs.logos.querySelector('.svg-container.npm svg .n')
    this.npm.pEl = this.$refs.logos.querySelector('.svg-container.npm svg .p')
    this.npm.mEl = this.$refs.logos.querySelector('.svg-container.npm svg .m')
    this.npm.innerPEl = this.$refs.logos.querySelector(
      '.svg-container.npm svg .inner-p'
    )
    this.npm.chooser = randomArrayElement([
      this.npm.nEl,
      this.npm.mEl,
      this.npm.pEl
    ])
  },
  methods: {
    animaitonHandler({ el, func }) {
      const completed = () => (el.hover = true)
      el.hover && func(completed)
      el.hover = false
    },
    handleMouseover(event) {
      const container = event.target.closest('.svg-container')

      if (container.classList.contains('linkedin')) {
        const animation = completed => {
          const tl = gsap.timeline({ onComplete: completed })
          tl.to(this.linkedin.periodEl, 0.4, { y: 30, delay: 0.5 })
            .to(this.linkedin.periodEl, 0.75, { y: -5 })
            .to(this.linkedin.periodEl, 0.3, { y: 30, ease: Bounce.easeOut })
            .to(this.linkedin.periodEl, 0.75, { y: 10 })
            .to(this.linkedin.periodEl, 0.5, { y: 270, ease: Bounce.easeOut })
            .to(this.linkedin.periodEl, 3, { x: '+=340' }, '-=2.25')
            .to(this.linkedin.periodEl, 0, { opacity: 0, visibility: 'hidden' })
            .to(this.linkedin.periodEl, 0, { x: 0, y: 0 })
            .to(
              this.linkedin.periodEl,
              1,
              { opacity: 1, visibility: 'inherit' },
              '+=1'
            )
        }
        this.animaitonHandler({ el: this.linkedin, func: animation })
      } else if (container.classList.contains('npm')) {
        const animation = completed => {
          const firstChoose = this.npm.chooser()
          const secondChoose = this.npm.chooser()
          const thirdChoose = this.npm.chooser()
          const tl = gsap.timeline({ onComplete: completed })
          tl.fromTo(
            firstChoose,
            1.25,
            { opacity: 1 },
            { opacity: 0.3 },
            'first'
          )
          tl.to(firstChoose, 0.75, { opacity: 1 }, 'first+=0.5')
          tl.fromTo(
            secondChoose,
            1.25,
            { opacity: 1 },
            { opacity: 0.3 },
            'first+=0.5'
          )
          tl.to(secondChoose, 0.75, { opacity: 1 }, 'first+=1.5')
          tl.fromTo(
            thirdChoose,
            1.25,
            { opacity: 1 },
            { opacity: 0.3 },
            'first+=1.75'
          )
          tl.to(thirdChoose, 0.75, { opacity: 1 }, 'first+=3')
        }
        this.animaitonHandler({ el: this.npm, func: animation })
      }
    }
  }
}
</script>

<style lang="scss">
.logos .logo .svg-container.linkedin svg,
.logos .logo .svg-container.stackoverflow svg {
  width: 3rem;
}

.logos .logo .svg-container.github svg {
  width: 3.08rem;
}

.logos .logo .svg-container.npm svg {
  width: 5rem;
  transform: translateY(4px);
}

.logos .logo .svg-container.linkedin svg .background,
.logos .logo .svg-container.stackoverflow svg .tasks,
.logos .logo .svg-container.stackoverflow svg .stack,
.logos .logo .svg-container.github svg .octocat,
.logos .logo .svg-container.npm svg .characters {
  fill: $logo-color;
}

.logos .logo .svg-container.linkedin svg .in,
.logos .logo .svg-container.npm svg .inner-p {
  fill: $background-color;
}
</style>