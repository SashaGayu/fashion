<template>
  <div
    :class="[
      'base-form',
      `base-form_${theme}`
    ]"
  >
    <form
      ref="form"
      novalidate
      @submit.prevent="onSubmit"
    >
      <slot v-bind="{ formData, hasError, isSending }">
        <component
          :is="createComponentName(field.type)"
          v-for="(field, i) in fields"
          :key="i"
          v-model="formData[field.name]"
          v-bind="field"
          :error="hasError(field.name)"
          :theme="theme"
        />
      </slot>

      <!-- slot for buttons -->
      <slot v-bind="{ formData, hasError, fields, isSending }" name="buttons">
        <BaseButton
          v-if="submitButton"
          :isLoading="isSending"
          :isDisabled="isSending"
          :theme="theme"
          type="submit"
        >
          {{ submitButton }}
        </BaseButton>
      </slot>
    </form>
  </div>
</template>

<script>
  import formMixin from './form-mixin'
  import { themes } from '~/assets/js/modules/PropTypes/types'

  export default {
    name: 'BaseForm',

    mixins: [formMixin],

    props: {
      customSubmit: Boolean,
      label: String,
      theme: {
        type: String,
        default: 'light',
        validator: theme => themes.includes(theme)
      }
    },

    data: function () {
      const formData = {
        url: process.browser && window.location.href
      }

      // create form data with empty strings
      this.fields.forEach(field => {
        let value
        switch (field.type) {
        case 'checkboxGroup':
          value = field.value || []
          break

        case 'radio':
          value = field.value || _get(field, 'items.0.id', '')
          break

        default:
          value = field.value || ''
          break
        }
        formData[field.name] = value
      })

      return {
        formData
      }
    }
  }
</script>

<style lang="scss">
.base-form {
  &_light {
    color: $c-dark-grey;
  }

  &_dark {
    color: $c-white;
  }
}
</style>
