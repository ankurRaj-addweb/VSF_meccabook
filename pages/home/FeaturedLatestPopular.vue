<template>
  <section class="feature-products">
    <div class="tab-content d-none d-md-block" id="myTabContent">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation" v-if="featuredData">
          <button
            class="nav-link active kids-blue-link"
            id="home-tab"
            @click="select($event, 'featured')"
          >
            Featured
          </button>
        </li>
        <li class="nav-item" role="presentation" v-if="latestData">
          <button
            class="nav-link"
            id="profile-tab"
            @click="select($event, 'latest')"
          >
            Latest
          </button>
        </li>
        <li class="nav-item" role="presentation" v-if="popularData">
          <button
            class="nav-link kids-purple-link"
            id="profile-tab"
            @click="select($event, 'popular')"
          >
            Popular
          </button>
        </li>
      </ul>
      <div
        v-if="selectedTab === 'featured' && featuredData"
        class="kn-carousel"
      >
        <div class="latest-slider">
          <div
            class="latest-item d-md-flex flex-wrap align-items-center"
            style=""
          >
            <div class="knowledge-info">
              <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              ></a>
              <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              >
                {{
                  selectedImage
                    ? selectedImage.product_name
                    : mainImage.product_name
                }}
              </h2>
              <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
                >{{
                  selectedImage
                    ? selectedImage.author_name !== false &&
                      selectedImage.author_name !== null
                      ? selectedImage.author_name
                      : ""
                    : mainImage.author_name !== false &&
                      mainImage.author_name !== null
                    ? mainImage.author_name
                    : ""
                }}</span
              >
              <div class="review d-flex align-items-center">
                <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedImage === '' ? mainImage : selectedImage
                    )
                  "
                >
                  <del>{{
                    selectedImage
                      ? selectedImage.special_price !== "0.00"
                        ? "$" + selectedImage.price
                        : ""
                      : mainImage.special_price !== "0.00"
                      ? "$" + mainImage.price
                      : ""
                  }}</del
                  >${{
                    selectedImage
                      ? selectedImage.special_price !== "0.00"
                        ? selectedImage.special_price
                        : selectedImage.price
                      : mainImage.special_price !== "0.00"
                      ? mainImage.special_price
                      : mainImage.price
                  }}
                </span>
                <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedImage === '' ? mainImage : selectedImage
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedImage === '' ? mainImage : selectedImage
                      )
                    "
                  ></rating>
                </span>
              </div>

              <p
                class="sec-desc"
                v-html="
                  selectedImage
                    ? selectedImage.short_description
                    : mainImage.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              ></p>

              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              >
                <span>view</span>
              </a>
            </div>
            <div class="latest-view">
              <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedImage === '' ? mainImage : selectedImage
                  )
                "
              ></a>
              <div class="img-wrp"
              :class="
              $route.path === '/kids-home'
              ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
              : 'slider-img-bg'
              ">
              
                <img
                  :src="
                    selectedImage
                      ? selectedImage.product_image
                      : mainImage.product_image
                  "
                  alt="category"
                  title="category"
                />
              </div>
            </div>
            <div
              class="
                latest-books
                d-flex
                flex-wrap
                justify-content-between
                latest-books
              "
            >
              <div
                v-for="(img, idx) in currentSetOfImages"
                :key="`${img.product_image}_${idx}`"
                v-show="!img.isMain"
                class="img-wrp"
                :class="
                $route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'
                "
                @click="
                  selectedImage &&
                  selectedImage.product_image === img.product_image
                    ? selectImg(mainImage.product_image)
                    : selectImg(img.product_image)
                "
              >
                <img
                  :src="
                    selectedImage &&
                    selectedImage.product_image === img.product_image
                      ? mainImage.product_image
                      : img.product_image
                  "
                  alt="category"
                  title="category"
                />
              </div>
            </div>
          </div>
        </div>

        <i
          v-if="isPrevArrowVisible"
          class="control prev event-prev"
          @click="prevSetOfImages"
        ></i>
        <i
          v-if="isNextArrowVisible"
          class="control next event-next"
          @click="nextSetOfImages"
        ></i>
      </div>

      <div v-if="selectedTab === 'latest' && latestData" class="kn-carousel">
        <div class="latest-slider">
          <div
            class="latest-item d-md-flex flex-wrap align-items-center"
            style=""
          >
            <div class="knowledge-info">
              <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              ></a>
              <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              >
                {{
                  selectedLatestImage
                    ? selectedLatestImage.product_name
                    : mainLatestImage.product_name
                }}
              </h2>
              <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
                >{{
                  selectedLatestImage
                    ? selectedLatestImage.author_name != false &&
                      selectedLatestImage.author_name != null
                      ? selectedLatestImage.author_name
                      : ""
                    : mainLatestImage.author_name !== false &&
                      mainLatestImage.author_name !== null
                    ? mainLatestImage.author_name
                    : ""
                }}</span
              >
              <div class="review d-flex align-items-center">
                <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage === ''
                        ? mainLatestImage
                        : selectedLatestImage
                    )
                  "
                >
                  <del>{{
                    selectedLatestImage
                      ? selectedLatestImage.special_price !== "0.00"
                        ? "$" + selectedLatestImage.price
                        : ""
                      : mainLatestImage.special_price !== "0.00"
                      ? "$" + mainLatestImage.price
                      : ""
                  }}</del
                  >${{
                    selectedLatestImage
                      ? selectedLatestImage.special_price !== "0.00"
                        ? selectedLatestImage.special_price
                        : selectedLatestImage.price
                      : mainLatestImage.special_price !== "0.00"
                      ? mainLatestImage.special_price
                      : mainLatestImage.price
                  }}
                </span>
                <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedLatestImage === ''
                        ? mainLatestImage
                        : selectedLatestImage
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedLatestImage === ''
                          ? mainLatestImage
                          : selectedLatestImage
                      )
                    "
                  ></rating>
                </span>
              </div>
              <p
                class="sec-desc"
                v-html="
                  selectedLatestImage
                    ? selectedLatestImage.short_description
                    : mainLatestImage.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              >
                <span>view</span>
              </a>
            </div>
            <div class="latest-view">
              <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              ></a>
              <div
                class="img-wrp"
                @click="
                  redirectToDetailPage(
                    selectedLatestImage === ''
                      ? mainLatestImage
                      : selectedLatestImage
                  )
                "
              >
             
                <img
                  :src="
                    selectedLatestImage
                      ? selectedLatestImage.product_image
                      : mainLatestImage.product_image
                  "
                  alt="category"
                  title="category"
                />
              </div>
            </div>
            <div
              class="
                latest-books
                d-flex
                flex-wrap
                justify-content-between
                latest-books
              "
            >
              <div
                v-for="(img, idx) in currentSetOfLatestImages"
                :key="`${img.product_image}_${idx}`"
                v-show="!img.isMain"
                class="img-wrp"
                @click="
                  selectedLatestImage &&
                  selectedLatestImage.product_image === img.product_image
                    ? selectLatestImg(mainLatestImage.product_image)
                    : selectLatestImg(img.product_image)
                "
              >
                <img
                  :src="
                    selectedLatestImage &&
                    selectedLatestImage.product_image === img.product_image
                      ? mainLatestImage.product_image
                      : img.product_image
                  "
                  alt="category"
                  title="category"
                />
              </div>
            </div>
          </div>
        </div>

        <i
          v-if="isPrevArrowVisibleLatest"
          class="control prev event-prev"
          @click="prevSetOfLatestImages"
        ></i>
        <i
          v-if="isNextArrowVisibleLatest"
          class="control next event-next"
          @click="nextSetOfLatestImages"
        ></i>
      </div>

      <div v-if="selectedTab === 'popular' && popularData" class="kn-carousel">
        <div class="latest-slider">
          <div
            class="latest-item d-md-flex flex-wrap align-items-center"
            style=""
          >
            <div class="knowledge-info">
              <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
              ></a>
              <h2
                class="sec-title"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
              >
                {{
                  selectedPopularImage
                    ? selectedPopularImage.product_name
                    : mainPopularImage.product_name
                }}
              </h2>
              <span
                class="publisher"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
                >{{
                  selectedPopularImage
                    ? selectedPopularImage.author_name !== false &&
                      selectedPopularImage.author_name !== null
                      ? selectedPopularImage.author_name
                      : ""
                    : mainPopularImage.author_name !== false &&
                      mainPopularImage.author_name !== null
                    ? mainPopularImage.author_name
                    : ""
                }}</span
              >
              <div class="review d-flex align-items-center">
                <span
                  class="price d-block"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage === ''
                        ? mainPopularImage
                        : selectedPopularImage
                    )
                  "
                >
                  <del>{{
                    selectedPopularImage
                      ? selectedPopularImage.special_price !== "0.00"
                        ? "$" + selectedPopularImage.price
                        : ""
                      : mainPopularImage.special_price !== "0.00"
                      ? "$" + mainPopularImage.price
                      : ""
                  }}</del
                  >${{
                    selectedPopularImage
                      ? selectedPopularImage.special_price !== "0.00"
                        ? selectedPopularImage.special_price
                        : selectedPopularImage.price
                      : mainPopularImage.special_price !== "0.00"
                      ? mainPopularImage.special_price
                      : mainPopularImage.price
                  }}
                </span>
                <span
                  class="ratings"
                  @click="
                    redirectToDetailPage(
                      selectedPopularImage === ''
                        ? mainPopularImage
                        : selectedPopularImage
                    )
                  "
                >
                  <rating
                    :rating="
                      productGetters.getAverageRating(
                        selectedPopularImage === ''
                          ? mainPopularImage
                          : selectedPopularImage
                      )
                    "
                  ></rating>
                </span>
              </div>
              <p
                class="sec-desc"
                v-html="
                  selectedPopularImage
                    ? selectedPopularImage.short_description
                    : mainPopularImage.short_description
                "
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
              ></p>
              <a
                class="btn viewBtn mt-3"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
              >
                <span>view</span>
              </a>
            </div>
            <div class="latest-view">
             <a
                class="move-pro-detail"
                @click="
                  redirectToDetailPage(
                    selectedPopularImage === ''
                      ? mainPopularImage
                      : selectedPopularImage
                  )
                "
              ></a>
            
           
              <div
                class="img-wrp"
                :class="
                  $route.path === '/kids-home'
                    ? 'kidsbg' + (Math.floor(Math.random() * 8) + 1)
                    : 'slider-img-bg'
                "
              >
              
                <img
                  :src="
                    selectedPopularImage
                      ? selectedPopularImage.product_image
                      : mainPopularImage.product_image
                  "
                  alt="category"
                  title="category"
                />
              </div>
            </div>
            <div
              class="
                latest-books
                d-flex
                flex-wrap
                justify-content-between
                latest-books
              "
            >
              <div
                v-for="(img, idx) in currentSetOfPopularImages"
                :key="`${img.product_image}_${idx}`"
                v-show="!img.isMain"
                class="img-wrp"
                :class="
                $route.path === '/kids-home'
                ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
                : 'slider-img-bg'
                "
                @click="
                  selectedPopularImage &&
                  selectedPopularImage.product_image === img.product_image
                    ? selectPopularImg(mainPopularImage.product_image)
                    : selectPopularImg(img.product_image)
                "
              >
                <img
                  :src="
                    selectedPopularImage &&
                    selectedPopularImage.product_image === img.product_image
                      ? mainPopularImage.product_image
                      : img.product_image
                  "
                  alt="category"
                  title="category"
                />
              </div>
            </div>
          </div>
        </div>

        <i
          v-if="isPrevArrowVisiblePopular"
          class="control prev event-prev"
          @click="prevSetOfPopularImages"
        ></i>
        <i
          v-if="isNextArrowVisiblePopular"
          class="control next event-next"
          @click="nextSetOfPopularImages"
        ></i>
      </div>
    </div>
  </section>
