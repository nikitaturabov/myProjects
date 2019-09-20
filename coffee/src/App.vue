<template>
  <div id="app">
    <div class="header">Учёт чашечек кофе</div>
    <Coffeemen></Coffeemen>
  </div>
</template>
 
<script>
import Coffeemen from "./components/Coffeemen.vue";

export default {
  name: "app",
  components: {
    Coffeemen
  }
};
</script>

<style lang="less">
.header {
  position: fixed;
  top: 0;
  left: 5px;
  right: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding: 15px 0;
  text-align: center;
  text-transform: uppercase;
  background: #5f4a8b;
  color: #ffffff;
}
</style>
