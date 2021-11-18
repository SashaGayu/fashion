<template>
  <div
    :class="['dropdown', `dropdown_${theme}`]"
  >
    <label class="form__label">
      {{ label }}
    </label>
    
    <div class="dropdown__body">
      <button
        v-click-outside="close"
        :disabled="disabled"
        type="button"
        class="dropdown__field"
        tabindex="0"
        @click="onToggle"
      >
        <span
          ref="label"
          :class="[
            'dropdown__label',
            !selectedItem && 'dropdown__label_empty'
          ]"
        >
          {{ buttonLabel }}
        </span>

        <BaseSvg
          v-if="items.length > 0"
          :class="[
            'dropdown__arrow',
            isOpened && 'dropdown__arrow_rotated'
          ]"
          name="arrow-down"
        />
      </button>

      <ul
        v-collapse="!isOpened"
        :aria-expanded="isOpened"
        :aria-hidden="!isOpened"
        role="listbox"
        :class="['dropdown__list', isOpened && 'dropdown__list_open']"
        @collapsed="isCollapsed = true"
        @expanding="isCollapsed = false"
      >
        <li
          v-for="(item, index) in items"
          :key="`${item.id}-${index}`"
          tabindex="0"
          :class="[
            'dropdown__list-item',
            item.id === _get(selectedItem, 'id', null) && 'bold'
          ]"
          @click="onSelect($event, item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import groupMixin from './group-mixin'

  export default {
    name: 'BaseDropdwon',

    mixins: [groupMixin],

    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        isOpened: false,
        isCollapsed: true,
        selectedItem: null
      }
    },

    computed: {
      buttonLabel () {
        return _get(this.selectedItem, 'label', null) || this.placeholder || _get(this.items, '0.label', '')
      }
    },

    methods: {
      onToggle () {
        this.isOpened = !this.isOpened
      },

      close () {
        this.isOpened = false
      },

      onSelect (e, item) {
        this.selectedItem = item
        this.isOpened = false
        this.$emit('input', item)
      }
    }
  }
</script>

<style lang="scss">

  $dropdown: dropdown;

  .#{$dropdown} {
    padding: 30px 0 50px;

    @include flex-column;

    &__body {
      position: relative;
      display: inline-block;
      width: 250px;
    }

    &__field {
      position: relative;
      display: inline-block;
      width: 100%;
      padding: 13px 23px;
      cursor: pointer;
      border: 1px solid $c-dark-grey;
      border-radius: 5px;
      outline: none;

      @include flex(center, space-between);
    }

    &__label {
      max-width: 100%;
      font-size: 14px;

      @include ellipsis;

      &_empty {
        opacity: 0.5;
      }
    }

    &__arrow {
      width: 17px;
      height: 11px;
      transition: transform $base-transition;
      transform-origin: center;

      &_rotated {
        transform: scale(-1);
      }
    }

    &__list {
      position: relative;
      width: 100%;
      border: 1px solid transparent;
      border-top: none;
      transition: border-color $base-transition;

      @include flex-column;

      &_open {
        border-color: $c-dark-grey;
      }

      &-item {
        width: 100%;
        padding: 13px 23px;
        line-height: 1.3;
        cursor: pointer;
        outline: none;
      }
    }

    &_dark {
      color: $c-white;

      .#{$dropdown}__field,
      .#{$dropdown}__list_open {
        border-color: $c-white;
      }

      .#{$dropdown}__arrow,
      .#{$dropdown}__label {
        color: $c-white;
      }
    }
  }

</style>
