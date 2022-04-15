<template>
  <section class="home-banner">
    <carousel
      ref="bannercarousel"
      :dots="true"
      v-bind="carouselConfig"
      class="banner-slider"
    >
      <div class="item" v-for="item in slider" :key="item.image.url">
        <img class="slide-img" :src="item.image.url" :alt="item.image.alt" />
      </div>
      <template #customPaging="page" class="dots-wrapper">
        <div :id="`dot_${page}`" class="custom-dot"></div>
      </template>
    </carousel>
    <div class="banner-content">
      <div class="container" v-if="slider[imageIndex].title">
        <div class="wrap">
          <span class="subtitle text-uppercase">{{
            slider[imageIndex].heading
              ? slider[imageIndex].heading
              : "a decade of learning"
          }}</span>
          <h1 class="banner-title">{{ slider[imageIndex].title }}</h1>
          <p class="desc" v-html="slider[imageIndex].description.text"></p>
          <!-- <p>{{ slider }}</p> -->
          <router-link :to="slider[imageIndex].cta.url" class="btn banner-btn btn-shadow" v-if="slider[imageIndex].cta && slider[imageIndex].cta.url">
            <span v-if="slider[imageIndex].cta.label">{{ slider[imageIndex].cta.label }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <i
      class="control prev"
      @click="prev()"
    ></i>
    <i
      class="control next"
      @click="next()"
    ></i>
  </section>
</template>


<script type="module">
import { useProduct, productGetters } from "@vue-storefront/magento";
import {
  computed,
  defineComponent,
  ref,
  onMounted,
} from "@nuxtjs/composition-api";
import { onSSR } from "@vue-storefront/core";
import LazyHydrate from "vue-lazy-hydration";
import MobileStoreBanner from "~/components/MobileStoreBanner.vue";
import InstagramFeed from "~/components/InstagramFeed.vue";
import { mapActions, mapGetters } from "vuex";
import { paginate } from "../../mixins/paginatedContent.js";
import Carousel from "vue-slick-carousel";

export default defineComponent({
  name: "HomePage",
  props: {
    slider: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      contentFieldName: "getLatestArticle",
      carouselConfig: {
        infinite: true,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        speed: 300,
      },
      selectedTab: "featured",
      selectedTab: "popular",
    };
  },
  components: {
    InstagramFeed,
    LazyHydrate,
    MobileStoreBanner,
    Carousel,
  },
  mixins: [paginate],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(context) {
    const {
      products: newProductsResult,
      search: newProductsSearch,
      loading: newProductsLoading,
    } = useProduct("newProducts");

    const bannercarousel = ref(null);
    let imageIndex = ref(0);

    const banners = ref([
      {
        slot: "banner-A",
        subtitle: "Dresses",
        title: "Cocktail & Party",
        description:
          "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
        buttonText: "Shop now",
        image: {
          mobile:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_328x343.jpg",
          desktop:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerF_332x840.jpg",
        },
        class: "sf-banner--slim desktop-only",
        link: "/c/women/women-clothing-skirts",
      },
      {
        slot: "banner-B",
        subtitle: "Dresses",
        title: "Linen Dresses",
        description:
          "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
        buttonText: "Shop now",
        image: {
          mobile:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_328x343.jpg",
          desktop:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_496x840.jpg",
        },
        class: "sf-banner--slim banner-central desktop-only",
        link: "/c/women/women-clothing-dresses",
      },
      {
        slot: "banner-C",
        subtitle: "T-Shirts",
        title: "The Office Life",
        image: {
          mobile:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_328x343.jpg",
          desktop:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_332x400.jpg",
        },
        class: "sf-banner--slim banner__tshirt",
        link: "/c/women/women-clothing-shirts",
      },
      {
        slot: "banner-D",
        subtitle: "Summer Sandals",
        title: "Eco Sandals",
        image: {
          mobile:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_328x343.jpg",
          desktop:
            "https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_332x400.jpg",
        },
        class: "sf-banner--slim",
        link: "/c/women/women-shoes-sandals",
      },
    ]);

    // @ts-ignore
    const newProducts = computed(() =>
      productGetters.getFiltered(newProductsResult.value?.items, {
        master: true,
      })
    );

    const next = () => {
      // imageIndex.value += 1;
      bannercarousel.value.next();
    };

    const prev = () => {
      // imageIndex.value -= 1;
      bannercarousel.value.prev();
    };

    onMounted(() => {
      const dotsWrapper = document.getElementsByClassName("slick-dots")[0];

      if (dotsWrapper) {
        dotsWrapper.style.display = "flex";
      }
    });

    onSSR(async () => {
      await newProductsSearch({
        pageSize: 10,
        currentPage: 1,
        sort: {
          position: "ASC",
        },
      });
    });

    const carouselConfig = ref({
      infinite: true,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      speed: 300,
    });

    return {
      banners,
      newProducts,
      newProductsLoading,
      productGetters,
      carouselConfig,
      next,
      prev,
      bannercarousel,
      imageIndex,
    };
  },
  computed: {
    ...mapGetters("drupalcms", [
      "getArticlesContent",
      "getLatestArticle",
      "getAboutusContent",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchAboutus", "fetchArticles"]),
    prevKn() {
      this.$refs.kgcarousel.prev();
    },
    nextKn() {
      this.$refs.kgcarousel.next();
    },
    select(event, tabName) {
      let navLinks = document.getElementsByClassName("nav-link");

      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
      }

      let selectedElement = event.target;
      selectedElement.classList.add("active");

      this.selectedTab = tabName;
    },
  },
  mounted() {
    this.fetchAboutus();
  },
  beforeMount() {
    this.fetchArticles();
  },
});
</script>

<style lang="scss" scoped>
.article-meta h4 a {
  color: #111111;
  font-weight: 600;
  font-size: 20px;
}

.article-meta {
  margin-top: 10px;
}

.article-item__meta-item:not(:last-child)::after {
  display: inline-block;
  content: "";
  width: 5px;
  height: 5px;
  margin: -1px 10px 0 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

#home {
  box-sizing: border-box;
  // padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }

  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        --hero-item-wrapper-text-align: right;
        --hero-item-subtitle-width: 100%;
        --hero-item-title-width: 100%;
        --hero-item-wrapper-padding: var(--spacer-sm) var(--spacer-sm)
          var(--spacer-sm) var(--spacer-2xl);
      }
    }
  }
}

