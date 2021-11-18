import Observer from '~/assets/js/modules/Observer'

function isElement (element) {
  return element instanceof Element || element instanceof HTMLDocument
}

export default {

  methods: {
    initObserver (el, repeat = false, options) {
      const optionsThing = {
        onInView: options?.onInView || this.onInView,
        onOutView: options?.onOutView || this.onOutView,
        settings: options?.settings || { root: null, rootMargin: '0px', threshold: 0.05 }
      }

      if (!isElement(el)) return

      const observer = new Observer(optionsThing.settings)
      if (repeat) el.setAttribute('data-observer-repeat', 'true')
      observer.observe(el)
      el.addEventListener('inview', optionsThing.onInView)
      el.addEventListener('outview', optionsThing.onOutView)
      document.addEventListener('visibilitychange', this.handleVisibilityChange, false)

      this.$once('hook:beforeDestroy', () => {
        observer.unobserve(el)
        el.removeEventListener('inview', optionsThing.onInView)
        el.removeEventListener('outview', optionsThing.onOutView)
        document.removeEventListener('visibilitychange', this.handleVisibilityChange, false)
      })
    }
  }
}
