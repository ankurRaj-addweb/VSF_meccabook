<template>
    <div class="dropdown-menu fullWidth">
      <ul>
      <div>
        <li>
          <strong @click="closeCategory()" class="backto-main sectond-back d-block d-md-none"
              ><a href="#!" class="back-to"
                ><img
                  src="/assets/meccabook/down-arrow-2.svg"
                  alt="" /></a> {{ categoryVal }} </strong>
          </li>
        <li 
          :class="[child.children_data && child.children_data.length > 0 ? 'has-submenu' : '']"
          v-for="child in list" 
          :key="child.slug"
        >
          <label @click="catchSubCatvalue(child.name)" 
            class="dropdown-item"
            :class="[child.children_data && child.children_data.length > 0 ? 'has-submenu' : ''] && [subcatValue == child.name ? 'active' : '']" 
            v-if="child.children_data && child.children_data.length > 0"
          >
            {{child.name}}
          </label>
          <router-link class="dropdown-item" v-else :to="localizedRoute(`/c/${child.slug}`)">
            {{child.name}}
          </router-link>
          <sub-cat-dropdown
            v-if="child.children_data && child.children_data.length > 0"
            :parentId="child.id"
            :childrenData="child.children_data"
            :childName="child.name"
            @SetsubcatNull="SetsubcatNull"
          />
        </li>
      </div>
      </ul>
    </div>
</template>

<script>
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'
import ChevronDownIcon from 'theme/components/core/blocks/Header/ChevronDownIcon'
import SubCatDropdown from './SubCategoryDropdown.vue'

export default {
  components: {
    ChevronDownIcon,
    SubCatDropdown
  },

  props: {
    parentId: {
      type: Number,
      default: null
    },
    childrenData: {
      type: Array,
      default: () => []
    },
    categoryVal: {
      type: String,
      default: "Back"
    }
  },

  data() {
    return {
      list: [],
      subcatValue: null
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
    },
    catchSubCatvalue (e) {
      this.subcatValue = e;
    },
    closeCategory () {
      this.$emit('setCatchValNull');
    },
    SetsubcatNull () {
      this.subcatValue = null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);
.dropdown-menu {
  width: 300px !important;
}

@media (max-width: 752px) {
    .fullWidth {
      width: 100% !important;
    }  
  }
</style>