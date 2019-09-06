<template>
  <div class="wrap_revenue_chart">
    <div class="headline_block">
      <div class="color_indicator" :class="data.color"></div>

      <div class="group_name">{{data.headline}}</div>
      <div class="journals">
        <div class="count_journals">{{data.count_journals}}</div>
        <div
          class="text_journals"
          v-inclined-word="{number: data.count_journals, titles: ['журнал', 'журнала', 'журналов']}"
        ></div>
      </div>
    </div>

    <div class="wrapper" v-animate-css.click="'shake'" ref="shackedElement">
      <div class="total_clients">
        <div class="big_num">
          <div class="count_clients" v-gap-between-num="{num: data.summation}"></div>
          <div class="text_clients">руб.</div>
        </div>
        <div class="wrap_topline">
          <a :href="data.difference.link" class="up_block" :class="data.difference.index">
            <div class="index" v-if="data.difference.index === 'plus'" v-html="triangleUp"></div>
            <div class="index" v-if="data.difference.index === 'minus'" v-html="triangleDown"></div>
            <div class="index" v-if="data.difference.index === 'neutral'"></div>
            <span class="difference" v-gap-between-num="{num: data.difference.count}"></span>
            <span class="rub">руб.</span>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>Разница между сформированными и скорректированными журналами</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="end_last_month">
      <div class="label">До корректировки журналов</div>
      <div class="money">
        <div class="count" v-gap-between-num="{num: data.before_correction.count}"></div>
        <div class="rub">руб.</div>
      </div>
    </div>

    <div class="value_table">
      <div class="field">
        <div class="name">
          Индивидуальная стоимость
          <br>выше стоимости по тарифам
        </div>
        <div class="right_block">
          <a
            :href="data.profit_highter.link"
            class="color_count"
            :class="data.profit_highter.index"
          >
            <div class="index" v-if="data.profit_highter.index === 'neutral'"></div>
            <div class="index" v-if="data.profit_highter.index === 'plus'">+</div>
            <div class="index" v-if="data.profit_highter.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.profit_highter.count}"></div>
            <div class="rub">руб.</div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>Данное значение показывает положительную разницу между индивидуально стоимостью и тарификацией 1С:БО. Пример: по договору установлена индивидуальная стоимость 15000 руб.. Стоимость оказанных услуг при расчете по тарификации 1С:БО составляет 10000 руб. Показатель отражает, что установленная "индивидуальная стоимость" выше, чем стоимость по тарификации 1С:БО на 5000 руб.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="field" v-if="data.added_services">
        <div class="name">Добавлены дополнительные услуги</div>
        <div class="right_block">
          <a
            :href="data.added_services.link"
            class="color_count"
            :class="data.added_services.index"
          >
            <div class="index" v-if="data.added_services.index === 'neutral'"></div>
            <div class="index" v-if="data.added_services.index === 'plus'">+</div>
            <div class="index" v-if="data.added_services.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.added_services.count}"></div>
            <div class="rub">руб.</div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>Данное значение показывает положительную разницу между суммами автоматически сформированных доп.услуг и суммами доп.услуг на момент формирования отчёта.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="line"></div>
      </div>

      <div class="field" v-if="data.profit_below">
        <div class="name">
          Индивидуальная стоимость ниже
          <br>стоимости по тарифу
        </div>
        <div class="right_block">
          <a :href="data.profit_below.link" class="color_count" :class="data.profit_below.index">
            <div class="index" v-if="data.profit_below.index === 'neutral'"></div>
            <div class="index" v-if="data.profit_below.index === 'plus'">+</div>
            <div class="index" v-if="data.profit_below.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.profit_below.count}"></div>
            <div class="rub">руб.</div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>Данное значение показывает отрицательную разницу между индивидуально стоимостью и тарификацией 1С:БО. Пример: по договору установлена индивидуальная стоимость 10000 руб.. Стоимость оказанных услуг при расчете по тарификации 1С:БО составляет 15000 руб. Показатель отражает, что установленная "индивидуальная стоимость" ниже, чем стоимость по тарификации 1С:БО на 5000 руб.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="name">Удалены дополнительные услуги</div>
        <div class="right_block">
          <a
            :href="data.remove_services.link"
            class="color_count"
            :class="data.remove_services.index"
          >
            <div class="index" v-if="data.remove_services.index === 'neutral'"></div>
            <div class="index" v-if="data.remove_services.index === 'plus'">+</div>
            <div class="index" v-if="data.remove_services.index === 'minus'">-</div>
            <div class="count" v-gap-between-num="{num: data.remove_services.count}"></div>
            <div class="rub">руб.</div>
          </a>
          <div class="help">
            <div class="icon" v-html="iconInfo"></div>
            <div class="information_block">
              <p>Данное значение показывает отрицательную разницу между суммами автоматически сформированных доп.услуг и суммами доп.услуг на момент формирования отчёта.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      iconInfo: "",
      triangleUp: `<svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.30032 1.59839C3.90034 0.798958 5.09966 0.798958 5.69968 1.59839L8.32751 5.09957C9.06965 6.08836 8.36415 7.5 7.12783 7.5L1.87217 7.5C0.635854 7.5 -0.0696521 6.08836 0.672487 5.09957L3.30032 1.59839Z" fill="#00963D"></path></svg>`,
      triangleDown: `<svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.69968 6.40161C5.09966 7.20104 3.90034 7.20104 3.30032 6.40161L0.672488 2.90043C-0.069652 1.91164 0.635854 0.499999 1.87217 0.499999L7.12783 0.5C8.36415 0.5 9.06965 1.91164 8.32751 2.90043L5.69968 6.40161Z" fill="#EF5350"></path></svg>`
    };
  },
  created() {
    this.iconInfo = this.$store.state.iconInfo;
  },
  computed: {
    changeDataHeadlineForShaking() {
      return this.data.headline;
    }
  },
  watch: {
    changeDataHeadlineForShaking: function(newValue, oldValue) {
      this.$refs.shackedElement.click();
    }
  }
};
</script>

