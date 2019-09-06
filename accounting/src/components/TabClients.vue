<template>
  <div class="wrap_clients">
    <a
      :href="setTabClient.link"
      @click="$emit('set-component'); $emit('set-active-class')"
      v-bind:class="{ active: currentComponent === 'Clients' }"
      class="tab"
    >
      <div class="content_tab">
        <div class="clients">
          <span class="count_clients" v-gap-between-num="{num: setTabClient.all_clients}"></span>
          <span
            class="inc_word"
            v-inclined-word="{number: setTabClient.all_clients, titles: ['клиент', 'клиента', 'клиентов']}"
          ></span>
        </div>
        <div class="bottom_block">
          <div class="clients_bo">
            <span class="count_clients_bo" v-gap-between-num="{num: setTabClient.clients_bo}"></span>
            1С:Бухобслуживание
          </div>
          <div class="clients__no_bo" v-if="showTransferOnTechnology">
            <span class="count_clients_no_bo" v-gap-between-num="{num: setTabClient.clients_no_bo}"></span>
            к переводу на технологию
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import hideTransferOfTechnology from '../mixin/hideTransferOfTechnology.js';
export default {
  mixins: [hideTransferOfTechnology],
  props: ["currentComponent"],
  data() {
    return {
      clients: {}
    };
  },
  computed: {
    setTabClient() {
      return this.$store.getters.getMainInfo.clients_tab;
    },
  }
};
</script>

<style lang="less">
.tab {
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 20px 20px 0px 0px;
  background: #e6e6e6;
  width: 300px;
  height: 130px;

  &.active {
    background: #ffffff;
  }
  .content_tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
    margin-left: -12px;
    height: 80px;
    .clients {
      font-size: 23px;
      color: #3a3a3a;
      margin-bottom: 19px;
    }
    .bottom_block {
      margin-top: -7px;
      .clients_bo,
      .clients__no_bo {
        margin: 7px 4px;
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #7f7f7f;
        .count_clients_bo,
        .count_clients_no_bo {
          margin-right: 5px;
          color: #4d4d4d;
        }
      }
    }
  }
}
@media screen and (min-width: 1500px) {
  .tab {
    transition: all 0.3s;
    width: 343px;
    .content_tab {
      .bottom_block {
        .clients_bo,
        .clients__no_bo {
          font-size: 11px;
        }
      }
    }
  }
}
</style>