export default {
  methods: {
    modalHandler() {
      this.$store.commit('SET_MODALTRIGGER', !this.$store.state.modalTrigger)
    }
  }
}