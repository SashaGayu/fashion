<template>
  <div
    class="video-animated"
    data-observer-repeat="true"
    @inview="onInView"
    @outview="stopPlaying"
  >
    <video
      ref="video"
      class="video-animated__video"
      muted
      playsinline
      autoplay
    >
      <source
        v-for="(videoFormat, i) in Object.keys(video.src)"
        :key="`video-source-${i}`"
        :data-src="video.src[videoFormat]"
        :type="`video/${videoFormat}`"
      >
    </video>
  </div>
</template>

<script>
  import isNil from 'lodash/isNil'
  import Observer from '~/assets/js/modules/Observer'

  let observer
  // const objectFitVideos = require('object-fit-videos')

  export default {
    name: 'VideoAnimated',

    props: {
      video: {
        type: Object,
        required: true
      },
      startScene: {
        type: Object,
        default: () => ({ from: 0, to: 0 })
      },
      playInitially: {
        type: Boolean,
        default: true
      },
      initialAnimationOptions: {
        type: Object,
        default: () => ({
          from: {
            opacity: 0
          },
          to: {
            opacity: 1,
            duration: 0.5,
            delay: 0.3
          }
        })
      }
    },

    data () {
      return {
        currentTime: 0,
        initiallyInViewport: false,
        isLoaded: false,
        videoEl: null,
        isPlaying: {
          active: false,
          to: null
        }
      }
    },

    async mounted () {
      this.setVideoSources()
      
      observer = new Observer()
      
      observer.observe(this.$el)

      await this.$nextTick()
      gsap.set(this.$refs.video, {
        ...this.initialAnimationOptions.from
      })
    },

    beforeDestroy () {
      if (observer) observer.unobserve(this.$el)
    },

    methods: {
      onInView () {
        if (!this.initiallyInViewport) {
          // initialize video when coming to the vieport for the first time
          this.initiallyInViewport = true
          if (this.isLoaded) {
            this.onCanInit()
          }
        } else {
          // continue play video if stopped
          this.resumePlay()
        }
      },

      onLoadedData (e) {
        // objectFitVideos()
        this.videoEl = this.$refs.video
        this.videoEl.pause()
        this.$emit('loaded', this.videoEl)
        this.isLoaded = true

        if (this.initiallyInViewport) {
          this.onCanInit()
        }

        this.videoEl.removeEventListener('loadeddata', this.onLoadedData)
      },

      onCanInit () {
        this.settleVideo()
        this.runInitialAnimation(async () => {
          if (this.playInitially) {
            try {
              await this.rewindFromTo(this.startScene)
            } catch (e) {
              console.log('Error in rewindFromTo()', e)
            }
          }
        })
      },

      setVideoSources () {
        const video = this.$refs.video
        const sources = Array.from(video.children)
        sources.forEach(source => {
          const src = source.getAttribute('data-src')
          source.setAttribute('src', src)
        })
        // canplaythrough works as well
        video.addEventListener('loadeddata', this.onLoadedData)
        
        video.load()
      },

      // set video animation starting point
      // ATTENTION: the method can be called from parent VideoControl component!
      settleVideo (time) {
        if (typeof time === 'number') {
          this.videoEl.currentTime = time
        } else this.videoEl.currentTime = this.startScene.from
      },

      runInitialAnimation (onComplete) {
        gsap.to(this.$refs.video, {
          ...this.initialAnimationOptions.to,
          clearProps: true,
          onComplete
        })
      },

      resumePlay () {
        // don't do anything if video is already playing or if no animation end point set
        if (this.isPlaying.active || !this.isPlaying.to) return
        this.isPlaying.active = true
        this.rewindFromTo({ from: this.currentTime, to: this.isPlaying.to })
      },

      stopPlaying () {
        if (this.isPlaying.active) {
          this.isPlaying.active = false
        }
      },

      // play single video scene
      // ATTENTION: the method can be called from parent VideoControl component!
      rewindFromTo ({ from, to, speed = 1 }, fps = 30) {
        if (this.isPlaying.active && !this.isPlaying.to) return

        return new Promise(resolve => {
          const video = this.$refs.video
          const intervalMs = 1000 / fps
          const intervalS = (intervalMs / 1000) * speed
          this.isPlaying.active = true

          if (!isNil(from)) {
            video.currentTime = from
          }

          const direction = Number(to.toFixed(3)) > Number(video.currentTime.toFixed(3))
            ? 'forwards'
            : 'backwards'
          this.interval = setInterval(() => {
            // stop when video out of viewport
            if (!this.isPlaying.active) {
              this.isPlaying.to = to
              clearInterval(this.interval)
              resolve()
            }

            // otherwise, set current time according to direction till end point is reached
            if (video.currentTime.toFixed(3) !== to.toFixed(3)) {
              // add fixed time every tick OR lower to match exact 'to' timing
              const overrewind = direction === 'forwards'
                ? video.currentTime + intervalS >= to
                : video.currentTime - intervalS <= to

              const delta = (overrewind ? Math.abs(to - video.currentTime) : intervalS) * (direction === 'forwards' ? 1 : -1)

              this.currentTime = video.currentTime = (video.currentTime + delta)
            } else {
              video.pause()
              clearInterval(this.interval)
              this.isPlaying = {
                active: false,
                to: null
              }
              resolve()
            }
          }, intervalMs)
        })
      }
    }
  }
</script>

<style lang="scss">
  .video-animated {
    &,
    &__video {
      width: 100%;
    }
  }
</style>
