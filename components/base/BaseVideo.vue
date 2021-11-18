<template>
  <div
    class="base-video"
    @inview="onInView"
  >
    <div
      ref="videoPlayTrigger"
      class="base-video__play-trigger"
      data-observer-repeat="true"
    />

    <video
      v-if="readyToLoad"
      ref="video"
      :autoplay="true"
      :loop="true"
      :muted="true"
      :playsinline="true"
      :controls="controls"
      preload="none"
      class="base-video__element"
      @loadeddata="onLoaded"
    >
      <source
        v-for="(videoFormat, i) in Object.keys(video.src)"
        :key="`video-source-${i}`"
        :src="video.src[videoFormat]"
        :type="`video/${videoFormat}`"
      >
    </video>

    <transition name="fade">
      <div v-if="!isLoaded && poster" class="base-video__poster">
        <BaseImage :image="poster" />
      </div>
    </transition>
  </div>
</template>

<script>
  import Observer from '~/assets/js/modules/Observer'

  let loadObserver, playObserver

  if (process.browser) {
    loadObserver = new Observer({ root: null, rootMargin: '0px 0px 100px 0px', threshold: 0 })
    playObserver = new Observer({ root: null, rootMargin: '0px', threshold: 0 })
  }

  export default {
    name: 'BaseVideo',

    props: {
      video: {
        type: Object,
        required: true,
        validator: $propTypes.video
      },
      poster: {
        type: Object,
        validator: $propTypes.image
      },
      controls: {
        type: Boolean,
        default: true
      },
      lazy: {
        type: Boolean,
        default: true
      },
      autoplay: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        readyToLoad: false,
        isLoaded: false
      }
    },

    mounted () {
      if (!this.lazy) {
        this.loadVideo()
      } else {
        loadObserver.observe(this.$el)
      }

      if (this.autoplay) {
        const playTrigger = this.$refs.videoPlayTrigger
        playObserver.observe(playTrigger)
        playTrigger.addEventListener('inview', this.videoInViewport)
        playTrigger.addEventListener('outview', this.videoOutOfViewport)
      }
    },

    beforeDestroy () {
      if (loadObserver) loadObserver.unobserve(this.$el)

      if (this.autoplay) {
        const playTrigger = this.$refs.videoPlayTrigger
        if (playObserver) playObserver.unobserve(playTrigger)
        playTrigger.removeEventListener('inview', this.videoOutOfViewport)
        playTrigger.removeEventListener('outview', this.videoOutOfViewport)
      }
    },

    methods: {
      onInView (event) {
        event.stopPropagation()
        this.loadVideo()
      },

      videoInViewport (event) {
        event.stopPropagation()
        if (this.autoplay) this.play()
        else this.pause()
      },

      videoOutOfViewport (event) {
        event.stopPropagation()
        this.pause()
      },

      async play () {
        if (this.$refs.video) {
          await this.$nextTick()
          if (this.autoplay) this.$refs.video.play()
        }
      },
      pause () {
        if (this.$refs.video) {
          this.$refs.video.pause()
        }
      },
      onLoaded () {
        this.isLoaded = true
        this.$emit('load', this._uid)
      },
      async loadVideo () {
        this.readyToLoad = true
        await this.$nextTick()
        if (!this.autoplay) this.pause()
      }
    }
  }
</script>

<style lang="scss">
  /* BaseVideo requires wrapper element with:
   1. non-static positioning
   2. width&height OR aspect ratio
  */
  .base-video {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &__play-trigger {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      pointer-events: none;
      visibility: hidden;
    }

    &__element {
      width: 100%;
      height: 100%;

      @include object-fit(cover);
    }

    &__poster {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
    }
  }
</style>
