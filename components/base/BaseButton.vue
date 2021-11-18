<template>
  <component
    :is="tag"
    v-bind="attrs"
    :class="classes"
    @click="onClick"
  >
    <span class="base-button__text">
      <slot />
    </span>
  </component>
</template>

<script>
  import buttonLinkMixin from '~/mixins/ui/button-link-mixin'

  export default {
    name: 'BaseButton',

    mixins: [buttonLinkMixin],

    props: {
      url: {
        type: String,
        default: ''
      },
      target: {
        type: String
      },
      theme: {
        type: String,
        default: 'light'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return [
          'button',
          { 'button_disabled': this.disabled },
          'base-button',
          `base-button_${this.theme}`
        ]
      }
    },

    methods: {
      onClick (event) {
        if (this.tag === 'nuxt-link') {
          event.preventDefault()
        }

        if (this.disabled) return

        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .base-button {
    position: relative;
    min-width: 200px;
    padding: 20px 30px;
    font-family: $f-secondary;
    font-size: 20px;
    border: 1px solid $c-dark-grey;
    border-radius: 10px;
    transition: background-color $base-transition;

    .base-form_light & {
      @include hover {
        background-color: $c-light-grey;
      }
    }

    &__text {
      position: relative;
      display: inline-block;

      &::after {
        position: absolute;
        left: 50%;
        display: inline-block;
        width: 120%;
        height: 1px;
        content: '';
        background-color: $c-dark-grey;
        opacity: 0;
        transition: all 0.3s;
        transform: translateX(-50%) translateY(10px);
      }
    }

    &_light {
      &:focus {
        box-shadow: 0 0 5px 1px $c-dark-grey;
      }
    }

    &_dark {
      color: $c-light-grey;
      background-color: transparent;
      border: 1px solid $c-light-grey;

      .base-button__text::after {
        background-color: $c-light-grey;
      }

      &:focus {
        box-shadow: 0 0 10px 2px $c-light-grey;
      }
    }

    @include hover {
      .base-button__text::after {
        opacity: 1;
        transform: translateX(-50%) translateY(5px);
      }
    }
  }
</style>
