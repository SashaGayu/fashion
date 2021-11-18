<template>
  <component
    :is="`h${level}`"
    v-animate
    class="base-title"
  />
</template>

<script>
  export default {
    name: 'BaseTitle',
    props: {
      level: {
        type: Number,
        default: 2
      }
    }
  }
</script>
