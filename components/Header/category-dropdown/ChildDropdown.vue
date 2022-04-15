<template>
    <div>
      <ul style="width: 100%">
        <li  
          v-for="child in list" 
          :key="child.slug"
          class="level-item"
        >
          <router-link :to="localizedRoute(`/c/${child.slug}`)">
            {{child.name}}
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'
import ChevronDownIcon from '../ChevronDownIcon.vue'
import ChildDropdown from './ChildDropdown.vue'
export default {
  components: {
    ChevronDownIcon,
    ChildDropdown
  },
  props: {
    parentId: {
      type: Number,
      default: null
    },
    childrenData: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      list: [],
    }
  },

  mounted() {
    this.getlist()
  },

  methods: {
    async getlist() {
      await this.$store.dispatch('category-next/fetchMenuCategories', { parent: this.parentId }).then(result => {
        this.list = result.items
      })
    },
    categoryLink (category) {
      return formatCategoryLink(category)
    }
  }
}
</script>