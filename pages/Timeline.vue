<template>
<div class="container">
  <div class="timeline-block">
    <div class="container-block">
      <hr />
      <div
        class="horizontally-scrolled-items"
        v-if="
          getrelandingPage &&
          getrelandingPage.components &&
          getrelandingPage.components.middle
        "
      >
        <template>
          <div
            class="item flag"
            v-for="(item, idx) in getrelandingPage.components.middle
              .timeline_component"
            :key="idx"
          >
            <i></i>
            <img :src="item.image.url" :alt="item.image.alt" class="circle" />
            <div class="text-info">
              <h2>{{ item.title }}</h2>
              <p v-html="removeTags(item.description.text)"></p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      g: "hello",
    };
  },
  computed: {
    ...mapGetters("drupalcms", ["getrelandingPage"]),
  },

  methods: {
    ...mapActions("drupalcms", ["fetchlandingpage"]),
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
  async mounted() {
    await this.fetchlandingpage();
  },
};
</script>