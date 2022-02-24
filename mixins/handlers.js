import {gsap} from 'gsap'

export default {
  data() {
    return {
      width: undefined,
      height: undefined,
    }
  },

  methods: {
    modalHandler() {
      this.$store.commit('SET_MODALTRIGGER', !this.$store.state.modalTrigger)
    },
    resizeHandler() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    windowDimensions() {
      window.addEventListener('resize', this.resizeHandler)

      this.resizeHandler()

      return {width: this.width, height: this.height}
    },
    fadingOutAndPushToRouterHandler({element = [], route = '/'}) {
      const timeline = gsap.timeline()

      timeline.to(element, 1, {opacity: 0}).to(element, {
        visibility: 'hidden',
      })

      setTimeout(() => this.$router.push(`${route}/`), 1000)
    },
  },
}
