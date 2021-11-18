<template>
  <div class="mobile-menu">
    <Logo />
    <ul class="mobile-menu__navigation">
      <li
        v-for="(link, i) in header"
        :key="`link-${i}`"
        class="mobile-menu__link"
      >
        <nuxt-link :to="link.url">
          {{ link.label }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from '~/components/shared/Logo'

  export default {
    name: 'MobileMenu',
    components: { Logo },
    computed: {
      ...mapGetters({
        header: 'getHeaderNavigation'
      })
    }
  }
</script>

<style lang="scss">
  .mobile-menu {
    position: absolute;
    top: $header-height;
    left: 0;
    z-index: $z-index-menu;
    width: 100vw;
    background-color: $c-white;

    @include heightVh;
    @include flex-column(center);

    &__navigation {
      @include flex-column(center);
    }
  }
</style>
