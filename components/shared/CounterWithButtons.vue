<template>
  <section class="counter-video">
    <p class="subtitle counter-video__message">
      {{ mess1 }}
    </p>
    <div class="counter-video__video">
      <VideoControl
        :playInitially="false"
        :video="video"
        :steps="steps"
        :buttons="buttons"
      />
    </div>

    <p class="subtitle counter-video__message">
      {{ mess2 }}
    </p>
    <div class="counter-video__video">
      <VideoControl
        :video="video"
        :steps="steps"
        :buttons="buttons"
        :startFrom="0"
      />
    </div>

    <p class="subtitle counter-video__message">
      {{ mess3 }}
    </p>
    <div class="counter-video__video">
      <VideoControl
        :video="video"
        :steps="steps"
        :buttons="buttons"
        :startFrom="startFrom"
      />
    </div>

    <p class="subtitle counter-video__message">
      {{ mess4 }}
    </p>
    <div class="counter-video__video">
      <VideoControl
        :video="video"
        :steps="steps"
        :buttons="buttons"
        reverse
      />
    </div>

    <p class="subtitle counter-video__message">
      {{ mess5 }}
    </p>
    <div class="counter-video__video">
      <VideoControl
        :playInitially="false"
        :video="video"
        :steps="steps"
        :buttons="buttons"
        showSteps
      />
    </div>

    <p class="subtitle counter-video__message">
      {{ mess6 }}
    </p>
    <div class="counter-video__video">
      <VideoControl
        :video="video"
        :steps="steps"
        :buttons="buttons"
        customAnimation
      />
    </div>
  </section>
</template>

<script>
  import VideoControl from '~/components/shared/VideoControl.vue'
  
  export default {
    name: 'CounterWithButtons',
    components: {
      VideoControl
    },
    props: {
      video: Object,
      startFrom: Number,
      steps: Array,
      duration: Number,
      buttons: Object,
      mess1: String,
      mess2: String,
      mess3: String,
      mess4: String,
      mess5: String,
      mess6: String
    }
  }
</script>

<style lang="scss">
  .counter-video {
    &__message {
      margin: 70px 0 50px;
    }
  }
</style>