</template>

<script type="module">
import { computed, useRouter, ref } from "@nuxtjs/composition-api";
import { productGetters } from "@vue-storefront/magento";

import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import Rating from "~/components/Products/Rating";
import { useUiState } from "~/composables";

export default {
  name: "HomePage",
  props: {
    featured: {
      type: [Array, Object],
      default: null,
    },
    latest: {
      type: [Array, Object],
      default: null,
    },
    popular: {
      type: [Array, Object],
      default: null,
    },
  },
  components: {
    Carousel,
    Rating,
  },
  setup(props, context) {
    const currentIndex = ref(0);
    const currentLatestIndex = ref(0);
    const currentPopularIndex = ref(0);
    const rotationFactor = ref(5);
    const selectedImage = ref("");
    const selectedLatestImage = ref("");
    const selectedPopularImage = ref("");
    const featuredData = props.featured;
    const latestData = props.latest;
    const popularData = props.popular;
    const selectedTab = ref("featured");
    const nextSetOfImages = () => {
      currentIndex.value += rotationFactor.value;
      selectedImage.value = null;
    };
    const nextSetOfLatestImages = () => {
      currentLatestIndex.value += rotationFactor.value;
      selectedLatestImage.value = null;
    };
    const nextSetOfPopularImages = () => {
      currentPopularIndex.value += rotationFactor.value;
      selectedPopularImage.value = null;
    };

    const prevSetOfImages = () => {
      currentIndex.value -= rotationFactor.value;
      selectedImage.value = null;
    };
    const prevSetOfLatestImages = () => {
      currentLatestIndex.value -= rotationFactor.value;
      selectedLatestImage.value = null;
    };
    const prevSetOfPopularImages = () => {
      currentPopularIndex.value -= rotationFactor.value;
      selectedPopularImage.value = null;
    };

    const currentSetOfImages = computed(() => {
      const startIndex = currentIndex.value;
      const endIndex = startIndex + rotationFactor.value;
      const images = featuredData[0].data;
      const indexedImages = images.filter((img, idx) => {
        if (idx >= startIndex && idx <= endIndex - 1) {
          return img;
        }
      });

      featuredData[0].data.forEach((img) => {
        img.isMain = false;
      });

      indexedImages[0].isMain = true;
      return indexedImages;
    });
    const currentSetOfLatestImages = computed(() => {
      const startIndex = currentLatestIndex.value;
      const endIndex = startIndex + rotationFactor.value;
      const images = latestData[0].data;
      const indexedImages = images.filter((img, idx) => {
        if (idx >= startIndex && idx <= endIndex - 1) {
          return img;
        }
      });

      latestData[0].data.forEach((img) => {
        img.isMain = false;
      });

      indexedImages[0].isMain = true;
      return indexedImages;
    });
    const currentSetOfPopularImages = computed(() => {
      const startIndex = currentPopularIndex.value;
      const endIndex = startIndex + rotationFactor.value;
      const images = popularData[0].model;
      const indexedImages = images.filter((img, idx) => {
        if (idx >= startIndex && idx <= endIndex - 1) {
          return img;
        }
      });

      popularData[0].model.forEach((img) => {
        img.isMain = false;
      });

      indexedImages[0].isMain = true;
      return indexedImages;
    });

    const mainImage = computed(() => {
      const mainImg = currentSetOfImages.value.find(
        (img) => img.isMain === true
      );
      return mainImg;
    });
    const mainLatestImage = computed(() => {
      const mainImg = currentSetOfLatestImages.value.find(
        (img) => img.isMain === true
      );
      return mainImg;
    });
    const mainPopularImage = computed(() => {
      const mainImg = currentSetOfPopularImages.value.find(
        (img) => img.isMain === true
      );
      return mainImg;
    });

    const isNextArrowVisible = computed(() => {
      return currentIndex.value + rotationFactor.value >=
        featuredData[0].data.length
        ? false
        : true;
    });
    const isNextArrowVisibleLatest = computed(() => {
      return currentLatestIndex.value + rotationFactor.value >=
        latestData[0].data.length
        ? false
        : true;
    });
    const uiState = useUiState();
    const { getSlugLink } = useUiState();
    const redirectToDetailPage = (product) => {
      const link = getSlugLink(product);
      router.push({ path: link });
    };
    const router = useRouter();

    const isNextArrowVisiblePopular = computed(() => {
      return currentPopularIndex.value + rotationFactor.value >=
        popularData[0].model.length
        ? false
        : true;
    });

    const isPrevArrowVisible = computed(() => {
      return currentIndex.value >= rotationFactor.value ? true : false;
    });
    const isPrevArrowVisibleLatest = computed(() => {
      return currentLatestIndex.value >= rotationFactor.value ? true : false;
    });
    const isPrevArrowVisiblePopular = computed(() => {
      return currentPopularIndex.value >= rotationFactor.value ? true : false;
    });

    const selectImg = (product_image) => {
      const sI = featuredData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedImage.value = sI;
    };
    const selectLatestImg = (product_image) => {
      const sI = latestData[0].data.find(
        (img) => img.product_image === product_image
      );
      selectedLatestImage.value = sI;
    };
    const selectPopularImg = (product_image) => {
      const sI = popularData[0].model.find(
        (img) => img.product_image === product_image
      );
      selectedPopularImage.value = sI;
    };

    const select = (event, tabName) => {
      let navLinks = document.getElementsByClassName("nav-link");

      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
      }

      let selectedElement = event.target;
      selectedElement.classList.add("active");

      selectedTab.value = tabName;
    };

    return {
      productGetters,
      currentSetOfImages,
      currentSetOfLatestImages,
      currentSetOfPopularImages,
      nextSetOfImages,
      nextSetOfLatestImages,
      nextSetOfPopularImages,
      prevSetOfImages,
      prevSetOfLatestImages,
      prevSetOfPopularImages,
      mainImage,
      mainLatestImage,
      mainPopularImage,
      isNextArrowVisible,
      isNextArrowVisibleLatest,
      isNextArrowVisiblePopular,
      isPrevArrowVisible,
      isPrevArrowVisibleLatest,
      isPrevArrowVisiblePopular,
      selectedImage,
      selectedLatestImage,
      selectedPopularImage,
      currentIndex,
      currentLatestIndex,
      currentPopularIndex,
      selectImg,
      selectLatestImg,
      selectPopularImg,
      featuredData,
      selectedTab,
      select,
      latestData,
      popularData,
      redirectToDetailPage,
      ...uiState,
    };
  },
};
</script>