<style lang="less">
.wrap_revenue_chart {
  @gap: 7px;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 0px 0 188px;

  .headline_block {
    display: flex;
    align-items: center;
    .color_indicator {
      padding: 5px;
      border-radius: 2px;
      margin-right: @gap;
      &._0 {
        background: #c5c5c5;
      }
      &._1 {
        background: #ef5f50;
      }
      &._2 {
        background: #ffc700;
      }
      &._3 {
        background: #ffa726;
      }
      &._4 {
        background: #9acc00;
      }
      &._5 {
        background: #25b8b6;
      }
      &._6 {
        background: #4483cc;
      }
      &._7 {
        background: #9173d0;
      }
      &._8 {
        background: #ed89b7;
      }
    }

    .group_name {
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #808080;
      margin-right: 20px;
    }
    .journals {
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      color: #8d8787;
      .count_journals {
        margin-right: 5px;
      }
    }
  }

  .total_clients {
    font-weight: bold;
    font-size: 36px;
    line-height: normal;
    color: #5c5c5c;
    display: flex;
    align-items: flex-start;
    margin: 30px 0;
    .big_num {
      display: flex;
    }
    .count_clients {
      margin-right: @gap;
      white-space: nowrap;
    }
    .wrap_topline {
      display: flex;
      align-items: center;
      font-weight: normal;
      font-size: 20px;
      line-height: normal;
      .up_block {
        display: flex;
        align-items: center;

        color: #8d8787;
        &.plus {
          color: #00aa45;
        }

        &.minus {
          color: #ef5350;
        }

        &.neurtal {
          color: #8d8787;
        }

        .index {
          display: flex;
          align-items: center;
          margin-right: @gap;
        }
        .rub {
          margin-left: 7px;
        }
      }
      .help {
        margin-left: 7px;
      }
    }
  }

  .end_last_month {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .label {
      font-size: 14px;
      line-height: normal;
      color: #8d8787;
    }
    .money {
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      .count {
        font-size: 20px;
        line-height: normal;
        color: #3a3a3a;
        margin-top: 12px;
        white-space: nowrap;
      }
      .rub {
        margin-left: 7px;
      }
    }
  }

  .field {
    display: flex;
    justify-content: space-between;
    margin: 25px 0;
    .line {
      flex: 1;
      height: 1px;
      background: #f4f4f4;
    }
    .name {
      font-size: 14px;
      line-height: 21px;
      color: #8d8787;
    }
    .right_block {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .color_count {
        display: flex;
        justify-content: flex-end;
        white-space: nowrap;
        margin-right: @gap;
        font-size: 20px;
        &.neutral {
          color: #8d8787;
        }
        &.plus {
          color: #00aa45;
        }
        &.minus {
          color: #ef5350;
        }
      }
      .rub {
        margin-left: 7px;
      }
    }
  }
  .help {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      .information_block {
        visibility: visible;
        opacity: 1;
        transition-delay: 0.2s;
        z-index: 4;
      }
    }
    .information_block {
      cursor: default;
      position: absolute;
      visibility: hidden;

      top: 40px;
      right: 0px;
      background: #ffffff;
      line-height: 18px;
      font-size: 13px;
      color: #4d4d4d;
      width: 450px;
      padding: 5px 15px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      opacity: 0;
      transition: opacity 500ms linear, top 100ms linear, bottom 100ms linear,
        visibility 100ms linear;
      z-index: 4;
      transition-delay: 0.2s;
      a {
        color: #4187a8;
      }
    }
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .wrap_revenue_chart {
    margin: 0;
  }
}
</style>