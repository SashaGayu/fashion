<template>
  <BaseModal>
    <div class="modal-message">
      {{ message }}
    </div>
  </BaseModal>
</template>

<script>
  import modalMixin from './modal-mixin'

  export default {
    name: 'ModalMessage',

    mixins: [modalMixin],

    props: {
      message: {
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .modal-message {
    padding: 100px;
    background: white;
  }
</style>
