<template>
  <transition
    name="fade"
    @enter="errorEnter"
    @beforeLeave="errorBeforeLeave"
    @leave="errorLeave"
  >
    <span
      v-if="error"
      ref="error"
      class="form-error"
    > {{ error }} </span>
  </transition>
</template>

<script>
  export default {
    name: 'FormError',

    props: {
      marginBottom: Number,
      error: String
    },

    methods: {
      // first appear
      errorEnter (el, done) {
        this.setErrorMargin(el, done, this.getErrorHeight(el))

        // second change innerText
        // watch on error
        this.unwatchError = this.$watch('error', () => {
          this.$nextTick(() => this.setErrorMargin(this.getErrorHeight(el)))
        })
      },

      errorBeforeLeave () {
        // unwatch error changes before error leave
        this.unwatchError()
      },

      errorLeave (el, done) {
        // set initial margin bottom for input
        this.setErrorMargin(el, done, this.marginBottom)
      },

      getErrorHeight (el) {
        const scrollHeight = (el && el.scrollHeight) || 0
        return scrollHeight > this.marginBottom ? scrollHeight : this.marginBottom
      },

      /**
       * Add needed margin bottom if error text too long
       *
       * @param el<NodeElement> - input element
       * @param done<Function> - vue animation callback
       */
      setErrorMargin (el, done, marginBottom) {
        // sorry for $parent change by child
        gsap.to(this.$parent.$el, 0.5, {
          css: {
            marginBottom: marginBottom + 'px'
          },
          onComplete: () => {
            if (done) done()
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .form-error {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding-top: 2px;
    font-size: 13px;
    line-height: 1.5;
    color: red;
    text-align: left;
    word-wrap: break-word;
  }
</style>
