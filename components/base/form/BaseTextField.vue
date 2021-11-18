<template>
  <label :class="textFieldClasses">

    <!--Label-->
    <span
      :class="[
        'form__label',
        'text-field__label',
        !$attrs.placeholder && 'text-field__label_focusable'
      ]"
    >
      {{ label }}
    </span>

    <!--Input or textarea-->
    <component
      :is="tag"
      ref="input"
      v-bind="$attrs"
      :value="value"
      :class="[
        'form__input',
        'text-field__input',
        { 'text-field__input_textarea': tag === 'textarea' },
        { 'text-field__input_light': theme === 'dark' }
      ]"
      autocomplete="off"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />

    <!--Errors-->
    <FormError :error="error" :margin-bottom="marginBottom" />

  </label>
</template>

<script>
  import inputMixin from './inputs-mixin'

  export default {
    name: 'BaseTextField',

    mixins: [inputMixin],

    computed: {
      textFieldClasses () {
        return [
          'text-field',
          { 'text-field_focus': this.isOnFocus },
          { 'text-field_has-content': this.value },
          { 'text-field_error': this.error }
        ]
      },

      tag () {
        if (this.$attrs.type === 'textarea') {
          return 'textarea'
        }

        return 'input'
      }
    },

    methods: {
      onInput (e) {
        if (this.tag === 'textarea') this.calculateTextareaHeight()

        this.$emit('input', e.target.value)
      },

      onChange (e) {
        this.$emit('change', e.target.value)
      },

      onFocus () {
        this.isOnFocus = true

        this.$emit('focus', this.$attrs.name)
      },

      onBlur () {
        this.isOnFocus = false

        this.$emit('blur', this.$attrs.name)
      },

      // TODO: add smoothing animation
      calculateTextareaHeight () {
        const { input } = this.$refs
        if (input) {
          input.style.height = 0
          input.style.height = input.scrollHeight + 2 + 'px'
        }
      }
    }
  }
</script>

<style lang="scss">
  $text-field: text-field;

  .#{$text-field} {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 24px;

    &.#{$text-field}_error .#{$text-field}__input {
      border-bottom: 1px solid tomato !important;
    }

    &__input {
      width: 100%;
      padding: 15px 0 10px;
      color: $c-black;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid black;
      outline: none;

      &_light {
        color: $c-white;
        border-bottom: 1px solid white;
      }

      &::placeholder {
        color: gray;
        opacity: 1;
        transition: opacity 0.5s ease;
      }

      &:focus::placeholder {
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      &_textarea {
        max-height: 300px;
        padding-top: 21px;
        line-height: initial;
        resize: vertical;
      }
    }

    &__label {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      opacity: 1;

      &_focusable {
        font-size: 100%;
        transition: all $base-transition ease-out;
        transform: translateY(80%);
      }
    }

    &.#{$text-field}_error.#{$text-field}_focus .#{$text-field}__input {
      box-shadow: inset 0 0 0 0 tomato;
    }

    &_focus,
    &_error,
    &_has-content {
      .#{$text-field}__label_focusable {
        font-size: 90%;
        transform: translateY(0);
      }
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    box-shadow: 0 0 0 1000px white inset;
  }

</style>
