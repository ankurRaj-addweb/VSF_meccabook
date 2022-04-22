<template>
   <div class="product_badge" :class="badgeClass" v-if="showSaleBadge">
      {{badgeText}}
      <!-- {{price.regular}} - {{price.special}} -->
      <!-- {{latest}} -->
   </div>
</template>
<script>
   export default {
   name: 'Badge',
   props: ['price', 'product', 'latest', 'stockStatus', 'stockLeft'],
   computed: {
   showSaleBadge: function () {
   return (this.onSale === true || this.newArrival === true || this.lessStock === true);
   },
   badgeText: function() {

   if(this.lessStock === true) {
   this.badgeClass = 'less_stock';
   return 'Out of Stock';
   }


   if(this.newArrival === true) {
   this.badgeClass = 'new_arrival';
   return 'New';
   }


   if(this.onSale === true) {
   this.badgeClass = 'on_sale';
   return 'Sale';
   }


   }
   },
   mounted() {
   this.onSale = (this.price.special != null && this.price.special < this.price.regular);
    console.log(this.latest);
    let latest = [];
    if(typeof(this.latest) !== "undefined" && this.latest !== null) {
      latest = this.latest[0].data;
    }

   let that = this;

   let matched = [];

if(latest.length > 0) {
  for(let i=0; i<15; i++) {
    if(latest[i].product_id_base64 == that.product) {
      matched.push(that.product);
    }
  }
}



   if(matched.length > 0) {
   this.newArrival = true;
   }

   if(this.stockLeft > 0) {
   this.lessStock = true;
   }


   },
   data() {
   return {
   onSale: false,
   newArrival: false,
   lessStock: false,
   badgeClass: ''
   }
   }
   }
</script>
<style lang="scss">
   .product_badge {
   z-index: 1;
   top: 10px;
   right: auto;
   bottom: auto;
   left: 10px;
   position: absolute;
   font-size: 0.75rem;
   cursor: pointer;
   background: #2c354e;
   min-width: 51px;
   width: auto;
   height: 26px;
   padding: 5px 8px;
   color: #fff;
   border-radius: 2px;
   line-height: 1.2;
   display: flex;
   align-items: center;
   justify-content: center;
   }
   .new_arrival {
   background: #2c354e;
   }
   .on_sale,
   .less_stock {
   background: #b69f62;
   }
</style>
