<template>
  <div class="artcard card-wrao-info">
    <router-link :to="'/article-detail/'+card.node_id" class="move-pro-detail"></router-link>
    <div v-if="card.image" class="art-card-view">
      <img :src="card.image.url" :alt="card.image.alt" />
      <!-- <img src="/assets/meccabook/gallery-placeholder2.jpg" alt="image" /> -->
    </div>
    <div class="details art-details">
      <h3 v-if="card.title[0]" class="subtitle">
        {{ card.title[0].value }}
      </h3>
      <p v-if="card.description" v-html="card.description.text" class="desc d-none d-lg-block">
      </p>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        card: {
            type: [Array, Object],
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
      .art-details {
        @media all and (max-width: 991px) {
            padding-left: 20px !important;
        }
    }
</style>
