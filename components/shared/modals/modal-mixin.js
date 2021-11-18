import { disableBodyScroll, clearAllBodyScrollLocks } from '~/assets/js/utils/lock-scroll'

export default {
  props: {
    closeCallback: {
      type: Function,
      default: () => {}
    }
  },

  mounted () {
    const el = this.$refs.target || this.$el
    disableBodyScroll(el)
  },

  beforeDestroy () {
    this.close()
  },

  methods: {
    close () {
      this.$emit('close')

      clearAllBodyScrollLocks()

      this.closeCallback()
    }
  }
}