<style lang="scss" scoped>
.related-slider-img {
  .category-wrap.vrt-category {
    width: unset;
  }
  .var-hor-category-img {
    min-height: 263px;
  }
  .related-wrap .related-details {
    justify-content: center;
  }
}
.related-slider-img {
  position: relative;
  .control {
    position: absolute;
    top: 30%;
  }
  .next,
  .prev {
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  }
}

.feature-products {
  .tab-content {
    ul {
      margin: 0 auto 24px;
      li {
        button {
          line-height: normal;
        }
      }
    }
    .kn-carousel {
      .latest-slider {
        .latest-item {
          @media (max-width: 991px) {
            background-image: url("/meccabook/fear-book-back.png");
            justify-content: flex-end !important;
          }
          .knowledge-info {
            max-width: 360px;
            @media screen and (max-width: 1024px) and (min-width: 992px) {
              .sec-title {
                font-size: 26px;
              }
            }

            .sec-title {
              margin-bottom: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: initial;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .publisher {
              margin-bottom: 10px;
            }
            .sec-desc {
              margin-bottom: 24px;
            }
          }
          .latest-view {
            width: calc(36.5% - 22px);
            max-width: 400px;
            @media (max-width: 991px) {
              width: 50%;
              max-width: unset;
              .img-wrp {
                width: 50%;
                margin: 0 auto;
              }
            }
          }
          .latest-books {
            width: calc(36.5% - 22px);
            padding-left: 22px;
            @media (max-width: 991px) {
              width: 100%;
              max-width: unset;
              margin-top: 20px;
            }
            @media (max-width: 767px) {
              margin-top: 0;
            }
            .img-wrp {
              @media (max-width: 991px) {
                width: 20%;
              }
            }
          }
        }
      }
    }
  }
}
.latest-view,
.knowledge-info {
  position: relative;
  cursor: pointer;
}
.event-next {
  @media (min-width: 1200px) {
    background: url(/meccabook/yellow-arrow.png) no-repeat center center;
    transform: rotate(0deg) !important;
  }
}
.event-prev {
  @media (min-width: 1200px) {
    background: url(/meccabook/yellow-arrow.png) no-repeat center center;
    transform: rotate(180deg);
  }
}
</style>
