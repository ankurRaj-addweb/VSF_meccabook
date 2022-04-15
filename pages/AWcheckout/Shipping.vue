<template>
  <div class="shipping-popup-block">
    <CustomForm :is-new="true" @submit="saveAddress" class="customform-wrap"/>
    <div class="btn-wrap text-center">
        <button @click="toggleAddressForm" class="back-link" type="button">
          Back
        </button>
    </div>
  </div>
</template>

<script>
import { useUiState, useUiNotification } from "~/composables";
import { SfHeading, SfInput, SfButton, SfSelect } from "@storefront-ui/vue";
import {
  ref,
  computed,
  watch,
  onMounted,
  defineComponent,
  useRouter,
} from "@nuxtjs/composition-api";
import { onSSR } from "@vue-storefront/core";
import {
  addressGetter,
  useCountrySearch,
  userShippingGetters,
  useShipping,
  useUser,
  useUserShipping,
  userAddressesGetters,
  useAddresses,
} from "@vue-storefront/magento";
import { required, min, digits } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { addressFromApiToForm } from "~/helpers/checkout/address";

import CustomForm from "~/components/MyAccount/CustomForm.vue";

const NOT_SELECTED_ADDRESS = "";

extend("required", {
  ...required,
  message: "This field is required",
});
extend("min", {
  ...min,
  message: "The field should have at least {length} characters",
});
extend("digits", {
  ...digits,
  message: "Please provide a valid phone number",
});

export default defineComponent({
  name: "ShippingStep",
  components: {
    SfHeading,
    SfInput,
    CustomForm,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    UserShippingAddresses: () =>
      import("~/components/Checkout/UserShippingAddresses.vue"),
    VsfShippingProvider: () =>
      import("~/components/Checkout/VsfShippingProvider.vue"),
  },
  setup() {
    const { load, loading, shipping: address } = useShipping();
    const {
      shipping: userShipping,
      load: loadUserShipping,
      setDefaultAddress,
    } = useUserShipping();
    const {
      load: loadCountries,
      countries,
      search: searchCountry,
      country,
    } = useCountrySearch("Step:Shipping");
    const { isAuthenticated } = useUser();

    const shippingDetails = ref(addressFromApiToForm(address.value) || {});
    const currentAddressId = ref(NOT_SELECTED_ADDRESS);

    const router = useRouter();

    const shipFormDetail = ref({
      email: null,
      firstName: null,
      lastName: null,
      phone: null,
      address1: null,
      address2: null,
      country: null,
      state: null,
      city: null,
      zipcode: null,
    });

    const setAsDefault = ref(false);
    const isFormSubmitted = ref(false);
    const canAddNewAddress = ref(true);
    const isNewaddress = ref(false);

    const isShippingDetailsStepCompleted = ref(false);
    const { checkoutstep, nextStep, preStep,  newAddressform, toggleAddressForm, closeAddressform } = useUiState();

    const canMoveForward = computed(
      () =>
        !loading.value &&
        shippingDetails.value &&
        Object.keys(shippingDetails.value).length > 0
    );

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }
      const addresses = userShippingGetters.getAddresses(userShipping.value);
      return Boolean(addresses?.length);
    });
    // @ts-ignore
    const countriesList = computed(() =>
      addressGetter.countriesList(countries.value)
    );

    const regionInformation = computed(() =>
      addressGetter.regionList(country.value)
    );

    const userAddresses = computed(() =>
      userAddressesGetters.getAddresses(addresses.value)
    );

    const { addresses, remove, update, save } = useAddresses();

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = NOT_SELECTED_ADDRESS;
      shippingDetails.value = {};
      canAddNewAddress.value = true;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = (addr) => {
      shippingDetails.value = { ...addressFromApiToForm(addr) };
      currentAddressId.value = addr?.id;
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const changeShippingDetails = (field, value) => {
      shippingDetails.value = {
        ...shippingDetails.value,
        [field]: value,
      };
      isShippingDetailsStepCompleted.value = false;
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };

    const selectDefaultAddress = () => {
      const defaultAddress = userShippingGetters.getAddresses(
        userShipping.value,
        { default_shipping: true }
      );
      if (defaultAddress && defaultAddress.length > 0) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };

    const shippingAddresses = computed(() =>
      userShippingGetters.getAddresses(userShipping.value)
    );

    const changeCountry = async (id) => {
      changeShippingDetails("country_code", id);
      await searchCountry({ id });
    };

    watch(address, (addr) => {
      shippingDetails.value = addressFromApiToForm(addr || {});
    });

    const displayData = async () => {
      // await save({ shippingDetails: shipFormDetail.value });
      nextStep();
    };

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const data = await save({ address: form });
        await onComplete(data);
        await router.push({ path: "/checkout-cart/" });
        await loadUserShipping();
        await closeAddressform();
        console.log("address save succesfully");

        // nextStep();
      } catch (error) {
        onError(error);
        console.log("error", error);
      }
    };

    onSSR(async () => {
      await Promise.all([loadCountries(), load()]);
    });

    onMounted(async () => {
      if (shippingDetails.value?.country_code) {
        await searchCountry({ id: shippingDetails.value.country_code });
      }

      if (!userShipping.value?.addresses && isAuthenticated.value) {
        await loadUserShipping();
      }
      const shippingAddresses = userShippingGetters.getAddresses(
        userShipping.value
      );

      if (!shippingAddresses || shippingAddresses.length === 0) {
        return;
      }

      const hasEmptyShippingDetails =
        !shippingDetails.value ||
        Object.keys(shippingDetails.value).length === 0;
      if (hasEmptyShippingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });

    return {
      canAddNewAddress,
      canMoveForward,
      changeCountry,
      changeShippingDetails,
      countriesList,
      country,
      currentAddressId,
      handleAddNewAddressBtnClick,
      handleSetCurrentAddress,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      isShippingDetailsStepCompleted,
      load,
      loading,
      NOT_SELECTED_ADDRESS,
      regionInformation,
      searchCountry,
      setAsDefault,
      shippingDetails,
      shippingAddresses,
      isNewaddress,
      preStep,
      nextStep,
      shipFormDetail,
      displayData,
      saveAddress,
      userAddresses,
      newAddressform,
      toggleAddressForm,
      closeAddressform
    };
  },
});
</script>


<style lang="scss" scoped>
.customform-wrap {
  width: 100%;
  @media all and (max-width: 767px) {
    padding: 0 20px;
  }
}

</style>
