<template>
  <div class="artcard card-wrao-info">
    <router-link :to="'/events/'+card.id" class="move-pro-detail"></router-link>
    <div class="art-card-view">
      <img
        :src="card.image.url"
        :alt="card.image.alt"
      />
    </div>
    <div class="details art-details">
      <h4 class="event-title">{{card.title}}</h4>
      <span class="sub-title d-block" v-html="removeTags(card.description.text)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: null 
    }
  },
  methods: {
    removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
}
</script>