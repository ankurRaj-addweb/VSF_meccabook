<template>
  <section class="browse-subject pt-0">
      <div class="container">
        <h3 class="th-sec-title text-md-center">Browse by subject</h3>
        <ul
          class="
            subject-list
            d-flex
            text-center
            d-flex
            flex-wrap
            justify-content-start justify-content-xl-center
          "  v-if="browseBySubject"
        >
          <li v-for="item in browseBySubject" :key="item.category_id">
            <span class="icon-img" v-if="item.category_image && item.category_url">
              <nuxt-link :to="item.category_url.replace('http://meccamagento.addwebprojects.com','/c')"><img :src="item.category_image" alt="icon" /></nuxt-link>
            </span>
            <p class="desc" v-if="item.category_name">{{ item.category_name }}</p>
          </li>
        </ul>
      </div>
    </section>
  
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props:{
    browseBySubject:{
      type: Array,
      default: null,
    },
  },
};
</script>