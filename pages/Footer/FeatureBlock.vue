<template>
  <div class="feature-block">
  <div class="feature-wrap">
    <div class="mr10">
      <feature-icon />
    </div>
    <div class="feature-info">
      <h4>Free shipping</h4>
      <p>Worldwide free shipping on all orders over $100.</p>
    </div>
  </div>
  <div class="feature-wrap">
    <div class="mr10">
      <book-icon />
    </div>
    <div class="feature-info">
      <h4>High quality books</h4>
      <p>
        Currated range of top quality products in both production
        and content.
      </p>
    </div>
  </div>
  <div class="feature-wrap">
    <div class="mr10">
      <ribbon-icon />
    </div>
    <div class="feature-info">
      <h4>Scholar validation</h4>
      <p>
        Key decisions evaluated by a panel of reputable Islamic
        scholars.
      </p>
    </div>
  </div>
  <div class="feature-wrap">
    <div class="mr10">
      <payment-icon />
    </div>
    <div class="feature-info">
      <h4>Easy payments</h4>
      <p>
        Fast and secure payments using a streamlined purchase
        process
      </p>
    </div>
  </div>
  </div>
</template>

<script>
import FeatureIcon from './FeatureIcon.vue'
import BookIcon from './BookIcon.vue'
import RibbonIcon from './RibbonIcon.vue'
import PaymentIcon from './PaymentIcon.vue'

export default ({
  components: {
      FeatureIcon,
      PaymentIcon,
      RibbonIcon,
      BookIcon,
  }
})
</script>
<style lang="scss" scoped>
// @import '~theme/css/variables/colors';
// @import '~theme/css/helpers/functions/color';
// $color-secondary: color(secondary);
</style>
