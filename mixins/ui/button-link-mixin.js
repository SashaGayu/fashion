export default {
  computed: {
    tag () {
      if (!this.url) {
        return 'button'
      } else if (/(http|https)|(tel:)|(mailto:)/.test(this.url) || this.target === '_blank') {
        return 'a'
      } else {
        return 'nuxt-link'
      }
    },
  
    attrs () {
      const attrs = {}
      attrs.href = this.tag !== 'button' ? this.url : null
      attrs.to = this.tag === 'nuxt-link' ? this.url : null
      attrs.target = this.target ? this.target : this.tag === 'a' ? '_blank' : null
      return attrs
    }
  }
}
