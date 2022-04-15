<template>
    <div class="third-lavelmenu">
      <ul>
        <li>
          <strong @click="closeSubCategory()" class="backto-main sectond-back d-block d-md-none"
              ><a href="#!" class="back-to"
                ><img
                  src="meccabook/down-arrow-2.svg"
                  alt="" /></a> {{ childName }} </strong>
          </li>
        <li
          v-for="child in list" 
          :key="child.slug"
          class="level-item"
        >
          <router-link @click="FuncshowChildCategory" class="has-submenu" :to="localizedRoute(`/c/${child.slug}`)">
            {{child.name}}
            <chevron-down-icon 
              v-if="child.children_data && child.children_data.length > 0" 
              class="arrow-right"
            />
          </router-link>
          <div
            class="menu-items" :class="{'child-category-active': showChildCategory}"
            v-if="child.children_data && child.children_data.length > 0"
          >
           <child-dropdown 
              :parentId="child.id"
              :childrenData="child.children_data"
              :showChildCategory="showChildCategory"
           />
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'
import ChevronDownIcon from '../ChevronDownIcon.vue';
import ChildDropdown from './ChildDropdown.vue'
export default {
  components: {
    ChevronDownIcon,
    ChildDropdown,
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
    childName: {
      type: String,
      default: "Back"
    }
  },

  data() {
    return {
      list: [],
      showMenu: false,
      showChildCategory: true
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
    closeSubCategory () {
      this.$emit('SetsubcatNull');
    },
    FuncshowChildCategory() {
      this.showChildCategory = !this.showChildCategory;
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow-right {
  transform: translateY(-50%) rotate(-90deg);
  margin: 5px 0 0 5px;
}

.third-lavelmenu ul {
  width: 93% !important;
}

@media (max-width: 752px) {
    .child-category-active {
    position: relative !important;
    right: 0px !important;
    z-index: 12;
    }
  }

.level-item {
  position: relative;
  
  .menu-items {
    display: none;
    padding: 10px;
    min-height: 100px;
    position: absolute;
    right: -190px;
    top: 0;
    width: 190px;
    background-color: #fff;
  }
}

.level-item:hover {
  .menu-items {
    display: block;
  }
}
</style>