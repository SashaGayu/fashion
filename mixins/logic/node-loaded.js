export default {
  methods: {
    nodeLoaded (selector) {
      return new Promise((resolve) => {
        let node = null
        const initTime = Date.now()
        const checkMaxTime = 1000 * 60 // 1 minute
        let momentTime = Date.now()

        const callNode = () => {
          node = document.querySelector(selector)
          momentTime = Date.now()

          // control whether we have node or we are out of time while waiting for node
          if (node || momentTime > initTime + checkMaxTime) {
            window.cancelAnimationFrame(callNode)
            resolve(node)
          } else window.requestAnimationFrame(callNode)
        }

        callNode()
      })
    }
  }
}
