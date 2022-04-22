<template>
  <section class="donated-sec" v-if="donationsData[0].order_data">
      <div class="container">
        <div class="donated-info d-md-flex">
          <div class="map-area d-none d-md-block">
            <img :src="countryImageChange()" alt="map" class="map" />
            <div class="location-card d-flex align-items-center" :class="applyClass ? 'image-fade' : ''" v-if="donationsData[0].order_data[0]">
              <div class="loc-view" v-if="donationsData[0].order_data[0].product_image">
                <img :src="donationsData[0].order_data[0].product_image" alt="image" />
              </div>
              <p class="loc-desc" v-if="donationsData[0].order_data[0].country">
                Someone in
                <strong>{{ donationsData[0].order_data[0].country }}</strong> just improved Islamic education with
                their purchase of
                <br />
                <strong v-if="donationsData[0].order_data[0].product_name">{{ donationsData[0].order_data[0].product_name }}</strong>
              </p>
            </div>
          </div>
          <div class="amount d-md-flex align-items-center text-center">
            <div class="amt-head">
              <h2 class="price sec-title" v-if="donationsData[1] && donationsData[1].donation_amount">{{ donationsData[1].donation_amount }}</h2>
              <p class="title-desc" v-if="donationsData[2] && donationsData[2].donation_text" v-html="donationsData[2].donation_text">
              </p>
            </div>
            <div class="amt-desc">
              <p class="desc mb-d">
                Mecca Books
                <strong>donates 2% of all sales</strong> to organisations that
                help improve the minds and lives through Islamic scholarship and
                education.
              </p>
              <p class="desc">
                <nuxt-link to="/donations"> the donations page </nuxt-link>
                learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
</template>

<script>
export default {
  props:{
    donationsData:{
      type: Array,
      default: null,
    },
    applyClass: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      countryName: null,
    }
  },
  methods: {
    countryImageChange() {
      if(this.donationsData && this.donationsData[0].order_data[0] && this.donationsData[0].order_data[0].country) {
        this.countryName = this.donationsData[0].order_data[0].country;
        if(this.countryName) {
        const imageURL = '/meccabook/country/'+this.countryName+'.svg'; 
        return imageURL;
        }
        else {
          return "/meccabook/CharityMap-01.jpg"
        }
      }
    }
  }
};
</script>

<style scoped>
.location-card {
  opacity: 0;
}
.image-fade {
  animation: fadeIn ease-in 1;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>