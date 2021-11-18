<template>
  <div class="purple">
    <BaseButton>{{ title }}</BaseButton>
  </div>
</template>

<script>
  import BaseButton from '../base/BaseButton'
  export default {
    name: 'BlockSasha',
    components: { BaseButton },
    props: {
      title: String
    }
  }
</script>

<style scoped>
.purple {
  color: blue;
}
</style>
