<template>
  <div class="wrap_recalculation" v-if="recalculation.length">
    <div class="recalculation">
      <h2 class="headline_table">
        Перерасчет по изменениям за предыдущие периоды
        <div class="help">
          <div class="icon" v-html="iconInfo"></div>
          <div class="information_block">
            <p>Перерасчёт происходит за все регулярные, разовые услуги и восстановлени учёта</p>
          </div>
        </div>
      </h2>

      <div class="wrap_table">
        <div class="table_recalculation">
          <div class="wrap_headline">
            <div class="element_left journal">Журнал</div>
            <div class="element_left changed">Изменил</div>
            <div class="element_left itwas hasbecome dotted_border">Было/Стало</div>
            <div class="element_right revenue">выручка</div>
            <div class="element_right royalty">Роялти</div>
          </div>
        </div>
        <div class="container" v-scrollbar v-scrollbar-update>
          <div class="scroll_body">
            <div class="table_body">
              <a
                :href="field.journal_link"
                class="field"
                v-for="(field, index) in recalculation"
                :key="index"
              >
                <div class="element_left journal">{{field.journal}}</div>
                <div class="element_left changed">{{field.changed}}</div>
                <div class="element_left itwas hasbecome dotted_border">
                  <span class="num" v-gap-between-num="{num: field.itwas}"></span> руб./
                  <span class="num" v-gap-between-num="{num: field.hasbecome}"></span>
                  руб.
                </div>
                <div class="element_right revenue green" v-if="calculateRevenue(field.revenue)">
                  +<span class="num" v-gap-between-num="{num: field.revenue}"></span>
                  руб.
                </div>
                <div class="element_right revenue red" v-else>
                  <span class="num" v-gap-between-num="{num: field.revenue}"></span>
                  руб.
                </div>
                <div class="element_right royalty green" v-if="calculateRoyalty(field.royalty)">
                  +<span class="num" v-gap-between-num="{num: field.royalty}"></span>
                  руб.
                </div>
                <div class="element_right royalty red" v-else>
                  <span class="num" v-gap-between-num="{num: field.royalty}"></span>
                  руб.
                </div>
              </a>
            </div>
          </div>
          <div class="scrollbar" draggable="true">
            <div class="scroll"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recalculation: [],
      iconInfo: ""
    };
  },
  created() {
    this.recalculation = this.$store.state.royalty_page.recalculation;
    this.iconInfo = this.$store.state.iconInfo;
  },
  methods:{
    calculateRoyalty(value){
      return value > 0 ? true : false;  
    },
    calculateRevenue(value){
      return value > 0 ? true : false;
    }
  }
};
</script>


<style lang="less">
.wrap_recalculation {
  .recalculation {
    .headline_table {
      font-weight: normal;
      line-height: 28px;
      font-size: 20px;
      color: #4d4d4d;
      padding: 19px 30px;
      display: flex;
      align-items: center;
      .help {
        display: inline-block;
        position: relative;
        margin-left: 7px;
        cursor: pointer;
        .icon {
          display: flex;
          align-items: center;
        }

        .information_block {
          cursor: default;
          position: absolute;
          visibility: hidden;
          top: -80px;
          left: 0px;
          background: #ffffff;
          line-height: 18px;
          font-size: 13px;
          color: #4d4d4d;
          width: 272px;
          padding: 5px 15px;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transition: opacity 500ms linear, top 100ms linear,
            bottom 100ms linear, visibility 100ms linear;
          z-index: 4;
          transition-delay: 0.2s;
        }
        &:hover {
          .information_block {
            visibility: visible;
            opacity: 1;
            transition-delay: 0.2s;
            z-index: 4;
          }
        }
      }
    }
    .container {
      position: relative;
      .scroll_body {
        width: 100%;
        max-height: 154px;
        overflow-y: auto;
        -ms-overflow-style: none;
      }
    }

    ::-webkit-scrollbar {
      display: none;
    }
    .table_recalculation,
    .scroll_body > .table_body {
      width: 100%;
      font-size: 14px;
      border-collapse: collapse;
      z-index: 66;
      .wrap_headline {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .element_right,
        .element_left {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #7f7f7f;
          font-weight: normal;
          border-bottom: 1px solid #e5e5e5;
          border-top: 1px solid #e5e5e5;
        }
        .element_right {
          padding: 10px 30px 10px 0px;
          text-align: right;
        }
        .element_left {
          padding: 10px 0px 10px 30px;
          text-align: left;
        }
      }
      .field {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .element_right,
        .element_left {
          font-size: 14px;
          color: #4d4d4d;

          
        }
        &:hover {
          background: #e5e5e5;
          transition: all 0.3s;
        }
        .element_right {
          padding: 10px 30px 10px 0px;
          text-align: right;
        }
        .element_left {
          padding: 10px 0px 10px 30px;
          text-align: left;
        }

        .revenue,
        .royalty {
          &.green{
            color: #00AA45;
          }
          &.red{
            color: #ef5350;
          }
          
        }
      }
      .element_left {
        width: calc(70% / 3);
      }
      .element_right {
        width: calc(30% / 2);
      }
      .dotted_border {
        border-right: 1px dashed #e5e5e5;
      }
    }
  }
}
</style>
