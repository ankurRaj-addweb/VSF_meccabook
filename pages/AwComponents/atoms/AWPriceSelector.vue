<template functional>
  <SfButton
    class="option-btn"
    :aria-pressed="props.selected.toString()"
    :data-testid="props.color"
    v-bind="data.attrs"
    v-on="listeners"
  >
  <slot>
  <li class="box box-btn" :class="[{ 'active': props.selected }]">
    <span class="quality d-block">{{ props.color }}</span>
    <span class="price d-block">$ {{ props.configPrice.price }}</span>
  </li>
  </slot>
   
  </SfButton>
</template>
<script>
import SfButton from '@storefront-ui/vue';
export default {
  name: "SfColor",
  inject: {
    components: {
      default: {
        SfButton,
      },
    },
  },
  props: {
    productsku: {
      type: String,
      default: ""
    },
    configPrice: {
      type: [String, Array, Object],
      default: ""
    },
    idx: {
      type: Number,
      default: ""
    },
    color: {
      type: String,
      default: "",
    },
    selected: {
      type: Boolean,
      default: false,
    },
    hasBadge: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.option-btn {
  padding: 0px !important;
  background: none;
  min-width: 116px !important;
  width: auto !important;
  margin-right: 10px;
  padding: 13px 20px;
  text-align: center;
}
</style>
