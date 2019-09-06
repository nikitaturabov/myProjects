<template>
  <div class="wrap_window" v-if="windowShow">
    <div class="window">
      <a href="#" class="cross" v-html="cross" @click="crossHandler"></a>
      <h2 class="hello_text">Добро пожаловать в единый отчёт для управляющей компании 1С:БО</h2>
      <div class="wrap_label">
        <span
          class="label"
        >Мы переработали интерфейс. Предлагаем ознакомиться с новыми функциями и возможностями.</span>
      </div>
      <div class="youtube_frame">
        <iframe :src="setData.education_video_link" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="btn_group">
        <a href="#" class="skip" @click="showGritter" v-show="hideBtn">Пропустить</a>
        <a href="#" class="clear" @click="closeWindow">Понятно</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["windowShow", "hideBtn"],
  data() {
    return {
      cross: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683418 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683418 12.0976 0.292893 11.7071C-0.097631 11.3166 -0.097631 10.6834 0.292893 10.2929L4.58579 6L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683418 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893Z" fill="#C4C4C4"/>
              </svg>`
    };
  },
  methods: {
    closeWindow() {
      this.$emit("close-window", false);
    },
    showGritter() {
      this.$emit("show-gritter", true);
      this.closeWindow();
    },
    crossHandler() {

      if (this.hideBtn) {
        this.showGritter();

      } else {
        this.closeWindow();
      }
    }
  },
  computed: {
    setData() {
      return this.$store.getters.getMainInfo;
    }
  }
};
</script>

<style lang="less">
.wrap_window {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  .window {
    position: relative;
    width: 538px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 40px 50px 28px 50px;
    .cross {
      cursor: pointer;
      position: absolute;
      top: 19px;
      right: 19px;
      padding: 7px;
    }
    .hello_text {
      font-weight: bold;
      line-height: 24px;
      font-size: 18px;
      text-align: center;
      color: #3a3a3a;
      margin: 0;
    }
    .wrap_label {
      line-height: 16px;
      font-size: 13px;
      text-align: center;
      color: #959595;
      margin: 20px 0;
    }
    .youtube_frame {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 241px;
      margin-bottom: 15px;
      iframe {
        width: 100%;
        height: 241px;
      }
    }

    .btn_group {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: flex-end;
      //float: right;
      .skip {
        background: #fedd46;
        border-radius: 5px;
        font-weight: bold;
        line-height: normal;
        font-size: 10px;
        letter-spacing: 0.05em;
        color: #3a3a3a;
        padding: 9px 13px;
        text-transform: uppercase;
      }
      .clear {
        margin-left: 15px;
        font-weight: bold;
        line-height: normal;
        font-size: 10px;
        letter-spacing: 0.05em;
        color: #959595;
        text-transform: uppercase;
      }
    }
  }
}
</style>
