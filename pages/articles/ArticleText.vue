<template>
  <div class="details art-details">
    <div class="date-address d-none d-md-block">
      <span class="date"> {{ formatCompat(content.date) }} </span>
      <span class="address" v-for="(item,i) in content.tags" :key="i">{{ content.tags[i+1] ? item+"," : item }}</span>
    </div>
    <h3 class="subtitle">
      {{ content.title[0].value }}
    </h3>
    <p class="desc" v-html="removeTags(content.description.text)">
    </p>
  </div>
</template>

<script>
export default {
    props: {
        content: {
            type: [Array,Object],
            default: null
        }
    },
    methods: {
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
      removeTags(str) {
        if (str === null || str === "") return false;
        else str = str.toString();
        return str.replace(/(<([^>]+)>)/gi, "");
      },
    },
}
</script>

<style scoped>
.date-address .date {
  padding-right: 15px;
}
.date-address .address {
  padding-left: 0;
}
</style>

