import FormError from './FormError'
import { themes } from '~/assets/js/modules/PropTypes/types'

export default {
  inheritAttrs: false,
  components: { FormError },
  props: {
    // SIC: for name="name|password" autocomplete="off" won't work on input; alter it if necessary
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      defaultValue: ''
    },
    value: '',
    error: String,
    triggerReset: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      validator: v => themes.includes(v)
    }
  },

  data: () => ({
    isOnFocus: false,
    marginBottom: 0
  }),

  mounted () {
    // set initial margin bottom for animation
    this.marginBottom = parseInt(getComputedStyle(this.$el).marginBottom)
  }

}
