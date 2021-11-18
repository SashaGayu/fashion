<!-- wrapper for your modals -->
<template>
  <div class="base-modal-inner js-base-modal-inner relative" @click.stop>
    <button class="base-modal__close" @click="closeModal">
      close
    </button>

    <slot />
  </div>
</template>

<script>

  export default {
    name: 'BaseModal',

    watch: {
      '$route' () {
        this.closeModal()
      }
    },
    methods: {
      closeModal () {
        this.$modal.hide('base-modal')
      }
    }
  }
</script>

<style lang="scss">
  .base-modal {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-inner {
      position: relative;
      max-height: -webkit-fill-available;
      overflow: auto;
    }
  }

  .base-modal__close {
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 5;
    color: $c-black;
  }
</style>
