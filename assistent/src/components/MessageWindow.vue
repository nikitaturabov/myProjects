<template>
  <div v-scrollbar v-scrollbar-update class="block_messages" ref="block_messages">
    <div ref="scrollDiv" class="message_window">
      <div
        class="message"
        v-for="(message, index) in setData.messages"
        :key="index"
        :class="message.type"
      >
        <div class="text_message" v-html="message.text"></div>
      </div>
    </div>
    <div class="scrollbar" draggable="true" ref="scrollbar">
      <div class="scroll" ref="scroll"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    setData() {
      console.log(this.$store.getters.getData);
      return this.$store.getters.getData;
    }
  },
  updated() {
    this.$refs.scrollDiv.scrollTop = this.$refs.scrollDiv.scrollHeight;
  },
  created() {
    // window.addEventListener("resize", () => {
    //   console.log(window);
    //   window.setScroll(
    //     this.$refs.scrollbar,
    //     this.$refs.scroll,
    //     this.$refs.block_messages
    //   );
    // });
  }
};
</script>

<style lang="less">
.block_messages {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex: 1;
  flex-shrink: 0;

  ::-webkit-scrollbar {
    display: none;
  }
  .message_window {
    scroll-behavior: smooth;
    overflow-y: auto;
    width: 68%;
    display: flex;
    flex-direction: column;
    align-items: center;

    -ms-overflow-style: none;

    &:after {
      position: absolute;
      left: 0;
      bottom: -34px;
      right: 0;
      height: 87px;
      width: 100%;
      box-shadow: inset 0 80px 60px -60px rgba(104, 58, 58, 0),
        inset 0 -147px 18px -101px rgba(255, 255, 255, 1);
    }

    @keyframes smooth-appearance {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .message {
      padding: 13px 26px;
      width: 70%;
      margin: 5px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      animation: smooth-appearance 0.3s ease;

      .text_message {
        flex: 1;
        font-size: 16px;
        line-height: 24px;

        h3 {
          font-weight: normal;
          font-size: 16px;
        }
      }
    }
    .incoming {
      color: #4d4d4d;
      position: relative;
      background: #f0f0f0;
      border-radius: 14px 14px 14px 0px;
      margin-right: 50px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: -11px;
        width: 12px;
        height: 10px;
        background: url("../assets/images/edge_gray.svg") no-repeat;
      }
    }
    .outgoing {
      color: #4d4d4d;
      position: relative;
      background: #f0edff;
      border-radius: 14px 14px 0px 14px;
      margin-left: 50px;
      &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        right: -11px;
        width: 12px;
        height: 10px;
        background: url("../assets/images/edge_purpure.svg") no-repeat;
      }
    }
    .incoming_final {
      color: #4d4d4d;
      position: relative;
      background: #daf2a9;
      border-radius: 14px 14px 14px 0px;
      margin-right: 50px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: -11px;
        width: 12px;
        height: 10px;
        background: url("../assets/images/edge_green.svg") no-repeat;
      }
    }
  }
}

@media (max-width: 755px) {
  .block_messages {
    .message_window {
      .message {
        .text_message {
          font-size: 13px;
          line-height: 24px;
          h3 {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
