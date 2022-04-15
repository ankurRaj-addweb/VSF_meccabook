<template>
  <footer class="footer" 
   :style="$route.path.includes('kids') ? 'background-image: url(/meccabook/kids-bg-img.png)' : 'background-image: url()'">
    <div class="container">
      <div class="row" v-if="$route.path !== '/landing'">
        <div class="col-12"  >
          <div
            class="feature-block"
            v-if="
              getHomeContent &&
              getHomeContent.components &&
              getHomeContent.components.middle &&
              getHomeContent.components.middle.four_column_content
            "
          >
            <div
              class="feature-wrap"
              v-for="item in getHomeContent.components.middle
                .four_column_content"
              :key="item.image.url"
            >
              <div class="feature-icon">
                <img class="feature-four-icons" :src="item.image.url" :alt="item.image.alt">
              </div>
              <div class="feature-info">
                <h4>{{ item.title }}</h4>
                <p v-html="item.description.text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div
            class="primary-footer"
            v-if="getMenuContent && getMenuContent.footer"
          >
            <client-only>
            <template v-for="item in getMenuContent.footer">
              <div class="test" v-if="item.name" :key="item.name">
                <div class="links-wrap">
                  <h4 class="links-tl">{{ item.name }}</h4>
                  <ul class="footer-links" v-if="item.name">
                    <li v-for="subitem in item.child" :key="subitem[0].name">
                      <div
                        v-if="!isAuthenticated && subitem[0].url == '/login'"
                        @click="handleAccountClick"
                      >
                        <nuxt-link to="#!">
                          {{ subitem[0].name }}
                        </nuxt-link>
                      </div>

                      <div
                        v-else-if="
                          subitem[0].url == '/logout' && isAuthenticated
                        "
                        @click="logoutFunc"
                      >
                        <nuxt-link to="">{{ subitem[0].name }}</nuxt-link>
                      </div>

                      <nuxt-link
                        :to="subitem[0].url"
                        v-else-if="
                          subitem[0].url == '/my-account' && isAuthenticated
                        "
                        >{{ subitem[0].name }}</nuxt-link
                      >
                      <nuxt-link
                        :to="subitem[0].url"
                        v-else-if="
                          subitem[0].url !== '/login' &&
                          subitem[0].url !== '/logout' &&
                          subitem[0].url !== '/my-account'
                        "
                        >{{ subitem[0].name }}</nuxt-link
                      >

                      <div
                        v-if="!isAuthenticated && subitem[0].url == '/login'"
                        @click="showRegisterForm"
                      >
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            </client-only>
            <div class="subscribe-wrap"
              :style="$route.path.includes('kids') ? 'background-image: url(/meccabook/kids-bg-img.png)' : 'background-image: url()'">
              <div class="klaviyo-form-WpCtWK"></div>
              <div class="social-links">
                <div class="social-wrap">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i class="icon-facebook"></i>
                  </a>
                </div>
                <div class="social-wrap">
                  <a href="#">
                    <i class="icon-insta"></i>
                  </a>
                </div>
                <div class="social-wrap">
                  <a href="#">
                    <i class="icon-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="copyright-info">&copy; Mecca Books 2021</div>
        </div>
      </div>
    </div>
    <div class="chat-wrap">
      <router-link to="#">
        <div class="chat-btn-wrap">
          <i class="icon-chat"></i>
          <span class="chat-txt">Live Chat</span>
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useUser } from "@vue-storefront/magento";
import { SfFooter, SfList, SfImage, SfMenuItem } from "@storefront-ui/vue";
import axios from "axios";
import { useUiState } from "~/composables";
import { useRoute, useRouter, useContext } from "@nuxtjs/composition-api";

export default {
  head() {
    return {
      script: [
        {
          src: "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Vu2zry",
          async: true,
        },
      ],
    };
  },
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
  },
  setup() {
    const { isAuthenticated, logout } = useUser();
    const { toggleLoginModal } = useUiState();
    const route = useRoute();
    const router = useRouter();
    const { localePath } = useContext();

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        await router.push("/my-account");
      } else {
        toggleLoginModal();
      }
    };

    const showRegisterForm = () => {
      route.value.params.registerFlag = "on";
      toggleLoginModal();
    };

    const logoutFunc = async () => {
      await logout();
      await router.push(localePath({ name: "home" }));

      return;
    };

    return {
      isAuthenticated,
      handleAccountClick,
      showRegisterForm,
      logoutFunc,
    };
  },
  data() {
    return {
      aboutUs: ["Who we are", "Quality in the details", "Customer Reviews"],
      departments: ["Women fashion", "Men fashion", "Kidswear", "Home"],
      help: ["Customer service", "Size guide", "Contact us"],
      paymentsDelivery: ["Purchase terms", "Guarantee"],
      social: ["facebook", "pinterest", "google", "twitter", "youtube"],
      isMobile: false,
      desktopMin: 1024,
    };
  },
  computed: {
    ...mapGetters("drupalcms", ["getHomeContent", "getMenuContent"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchHome", "fetchMenu"]),
  },
  async mounted() {
    await this.fetchHome();
    await this.fetchMenu();
  },
};
</script>

<style lang="scss">
.footer {
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
