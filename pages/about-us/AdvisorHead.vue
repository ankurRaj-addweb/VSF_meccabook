<template>
  <div class="advisor-head">
    <h2 class="">{{ content.title }}</h2>
    <!-- <h2 class="d-md-none" v-html="content.description.text" /> -->
    <p class="desc d-none d-md-block" v-html="content.description.text" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [Array, Object],
      default: null,
    },
  },
};
</script>