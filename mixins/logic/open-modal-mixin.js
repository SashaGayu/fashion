export default {
  methods: {
    async injectModal (modalName, props, options) {
      const component = await require(`~/components/shared/modals/${modalName}`).default

      const defaultOptions = {
        width: '100%',
        height: '100%'
      }

      const mergedOptions = {
        ...defaultOptions,
        ...options
      }

      this.$modal.show(
        component.dafault || component,
        props,
        mergedOptions
      )
    }
  }
}
