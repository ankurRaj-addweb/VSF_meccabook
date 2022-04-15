<template>
  <div class="wrapper-blog kids-wrapper-blog">
    <section
      class="kids-home-banner"
      
      v-bind:style="{ 'background-image': 'url(' + getkidspage.components.middle.image_title_description[0].image.url + ')' }"
      v-if="
        getkidspage && getkidspage.components && getkidspage.components.middle
      "
    >
     <div class="knowledge-point">
        <a href="#">
          <span class="knowledge-text">Knowledge points</span>
          <i class="icon-ribbon"></i>
        </a>
      </div>
      <div class="container">
        <div class="kinds-banner-content">
          <h1 class="kinds-bn-title">
            {{ getkidspage.components.middle.image_title_description[0].title }}
          </h1>
        </div>
      </div>
    </section>
    <section class="knowledge-sec kids-knowledge-sec">
      <div
        class="container"
        v-if="
          getkidspage &&
          getkidspage.components &&
          getkidspage.components.middle &&
          getkidspage.components.middle.category_component
        "
      > 
       <div class="kids-card-head">
          <template
          >
            <!-- <nuxt-link to="/c/kids" > -->
            <div class="kids-img-card">
              <button v-if="getkidspage.components.middle.category_component[0].link"
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[0].image.img_url"
                  :alt="getkidspage.components.middle.category_component[0].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/kids-read-button-2.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[0].name}}</h6>
                </div>
              </button>
            </div>
            <!-- </nuxt-link> -->
          </template>
          <template
          >
            <!-- <nuxt-link to="#" > -->
            <div class="kids-img-card">
              <button v-if="getkidspage.components.middle.category_component[1].link" 
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[1].image.img_url"
                  :alt="getkidspage.components.middle.category_component[1].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/holding-box-button.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[1].name}}</h6>
                </div>
              </button>
            </div>
            <!-- </nuxt-link> -->
          </template>
           <template
          >
          <!-- <nuxt-link to="#" > -->
            <div class="kids-img-card">
              <button v-if="getkidspage.components.middle.category_component[2].link"
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[2].image.img_url"
                  :alt="getkidspage.components.middle.category_component[2].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/parent-and-kids-button-2.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[2].name}}</h6>
                </div>
              </button>
            </div>
          <!-- </nuxt-link> -->
          </template>
          <template
          >
            <!-- <nuxt-link to="#" > -->
            <div class="kids-img-card">
              <button :href="getkidspage.components.middle.category_component[3].link"
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[3].image.img_url"
                  :alt="getkidspage.components.middle.category_component[3].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/kids-with-toy-button-2.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[3].name}}</h6>
                </div>
              </button>
            </div>
            <!-- </nuxt-link> -->
          </template>
      </div>
        <div
          v-if="getkidspage && getkidspage.components"
          class="kids sec-head text-center"
        >
          <h2 class="sec-title blue-text">
            {{ getkidspage.components.middle.image_title_description[1].title }}
          </h2>
          <p class="sec-desc blue-text">
            {{
              removeTags(
                getkidspage.components.middle.image_title_description[1]
                  .description.text
              )
            }}
          </p>
        </div>

        <FeaturedLatestPopular
          v-if="
            getkidsfeatured &&
            getkidsfeatured[0].data &&
            getkidsPopular &&
            getkidsPopular[0].data
          "
          :featured="getkidsfeatured"
          :popular="getkidsPopular"
        />
         
      </div>
        <FeaturedlatestPopularMobile
          v-if="
            getkidsfeatured &&
            getkidsfeatured[0].data &&
            getkidsPopular &&
            getkidsPopular[0].data
          "
          :featured="getkidsfeatured"
          :popular="getkidsPopular"
        />
    </section>
    <section class="related-product-sec">
      <div class="container" v-if="getkidslatest && getkidslatest[0].data">
        <h4 class="related-title blue-text Acme-font text-center">
          Latest items
        </h4>

        <kidslatest v-if="getkidslatest" :latest="getkidslatest[0].data">
        </kidslatest>
      </div>
    </section>
    <div class="art-showmore-btn">
      <div class="container" v-if="getkidslatest && getkidslatest[0].data">
        <div class="kids-showmore-card-btn">
          <div class="kids-show-more">
            <nuxt-link
            to="c/kids"
              class="btn"
              v-if="this.showMoreButtonIsVisible"
            >
              <span>Show More</span>
              <i class="right-side-arrow"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Kidslatest from "../pages/kidshome/Kidslatest.vue";
