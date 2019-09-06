<template>
  <div class="green_numbers__items">
    <a :href="setData.sales.link" class="green_item first">
      <div class="green_item__count_in">{{setData.sales.count}}</div>
      <div class="green_item__text">{{setData.sales.text}}</div>
    </a>
    <a :href="setData.growth.link" class="green_item second">
      <div class="green_item__count_in">{{setData.growth.count}}</div>
      <div class="green_item__text">{{setData.growth.text}}</div>
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    setData() {
      return this.$store.getters.getClientsData.bubbles;
    }
  }
};
</script>

<style lang="less">
.green_numbers__items {
  display: flex;
  justify-content: flex-start;
  width: 800px;
  padding: 0px 39px 0 18px;
  flex: 1;
  .green_item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    border-radius: 5px;
    flex-shrink: 0;
    background: #e5f6ec;
    &__count_in {
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      color: #00963d;
    }
    &__text {
      display: inline-block;
      margin-left: 15px;
      display: block;
      white-space: pre-line;
      font-size: 16px;
      color: #00963d;
    }

    &.first {
      margin-right: 20px;
    }
    &.second {
    }
  }
}
</style>