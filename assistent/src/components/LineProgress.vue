<template>
  <div class="line_progress">
    <div ref="line" class="line_block">
      <div
        :class="[element.class, activateClass(element)]"
        v-for="(element, index) in elements"
        :key="index"
      >
        <div
          v-if="element.label"
          class="label"
          :class="[element.label.class]"
        >{{element.label.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { index: Number },
  data() {
    return {
      elements: [
        {
          activeColor: "white",
          index: 0,
          activeStage: "purpure",
          class: "circle",
          label: {
            class: "start",
            text: "Старт"
          }
        },
        {
          activeColor: "white",
          index: 0.5,
          class: "line"
        },
        {
          activeColor: "white",
          index: 1,
          class: "line"
        },
        {
          activeColor: "white",
          index: 1,
          activeStage: "purpure",
          class: "circle"
        },
        {
          activeColor: "white",
          index: 1.5,
          class: "line"
        },
        {
          activeColor: "white",
          index: 2,
          class: "line"
        },
        {
          activeColor: "white",
          index: 2,
          activeStage: "purpure",
          class: "circle"
        },
        {
          activeColor: "white",
          index: 2.5,
          class: "line"
        },
        {
          activeColor: "white",
          index: 3,
          class: "line"
        },

        {
          activeColor: "white",
          index: 3,
          activeStage: "purpure",
          class: "circle"
        },
        {
          activeColor: "white",
          index: 3.5,
          class: "line"
        },
        {
          activeColor: "white",
          index: 4,
          class: "line"
        },
        {
          activeColor: "green",
          index: 4,
          class: "circle last",
          label: {
            class: "run_check",
            text: "Запуск проверки"
          }
        }
      ]
    };
  },
  methods: {
    activateClass(element) {
      console.log(element.index);
      if (this.setData.stage >= element.index) {
        if (this.setData.stage === element.index && element.class === "circle") {
          return element.activeStage;
        } else {
          return element.activeColor;
        }
      }
    }
  },
  computed: {
    setData() {
      return this.$store.getters.getData;
    }
  }
};
</script>

<style lang="less">
.line_progress {
  .line_block {
    display: flex;
    justify-content: center;
    align-items: center;
    .circle {
      transition: all 0.3s;
      flex-shrink: 0;
      position: relative;
      width: 11px;
      height: 11px;
      border-radius: 50px;
      background: #e4b813;
      margin: 2px;
    }
    .line {
      transition: all 0.3s;
      flex-shrink: 0;
      height: 3px;
      width: 62px;
      background: #e4b813;
    }

    .yellow {
      background: #fabd1d;
    }
    .white {
      background: #ffffff;
    }
    .purpure {
      background: #9173d0;
    }
    .gray {
      background: #cbcbcb;
    }

    .last {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15px;
      height: 15px;
      background: #ffffff;
      &:after {
        content: "";
        display: block;
        background: url("../assets/images/check_img.svg") no-repeat;
        width: 9px;
        height: 7px;
      }
      &.green {
        background: #81ae24;
        &:after {
          content: "";
          display: block;
          background: url("../assets/images/check_img_white.svg") no-repeat;
          width: 9px;
          height: 7px;
        }
      }
    }

    .run_check {
    }
    .label {
      position: absolute;
      left: 0;
      font-size: 14px;
      &.start {
        top: -3px;
        left: -51px;
        color: #5a5a5a;
        font-weight: bold;
      }
      &.run_check {
        font-weight: bold;
        top: -8px;
        text-align: left;
        left: 23px;
        color: #5a5a5a;
      }
    }
  }
}
@media (max-width: 755px) {
  .line_progress {
    .line_block {
      .circle {
        transition: all 0.3s;
        width: 9px;
        height: 9px;
      }
      .line {
        transition: all 0.3s;
        width: 40px;
      }
      .last {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 13px;
        height: 13px;
        &:after {
          content: "";
          display: block;
          background: url("../assets/images/check_img.svg") no-repeat;
          width: 7px;
          height: 5px;
        }
      }
    }
  }
}
</style>
