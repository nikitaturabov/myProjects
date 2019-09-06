<template>
  <div class="wrap">
    <welcome-window
      @show-gritter="setShowGritter"
      @close-window="closeWindow"
      :windowShow="windowShow"
      :hideBtn="buttonState"

    ></welcome-window>

    <ifarame-page :showIframe="iframeWindow" @close-iframe="switchWindowIframe"></ifarame-page>
    <header-accounting :preloaderSwitch="setInfo.preloaderSwitch" @show-video="showOnlyVideo" @register-pp="switchWindowIframe"></header-accounting>
    <div class="tabs" v-if="!setInfo.preloaderSwitch">
      <tab-clients @set-component="setComponent('Clients')" :currentComponent="currentComponent"></tab-clients>
      <tab-royalty @set-component="setComponent('Royalty')" :currentComponent="currentComponent"></tab-royalty>
      <tab-dynamics @set-component="setComponent('Dynamics')" :currentComponent="currentComponent"></tab-dynamics>
    </div>
    <keep-alive v-if="!setInfo.preloaderSwitch && !iframeWindow">
      <component :is="currentComponent"></component>
    </keep-alive>
    <preloader :preloaderSwitch="setInfo.preloaderSwitch"></preloader>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated shake"
      leave-active-class="animated hinge"
    >
      <div class="gritter" v-if="showGritter && currentComponent==='Clients'">
        <div class="cross" v-html="cross" @click="removeGritter"></div>
        <div class="headline">
          <div class="play_icon" v-html="play"></div>Новое в отчёте
        </div>
        <div
          class="main_info"
        >Для получения подробной информации о новом отчёте можете посмотреть обучающее видео</div>
        <a href="#" class="watch" @click="showWindow">Посмотреть</a>
      </div>
    </transition>
  </div>
</template>

<script>
import HeaderAccounting from "./components/HeaderAccounting.vue";
import TabClients from "./components/TabClients.vue";
import TabRoyalty from "./components/TabRoyalty.vue";
import TabDynamics from "./components/TabDynamics.vue";
import Clients from "./components/Clients.vue";
import Royalty from "./components/Royalty.vue";
import Dynamics from "./components/Dynamics.vue";
import WelcomeWindow from "./components/WelcomeWindow.vue";
import Preloader from "./components/Preloader.vue";
import IfaramePage from "./components/IfaramePage.vue";

export default {
  data() {
    return {
      currentComponent: "Clients",
      cross: `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893C8.09763 0.683418 8.09763 1.31658 7.70711 1.70711L5.41421 4L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L4 5.41421L1.70711 7.70711C1.31658 8.09763 0.683418 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L2.58579 4L0.292894 1.70711C-0.0976307 1.31658 -0.0976307 0.683418 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L4 2.58579L6.29289 0.292893Z" fill="#5B5B5B"/>
              </svg>`,
      play: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">  
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM6.8 10.4249L10.7 8.17321C10.8333 8.09622 10.8333 7.90377 10.7 7.8268L6.8 5.57513C6.66667 5.49815 6.5 5.59437 6.5 5.74833V10.2517C6.5 10.4056 6.66667 10.5019 6.8 10.4249Z" fill="black"/>
            </svg>`,
      showGritter: false,
      windowShow: "",
      buttonState: true,
      iframeWindow: false,
    
    };
  },
  components: {
    HeaderAccounting,
    TabClients,
    TabRoyalty,
    TabDynamics,
    Clients,
    Royalty,
    Dynamics,
    WelcomeWindow,
    Preloader,
    IfaramePage
  },
  methods: {
    setComponent(component) {
      this.currentComponent = component;
    },
    setShowGritter(event) {
      this.showGritter = event;
    },
    removeGritter() {
      this.showGritter = false;
    },
    showWindow() {
      this.windowShow = true;
      this.showGritter = false;
    },
    showOnlyVideo(){
      this.windowShow = true;
      this.buttonState = false;
    },
    closeWindow(event) {
      this.windowShow = event;
    },
    switchWindowIframe(){
      this.iframeWindow = !this.iframeWindow;
    }
  },
  computed: {
    setInfo() {
      this.windowShow = this.$store.getters.getMainInfo.firstStart;
      this.currentComponent = this.$store.getters.getMainInfo.currentComponent;
      return this.$store.getters.getMainInfo;
    }
  }
};
</script>

<style lang="less">
@import url("./mixin/mixin.less");

.wrap {
  position: relative;

.tabs {
    transition: all 0.3s;
    display: flex;
    justify-content: space-between;
    width: 1030px;
  }

  .gritter {
    position: fixed;
    bottom: 21px;
    right: 21px;
    width: 202px;
    background: #ffdc44;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 25px;
    z-index: 10;

    .cross {
      cursor: pointer;
      position: absolute;
      top: 11px;
      right: 11px;
      padding: 5px;
    }
    .play_icon {
      margin-right: 17px;
    }
    .headline {
      display: flex;
      justify-content: flex-start;
      color: #3a3a3a;
      font-weight: bold;
      font-size: 14px;
    }

    .main_info {
      line-height: 16px;
      font-size: 12px;
      color: #3a3a3a;
      margin: 12px 0;
    }

    .watch {
      font-weight: 600;
      line-height: normal;
      font-size: 12px;
      text-decoration-line: underline;
      color: #3a3a3a;
    }
  }
}
@media screen and (min-width: 1500px) {
  .wrap {
    .tabs {
      transition: all 0.3s;
      width: 1075px;
    }
  }
}
</style>
