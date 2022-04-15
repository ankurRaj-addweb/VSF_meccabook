<template>
  <div>
    <div v-if="getProductDetail && getProductDetail.isbn" class="list-rw">
      <span class="list-head">EAN 13 / ISBN </span>
      <span v-if="getProductDetail && getProductDetail.isbn" class="list-desc">{{ getProductDetail.isbn }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.binding" class="list-rw">
      <span class="list-head">Binding </span>
      <span v-if="getProductDetail && getProductDetail.binding" class="list-desc">{{ getProductDetail.binding }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.author_3nd" class="list-rw">
      <span class="list-head">Author</span>
      <span v-if="getProductDetail && getProductDetail.author_3nd" class="list-desc">{{ getProductDetail.author_3nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.publisher" class="list-rw">
      <span class="list-head">Publisher</span>
      <span v-if="getProductDetail && getProductDetail.publisher" class="list-desc">{{ getProductDetail.publisher }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.pages" class="list-rw">
      <span class="list-head">Pages</span>
      <span v-if="getProductDetail && getProductDetail.pages" class="list-desc">{{ getProductDetail.pages }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.year_published" class="list-rw">
      <span class="list-head">Year Published</span>
      <span v-if="getProductDetail && getProductDetail.year_published" class="list-desc">{{ getProductDetail.year_published }}</span>
    </div>
    <!-- <div class="list-rw">
      <span class="list-head">Dimensions</span>
      <span class="list-desc">XXXX</span>
    </div> -->
    <div v-if="getProductDetail && getProductDetail.weight" class="list-rw">
      <span class="list-head">Weight</span>
      <span v-if="getProductDetail && getProductDetail.weight" class="list-desc">{{ getProductDetail.weight }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props:  {
    productsku: {
      type: String,
      default: null
    }
    },
   computed: {
    ...mapGetters("drupalcms", ["getProductDetail"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchProductDetail"]),
  },
  mounted() {
    this.fetchProductDetail(this.productsku);
  
  },
    
}
</script>
