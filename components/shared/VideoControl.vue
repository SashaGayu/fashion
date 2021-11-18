<template>
  <section class="rewindable">
    <div class="rewindable__video">
      <VideoAnimated
        ref="video"
        v-bind="additionalProps"
        :video="video"
        :startScene="startScene"
        :playInitially="playInitially"
        :reverse="reverse"
      />
    </div>

    <div v-if="buttons" class="rewindable__controls">
      <button
        class="rewindable__button"
        @click="backwards"
      >
        {{ buttons.prev }}
      </button>
      <button
        class="rewindable__button"
        @click="forwards"
      >
        {{ buttons.next }}
      </button>
    </div>

    <ul v-if="showSteps" class="rewindable__controls">
      <li
        v-for="step in scenes"
        :key="step.ind"
        :class="[
          'rewindable__button',
          step.ind === sceneDisplayed && `rewindable__button_active`
        ]"
        @click="playScene(step.ind)"
      >
        {{ step.ind }}
      </li>
    </ul>
  </section>
</template>

<script>
  import { goNext, goPrev } from '~/assets/js/helpers/loop.js'
  import VideoAnimated from '~/components/shared/VideoAnimated.vue'
  
  export default {
    name: 'VideoControl',
    components: {
      VideoAnimated
    },
    props: {
      video: Object,
      startFrom: {
        type: Number,
        default: 0
      },
      steps: Array,
      playInitially: {
        type: Boolean,
        default: true
      },
      buttons: {
        type: Object
      },
      showSteps: Boolean,
      reverse: Boolean,
      customAnimation: Boolean
    },
    data () {
      return {
        videoEl: null,
        currentInd: 0, // - for tracking scenes
        sceneDisplayed: 0, // - for interface
        isAnimating: false,
        tl: null
      }
    },

    computed: {
      startInd () {
        return this.steps.indexOf(this.startFrom)
      },
      startScene () {
        return this.scenes[this.startInd]
      },
      scenes () {
        const clone = [...this.steps]
        const steps = this.reverse ? clone.reverse() : clone
        return steps.reduce((acc, current, ind) => {
          let scene = {}
          if (ind) {
            scene = {
              from: steps[ind - 1] || 0,
              to: current
            }
            scene.ind = ind - 1
            acc[ind - 1] = scene
          }
          return acc
        }, {})
      },
      additionalProps () {
        const props = {}
        if (this.customAnimation) {
          props.initialAnimationOptions = {
            from: {
              x: -150,
              opacity: 0
            },
            to: {
              x: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.5
            }
          }
        }
        return props
      }
    },

    created () {
      this.tl = gsap.timeline({ paused: true })
    },

    mounted () {
      this.videoEl = this.$refs.video
      this.currentInd = this.playInitially ? this.startInd + 1 : this.startInd
    },

    beforeDestroy () {
      this.tl.kill()
    },

    methods: {
      async playVideo (options) {
        this.isAnimating = true
        try {
          await this.videoEl.rewindFromTo({ ...options })
        } catch (e) {
          console.log('Error in playVideo', e)
        }
        
        this.isAnimating = false
      },

      playScene (ind) {
        const el = this.videoEl.$el
        this.tl.add(() => {
          this.videoEl.stopPlaying()
        })
        this.tl.to(el, { opacity: 0, duration: 1 }, '+=0.3')
        this.tl.add(() => {
          this.sceneDisplayed = ind
          this.videoEl.settleVideo(_get(this.scenes, `${ind}.from`, 0))
        })
        this.tl.to(el, { opacity: 1, duration: 1 }, '+=0.3')
        this.tl.add(() => {
          this.currentInd = ind
          this.forwards()
        })
        this.tl.play()
      },

      forwards () {
        if (this.isAnimating) return
        this.playVideo(this.scenes[this.currentInd])
        this.sceneDisplayed = this.currentInd
        this.currentInd = goNext(this.currentInd, this.steps.length - 1)
      },

      backwards () {
        if (this.isAnimating) return
        this.currentInd = goPrev(this.currentInd, this.steps.length - 1)
        this.sceneDisplayed = this.currentInd
        const { from, to } = this.scenes[this.currentInd]
        const options = { from: to, to: from }
        this.playVideo(options)
      }
    }
  }
</script>

<style lang="scss">
  .rewindable {
    &__message {
      margin: 70px 0 50px;
    }

    &__controls {
      display: flex;
      justify-content: space-around;
      padding-top: 30px;
    }

    &__button {
      padding: 15px 25px;
      font-size: 20px;
      cursor: pointer;
      background: $c-light-grey;
      border: 1px solid $c-light-grey;
      border-radius: 5px;
      transition: all 0.3s;

      &_active {
        color: white;
        background: grey;
        border: 1px solid grey;
      }
    }
  }
</style>
