<template>
  <div
    :class="[
      'logo',
      { 'logo_disabled': $route.name === 'home' }
    ]"
  >
    <nuxt-link
      :to="homepageLink"
      aria-label="homepage"
      class="text_logo"
    >
      <h1 class="text_logo__title">
        Fashion
      </h1>
      <h2 class="text_logo__subtitle">
        Tagline Here
      </h2>
    </nuxt-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Logo',

    computed: {
      ...mapGetters(['getDefaultLocale', 'getCurrentLocale']),
      homepageLink () {
        return this.getCurrentLocale.code === this.getDefaultLocale.code
          ? '/'
          : `/${this.getCurrentLocale.code}`
      }
    }
  }
</script>

<style lang="scss">
  .logo {
    display: inline;
    cursor: pointer;

    &_disabled {
      pointer-events: none;
    }
  }

  .text_logo {
    font-family: $f-third;
    text-transform: uppercase;

    &__title {
      font-size: 28px;
      font-weight: 800;
    }

    &__subtitle {
      display: flex;
      justify-content: center;
      font-size: 12px;
      font-weight: 400;
    }
  }
</style>