import { mapActions, mapGetters } from "vuex";
import RouterLinkButton from "../components/RouterLinkButton.vue";
import LatestArticleCard from "./articles/LatestArticleCard.vue";
import { paginate } from "../mixins/paginatedContent.js";
import {
  onMounted,
  useRoute,
} from "@nuxtjs/composition-api";
import FeaturedLatestPopular from "./home/FeaturedLatestPopular.vue";
import FeaturedlatestPopularMobile from './home/FeaturedlatestPopularMobile.vue'

import Carousel from "vue-slick-carousel";

export default {
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
      kidsIndex: 0,
      kidsLatest: 0,
    };
  },
  components: {
    RouterLinkButton,
    LatestArticleCard,
    Carousel,
    FeaturedLatestPopular,
    FeaturedlatestPopularMobile,
    Kidslatest,
  },
  mixins: [paginate],
  computed: {
    ...mapGetters("drupalcms", [
      "getArticlesContent",
      "getLatestArticle",
      "getkidspage",
      "getkidslatest",
      "getkidsfeatured",
      "getkidsPopular",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", [
      "fetchArticles",
      "fetchKids",
      "fetchKidslatest",
      "fetchKidsfeatured",
      "fetchKidspopular",
    ]),

    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },

    prevKn() {
      this.$refs.kgcarousel.prev();
      this.kidsIndex -= 5;
    },
    nextKn() {
      this.$refs.kgcarousel.next();
      this.kidsIndex += 5;
    },

    prevLKn() {
      this.$refs.kgcarousel.prev();
      this.kidsLatest -= 5;
    },
    nextLKn() {
      this.$refs.kgcarousel.next();
      this.kidsLatest += 5;
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

  setup() { 
  const route = useRoute();
  onMounted(() => {
        document.body.classList.add('kids-home');
  });
  },

  

  beforeMount() {
    this.fetchArticles();
  },
  async mounted() {
    await this.fetchKids();
    await this.fetchKidslatest();
    await this.fetchKidsfeatured();
    await this.fetchKidspopular();
  },
  
};
</script>

<style lang="scss" scoped>
.related-wrap {
  margin-bottom: 59px;
  @media all and (max-width: 767px) {
    margin-bottom: 30px;
  }
  .category-img {
    min-width: unset;
  }
  .related-details {
    opacity: 1;
  }
}
.kids-show-more .btn {
  background-color: transparent;
}

.kids-wrapper-blog {
  background-image: url("/meccabook/kids-bg-img.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.kids-knowledge-sec {
    @media all and (max-width: 767px) {
    padding-top: 20px !important;
  }
}
.kids-card-head {
   @media all and (max-width: 767px) {
    margin-bottom: 20px !important;
  }
}

.event-prev {
  background: url(/meccabook/event-left-arror.png) no-repeat center center;
  left: -75px !important;
  z-index: 99;
}

.event-next {
  background: url(/meccabook/event-right-arrow.png) no-repeat center center;
  transform: unset !important;
  right: -75px !important;
  z-index: 99;
}

.prev,
.next {
  top: 40%;
}
.select-tab {
  background: transparent;
}
.nav.nav-tabs {
  margin-top: 40px;
}
.art-showmore-btn {
  margin-top: 0;
}
.related-product-sec {
  padding-bottom: 0;
}

</style>
