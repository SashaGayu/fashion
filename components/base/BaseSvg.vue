<template>
  <svg>
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
  export default {
    name: 'BaseSvg',
    props: {
      name: String
    }
  }
</script>
