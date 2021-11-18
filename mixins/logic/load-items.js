export default {
  props: {
    dynamicDataUrl: {
      type: String,
      default: ''
    },
    dynamicData: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    links: {},
    meta: {},
    loadedItems: [],
    isVisible: true
  }),

  methods: {
    async loadItems (url, raw = false, add = false) {
      try {
        if (!add) this.isVisible = false
        const { data } = await this.$axios.get(url, raw ? {} : { params: this.params })
        if (add) {
          for (const item of data.items) {
            this.loadedItems.push(item)
          }
        } else {
          this.loadedItems = data.items
          this.isVisible = true
        }
        this.links = data['links']
        this.meta = data['meta']
      } catch (e) {
        return { statusCode: e.response.status, message: e.response.data }
      }
    },

    loadMore () {
      if (this.links.next) this.loadItems(this.links.next.href, true, true)
    }
  }
}
