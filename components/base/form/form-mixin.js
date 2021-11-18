import { createComponentName } from '~/assets/js/helpers/create-form-component-name'

export default {
  props: {
    type: String,
    fields: {
      type: Array,
      default: () => ([])
    },
    submitUrl: {
      type: String,
      required: true
    },
    submitButton: String,
    resetOnSuccess: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    isSending: false,
    isSent: false,
    errors: {}
  }),


  watch: {
    $router: 'clearErrors'
  },

  beforeDestroy () {
    this.resetForm()
  },

  methods: {
    createComponentName,
    /**
     *
     * @param {string} name - input name
     * @return {string} - return error text
     */
    hasError (name) {
      return this.errors[name]
    },

    /**
     * Function that called on 422 error catch
     * @param {object} errors - list of errors received from response
     */
    addErrors (errors) {
      if (errors instanceof Object) {
        this.errors = errors
      } else {
        console.error('Forms: errors must be an object')
      }
    },

    /**
     * remove errors for specific name
     */
    removeError (name) {
      delete this.errors[name]
    },

    /**
     * clear all errors
     */
    clearErrors () {
      this.errors = {}
    },

    /**
     * reset form to default state
     */
    resetForm () {
      this.isSent = false
      this.isSending = false
      // clear every param of formData.
      Object.keys(this.formData).forEach(param => {
        if (Array.isArray(this.formData[param])) {
          this.formData[param] = []
        } else if (this.formData[param] instanceof Object) {
          this.formData[param] = {}
        } else if (param === 'type' || param === 'url') {
        } else {
          this.formData[param] = ''
        }
      })

      if (this.$refs.form) this.$refs.form.reset()

      // clear form errors
      this.clearErrors()
    },

    sending () {
      this.isSent = false
      this.isSending = true

      this.$emit('sending')
    },

    onSubmit (e) {
      // make all operations with body here
      const body = new FormData()
      body.append('page', window.location.href)
      Object.keys(this.formData).forEach(param => {
        if (Array.isArray(this.formData[param])) {
          const key = /\[\]/.test(param) ? param.replace('[]', '') : param
          this.formData[param].forEach((el, index) => {
            body.append(`${key}[${index}]`, this.formData[param][index])
          })
        } else if (this.formData[param] instanceof Object) {
          body.append(param, _get(this.formData[param], 'value', _get(this.formData[param], 'id', '')))
        } else {
          body.append(param, this.formData[param])
        }
      })

      // if need send to custom url
      if (this.customSubmit) {
        return this.$emit('submit', body)
      }

      // modify body
      if (typeof this.beforePost === 'function') {
        this.beforePost(body)
      }

      this.sending() // ./form/form-mixin.js method
      this.post(body)
    },

    async post (body) {
      try {
        const { data } = await this.$axios.post(this.submitUrl, body)
        this.$emit('success', data)
        this.isSent = true
        this.$emit('closeForm', this.isSent)

        if (this.resetOnSuccess) {
          this.resetForm() // ./form/form-mixin.js method
        } else {
          this.clearErrors()
        }
      } catch (e) {
        this.$emit('error')
        this.addErrors(_get(e, 'data', {}), this.id) // ./form/form-mixin.js method
      } finally {
        this.isSending = false
      }
    },

    setField (field, value) {
      this.formData[field] = value
    }
  }
}
