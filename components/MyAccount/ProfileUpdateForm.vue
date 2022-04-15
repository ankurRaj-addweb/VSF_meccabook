<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form
      class="form"
      @submit.prevent="handleSubmit(submitForm(reset))"
    >
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          class="form__element"
        >
        <div class="sign-input-wrap">
          <label>First Name</label>
          <input
            v-model="form.firstname"
            name="firstName"
            required
            :valid="!errors[0]"
            class="form-control"
            :error-message="errors[0]"
          />
        </div>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          class="form__element"
        >
        <div class="sign-input-wrap">
          <label>Last Name</label>
          <input
            v-model="form.lastname"
            name="lastName"
            required
            :valid="!errors[0]"
            class="form-control"
            :error-message="errors[0]"
          />
        </div>
        </ValidationProvider>
      </div>
      <ValidationProvider
        v-slot="{ errors }"
        rules="required|email"
        class="form__element"
      >
      <div class="sign-input-wrap in-wrap">
        <label>Email</label>
        <input
          v-model="form.email"
          type="email"
          name="email"
          required
          :valid="!errors[0]"
          class="form-control"
          :error-message="errors[0]"
        />
      </div>
      </ValidationProvider>
      <SfModal
        :visible="requirePassword"
        :title="$t('Attention!')"
        cross
        persistent
        @close="requirePassword = false"
      >
       <h4 class="desc">{{ $t('Please type your current password to change your email address.') }}</h4> 
       <div class="sign-input-wrap wrap">
         <label>CurrentPassword</label>
        <input
          v-model="currentPassword"
          type="password"
          name="currentPassword"
          label="Current Password"
          required
          class="form-control"
          @keypress.enter="handleSubmit(submitForm(reset))"
        />
        </div>
        <button
          class="btn CartBtn"
          @click="handleSubmit(submitForm(reset))"
        >
          <span>{{ $t('Update personal data') }}</span>
        </button>
      </SfModal>
      <button class="btn CartBtn">
        <span>{{ $t('Update personal data') }}</span>
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { useUser, userGetters } from '@vue-storefront/magento';
import {
  SfInput,
  SfButton,
  SfModal,
} from '@storefront-ui/vue';
import { useUiNotification } from '~/composables';

export default defineComponent({
  name: 'ProfileUpdateForm',
  components: {
    SfInput,
    SfButton,
    SfModal,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const { user } = useUser();
    const currentPassword = ref('');
    const requirePassword = ref(false);
    const resetForm = () => ({
      firstname: userGetters.getFirstName(user.value),
      lastname: userGetters.getLastName(user.value),
      email: userGetters.getEmailAddress(user.value),
    });
    const {
      send: sendNotification,
    } = useUiNotification();

    const form = ref(resetForm());

    const submitForm = (resetValidationFn) => () => {
      const onComplete = () => {
        form.value = resetForm();
        requirePassword.value = false;
        currentPassword.value = '';
        sendNotification({
          id: Symbol('user_updated'),
          message: 'The user account data was successfully updated!',
          type: 'success',
          icon: 'check',
          persist: false,
          title: 'User Account',
        });
        resetValidationFn();
      };

      const onError = () => {
        form.value = resetForm();
        requirePassword.value = false;
        currentPassword.value = '';
      };

      if (
        (userGetters.getEmailAddress(user.value) !== form.value.email
        && !requirePassword.value) || (userGetters.getFirstName(user.value) !== form.value.firstname
        && !requirePassword.value) || (userGetters.getLastName(user.value) !== form.value.lastname
        && !requirePassword.value)
      ) {
        requirePassword.value = true;
      } else {
        if (currentPassword.value) {
          form.value.password = currentPassword.value;
        }

        emit('submit', { form, onComplete, onError });
      }
    };

    return {
      requirePassword,
      currentPassword,
      form,
      submitForm,
    };
  },
});
</script>
<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin: 0 0 15px 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: 20px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.in-wrap {
  margin-bottom: 37px;
}
.sign-input-wrap.wrap {
  margin: 30px 0;
}
.form-control {
  padding-left: 0;
}
</style>
