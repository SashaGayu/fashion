<template>
  <div
    :class="['toggler', isOpen && 'toggler_open']"
    @click="toggleMenu"
  >
    <span
      class="toggler__wrapper"
    >
      <span class="toggler__line" />
    </span>
  </div> 
</template>

<script>

  export default {
    name: 'MenuToggler',
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleMenu () {
        this.isOpen = !this.isOpen
        this.$store.commit('ui/SET_MENU_VISIBILITY', this.isOpen)
      }
    } 
  }
</script>

<style lang="scss">
  .toggler {
    width: 60px;
    height: 30px;
    padding: 10px;

    &__wrapper {
      position: relative;
    }

    &__line {
      &,
      &::before,
      &::after {
        position: absolute;
        display: inline-block;
        width: 40px;
        height: 4px;
        background-color: $c-black;
        border-radius: 4px;
        transition: transform 0.15s ease;
      }

      &::before,
      &::after {
        content: '';
        transition: all 0.15s ease;
      }

      &::before {
        top: -10px;
      }

      &::after {
        bottom: -10px;
      }
    }

    &_open {
      .toggler__line {
        transform: rotate(45deg);

        &::before {
          top: 0;
          opacity: 0;
        }

        &::after {
          bottom: 0;
          transform: rotate(90deg);
        }
      }
    }
  }
</style>
