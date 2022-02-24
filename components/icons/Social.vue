<template>
  <ul class="logos" ref="logos">
    <li
      class="logo"
      :title="$t(`titles.${logo.name}`)"
      v-for="logo of logos"
      :key="logo.name"
    >
      <span
        class="svg-container"
        @mouseover="handleMouseover"
        :class="logo.name"
      >
        <a :href="logo.url" rel="noopener noreferrer" target="_blank">
          <component :is="logo.name" />
        </a>
      </span>
    </li>
  </ul>
</template>
<script>
import {gsap, Bounce} from 'gsap'
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
    npm,
  },
  data: () => {
    return {
      linkedin: {hover: true},
      github: {hover: true},
      stackoverflow: {hover: true},
      npm: {hover: true},
      logos: [
        {name: 'linkedin', url: 'https://www.linkedin.com/in/smakss/'},
        {name: 'github', url: 'https://github.com/SMAKSS'},
        {
          name: 'stackoverflow',
          url: 'https://stackoverflow.com/users/11908502/smakss',
        },
        {name: 'npm', url: 'https://www.npmjs.com/~smakss'},
      ],
    }
  },
  mounted() {
    this.linkedin.periodEl = this.$refs.logos.querySelector(
      '.svg-container.linkedin svg .in #period',
    )
    this.github.headEl = this.$refs.logos.querySelector(
      '.svg-container.github svg .head',
    )
    this.github.armEl = this.$refs.logos.querySelector(
      '.svg-container.github svg .arm',
    )
    this.stackoverflow.tasksEl = this.$refs.logos.querySelector(
      '.svg-container.stackoverflow svg .tasks',
    )
    this.stackoverflow.stackEl = this.$refs.logos.querySelector(
      '.svg-container.stackoverflow svg .stack',
    )
    this.stackoverflow.taskOneEl = this.$refs.logos.querySelector(
      '.svg-container.stackoverflow svg .tasks #task-1',
    )
    this.stackoverflow.taskTwoEl = this.$refs.logos.querySelector(
      '.svg-container.stackoverflow svg .tasks #task-2',
    )
    this.stackoverflow.taskThreeEl = this.$refs.logos.querySelector(
      '.svg-container.stackoverflow svg .tasks #task-3',
    )
    this.stackoverflow.taskFourEl = this.$refs.logos.querySelector(
      '.svg-container.stackoverflow svg .tasks #task-4',
    )
    this.stackoverflow.taskFiveEl = this.$refs.logos.querySelector(
      '.svg-container.stackoverflow svg .tasks #task-5',
    )
    this.npm.nEl = this.$refs.logos.querySelector('.svg-container.npm svg #n')
    this.npm.pEl = this.$refs.logos.querySelector('.svg-container.npm svg #p')
    this.npm.mEl = this.$refs.logos.querySelector('.svg-container.npm svg #m')
    this.npm.chooser = randomArrayElement([
      this.npm.nEl,
      this.npm.mEl,
      this.npm.pEl,
    ])
    setTimeout(() => {
      this.linkedinAnimation()
      this.githubAnimation()
      this.stackoverflowAnimation()
      this.npmAnimation()
    }, 5000)
  },
  methods: {
    animationHandler({el, func}) {
      const completed = () => (el.hover = true)
      el.hover && func(completed)
      el.hover = false
    },
    linkedinAnimation() {
      const animation = completed => {
        const tl = gsap.timeline({onComplete: completed})
        tl.to(this.linkedin.periodEl, 0.4, {y: 30, delay: 0.5})
          .to(this.linkedin.periodEl, 0.75, {y: -5})
          .to(this.linkedin.periodEl, 0.3, {y: 30, ease: Bounce.easeOut})
          .to(this.linkedin.periodEl, 0.75, {y: 10})
          .to(this.linkedin.periodEl, 0.5, {y: 270, ease: Bounce.easeOut})
          .to(this.linkedin.periodEl, 3, {x: '+=340'}, '-=2.25')
          .to(this.linkedin.periodEl, 0, {opacity: 0, visibility: 'hidden'})
          .to(this.linkedin.periodEl, 0, {x: 0, y: 0})
          .to(
            this.linkedin.periodEl,
            1,
            {opacity: 1, visibility: 'inherit'},
            '+=1',
          )
      }
      this.animationHandler({el: this.linkedin, func: animation})
    },
    githubAnimation() {
      const animation = completed => {
        const tl = gsap.timeline({onComplete: completed})
        tl.to(
          this.github.headEl,
          2,
          {
            rotate: '10%',
            transformOrigin: 'bottom 0',
          },
          'head',
        )
          .to(
            this.github.armEl,
            0.4,
            {rotate: '6%', repeat: 2, transformOrigin: 'bottom'},
            'head-=0.4',
          )
          .to(
            this.github.armEl,
            0.4,
            {
              rotate: '-5%',
              repeat: 2,
              transformOrigin: 'bottom',
            },
            'head+=0.4',
          )
          .to([this.github.headEl, this.github.armEl], 1, {rotate: 0})
      }
      this.animationHandler({el: this.github, func: animation})
    },
    stackoverflowAnimation() {
      const animation = completed => {
        const tl = gsap.timeline({onComplete: completed})
        tl.to(
          this.stackoverflow.taskOneEl,
          {
            y: 2,
            transformOrigin: 'bottom right',
          },
          1,
          'task1',
        )
          .to(
            this.stackoverflow.taskTwoEl,
            {
              rotate: '-12%',
              transformOrigin: 'bottom right',
              y: 2.3,
            },
            0.6,
            'task1+=0.4',
          )
          .to(
            this.stackoverflow.taskThreeEl,
            {
              rotate: '-25%',
              transformOrigin: 'bottom right',
              y: 2.5,
              x: -0.66,
            },
            0.6,
            'task1+=0.6',
          )
          .to(
            this.stackoverflow.taskFourEl,
            {
              rotate: '-40%',
              transformOrigin: 'bottom right',
              y: 2.2,
              x: -2.1,
            },
            0.6,
            'task1+=0.8',
          )
          .to(
            this.stackoverflow.taskFiveEl,
            {
              rotate: '-53%',
              transformOrigin: 'bottom right',
              y: 1.6,
              x: -4.2,
            },
            0.6,
            'task1+=1',
          )
          .to(this.stackoverflow.tasksEl, 1.5, {y: 2.3}, 'task1+=0.5')
          .to(
            [
              this.stackoverflow.taskOneEl,
              this.stackoverflow.taskTwoEl,
              this.stackoverflow.taskThreeEl,
              this.stackoverflow.taskFourEl,
              this.stackoverflow.taskFiveEl,
              this.stackoverflow.tasksEl,
            ],
            1.5,
            {rotate: 0, x: 0, y: 0},
          )
      }
      this.animationHandler({el: this.stackoverflow, func: animation})
    },
    npmAnimation() {
      const animation = completed => {
        const firstChoose = this.npm.chooser()
        const secondChoose = this.npm.chooser()
        const thirdChoose = this.npm.chooser()
        const tl = gsap.timeline({onComplete: completed})
        tl.fromTo(firstChoose, 1.25, {opacity: 1}, {opacity: 0.1}, 'first')
        tl.to(firstChoose, 0.75, {opacity: 1}, 'first+=0.5')
        tl.fromTo(
          secondChoose,
          1.25,
          {opacity: 1},
          {opacity: 0.1},
          'first+=0.5',
        )
        tl.to(secondChoose, 0.75, {opacity: 1}, 'first+=1.5')
        tl.fromTo(
          thirdChoose,
          1.25,
          {opacity: 1},
          {opacity: 0.1},
          'first+=1.75',
        )
        tl.to(thirdChoose, 0.75, {opacity: 1}, 'first+=3')
      }
      this.animationHandler({el: this.npm, func: animation})
    },
    handleMouseover(event) {
      const container = event.target.closest('.svg-container')

      if (container.classList.contains('linkedin')) {
        this.linkedinAnimation()
      } else if (container.classList.contains('github')) {
        this.githubAnimation()
      } else if (container.classList.contains('stackoverflow')) {
        this.stackoverflowAnimation()
      } else {
        this.npmAnimation()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.logos {
  @include flex-display(
    $alignItems: center,
    $justifyContent: space-between,
    $gap: 1rem
  );

  & .svg-container {
    height: 100%;
    width: 100%;

    display: inline-block;

    position: relative;

    vertical-align: middle;
  }

  & .logo {
    position: relative;

    display: inline-block;

    & .svg-container {
      &
        :where(.linkedin svg .background, .stackoverflow
          svg
          .tasks, .stackoverflow svg .stack, .stackoverflow
          svg
          .curved-stack, .github svg .octocat, .npm svg .characters) {
        fill: $logo-color;
      }

      & :where(.linkedin svg .in, .npm svg #inner-p) {
        fill: $background-color;
      }

      &:where(.linkedin, .stackoverflow) {
        svg {
          width: 3rem;

          @media (max-width: $default-mobile-viewport) {
            width: 2.5rem;
          }
        }
      }

      &.github svg {
        width: 3.08rem;

        @media (max-width: $default-mobile-viewport) {
          width: 2.58rem;
        }
      }

      &.npm svg {
        width: 5rem;

        transform: translateY(4px);

        @media (max-width: $default-mobile-viewport) {
          width: 4.5rem;
        }
      }
    }
  }
}
</style>
