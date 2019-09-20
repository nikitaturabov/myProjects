<template>
<!-- @click="addToPicks(index)" -->
  <li class="multiselect__item"
      :class="{ 'multiselect__item--active': isPicked }"
      
      @click="addToPicks">
    
    <Checkbox :check="isPicked"></Checkbox>{{ item.text }}
    <slot></slot>
  </li>
</template>

<script>

import Checkbox from '@/src/components/checkbox/Checkbox.vue';

export default {
  props: {
    isPicked: {
      type: Boolean,
      default: false
    },
    item: {
      tpye: Object,
      default: null
    }
  },
  methods: {
    addToPicks(e) {
      this.$emit('item:pick', this.item);
    }
  },
  components: {
    Checkbox
  }
}
</script>