::v-deep .sf-hero__controls {
  --hero-controls-display: none;
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }

  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }

    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}

.new-collection {
  @media (max-width: 767px) {
    padding-top: 0;
  }
}

#layout {
  max-width: none;
}

.prev,
.next {
  &.is-brown {
    background-image: url(/assets/meccabook/slide-arrow-gold.svg);
  }

  @media (max-width: 767px) {
    top: 16%;
  }
}

.next {
  right: 0;
  transform: rotate(180deg);
}

.custom-dot {
  width: 14px;
  height: 14px;
  border: 1px solid #c6b075;
  border-radius: 50%;
  cursor: pointer;
}

.slick-active {
  .custom-dot {
    background-color: #c6b075;
  }
}

.event-block {
  .container {
    @media (max-width: 768px) {
      .next,
      .prev {
        display: none;
      }
    }
  }
}

.home-banner .slide-img {
  height: 600px;
  width: 100vw;
  opacity: 0.8;

  @media (max-width: 1152px) {
    height: 480px;
  }

  @media (max-width: 768px) {
    height: 320px;
  }

  @media (max-width: 375px) {
    height: 270px;
  }
}

.content-blog .subtitle {
  margin-bottom: 30px;
}

.content-blog p.desc {
  margin-bottom: 30px;
}

.feature-homeblog {
  .feature-block {
    padding-top: 50px;
    border-top: 1px solid #c6b075;
  }
}

.related-product-sec {
  @media only screen and (min-width: 1200px) {
    .container {
      width: 1260px;
    }
  }
}
.related-slider {
  display: flex;
}
.slick-track[data-v-e4caeaf8] {
  display: flex !important;
}
</style>