<template>
  <label :class="formCheckboxClasses">
    <!--Input-->
    <input
      ref="input"
      :checked="!!value"
      :value="value"
      v-bind="$attrs"
      class="visually-hidden"
      type="checkbox"
      @change="onChange"
    >

    <!--Icon-->

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x="8.5"
        y="8.5"
        width="23"
        height="23"
        rx="5.5"
        fill="none"
        :stroke="error ? colors['c-red'] : 'currentColor'"
      />
      <path
        class="checkbox__mark"
        d="M14 17.5L20 23.5L35 8.5"
        stroke="currentColor"
      />
    </svg>


    <span class="checkbox__label" v-html="label" />

    <!--Errors-->
    <FormError :marginBottom="marginBottom" :error="error" />

  </label>
</template>

<script>
  import inputMixin from './inputs-mixin'
  import colors from '~/assets/variables/colors'

  export default {
    name: 'BaseCheckbox',

    mixins: [inputMixin],

    data () {
      return {
        colors
      }
    },

    computed: {
      formCheckboxClasses () {
        return [
          'checkbox',
          { 'checkbox_error': this.error },
          { 'checkbox_checked': this.value },
          `checkbox_${this.theme}`
        ]
      }
    },

    methods: {
      onChange ({ target }) {
        this.$emit('input', target.checked ? 1 : 0)
      }
    }
  }
</script>

<style lang="scss">
  $checkbox: checkbox;

  .#{$checkbox} {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    &__label {
      padding-left: 10px;
      font-size: 16px;
      vertical-align: middle;
      user-select: none;
    }

    &_error {
      color: $c-red;
    }

    &_dark {
      color: $c-white;
    }

    &_light {
      color: $c-dark-grey;
    }

    &__mark {
      stroke-dasharray: 0, 50;
      stroke-dashoffset: 5;
      stroke-width: 2px;
      transition: stroke-dasharray 0.3s;

      .#{$checkbox}_checked & {
        stroke-dasharray: 50, 0;
      }
    }
  }
</style>
