<template>
  <label
    :class="[
      'radio',
      `radio_${theme}`,
      checked && 'radio_checked'
    ]"
  >
    <input
      :name="name"
      :value="id"
      type="radio"
      class="radio__input visually-hidden"
      @input="onInput"
    >
    <span class="radio__button" />
    <span class="radio__label">{{ label }}</span>
  </label>
</template>

<script>
  import { themes } from '~/assets/js/modules/PropTypes/types'

  export default {
    name: 'BaseRadio',
    props: {
      name: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      checked: Boolean,
      theme: {
        type: String,
        validator: v => themes.includes(v)
      }
    },

    methods: {
      onInput () {
        this.$emit('input', this.id)
      }
    }
  }
</script>

<style lang="scss">
  $radio: radio;

  .#{$radio} {
    @include inline-flex(center);

    &__button {
      position: relative;
      display: inline-block;
      width: 26px;
      height: 26px;
      border: 1px solid $c-dark-grey;
      border-radius: 50%;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 13px;
        height: 13px;
        content: '';
        background-color: $c-dark-grey;
        border-radius: 50%;
        transition: all 0.3s;
        transform: translateX(-50%) translateY(-50%) scale(0);
        transform-origin: center;
      }
    }

    &_dark {
      .#{$radio}__button {
        border-color: $c-white;

        &::after {
          background-color: $c-white;
        }
      }
    }

    &_checked {
      .#{$radio}__button {
        &::after {
          transform: translateX(-50%) translateY(-50%) scale(1);
        }
      }
    }

    &__label {
      padding: 0 20px 0 10px;
      cursor: pointer;
    }
  }
</style>
