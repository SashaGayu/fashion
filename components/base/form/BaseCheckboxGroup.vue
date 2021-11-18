<template>
  <div class="checkbox-group">
    <span
      class="form__label"
    >
      {{ label }}
    </span>
    <BaseCheckbox
      v-for="checkbox in items"
      :key="checkbox.id"
      :name="checkbox.id + ''"
      :value="values[checkbox.id]"
      :theme="theme"
      v-bind="checkbox"
      @input="onInput($event, checkbox.id)"
    />
  </div>
</template>

<script>
  import groupMixin from './group-mixin'

  export default {
    name: 'BaseCheckboxGroup',
    mixins: [groupMixin],
    data () {
      const values = this.items.reduce((acc, current) => {
        this.$set(acc, current.id, 0)
        return acc
      }, {})
      return {
        values
      }
    },
    methods: {
      onInput (val, id) {
        this.values[id] = val
        this.$emit('input', this.items.filter(item => this.values[item.id]).map(item => item.id))
      }
    }
  }
</script>

<style lang="scss">
  .checkbox-group {
    padding-bottom: 50px;

    .checkbox {
      margin-top: 10px;
    }
  }
</style>
