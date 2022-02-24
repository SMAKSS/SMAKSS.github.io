import {gsap} from 'gsap'

export default {
  methods: {
    modalHandler() {
      this.$store.commit('SET_MODALTRIGGER', !this.$store.state.modalTrigger)
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
