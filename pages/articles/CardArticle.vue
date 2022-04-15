<template>
  <div class="card-wrao-info art-midd-card">
    <div class="row">
      <div class="col-md-5">
        <router-link :to="'/article-detail/'+card.node_id" class="move-pro-detail"></router-link>
        <div class="art-card-view">
          <img :src="card.image.url" :alt="card.image.alt" />
          <!-- <img src="/assets/meccabook/gallery-placeholder1.jpg" alt="image" /> -->
        </div>
      </div>
      <div class="col-md-6 align-self-center">
        <router-link :to="'/article-detail/'+card.node_id" class="move-pro-detail"></router-link>
        <div class="details art-details">
          <div class="date-address d-none d-md-block">
            <span class="date"> {{ formatCompat(card.date) }} </span>
            <span class="address" v-for="(item,i) in card.tags" :key="i">{{ card.tags[i+1] ? item+"," : item }}</span>
          </div>
          <h3 class="subtitle">
            {{ card.title[0].value }}
          </h3>
          <p class="desc" v-html="card.description.text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: [Array, Object],
      default: null,
    },
  },
  methods:{
     formatCompat(d3) {
      var initial = ((d3.toString()).replace(/-/g, "/").split(/\//));
      var t = [initial[1], initial[0], initial[2]].join("/");
      var d = new Date(t);
      var dd = String(d.getDate()).padStart(2, "0");
      var mm = d.getMonth();
      var ms = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var yyyy = d.getFullYear();

      d = ms[mm] + " " + dd  +"," + yyyy;
      return d;
    },
  },
};
</script>

<style lang="scss" scoped>
.art-midd-card {
  .details.art-details  {
    .desc {
    @media all and (min-width: 1200px) {
      margin-bottom: 0;
     }
    }
  }
}
.date-address .date {
  padding-right: 15px;
}
.date-address .address {
  padding-left: 0;
}
.art-midd-card {
    img {
      @media all and (max-width: 767px) {
        width: 100%;
        height: 188px;
        object-fit: cover;
    }
  }
}
</style>
