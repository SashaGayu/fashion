import isEqual from 'lodash/isEqual'
import createEvent from '~/assets/js/helpers/create-event'

export default {
  bind (el) {
    el.style.willChange = 'max-height'
  },

  inserted: function (el, binding) {
    const { state, startHeight } = parseBinding(binding)

    if (state) {
      el.style.overflow = 'hidden'
      el.style.maxHeight = startHeight + 'px'
    }
  },

  componentUpdated: function (el, binding) {
    if (isEqual(binding.value, binding.oldValue)) return

    const { state, duration, startHeight } = parseBinding(binding)
    toggleEl(el, { state, duration, startHeight })
  },

  unbind (el) {
    delete el.__timeOut
  }
}

function toggleEl (el, { state, duration, startHeight }) {
  if (state) {
    hideEl(el, { duration, startHeight })
  } else {
    showEl(el, { duration })
  }
}

function showEl (el, { duration }) {
  clearTimeout(el.__timeOut)

  // dispatch event
  el.dispatchEvent(createEvent('expanding'))

  // hook!
  el.scrollTop = 0
  gsap.to(el, {
    duration,
    ease: 'power2.out',
    maxHeight: el.scrollHeight,
    onComplete () {
      // dispatch event
      el.dispatchEvent(createEvent('expanded'))
    }
  })

  // waiting for animation ends
  el.__timeOut = setTimeout(() => {
    el.style.overflow = ''
    el.style.maxHeight = ''
  }, duration * 1000 + 100)
}

function hideEl (el, { startHeight, duration }) {
  clearTimeout(el.__timeOut)

  // dispatch event
  el.dispatchEvent(createEvent('collapsing'))

  const maxHeight = Math.min(el.clientHeight, el.scrollHeight)
  el.style.maxHeight = maxHeight + 'px'
  el.style.overflow = 'hidden'

  gsap.to(el, {
    duration,
    ease: 'power2.out',
    maxHeight: startHeight + 'px',
    onComplete () {
      // dispatch event
      el.dispatchEvent(createEvent('collapsed'))
    }
  })
}

function parseBinding (binding) {
  const { value } = binding
  let state
  let duration = 0.2
  let startHeight = 0

  if (value !== null && value instanceof Object) {
    state = value.state
    duration = value.duration || duration
    startHeight = value.height || startHeight
  } else {
    state = value
  }

  return { state, duration, startHeight }
}
