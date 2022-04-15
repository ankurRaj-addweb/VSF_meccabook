<template>
  <div class="wrapper-blog">
    <div class="contact product-page">
      <div class="knowledge-point">
        <a href="#">
          <span class="knowledge-text">Knowledge points</span>
          <i class="icon-ribbon"></i>
        </a>
      </div>
      <div class="breadcrumb-sec d-none d-md-block">
        <div class="container">
          <div class="breadcrumb-wrapper" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Home</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </div>
        </div>
      </div>
      <section class="checkout-sec">
        <div class="container">
          <h2 class="checkout-title">Cart</h2>
          <div class="d-md-flex justify-content-between">
            <div class="cart-wrapper d-block">
              <div
                class="product-head d-none d-md-flex justify-content-between"
              >
                <ul class="list-left">
                  <li class="item">Item</li>
                </ul>
                <ul class="list-right d-flex justify-content-between">
                  <li class="price">Price</li>
                  <li class="qty">Qty</li>
                  <li class="total">Total</li>
                </ul>
              </div>

              <div class="cart-preview">
                <div
                  class="
                    check
                    cart-item
                    d-flex
                    justify-content-between
                    align-items-start
                  "
                  v-for="product in products"
                  :key="cartGetters.getItemSku(product)"
                >
                  <div class="view-item" style="background-image: url()">
                    <div class="img-wrp">
                      <img
                        :src="cartGetters.getItemImage(product)"
                        alt="cart"
                      />
                    </div>
                  </div>
                  <div class="desc-item d-md-flex">
                    <div class="d-wrp1">
                      <h4 class="item-title">
                        {{ cartGetters.getItemName(product) }}
                      </h4>
                      <p v-if="product.__typename == 'ConfigurableCartItem' " class="item-exp">{{ product.configurable_options[0].value_label }}</p>
                      <p class="sku-txt">SKU: {{ cartGetters.getItemSku(product) }}</p>
                      <span class="instock">In Stock</span>
                    </div>
                    <div
                      class="
                        d-wrp2 d-md-flex
                        align-items-start
                        justify-content-between
                      "
                    >
                      <div class="item-prices">
                        <span>{{
                          $n(
                            cartGetters.getItemPrice(product).regular/cartGetters.getItemQty(product),
                            "currency"
                          )
                        }}</span>
                      </div>
                      <div class="included d-md-flex align-items-center">
                        <SfQuantitySelector
                          :disabled="loading"
                          :qty="cartGetters.getItemQty(product)"
                          @input="updateItemQty({ product, quantity: $event })"
                        />
                        <div class="orig-price">
                          <span
                            >{{
                              $n(
                                cartGetters.getItemPrice(product).regular,
                                "currency"
                              )
                            }}
                          </span>
                        </div>
                        <button
                          @click="actionRemoveItem(product)"
                          class="remove-ilnk text-underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form class="checkout-summary">
              <h4 class="summary-title">Total</h4>
              <div class="sub-total d-flex justify-content-between">
                <span
                  >Subtotal <sub>({{ totalItems }} items)</sub></span
                >
                <span>{{ $n(totals.subtotal, "currency") }}</span>
              </div>
              <div
                class="
                  sub-total
                  estimate
                  d-flex
                  align-items-start
                  justify-content-between
                "
              >
                <span>Estimated Shipping</span>
                <span v-if="getShippingMethodPrice(selectedShippingMethod)">{{
                  $n(getShippingMethodPrice(selectedShippingMethod), "currency")
                }}</span>
                <span v-else>$0</span>
              </div>
              <div class="post-code">
                <div
                  class="
                    input-wrap
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ZIP / Postcode"
                  />
                  <span class="post-txt text-right"
                    >Actual shipping cost will be calculated at checkout</span
                  >
                </div>
              </div>
              <div
                class="
                  sub-total
                  coupon
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <span>Coupon</span>
                <span>{{ $n(discountsAmount, "currency") }}</span>
              </div>
              <div class="post-code">
                <!-- <input type="text" class="form-control" placeholder="Discount Code" />
                <a href="#!" class="btn d-flex align-items-center"><span>apply</span></a> -->
                <CouponCode />
              </div>
              <div
                class="
                  sub-total
                  tax-rw
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <p class="frm-desc">
                Mecca Books <strong>donates 2% of all sales</strong> to
                <a href="#!">organizations</a> that help improve the minds and
                lives through Islamic scholarship and education.
              </p>
              <div class="donation-checked">
                <div
                  class="
                    sub-total
                    verify-check
                    d-flex
                    align-items-start
                    justify-content-between
                  "
                >
                  <p class="frm-desc">
                    Would you like to include an extra donation towards these
                    organizations?
                  </p>
                  <div class="input-wrap d-flex justify-content-between">
                    <input v-model="donationValue" type="checkbox" :value="donationValue" id="checkId" class="form-control" />
                    <label for="checkId">YES</label>
                  </div>
                </div>
                <div v-if="donationValue"
                  class="
                    sub-total
                    ext-donation
                    d-flex
                    align-items-start
                    justify-content-between
                  "
                >
                  <span>Your extra donation</span>
                  <span class="amount-add">$<span class="amount">5</span></span>
                </div>
              </div>

              <div
                class="
                  sub-total
                  total-price
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <span>Total Price</span>
                <span>{{ $n(totals.total, "currency") }}</span>
              </div>
              <button
                type="button"
                @click="goToCheckout"
                class="btn checkout-btn"
              >
                <span>go to checkout</span>
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <Stepbaar v-if="isCheckoutPopup" />
      </section>
    </div>
  </div>
