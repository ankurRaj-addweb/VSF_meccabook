<template>
    <div>
      <ShipDetail />
      <stripe-element-payment
        ref="paymentRef"
        :pk="pk"
        :elements-options="elementsOptions"
        :confirm-params="confirmParams"
      />
      <button @click="processOrder">Pay Nowww</button>
      <VsfPaymentProvider
          @status="isPaymentReady = true"
      />
      <div class="btn-wrap text-center">
              <button type="button" @click="processOrder" class="btn larg-btn text-uppercase"
                ><span>continue</span></button
              >
              <button type="button" @click="preStep" class="back-link">Back</button>
      </div>


    <!-- <form class="address-form">
            <div class="fields-wrap">
              <div class="input-wrap">
                <label class="text-uppercase">expiration date</label>
                <input type="text" class="form-control" placeholder="" />
              </div>
              <div class="coln-two d-flex justify-content-between">
                <div class="input-wrap exp-date">
                  <label class="text-uppercase">expiration date</label>
                  <input type="text" class="form-control" placeholder="" />
                </div>
                <div class="input-wrap cvv-no">
                  <label class="text-uppercase">CVV</label>
                  <input type="text" class="form-control" placeholder="" />
                </div>
              </div>
              <div class="coln-two d-md-flex justify-content-between">
                <div class="input-wrap">
                  <label class="text-uppercase">first name</label>
                  <input type="text" class="form-control" placeholder="" />
                </div>
                <div class="input-wrap">
                  <label class="text-uppercase">last name</label>
                  <input type="text" class="form-control" placeholder="" />
                </div>
              </div>
              <div class="input-check">
                <input type="checkbox" id="checkId" class="form-control" />
                <label for="checkId"
                  >Save payment information for future use</label
                >
              </div>
            </div>
            <div class="btn-wrap text-center">
              <button type="button" @click="nextStep" class="btn larg-btn text-uppercase"
                ><span>continue</span></button
              >
              <button type="button" @click="preStep" class="back-link">Back</button>
            </div>
          </form> -->

  </div>

</template>

<script>
import { useUiState, useUiNotification } from "~/composables";
import { StripeElementPayment } from '@vue-stripe/vue-stripe';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import ShipDetail from "./ShipDetail.vue";
import {
  useMakeOrder,
  useCart,
  cartGetters,
} from '@vue-storefront/magento';
import {
  ref,
  computed,
  defineComponent,
  useRouter,
} from '@nuxtjs/composition-api';
export default {
    components: {
      StripeElementPayment,
      ShipDetail,
      VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider.vue'),
    },
    data () {
      return {
        pk: 'pk_test_51KOxqBSETY9jrGqamVudtyH2wGwtqAPGcpD4YOgCIZEfXBT1uALvwjCrpG6qasjbt8n3KOP84z6N3ptY87pUxwIg00J7ekm6xD',
        elementsOptions: {
          appearance: {}, // appearance options
        },
        confirmParams: {
        return_url: 'http://localhost:8080/success', // success url // success url
        },
      };
	  },
    mounted () {
      this.generatePaymentIntent();
    },
    setup() {
        const { order, make, loading } = useMakeOrder();
        const { cart, load, setCart } = useCart();
        const { $magento } = useVSFContext();
        const router = useRouter();
        const { checkoutstep, nextStep,preStep, newAddressform, toggleAddressForm, resetStep } = useUiState();
        const processOrder = async () => {
          await make();
          setCart(null);
          $magento.config.state.setCartId();
          await load();
          await console.log('order done succesfullt',order.value);
          await resetStep();
          await router.push(`/checkout/thank-you?order=${order.value.order_number}`);
        };
        return {
            nextStep,
            preStep,
            processOrder,
            resetStep
        }
    },
    methods: {
      async generatePaymentIntent () {
        //const paymentIntent = await apiCallToGeneratePaymentIntent(); // this is just a dummy, create your own API call
        this.elementsOptions.clientSecret = 'pi_3KTNmSSETY9jrGqa0QRS7uDx_secret_Ns69w0fdXI86AKKjMGPhnw3YZ';
      },
      pay () {
        this.$refs.paymentRef.submit();
      },
    },
}
</script>