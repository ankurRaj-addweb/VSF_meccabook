<template>
  <div class="related-slider-img">
    <section
      class="related-product-sec d-none d-md-block"
      v-if="getrelatedProduct && getrelatedProduct.code == 200"
    >
      <div class="container">
        <h4 class="related-title text-center">Related products</h4>
        <div class="related-slider" style="display: flex">
          <div class="row">
              <div
                v-for="(product, index) in getrelatedProduct.data"
                :key="index"
                class="col-md-3 col-sm-6 related-wrap category-wrap listcat-vw vrt-category"
              >
                <div
                  class="related-img category-img var-hor-category-img"
                  :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
                >
                  <div class="img-wrap vs-hr-imgwrap">
                    <img
                      :src="product.product_image"
                      alt="category"
                      title="category"
                    />
                  </div>
                </div>
                <div class="related-details text-center">
                  <div v-if="product.product_name" class="category-name">
                    {{ product.product_name }}
                  </div>
                  <div v-if="product.author_name" class="category-info">
                    {{ product.author_name }}
                  </div>
                  <div class="price-wrap">${{ product.price }}</div>
                  <div class="rating">
                    <div class="ratings-wrap">
                      <img
                        src="/meccabook/ratings.png"
                        alt="rating"
                        title="rating"
                      />
                    </div>
                  </div>
                </div>
              </div>
            <i class="control prev" @click="prevSlide"></i>
            <i class="control next" @click="nextSlide"></i>
          </div>
        </div>
      </div>
    </section>
     <section
      class="related-product-sec d-block d-md-none"
      v-if="getrelatedProduct && getrelatedProduct.code == 200"
    >
      <div class="container">
        <h4 class="related-title text-center">Related products</h4>
        <div class="related-slider" style="display: flex">
          <div class="row">
            <carousel
              ref="carousel"
              v-bind="carouselConfig"
              :slidesToShow="1"
            >
              <div
                v-for="(product, index) in getrelatedProduct.data"
                :key="index"
                class="col-md-3 col-sm-6 related-wrap category-wrap listcat-vw vrt-category"
              >
                <div
                  class="related-img category-img var-hor-category-img"
                  :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
                  @click="redirectToDetailPage(product)" 
                >
                  <div class="img-wrap">
                    <img
                      :src="product.product_image"
                      alt="category"
                      title="category"
                    />
                  </div>
                </div>
                <div class="related-details text-center"
                    @click="redirectToDetailPage(product)" >
                  <div v-if="product.product_name" class="category-name">
                    {{ product.product_name }}
                  </div>
                  <div v-if="product.author_name" class="category-info">
                    {{ product.author_name }}
                  </div>
                  <div class="price-wrap">${{ product.price }}</div>
                  <div class="rating">
                    <div class="ratings-wrap">
                      <img
                        src="/meccabook/ratings.png"
                        alt="rating"
                        title="rating"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </carousel>
            <i class="control prev" @click="prevSlide"></i>
            <i class="control next" @click="nextSlide"></i>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import { ref, useRouter } from "@nuxtjs/composition-api";
import { useUiState } from "~/composables";

export default {
  props: {
    productsku: {
      type: String,
      default: null,
    },
    breadcrumbs: {
      type: [Array, Object],
      default: null
    }
  },
  components: {
    Carousel,
  },
  computed: {
    ...mapGetters("drupalcms", ["getrelatedProduct"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchRelatedProduct"]),
    nextSlide() {
      this.$refs.carousel.next();
    },
    prevSlide() {
      this.$refs.carousel.prev();
    },
  },
  mounted() {
    this.fetchRelatedProduct(this.productsku);
  },
  setup() {
    const carouselConfig = ref({
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      speed: 300,
        responsive: [ {
        breakpoint: 767,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
    });
    
    const { getSlugLink } = useUiState();

    const redirectToDetailPage = (product) => {
    const link = getSlugLink(product);
    router.push({ path: link });
  };
    const router = useRouter();

    return {  
      carouselConfig,
      redirectToDetailPage
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
   @media all and (max-width: 767px) {
     overflow: inherit;
   }

}
.related-slider {
  margin: 0 0 0 30px;
}
.related-slider-img {
  .category-wrap.vrt-category {
    width: unset;
    overflow: hidden;
  }
  .related-wrap .related-details {
    justify-content: center;
    padding-left: 0;
    @media all and (max-width: 575px) {
     max-width: 184px;
    }
  }
}
.related-slider-img {
  position: relative;
  .control {
    position: absolute;
    top: 20%;
  }
  .next,
  .prev {
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  }
}

.category-img {
  min-width: unset;
}

.var-hor-category-img {
    height: 263px !important;
    // height: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
   @media all and (max-width: 575px) {
     height: 182px !important;
     max-width: 184px;
    }
}

.vs-hr-imgwrap {
  object-fit: cover;
    img {
        max-width: 232px;
        max-height: 232px;
        height: 100%;
        width: 100%;
        object-fit: contain;
    @media all and (max-width: 767px) {
        height: 145px !important;
        max-width: 145px;
    }
    }
}
.ratings-wrap {
  display: flex;
  justify-content: center;
}
</style>
