<template>
  <div class="events-sliders">
    <carousel ref="eventcarousel" v-bind="carouselConfig" class="event-slider">
      <div v-for="(i, idx) in 3" :key="idx" class="event-item">
        <div
          class="d-md-flex align-items-start justify-content-between"
          v-if="events"
          :key="eventIndex"
        >
          <div class="event-detail d-lg-flex" v-if="events[eventIndex]">
            <router-link
              :to="'/events/' + events[eventIndex].id"
              class="move-pro-detail"
            ></router-link>
            <div class="ev-view">
              <img :src="events[eventIndex].image.url" alt="placeholder" />
            </div>
            <div class="detail">
              <h4 class="event-title">
                {{ events[eventIndex].title }}
              </h4>
              <span class="sub-title d-block">
                {{ events[eventIndex].sub_title }}
              </span>
              <p class="ev-desc">
                {{ removeTags(events[eventIndex].description.text) }}
              </p>
            </div>
          </div>
          <div class="event-post">
            <div
              class="post d-flex align-items-center"
              v-if="events[eventIndex + 1]"
            >
              <router-link
                :to="'/events/' + events[eventIndex + 1].id"
                class="move-pro-detail"
              ></router-link>
              <div class="view">
                <img
                  :src="events[eventIndex + 1].image.url"
                  alt="placeholder"
                />
              </div>
              <div class="detail">
                <h4 class="event-title">
                  {{ events[eventIndex + 1].title }}
                </h4>
                <span class="sub-title d-block">
                  {{ events[eventIndex + 1].sub_title }}
                </span>
              </div>
            </div>
            <div
              class="post d-flex align-items-center"
              v-if="events[eventIndex + 2]"
            >
              <router-link
                :to="'/events/' + events[eventIndex + 2].id"
                class="move-pro-detail"
              ></router-link>
              <div class="view">
                <img
                  :src="events[eventIndex + 2].image.url"
                  alt="placeholder"
                />
              </div>
              <div class="detail">
                <h4 class="event-title">
                  {{ events[eventIndex + 2].title }}
                </h4>
                <span class="sub-title d-block">
                  {{ events[eventIndex + 2].sub_title }}
                </span>
              </div>
            </div>
            <div
              class="post d-flex align-items-center"
              v-if="events[eventIndex + 3]"
            >
              <router-link
                :to="'/events/' + events[eventIndex + 3].id"
                class="move-pro-detail"
              ></router-link>
              <div class="view">
                <img
                  :src="events[eventIndex + 3].image.url"
                  alt="placeholder"
                />
              </div>
              <div class="detail">
                <h4 class="event-title">
                  {{ events[eventIndex + 3].title }}
                </h4>
                <span class="sub-title d-block">
                  {{ events[eventIndex + 3].sub_title }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </carousel>

    <i
      v-if="isPrevArrowVisible"
      class="control prev is-brown"
      @click="
        events[eventIndex - 4]
          ? prevEvent()
          : () => {
              return eventIndex;
            }
      "
    ></i>
    <i
      v-if="isNextArrowVisible"
      class="control next is-brown"
      @click="
        events[eventIndex + 4]
          ? nextEvent()
          : () => {
              return eventIndex;
            }
      "
    ></i>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import Carousel from "vue-slick-carousel";

import { computed, ref, onMounted } from "@nuxtjs/composition-api";

export default {
  name: "eventsslider",
  props: {
    events: {
      type: [Array, Object],
      default: null,
    },
  },
  components: {
    Carousel,
  },
  setup(props, context) {
    const carouselConfig = ref({
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      speed: 300,
      fade: true,
      centerPadding: "2px",
    });

    const screenWidth = ref(null);
    const bannercarousel = ref(null);
    const prodcarousel = ref(null);
    const eventcarousel = ref(null);
    let eventIndex = ref(0);
    const eventData = props.events;
    const rotationFactor = ref(4);

    const next = () => {
      bannercarousel.value.next();
    };

    const prev = () => {
      bannercarousel.value.prev();
    };

    const prevProduct = () => {
      prodcarousel.value.prev();
    };

    const nextProduct = () => {
      prodcarousel.value.next();
    };

    const prevEvent = () => {
      eventIndex.value -= 4;
      eventcarousel.value.prev();
    };

    const nextEvent = () => {
      eventIndex.value += 4;
      eventcarousel.value.next();
    };

    const isNextArrowVisible = computed(() => {
      return eventIndex.value + rotationFactor.value >= eventData.length
        ? false
        : true;
    });
    const isPrevArrowVisible = computed(() => {
      return eventIndex.value >= rotationFactor.value ? true : false;
    });

    const productCarousel = computed(() => {
      return screenWidth.value <= 1199 ? "carousel" : "div";
    });

    onMounted(() => {
      const dotsWrapper = document.getElementsByClassName("slick-dots")[0];

      if (dotsWrapper) {
        dotsWrapper.style.display = "flex";
      }

      screenWidth.value = window.innerWidth;
    });

    return {
      carouselConfig,
      next,
      prev,
      bannercarousel,
      eventcarousel,
      screenWidth,
      productCarousel,
      prodcarousel,
      prevProduct,
      nextProduct,
      prevEvent,
      nextEvent,
      eventIndex,
      isNextArrowVisible,
      isPrevArrowVisible,
      eventData,
    };
  },
  computed: {
    ...mapGetters("drupalcms", ["getAboutusContent"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchAboutus"]),
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
  mounted() {
    this.fetchAboutus();
  },
};
</script>

<style lang="scss" scoped>
.prev {
  background: url(/meccabook/event-left-arror.png) no-repeat center center;

  @media all and (max-width: 767px) {
    left: 35%;
  }
  @media all and (max-width: 460px) {
    left: 27%;
  }
}
.next {
  background: url(/meccabook/event-right-arrow.png) no-repeat center center;
  transform: unset;
  @media all and (max-width: 767px) {
    right: 35%;
  }
  @media all and (max-width: 460px) {
    right: 27%;
  }
}
.control {
  @media all and (max-width: 991px) {
    top: 33%;
  }
  @media all and (max-width: 767px) {
    top: 88%;
  }
}
.event-item {
  @media all and (max-width: 767px) {
    padding: 0 21px;
  }
}
.event-detail,
.event-post .post {
  position: relative;
}
</style>