</template>

<script>
import {
  SfLoader,
  SfNotification,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfQuantitySelector,
} from "@storefront-ui/vue";
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useRouter,
} from "@nuxtjs/composition-api";
import {
  useCart,
  useUser,
  cartGetters,
  useExternalCheckout,
} from "@vue-storefront/magento";
import { onSSR } from "@vue-storefront/core";
import { useUiState, useUiNotification } from "~/composables";
import CouponCode from "../components/CouponCode.vue";
import AwSidebar from "./AwComponents/organisms/AwSidebar.vue";
import Stepbaar from "./AWcheckout/Stepbaar.vue";
import getShippingMethodPrice from "~/helpers/checkout/getShippingMethodPrice";

export default defineComponent({
  props: {},
  name: "CartSidebar",
  components: {
    SfLoader,
    SfNotification,
    AwSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector,
    CouponCode,
    Stepbaar,
  },
  setup() {
    // const { initializeCheckout } = useExternalCheckout();
    const {
      isCartSidebarOpen,
      toggleCartSidebar,
      toggleCheckoutModal,
      isCheckoutPopup,
    } = useUiState();
    // const router = useRouter();
    const {
      cart,
      removeItem,
      updateItemQty,
      load: loadCart,
      loading,
    } = useCart();
    const { isAuthenticated } = useUser();
    const { send: sendNotification, notifications } = useUiNotification();

    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const hasDiscounts = computed(() => discounts.value.length > 0);
    const discountsAmount = computed(
      () => -1 * discounts.value.reduce((a, el) => el.value + a, 0)
    );
    const getAttributes = (product) => product.configurable_options || [];
    const getBundles = (product) =>
      product.bundle_options?.map((b) => b.values).flat() || [];
    const visible = ref(false);
    const isLoaderVisible = ref(false);
    const donationValue = ref(false);
    const tempProduct = ref();
    const { toggleLoginModal } = useUiState();
    const selectedShippingMethod = computed(() =>
      cartGetters.getSelectedShippingMethod(cart.value)
    );

    onSSR(async () => {
      await loadCart();
    });

    const goToCheckout = async () => {
      if (isAuthenticated.value) {
        toggleCheckoutModal();
      } else {
        toggleLoginModal();
      }
    };
    const actionRemoveItem = async (product) => {
      isLoaderVisible.value = true;

      await removeItem({ product });

      isLoaderVisible.value = false;
      visible.value = false;
    };

    onMounted(()=> {
      console.log(donationValue.value,'dndn');
    })

    return {
      actionRemoveItem,
      loading,
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      notifications,
      visible,
      isLoaderVisible,
      tempProduct,
      toggleCartSidebar,
      goToCheckout,
      totals,
      totalItems,
      cartGetters,
      getAttributes,
      getBundles,
      isCheckoutPopup,
      toggleCheckoutModal,
      discountsAmount,
      discounts,
      hasDiscounts,
      getShippingMethodPrice,
      selectedShippingMethod,
      donationValue
    };
  },
});
</script>

<style lang="scss" scoped>
.checkout-sec {
  @media all and (min-width: 1300px) {
    padding: 40px 0;
  }
}
.sf-quantity-selector {
  height: inherit;
  background: transparent;
  border: 0.5px solid #4b4c4d;
  box-sizing: border-box;
  width: 85px;
  height: 24px;
}
.amount-add {
  display: flex;
  justify-content: end;
  align-items: center;
  span.amount {
    margin-left: 5px;
  }
}
</style>