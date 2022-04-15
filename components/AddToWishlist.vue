<template>
  <component :is="component" v-if="isShow" @click="$emit('addToWishlist')">
    <AwButton class="sf-button--text">
      <i class="icon-wishlist text"></i>
      <span class="text"> {{ $t(actionText) }}</span>
    </AwButton>
  </component>
  <component :is="component" v-else class="wishlist-wrap">
    <button @click="toggleLoginModal()">
      <i class="icon-wishlist"></i>
      <span class="text">Add to wishlist</span>
    </button>
  </component>
</template>

<script>
import { defineComponent, computed } from "@nuxtjs/composition-api";
import { SfIcon, SfButton } from "@storefront-ui/vue";
import AwButton from "../pages/AwComponents/atoms/AwButton.vue";
import { useUiState } from "~/composables";

export default defineComponent({
  name: "AddToWishlist",
  components: {
    SfIcon,
    AwButton,
  },
  props: {
    component: {
      type: String,
      default: "span",
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    wishlistIcon: {
      type: String,
      default: "heart",
    },
    isInWishlistIcon: {
      type: String,
      default: "heart_fill",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const actionText = computed(() =>
      props.isInWishlist ? "Remove from wishlist" : "Add to wishlist"
    );

    const { toggleLoginModal } = useUiState();

    return {
      actionText,
      toggleLoginModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-to-wishlist {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__content {
    margin-left: 5px;
    display: flex;
  }
}
</style>
