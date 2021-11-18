<template>
  <div class="radio-group">
    <span class="form__label text-field__label">
      {{ label }}
    </span>

    <BaseRadio
      v-for="radio in items"
      :key="radio.id"
      :checked="value === radio.id"
      :name="name"
      :theme="theme"
      v-bind="radio"
      @input="onInput"
    />
  </div>
</template>

<script>
  import groupMixin from './group-mixin'
  
  export default {
    name: 'BaseRadioGroup',
    mixins: [groupMixin],
    methods: {
      onInput (id) {
        this.$emit('input', id)
      }
    }
  }
</script>

<style lang="scss">
  $radio: radio-group;

  .#{$radio} {
    padding-bottom: 50px;

    &__label {
      padding-left: 20px;
    }
  }
</style>
