<template>
  <ul class="logos">
    <li class="logo" :title="$t(`title.${logo.name}`)" v-for="logo of logos" :key="logo.name">
      <span class="svg-container" :class="logo.name">
        <a :href="logo.url" rel="noopener noreferrer" target="_blank">
          <component :is="logo.name" />
        </a>
      </span>
    </li>
  </ul>
</template>
<script>
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
  transition: all .3s;
}

.logos .logo .svg-container.linkedin svg .in,
.logos .logo .svg-container.npm svg .inner-p {
  fill: $background-color;
}
</style>