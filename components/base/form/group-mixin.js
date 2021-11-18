import { themes } from '~/assets/js/modules/PropTypes/types'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: String,
    items: {
      type: Array,
      default: () => ([])
    },
    theme: {
      type: String,
      validator: v => themes.includes(v)
    },
    type: {
      type: String,
      validator: v => ['checkboxGroup', 'radio', 'dropdown'].includes(v)
    },
    value: {
      type: [String, Array, Object]
    }
  }
}
