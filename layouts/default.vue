<template>
  <div class="layout">
    <TheHeader />

    <transition name="from-top">
      <MobileMenu v-show="isMenuVisible" />
    </transition>

    <div class="page-content-wrapper">
      <nuxt />
    </div>
    <TheFooter />

    <TheWidget />
  </div>
</template>

<script>
  import TheHeader from '~/components/layout/Header/TheHeader'
  import MobileMenu from '~/components/layout/Header/MobileMenu'
  import TheFooter from '~/components/layout/TheFooter'
  import TheWidget from '../components/layout/TheWidget'

  export default {
    name: 'DefaultLayout',

    components: {
      TheWidget,
      TheHeader,
      MobileMenu,
      TheFooter
    },
    computed: {
      isMenuVisible () {
        return this.$store.state.ui.isMenuVisible
      }
    }
  }
</script>
