<template>
  <div v-if="getproductConfigurable && getproductConfigurable.code == 200" style="display: flex;">
  <ul v-for="(product, index) in getproductConfigurable.data" :key="index"
    class="boxes-list text-center text-md-left d-flex justify-content-between flex-wrap"
  >
    <li @click="putActiveButtonID(product.product_id)" class="box box-btn" :class="activeBtn == product.product_id ? 'active' : null">
      <span v-if="product.options && product.options.format" v- class="quality d-block">{{ product.options.format }}</span>
      <span v-if="product.price" class="price d-block">${{ product.price }}</span>
    </li>
  </ul>
  </div>
  <div v-else>
  <ul
    class="boxes-list text-center text-md-left d-flex justify-content-between flex-wrap"
  >
    <li class="box box-btn single-price-bg">
      <span class="quality d-block">Price</span>
      <span class="single-price d-block">{{ Singleprice }}</span>
    </li>
  </ul>
  </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
      return {
        activeBtn: null,
      }
    },
    props:  {
    productsku: {
      type: String,
      default: null
    },
    Singleprice: {
      type: String,
      default: null
    }
    },
   computed: {
    ...mapGetters("drupalcms", ["getproductConfigurable"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchProductConfigurable"]),
    putActiveButtonID (val) {
      this.activeBtn = val;
    }
  },
  mounted() {
    this.fetchProductConfigurable(this.productsku);
  
  },
    
}
</script>
