<template>
    <form class="address-form p-0">
              <!-- <ShipDetail /> -->
            <VsfShippingProvider
              v-if="true"
              @submit="nextStep"
            />
            <Billing />
            <div class="btn-wrap text-center">
              <!-- <button type="button" @click="nextStep" class="btn larg-btn text-uppercase"
                ><span>continue</span></button
              > -->
              <button type="button" @click="preStep" class="back-link">Back</button>
            </div>
          </form>
</template>

<script>
import { useUiState, useUiNotification } from "~/composables";
import { onSSR } from '@vue-storefront/core';
import {
  useUserBilling,
  userBillingGetters,
  useUser,
  useBilling,
  useShipping,
  useCountrySearch,
  addressGetter,
} from '@vue-storefront/magento';
import {
  ref,
  computed,
  onMounted,
  watch,
  useRouter,
  defineComponent,
} from '@nuxtjs/composition-api';
import ShipDetail from "./ShipDetail.vue";
import Billing from "./Billing.vue";

export default {
    components: {
      VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue'),
      ShipDetail,
      Billing
    },
    setup() {
        const { checkoutstep, nextStep,preStep } = useUiState();
        const {
          shipping: shippingDetails,
          load: loadShipping,
        } = useShipping();

        onSSR(async () => {
      await Promise.all([
        loadShipping(),
      ]);

      if (!shippingDetails.value) {
          await loadShipping();
      }
      else{
        console.log(shippingDetails.value,'shippingDetails');
      }
    });

        return {
            nextStep,
            preStep
        }
    }
    
}
</script>