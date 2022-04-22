<template>
<div v-if="!myarray.includes(addId)" class="address-wrap-card">
  <AwRadio v-model="selected" class="address-card" :value="name" name="groupName">
    <template #label>
      <slot />
    </template>
    <template #checkmark>
      <slot name="icon">
        <div>
          
        </div>
      </slot>
    </template>
  </AwRadio>
  <span v-if="checkoutstep === 1" @click="catchAddId(addId)"><img src="/meccabook/close-rounded.svg" alt="close"/></span>
  
</div>
  
</template>
<script>
import AwRadio from "./AwRadio.vue";
import { useUiState, useUiNotification } from "~/composables";

export default {
  name: "SfAddressPicker",
  data() {
    return {
      myarray: []
    }
  },
  components: {
    AwRadio,
  },
  methods: {
    catchAddId(id) {
      this.myarray.push(id);
    }
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    addId: {
      type: [String,Number],
      default: "",
    },
  },
  inject: ["getSelectedValue", "setSelectedValue"],
  computed: {
    selected: {
      get() {
        return this.getSelectedValue();
      },
      set(newValue) {
        this.setSelectedValue(newValue);
      },
    },
  },
  setup() {
    const {  checkoutstep } = useUiState();
    return {
      checkoutstep
    }
  }
};
</script>


<style lang="scss" scoped>
  .address-wrap-card {
    position: relative;

    span {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 99;
    }
  }
</style>