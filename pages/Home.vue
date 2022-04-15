<template>
  <div id="home">
    <div class="knowledge-point">
      <router-link to="#">
        <span class="knowledge-text">Knowledge points</span>
        <i class="icon-ribbon"></i>
      </router-link>
    </div>

    <!-- home-banner component start -->
    <HomeBanner
      v-if="
        getHomeContent &&
        getHomeContent.components &&
        getHomeContent.components.middle &&
        getHomeContent.components.middle.carousel
      "
      :slider="getHomeContent.components.middle.carousel"
    />
    <!-- home banner component end -->

    <section class="knowledge-sec">
      <div class="container">
        <SeekerKnowledge
          v-if="
            getHomeContent &&
            getHomeContent.components &&
            getHomeContent.components.middle &&
            getHomeContent.components.middle.image_title_description[0]
          "
          :seekerKnowledge="
            getHomeContent.components.middle.image_title_description[0]
          "
        />

        <!-- featured latest popular category -->
        <FeaturedLatestPopular :featured="getHomeFeatured" :latest="getHomeLatest" :popular="getHomePopular" v-if="getHomeFeatured && getHomeFeatured[0].data && getHomeLatest && getHomeLatest[0].data && getHomePopular && getHomePopular[0].data" />
      </div>
         <FeaturedlatestPopularMobile :featured="getHomeFeatured" :latest="getHomeLatest" :popular="getHomePopular" v-if="getHomeFeatured && getHomeFeatured[0].data && getHomeLatest && getHomeLatest[0].data && getHomePopular && getHomePopular[0].data" />
    </section>

    <BrowseBySubject
      v-if="
        getBrowseBySubject &&
        getBrowseBySubject[0] &&
        getBrowseBySubject[0].data
      "
      :browseBySubject="getBrowseBySubject[0].data"
    />

    <!-- donationblog -->
    <DonationBlog
      v-if="getDonationsMagento && getDonationsMagento[0].data"
      :donationsData="getDonationsMagento[0].data"
    />

    <!-- donatelist -->
    <section class="donatelist-sec d-none d-md-block">
      <div class="container">
        <DonatelistBlog
          v-if="
            getHomeContent &&
            getHomeContent.components &&
            getHomeContent.components.middle &&
            getHomeContent.components.middle.category_component
          "
          :donateList="getHomeContent.components.middle.category_component"
        />
      </div>
    </section>
    <!-- events -->
    <section class="event-block" v-if="getUpcomingEvents">
      <div class="container">
        <h3 class="th-sec-title text-md-center">Events</h3>
        <EventSlider :events="getUpcomingEvents" v-if="getUpcomingEvents" />
      </div>
    </section>
    <!-- AboutBook -->
    <about-book
    class="aboute-books-wrap"
      v-if="getHomeContent && getHomeContent.components && getHomeContent.components.middle && getHomeContent.components.middle.title_description_crop_image[0]"
      :content="getHomeContent.components.middle.title_description_crop_image[0].details[0]"
      :aboutimg="getHomeContent.components.middle.title_description_crop_image[0]"
      buttonLink="/about-us"
    />
    <!-- Follow Us Section Start -->
    <section class="followus-sec">
      <div class="container">
        <h4 class="followUs text-center">Follow us @MeccaBooks</h4>
      </div>
      <div class="folow-info">
        <ul class="follow-list">
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img1.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img2.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img3.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img1.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img2.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img3.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img1.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img2.jpg" alt="image" />
            </a>
          </li>
          <li>
            <a href="#!">
              <img src="/meccabook/follow-img3.jpg" alt="image" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script type="module">
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfBannerGrid,
} from "@storefront-ui/vue";
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
import ProductsCarousel from "~/components/ProductsCarousel.vue";
import Carousel from "vue-slick-carousel";
import { mapActions, mapGetters } from "vuex";
import RouterLinkButton from "../components/RouterLinkButton.vue";
import AboutBook from "./about-us/AboutBook.vue";
import { paginate } from "../mixins/paginatedContent.js";
import EventSlider from "../pages/home/EventSlider.vue";
import HomeBanner from "./home/HomeBanner.vue";
import SeekerKnowledge from "./home/SeekerKnowledge.vue";
import DonatelistBlog from "./home/DonatelistBlog.vue";
import BrowseBySubject from "./home/BrowseBySubject.vue";
import FeaturedLatestPopular from "./home/FeaturedLatestPopular.vue";
import DonationBlog from "./home/DonationBlog.vue";
import FeaturedlatestPopularMobile from './home/FeaturedlatestPopularMobile.vue'

export default defineComponent({
  name: "HomePage",
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
    };
  },
  components: {
    InstagramFeed,
    LazyHydrate,
    MobileStoreBanner,
    ProductsCarousel,
    SfBanner,
    SfBannerGrid,
    SfCallToAction,
    SfHero,
    Carousel,
    RouterLinkButton,
    AboutBook,
    EventSlider,
    HomeBanner,
    SeekerKnowledge,
    DonatelistBlog,
    BrowseBySubject,
    FeaturedLatestPopular,
    DonationBlog,
    FeaturedlatestPopularMobile,
  },
  mixins: [paginate],
  setup(context) {
    const {
      products: newProductsResult,
      search: newProductsSearch,
      loading: newProductsLoading,
    } = useProduct("newProducts");

    const bannercarousel = ref(null);

    // @ts-ignore
    const newProducts = computed(() =>
      productGetters.getFiltered(newProductsResult.value?.items, {
        master: true,
      })
    );

    const next = () => {
      bannercarousel.value.next();
    };

    const prev = () => {
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
      newProducts,
      newProductsLoading,
      productGetters,
      carouselConfig,
      next,
      prev,
      bannercarousel,
    };
  },
  computed: {
    ...mapGetters("drupalcms", [
      "getArticlesContent",
      "getLatestArticle",
      "getHomeContent",
      "getUpcomingEvents",
      "getBrowseBySubject",
      "getHomeFeatured",
      "getHomeLatest",
      "getHomePopular",
      "getDonationsMagento",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", [
      "fetchArticles",
      "fetchHome",
      "fetchUpcomingEvents",
      "fetchBrowseBySubject",
      "fetchHomeFeatured",
      "fetchHomeLatest",
      "fetchHomePopular",
      "fetchDonationsMagento",
    ]),
    prevKn() {
      this.$refs.kgcarousel.prev();
    },
    nextKn() {
      this.$refs.kgcarousel.next();
    },
  },
  mounted() {
    this.fetchHome();
    this.fetchUpcomingEvents();
    this.fetchBrowseBySubject();
    this.fetchHomeFeatured();
    this.fetchHomeLatest();
    this.fetchHomePopular();
    this.fetchDonationsMagento();
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
    top: 25%;
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
.aboute-books-wrap {
  @media only screen and (min-width: 768px) {
    margin-bottom: 136px;
  }
}
</style>
