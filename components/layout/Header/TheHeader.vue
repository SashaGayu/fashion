<template>
  <header class="header">
    <Logo />
    <nav class="header__navigation">
      <nuxt-link
        v-for="(link, i) in header"
        :key="`link-${i}`"
        :to="link.url"
        class="header__link"
      >
        {{ link.label }}
      </nuxt-link>
      <nuxt-link to="/">
        <cart />
        <search />
        <advanced />
      </nuxt-link>
    </nav>

    <span v-show="$resp.mdDown">
      <MenuToggler />
    </span>
  </header>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Logo from '~/components/shared/Logo'
  import MenuToggler from './MenuToggler'
  import headerOnScroll from './header-on-scroll'
  import Cart from '~/assets/svg/cart.svg'
  import Search from '~/assets/svg/search.svg'
  import Advanced from '~/assets/svg/advanced.svg'

  export default {
    name: 'TheHeader',

    components: {
      Logo,
      MenuToggler,
      Cart,
      Search,
      Advanced
    },

    mixins: [headerOnScroll],

    computed: {
      ...mapGetters({
        header: 'getHeaderNavigation'
      })
    },

    methods: {
      ...mapMutations('ui', ['SET_MENU_VISIBILITY'])
    }
  }
</script>

<style lang="scss">
  .header {
    position: relative;
    top: 0;
    left: 0;
    z-index: $z-index-header;
    width: 100%;
    padding: 28px 43px;
    background-color: $c-white;
    border-bottom: 1px solid $c-black;
    transition: all 0.5s ease-in;

    @include flex(center, space-between);

    &_on-top {
      transform: translateY(0);
    }

    &_hidden {
      transform: translateY(-100%);
    }

    &__link {
      padding: 0 30px;
      font-family: $f-third;
      font-size: 12px;
      font-weight: 300;
      cursor: pointer;
      transition: all $base-transition;

      @include hover {
        color: $c-blue-green;
      }
    }

    &__links {
      .nuxt-link-exact-active {
        font-weight: bold;
        color: $c-blue-green;
      }
    }
  }
</style>
