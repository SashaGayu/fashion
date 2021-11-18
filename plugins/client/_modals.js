import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.index'
import isFunction from 'lodash/isFunction'
import { disableBodyScroll, clearAllBodyScrollLocks } from '~/assets/js/utils/lock-scroll'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

const show = Vue.prototype.$modal.show

Vue.prototype.$modal.show = (component, props, settings, events, disableScroll = true) => {
  const closeModal = () => {
    Vue.prototype.$modal.hide('base-modal')
  }
  const commonEvents = {
    'opened' ({ ref }) {
      // detect modal position. for fitted modals add center class
      const modal = ref.querySelector('.js-base-modal-inner')
      if (modal) {
        if (modal.clientHeight < window.innerHeight) {
          ref.classList.add('justify-content-center')
        }
      }

      ref.addEventListener('click', closeModal)

      if (disableScroll) {
        disableBodyScroll(modal || ref.parentNode.parentNode, {
          reserveScrollBarGap: true
        })
      }
    },
    'before-close' ({ ref }) {
      if (disableScroll) {
        clearAllBodyScrollLocks()
      }

      ref.removeEventListener('click', closeModal)
    }
  }

  // default settings
  const commonSettings = {
    name: 'base-modal',
    width: '100%',
    height: '100%',
    adaptive: true,
    scrollable: false,
    delay: 0.3,
    overlayTransition: 'fade',
    transition: 'fade',
    classes: ['v--modal', 'base-modal']
  }

  if (events) {
    Object.entries(events).forEach(([event, fn]) => {
      const commonFn = commonEvents[event]

      commonEvents[event] = (...args) => {
        if (isFunction(commonFn)) commonFn(...args)
        fn(...args)
      }
    })
  }

  show(component, props, Object.assign(commonSettings, settings), commonEvents)
}
