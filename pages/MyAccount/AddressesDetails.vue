<template>
  <transition name="fade">
    <AwTabs
      v-if="editingAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <AwTab
        :title="isNewAddress ? 'Add the address' : 'Update the address'"
      >
        <h2 class="sec-title">
          {{ $t('Contact details updated') }}
        </h2>

        <AddressForm
          :address="activeAddress"
          :is-new="isNewAddress"
          @submit="saveAddress"
        />
      </AwTab>
    </AwTabs>

    <AwTabs
      v-else
      key="address-list"
      :open-tab="1"
      class="tab-orphan"
    >
      <AwTab title="Addresses details">
        <h2 class="sec-title">
          {{ $t('Manage addresses') }}
        </h2>
        <transition-group
          tag="div"
          name="fade"
          class="addresses-list"
        >
          <div
            v-for="address in userAddresses"
            :key="userAddressesGetters.getId(address)"
            class="addresses"
          >
            <div class="addresses__content">
              <div class="addresses__address">
                <UserAddressDetails :address="address" />
              </div>
            </div>
            <div class="addresses__actions">
              <SfIcon
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="smartphone-only"
                @click="removeAddress(address)"
              />
              <SfButton
                @click="changeAddress(address)"
                class="change-add"
              >
               <span> {{ $t('Change') }} </span>
              </SfButton>

              <SfButton
                v-if="!userAddressesGetters.isDefault(address)"
                class="color-light addresses__button-delete desktop-only change-add delete"
                @click="removeAddress(address)"
              >
                <span>{{ $t('Delete') }} </span>
              </SfButton>
            </div>
          </div>
        </transition-group>
        <SfButton
          class="action-button"
          @click="changeAddress()"
        >
         <span> {{ $t('Add new address') }} </span>
        </SfButton>
      </AwTab>
    </AwTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfButton,
  SfIcon,
} from '@storefront-ui/vue';
import { userAddressesGetters, useAddresses } from '@vue-storefront/magento';
import { computed, defineComponent, useRouter, useRoute } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import AddressForm from '~/components/MyAccount/AddressForm.vue';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import AwTabs from '../../pages/AwComponents/organisms/AwTabs.vue'

export default defineComponent({
  name: 'ShippingDetails',
  components: {
    AwTabs,
    SfButton,
    SfIcon,
    UserAddressDetails,
    AddressForm,
    userAddressesGetters
  },
  setup() {
    const {
      addresses,
      load,
      remove,
      update,
      save,
    } = useAddresses();
    
    const userAddresses = computed(() => userAddressesGetters.getAddresses(addresses.value));
    const router = useRouter();
    const route = useRoute();
    const activeAddress = computed(
      () => userAddresses.value.filter((address) => address?.id == route.value.query.id).pop()
    );

    const isNewAddress = computed(() => !activeAddress.value);
    const editingAddress = computed(() => !!route.value.query.id);
    const changeAddress = async (address) => {
      const addressId = address?.id || 'new';
      await router.push({ path: '/my-account/addresses-details', query: { id: addressId } });
    };

    const removeAddress = async (address) => {
      const isDefault = userAddressesGetters.isDefault(address);
      if (!isDefault) {
        await remove({ address });
        await load({});
      }
    };

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? save : update;
        const data = await actionMethod({ address: form });
        await onComplete(data);
        await router.push({ path: '/my-account/addresses-details' });
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await load({});
    });

    return {
      changeAddress,
      update,
      removeAddress,
      saveAddress,
      userAddressesGetters,
      userAddresses,
      editingAddress,
      activeAddress,
      isNewAddress,
    };
  },
});
</script>

<style lang='scss' scoped>

.message {
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
  margin: 0 0 var(--spacer-base);
}

.addresses-list {
  margin-bottom: var(--spacer-base);
}

.addresses {
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);
  @media all and (max-width: 767px) { 
    display: block;
    position: relative;
  } 

  span.smartphone-only.sf-icon {
    position: absolute;
    right: 10px;
    top: 40px;
  }
   .sf-icon-path {
      background: transparent !important;
    }

  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }

  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
  }

  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &__button-delete {
    color: var(--c-link);
    @include for-desktop {
      margin-left: var(--spacer-base);
    }
  }

  &__address {
    margin: 0;

    p {
      margin: 0;
    }
  }

  &__client-name {
    font-size: var(--font-size--base);
    font-weight: 500;
  }
}

.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}

.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }

      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}

h2.sec-title {
    font-size: 20px;
    margin-bottom: 36px;
    font-weight: 600;
    color: #2C354E;
}

.change-add {
  width: 140px;
}
.change-add.delete {
  background: #C6B075 !important;
}

.addresses__actions {
   @media all and (max-width: 767px) { 
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    flex-direction: row;
  }
  .change-add {
    @media all and (max-width: 767px) { 
      width: 50%;
      height: 30px;
    }
  }

}
</style>