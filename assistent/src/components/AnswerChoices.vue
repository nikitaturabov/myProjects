<template>
  <div class="block_options">
    <div class="options_window">
      <a
        class="option"
        v-for="(option, index) in setData.options"
        :key="index"
        :href="option.url"
        :class="[{active: option.popular}, option.type, {visited: option.visited}]"
        @click="setElementActive(index)"
      >{{option.text}}</a>
      <a
        :href="setData.buttonFinal.link"
        class="button_check"
        v-if="setData.buttonFinal.view"
      >Запустить проверку</a>

      <a
        :href="setData.goToCheckList.link"
        class="go_to_checklist"
        v-if="setData.goToCheckList.view"
      >Перейти в список проверок ЦА</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    setElementActive(index) {
      //   this.options[index].active = !this.options[index].active;
    }
  },
  computed: {
    setData() {
      console.log(this.$store.getters.getData);
      return this.$store.getters.getData;
    }
  }
};
</script>

<style lang="less">
.block_options {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 14px 26px;
  min-width: 400px;
  .options_window {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .option {
      transition: 0.3s;
      font-size: 14px;
      color: #4d4d4d;
      background: #f0edff;
      border-radius: 31px;
      padding: 8px 16px;
      margin: 2.5px 3px;
      cursor: pointer;
      display: flex;
      flex-grow: 0;
      white-space: nowrap;

      &:hover {
        transition: 0.3s;
        background: #d9d6e7;
      }

      &.active {
        background: #9173d0;
        color: #ffffff;
        font-weight: bold;
        transition: 0.3s;
        &:hover {
          background: #685297;
          transition: 0.3s;
        }
      }
      &.visited {
        color: #b7aad4;
        transition: 0.3s;
        &:hover {
          transition: 0.3s;
          background: #d9d6e7;
          color: #4d4d4d;
        }
      }
    }
    .go_to_checklist,
    .button_check {
      cursor: pointer;
      transition: 0.3s;
      flex-grow: 1;
      flex-shrink: 0;
      height: 22px;
      padding: 12px 25px;

      border-radius: 31px;
      font-weight: bold;
      line-height: 21px;
      font-size: 14px;
      text-transform: uppercase;
      color: #ffffff;
      &:hover {
        transition: 0.3s;
      }
    }
    .button_check {
      background: #81ae24;
      &:hover {
        transition: 0.3s;
        background: #618319;
      }
    }
    .go_to_checklist {
      background: #f7712d;
      &:hover {
        transition: 0.3s;
        background: #be5a28;
      }
    }
  }
}
@media (max-width: 755px) {
  .block_options {
    .options_window {
      .option {
        font-size: 12px;
      }
    }
  }
}
</style>
